const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3456;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'mesh.db');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    name TEXT,
    role TEXT,
    status TEXT DEFAULT 'unknown',
    last_seen TEXT,
    last_heartbeat TEXT,
    credits_remaining INTEGER,
    credit_burn_rate REAL,
    model TEXT,
    host TEXT,
    endpoint TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS health_events (
    id INTEGER PRIMARY KEY,
    timestamp TEXT DEFAULT (datetime('now')),
    event_type TEXT,
    label TEXT,
    severity INTEGER,
    spoons INTEGER,
    notes TEXT,
    source TEXT DEFAULT 'manual',
    agent_id TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS cron_snapshots (
    id INTEGER PRIMARY KEY,
    timestamp TEXT DEFAULT (datetime('now')),
    total_jobs INTEGER,
    enabled_jobs INTEGER,
    failed_jobs INTEGER,
    last_failure TEXT,
    details TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    timestamp TEXT DEFAULT (datetime('now')),
    from_agent TEXT,
    to_agent TEXT,
    channel TEXT,
    content TEXT,
    kind TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    status TEXT DEFAULT 'open',
    assigned_to TEXT,
    requested_by TEXT,
    due_date TEXT,
    completed_at TEXT,
    result TEXT
  )`);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const clients = new Set();
function broadcast(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(res => res.write(payload));
}

app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();
  clients.add(res);
  res.write(`data: ${JSON.stringify({ type: 'connected', time: new Date().toISOString() })}\n\n`);
  req.on('close', () => clients.delete(res));
});

// --- Agents ---
app.get('/api/agents', (req, res) => {
  db.all(`SELECT * FROM agents ORDER BY last_seen DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/agents/:id/heartbeat', (req, res) => {
  const { id } = req.params;
  const now = new Date().toISOString();
  const { status, credits_remaining, credit_burn_rate } = req.body;
  db.run(
    `INSERT INTO agents (id, last_heartbeat, last_seen, status, credits_remaining, credit_burn_rate)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       last_heartbeat=excluded.last_heartbeat,
       last_seen=excluded.last_seen,
       status=COALESCE(excluded.status, agents.status),
       credits_remaining=COALESCE(excluded.credits_remaining, agents.credits_remaining),
       credit_burn_rate=COALESCE(excluded.credit_burn_rate, agents.credit_burn_rate)`,
    [id, now, now, status || null, credits_remaining ?? null, credit_burn_rate ?? null],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      broadcast({ type: 'agent', data: { id, last_heartbeat: now, status } });
      res.json({ id, last_heartbeat: now });
    }
  );
});

// --- Health ---
app.get('/api/health', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  db.all(`SELECT * FROM health_events ORDER BY timestamp DESC LIMIT ?`, [limit], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/health/today', (req, res) => {
  db.all(`SELECT * FROM health_events WHERE date(timestamp) = date('now') ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/health/labels', (req, res) => {
  db.all(`SELECT DISTINCT label FROM health_events WHERE label IS NOT NULL ORDER BY label`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => r.label));
  });
});

// Health stats
app.get('/api/health/stats', (req, res) => {
  db.get(`SELECT COUNT(*) as today FROM health_events WHERE date(timestamp) = date('now')`, [], (err, todayRow) => {
    if (err) return res.status(500).json({ error: err.message });
    db.get(`SELECT AVG(spoons) as avg FROM health_events WHERE spoons IS NOT NULL AND date(timestamp) >= date('now', '-7 days')`, [], (err, avgRow) => {
      if (err) return res.status(500).json({ error: err.message });
      db.get(`SELECT AVG(spoons) as avg3d FROM health_events WHERE spoons IS NOT NULL AND date(timestamp) >= date('now', '-3 days')`, [], (err, recentRow) => {
        if (err) return res.status(500).json({ error: err.message });
        db.get(`SELECT AVG(spoons) as avg7d FROM health_events WHERE spoons IS NOT NULL AND date(timestamp) >= date('now', '-7 days') AND date(timestamp) < date('now', '-3 days')`, [], (err, olderRow) => {
          if (err) return res.status(500).json({ error: err.message });
          const recent = recentRow?.avg3d || 0;
          const older = olderRow?.avg7d || 0;
          let trend = 'stable';
          if (recent > older + 1) trend = 'improving';
          else if (recent < older - 1) trend = 'declining';
          res.json({
            today: todayRow?.today || 0,
            avgSpoons: avgRow?.avg ? parseFloat(avgRow.avg).toFixed(1) : '--',
            trend: trend
          });
        });
      });
    });
  });
});

// Health trend (7-day)
app.get('/api/health/trend', (req, res) => {
  db.all(`
    SELECT date(timestamp) as date, AVG(spoons) as avgSpoons, COUNT(*) as count
    FROM health_events
    WHERE spoons IS NOT NULL AND date(timestamp) >= date('now', '-7 days')
    GROUP BY date(timestamp)
    ORDER BY date(timestamp)
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => ({
      date: r.date,
      avgSpoons: parseFloat(r.avgSpoons).toFixed(1),
      count: r.count
    })));
  });
});

