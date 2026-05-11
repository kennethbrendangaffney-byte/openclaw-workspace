#!/bin/bash
# Agent Mesh Dashboard — Bootstrap Script
# Run this on Karen's machine to scaffold the full dashboard

set -e

DASHBOARD_DIR="$HOME/.openclaw/dashboard"
DATA_DIR="$DASHBOARD_DIR/data"
PUBLIC_DIR="$DASHBOARD_DIR/public"
SYSTEMD_DIR="$HOME/.config/systemd/user"

PORT="${DASHBOARD_PORT:-3456}"

echo "🦞 Agent Mesh Dashboard Bootstrap"
echo "================================"
echo ""

# Check prerequisites
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node 18+ first."
    exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VER found. Need 18+."
    exit 1
fi

echo "✅ Node.js $(node -v)"
echo "✅ Port $PORT"
echo ""

# Create directories
mkdir -p "$DASHBOARD_DIR" "$DATA_DIR" "$PUBLIC_DIR" "$SYSTEMD_DIR"

# Write package.json
cat > "$DASHBOARD_DIR/package.json" << 'PKG_EOF'
{
  "name": "agent-mesh-dashboard",
  "version": "1.0.0",
  "description": "Local dashboard for the Kenneth agent mesh",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "better-sqlite3": "^9.4.3"
  }
}
PKG_EOF

# Write server.js
cat > "$DASHBOARD_DIR/server.js" << 'SRV_EOF'
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const PORT = process.env.DASHBOARD_PORT || 3456;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'mesh.db');
const WORKSPACE = process.env.OPENCLAW_WORKSPACE || path.join(require('os').homedir(), '.openclaw', 'workspace');

// Ensure data dir exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Init SQLite
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// --- Schema ---
db.exec(`
CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  status TEXT DEFAULT 'unknown',
  last_seen TEXT,
  last_heartbeat TEXT,
  credits_remaining INTEGER,
  credit_burn_rate REAL,
  model TEXT,
  host TEXT,
  endpoint TEXT
);

CREATE TABLE IF NOT EXISTS health_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  event_type TEXT NOT NULL,
  label TEXT NOT NULL,
  severity INTEGER,
  spoons INTEGER,
  notes TEXT,
  source TEXT DEFAULT 'manual',
  agent_id TEXT
);

CREATE TABLE IF NOT EXISTS cron_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  total_jobs INTEGER,
  enabled_jobs INTEGER,
  failed_jobs INTEGER,
  last_failure TEXT,
  details TEXT
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  from_agent TEXT,
  to_agent TEXT,
  channel TEXT,
  content TEXT,
  kind TEXT DEFAULT 'text'
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  assigned_to TEXT,
  requested_by TEXT,
  due_date TEXT,
  completed_at TEXT,
  result TEXT
);
`);

// Seed default agents if empty
const agentCount = db.prepare('SELECT COUNT(*) as c FROM agents').get().c;
if (agentCount === 0) {
  const insert = db.prepare('INSERT INTO agents (id, name, role, host, model) VALUES (?, ?, ?, ?, ?)');
  insert.run('karen', 'Karen', 'hands', 'local', 'qwen3.5:4b');
  insert.run('kc', 'KC', 'brain', 'cloud-kimi', 'kimi-k2p6');
  insert.run('maxi', 'Maxi', 'lens', 'cloud-minimax', 'maxi');
  insert.run('maya', 'Maya', 'student', 'cloud-minimax', 'maxhermes');
  insert.run('ken', 'Ken', 'human', 'local', 'human');
}

// --- Express ---
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// SSE clients
const clients = new Set();

function broadcast(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    res.write(payload);
  }
}

// --- API Routes ---

// SSE stream
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  clients.add(res);
  req.on('close', () => clients.delete(res));
});

// Agents
app.get('/api/agents', (req, res) => {
  const rows = db.prepare('SELECT * FROM agents ORDER BY host, name').all();
  res.json(rows);
});

app.post('/api/agents/:id/heartbeat', (req, res) => {
  const now = new Date().toISOString();
  db.prepare('UPDATE agents SET last_heartbeat = ?, last_seen = ?, status = ? WHERE id = ?')
    .run(now, now, req.body.status || 'online', req.params.id);
  broadcast('agent_status', { id: req.params.id, status: req.body.status || 'online', time: now });
  res.json({ ok: true });
});

// Health
app.get('/api/health', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const from = req.query.from || '1970-01-01';
  const to = req.query.to || '9999-12-31';
  const rows = db.prepare(
    'SELECT * FROM health_events WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp DESC LIMIT ?'
  ).all(from, to, limit);
  res.json(rows);
});

app.post('/api/health', (req, res) => {
  const { event_type, label, severity, spoons, notes, source, agent_id } = req.body;
  const result = db.prepare(
    'INSERT INTO health_events (event_type, label, severity, spoons, notes, source, agent_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(event_type, label, severity || null, spoons || null, notes || null, source || 'manual', agent_id || null);
  const event = db.prepare('SELECT * FROM health_events WHERE id = ?').get(result.lastInsertRowid);
  broadcast('new_health_event', event);
  res.json(event);
});

app.get('/api/health/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const rows = db.prepare("SELECT * FROM health_events WHERE date(timestamp) = ? ORDER BY timestamp DESC").all(today);
  const spoons = rows.filter(r => r.spoons !== null).map(r => r.spoons);
  const avgSpoons = spoons.length ? (spoons.reduce((a, b) => a + b, 0) / spoons.length).toFixed(1) : null;
  res.json({ date: today, events: rows, eventCount: rows.length, avgSpoons });
});

app.get('/api/health/labels', (req, res) => {
  const rows = db.prepare('SELECT DISTINCT label FROM health_events ORDER BY label').all();
  res.json(rows.map(r => r.label));
});

// Cron
app.get('/api/cron/status', (req, res) => {
  // Run openclaw cron list and parse
  exec('openclaw cron list 2>/dev/null || echo "[]"', { cwd: WORKSPACE }, (err, stdout) => {
    if (err) return res.json({ error: true, details: err.message });
    try {
      const jobs = JSON.parse(stdout);
      res.json({ total: jobs.length, enabled: jobs.filter(j => j.enabled).length, jobs });
    } catch {
      res.json({ total: 0, enabled: 0, jobs: [], raw: stdout });
    }
  });
});

app.post('/api/cron/snapshot', (req, res) => {
  const { total_jobs, enabled_jobs, failed_jobs, last_failure, details } = req.body;
  db.prepare('INSERT INTO cron_snapshots (total_jobs, enabled_jobs, failed_jobs, last_failure, details) VALUES (?, ?, ?, ?, ?)')
    .run(total_jobs, enabled_jobs, failed_jobs, last_failure || null, JSON.stringify(details || {}));
  res.json({ ok: true });
});

// Tasks
app.get('/api/tasks', (req, res) => {
  const rows = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();
  res.json(rows);
});

app.post('/api/tasks', (req, res) => {
  const { title, description, assigned_to, requested_by, due_date } = req.body;
  const result = db.prepare('INSERT INTO tasks (title, description, assigned_to, requested_by, due_date) VALUES (?, ?, ?, ?, ?)')
    .run(title, description || null, assigned_to || null, requested_by || 'ken', due_date || null);
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  broadcast('task_update', task);
  res.json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { status, assigned_to, result: taskResult, completed_at } = req.body;
  db.prepare('UPDATE tasks SET status = COALESCE(?, status), assigned_to = COALESCE(?, assigned_to), result = COALESCE(?, result), completed_at = COALESCE(?, completed_at) WHERE id = ?')
    .run(status || null, assigned_to || null, taskResult || null, completed_at || null, req.params.id);
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  broadcast('task_update', task);
  res.json(task);
});