// Event types
app.get('/api/health/types', (req, res) => {
  db.all(`SELECT event_type, COUNT(*) as count FROM health_events GROUP BY event_type ORDER BY count DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/health', (req, res) => {
  const { event_type, label, severity, spoons, notes, source, agent_id } = req.body;
  db.run(
    `INSERT INTO health_events (event_type, label, severity, spoons, notes, source, agent_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [event_type, label, severity ?? null, spoons ?? null, notes || '', source || 'manual', agent_id || null],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const event = { id: this.lastID, event_type, label, severity, spoons, notes, source, agent_id, timestamp: new Date().toISOString() };
      broadcast({ type: 'health', data: event });
      res.json(event);
    }
  );
});

// --- Cron ---
app.get('/api/cron/status', (req, res) => {
  db.get(`SELECT * FROM cron_snapshots ORDER BY timestamp DESC LIMIT 1`, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || { note: 'No cron snapshot recorded yet' });
  });
});

// Cron jobs detail
app.get('/api/cron/jobs', (req, res) => {
  db.get(`SELECT details FROM cron_snapshots ORDER BY timestamp DESC LIMIT 1`, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || !row.details) return res.json([]);
    try {
      const jobs = JSON.parse(row.details);
      res.json(Array.isArray(jobs) ? jobs : []);
    } catch (e) {
      res.json([]);
    }
  });
});

app.post('/api/cron/snapshot', (req, res) => {
  const { total_jobs, enabled_jobs, failed_jobs, last_failure, details } = req.body;
  db.run(
    `INSERT INTO cron_snapshots (total_jobs, enabled_jobs, failed_jobs, last_failure, details)
     VALUES (?, ?, ?, ?, ?)`,
    [total_jobs ?? null, enabled_jobs ?? null, failed_jobs ?? null, last_failure || null, details ? JSON.stringify(details) : null],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const snap = { id: this.lastID, total_jobs, enabled_jobs, failed_jobs, last_failure, details, timestamp: new Date().toISOString() };
      broadcast({ type: 'cron', data: snap });
      res.json(snap);
    }
  );
});

// --- Messages ---
app.get('/api/messages', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  db.all(`SELECT * FROM messages ORDER BY timestamp DESC LIMIT ?`, [limit], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/messages', (req, res) => {
  const { from_agent, to_agent, channel, content, kind } = req.body;
  db.run(
    `INSERT INTO messages (from_agent, to_agent, channel, content, kind)
     VALUES (?, ?, ?, ?, ?)`,
    [from_agent, to_agent, channel || null, content, kind || 'chat'],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const msg = { id: this.lastID, from_agent, to_agent, channel, content, kind, timestamp: new Date().toISOString() };
      broadcast({ type: 'message', data: msg });
      res.json(msg);
    }
  );
});