// Messages (bridge log)
app.get('/api/messages', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const agent = req.query.agent;
  let sql = 'SELECT * FROM messages';
  const params = [];
  if (agent) {
    sql += ' WHERE from_agent = ? OR to_agent = ?';
    params.push(agent, agent);
  }
  sql += ' ORDER BY timestamp DESC LIMIT ?';
  params.push(limit);
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

app.post('/api/messages', (req, res) => {
  const { from_agent, to_agent, channel, content, kind } = req.body;
  const result = db.prepare('INSERT INTO messages (from_agent, to_agent, channel, content, kind) VALUES (?, ?, ?, ?, ?)')
    .run(from_agent, to_agent || null, channel || 'bridge', content, kind || 'text');
  const msg = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
  broadcast('new_message', msg);
  res.json(msg);
});

// Files / Workspace
app.get('/api/files', (req, res) => {
  const dir = req.query.dir || '';
  const target = path.join(WORKSPACE, dir);
  if (!target.startsWith(WORKSPACE)) return res.status(403).json({ error: 'Forbidden' });
  try {
    const entries = fs.readdirSync(target, { withFileTypes: true });
    const files = entries.map(e => ({
      name: e.name,
      type: e.isDirectory() ? 'dir' : 'file',
      path: path.join(dir, e.name).replace(/\\/g, '/')
    }));
    res.json({ path: dir, files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/files/:path(*)', (req, res) => {
  const target = path.join(WORKSPACE, req.params.path);
  if (!target.startsWith(WORKSPACE)) return res.status(403).json({ error: 'Forbidden' });
  try {
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      return res.redirect('/api/files?dir=' + encodeURIComponent(req.params.path));
    }
    const content = fs.readFileSync(target, 'utf-8');
    res.json({ path: req.params.path, content, size: stat.size });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Git status
app.get('/api/git/status', (req, res) => {
  exec('git status --short && echo "---BRANCH---" && git branch --show-current', { cwd: WORKSPACE }, (err, stdout) => {
    if (err) return res.json({ error: true, details: err.message });
    const parts = stdout.split('---BRANCH---');
    res.json({
      branch: (parts[1] || '').trim(),
      changes: (parts[0] || '').trim().split('\n').filter(l => l.trim()),
      dirty: !!(parts[0] || '').trim()
    });
  });
});

// Workspace summary
app.get('/api/workspace', (req, res) => {
  try {
    const memoryDir = path.join(WORKSPACE, 'memory');
    const days = fs.readdirSync(memoryDir).filter(f => f.endsWith('.md')).sort().reverse().slice(0, 7);
    res.json({ recentDays: days });
  } catch {
    res.json({ recentDays: [] });
  }
});

// Start
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🦞 Mesh Dashboard live at http://127.0.0.1:${PORT}`);
  console.log(`   Data: ${DB_PATH}`);
  console.log(`   Workspace: ${WORKSPACE}`);
});
SRV_EOF

# Write systemd service
cat > "$SYSTEMD_DIR/mesh-dashboard.service" << "UNIT_EOF"
[Unit]
Description=Agent Mesh Dashboard
After=network.target

[Service]
Type=simple
ExecStart=%h/.openclaw/dashboard/server.js
WorkingDirectory=%h/.openclaw/dashboard
Environment=DASHBOARD_PORT=${PORT}
Environment=OPENCLAW_WORKSPACE=%h/.openclaw/workspace
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
UNIT_EOF

# Fix ExecStart to use node
sed -i "s|ExecStart=%h/.openclaw/dashboard/server.js|ExecStart=/usr/bin/env node %h/.openclaw/dashboard/server.js|" "$SYSTEMD_DIR/mesh-dashboard.service"

echo ""
echo "📦 Installing dependencies..."
cd "$DASHBOARD_DIR" && npm install

echo ""
echo "🚀 Starting dashboard..."
node server.js &
DASH_PID=$!
sleep 2

if kill -0 $DASH_PID 2>/dev/null; then
    echo "✅ Dashboard running on PID $DASH_PID"
    echo "   Local: http://127.0.0.1:${PORT}"
    echo ""
    echo "💡 To enable auto-start:"
    echo "   systemctl --user daemon-reload"
    echo "   systemctl --user enable mesh-dashboard"
    echo "   systemctl --user start mesh-dashboard"
else
    echo "❌ Dashboard failed to start. Check logs above."
    exit 1
fi

echo ""
echo "🎉 Done! Next: copy the frontend files (index.html, app.js, style.css) into $PUBLIC_DIR"