// --- Tasks ---
app.get('/api/tasks', (req, res) => {
  db.all(`SELECT * FROM tasks ORDER BY CASE status WHEN 'open' THEN 1 WHEN 'assigned' THEN 2 WHEN 'in_progress' THEN 3 WHEN 'blocked' THEN 4 WHEN 'done' THEN 5 ELSE 6 END, due_date`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description, assigned_to, requested_by, due_date } = req.body;
  db.run(
    `INSERT INTO tasks (title, description, status, assigned_to, requested_by, due_date)
     VALUES (?, ?, 'open', ?, ?, ?)`,
    [title, description || '', assigned_to || null, requested_by || null, due_date || null],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const task = { id: this.lastID, title, description, status: 'open', assigned_to, requested_by, due_date, timestamp: new Date().toISOString() };
      broadcast({ type: 'task', data: task });
      res.json(task);
    }
  );
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updates = [];
  const values = [];
  for (const [key, val] of Object.entries(req.body)) {
    if (['status','assigned_to','result','completed_at'].includes(key)) {
      updates.push(`${key} = ?`);
      values.push(val);
    }
  }
  if (updates.length === 0) return res.status(400).json({ error: 'No valid fields to update' });
  values.push(id);
  db.run(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    broadcast({ type: 'task', data: { id, ...req.body } });
    res.json({ id, changes: this.changes });
  });
});

// --- Files ---
const WORKSPACE = path.resolve('/home/karen/.openclaw/workspace');

app.get('/api/files', (req, res) => {
  const dir = req.query.dir || '.';
  const base = WORKSPACE;
  const target = path.resolve(path.join(base, dir));
  if (!target.startsWith(base)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const entries = fs.readdirSync(target, { withFileTypes: true });
    const files = entries.map(e => ({
      name: e.name,
      isDirectory: e.isDirectory(),
      isFile: e.isFile()
    }));
    res.json({ path: dir, files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/files/read', (req, res) => {
  const filePath = req.query.path;
  if (!filePath) return res.status(400).json({ error: 'Missing path' });
  const base = WORKSPACE;
  const target = path.resolve(path.join(base, filePath));
  if (!target.startsWith(base)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const content = fs.readFileSync(target, 'utf8');
    res.json({ path: filePath, content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Status ---
app.get('/api/status', async (req, res) => {
  // Get system stats
  const os = require('os');
  const fs = require('fs');
  
  // Memory
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  
  // Disk
  let diskInfo = { total: 0, used: 0, available: 0 };
  try {
    const df = require('child_process').execSync('df -B1 / | tail -1').toString().trim().split(/\s+/);
    diskInfo = {
      total: parseInt(df[1]),
      used: parseInt(df[2]),
      available: parseInt(df[3])
    };
  } catch (e) {}
  
  // Load average
  const loadAvg = os.loadavg();
  
  // Get live cron count
  let cronCount = 0;
  try {
    const cronOutput = require('child_process').execSync('openclaw cron list 2>/dev/null | grep -c "ok\\|failed" || echo 0').toString().trim();
    cronCount = parseInt(cronOutput) || 0;
  } catch (e) {}
  
  // Get agent heartbeats
  const agents = await new Promise((resolve, reject) => {
    db.all(`SELECT id, name, last_heartbeat, status FROM agents ORDER BY last_heartbeat DESC`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  
  // Check which agents are stale (>30 min)
  const now = Date.now();
  const agentStatus = agents.map(a => {
    const lastBeat = a.last_heartbeat ? new Date(a.last_heartbeat).getTime() : 0;
    const minsAgo = lastBeat ? Math.floor((now - lastBeat) / 60000) : null;
    return {
      id: a.id,
      name: a.name,
      status: minsAgo !== null && minsAgo < 30 ? 'online' : minsAgo !== null && minsAgo < 120 ? 'stale' : 'offline',
      minsAgo: minsAgo
    };
  });
  
  res.json({
    uptime: process.uptime(),
    clients: clients.size,
    db: DB_PATH,
    port: PORT,
    system: {
      memory: {
        total: Math.round(totalMem / 1024 / 1024),
        used: Math.round(usedMem / 1024 / 1024),
        free: Math.round(freeMem / 1024 / 1024),
        percent: Math.round((usedMem / totalMem) * 100)
      },
      disk: {
        total: Math.round(diskInfo.total / 1024 / 1024),
        used: Math.round(diskInfo.used / 1024 / 1024),
        available: Math.round(diskInfo.available / 1024 / 1024),
        percent: diskInfo.total ? Math.round((diskInfo.used / diskInfo.total) * 100) : 0
      },
      load: loadAvg,
      hostname: os.hostname(),
      platform: os.platform()
    },
    cron: {
      liveCount: cronCount,
      lastSnapshot: null
    },
    agents: agentStatus
  });
});

app.listen(PORT, () => {
  console.log(`Agent dashboard running on port ${PORT}`);
});
