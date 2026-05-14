const API = '';
let currentDir = '.';
let selectedSpoons = null;
let selectedSeverity = null;

// --- Tabs ---
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`panel-${tab.dataset.tab}`).classList.add('active');
    const tabName = tab.dataset.tab;
    if (tabName === 'files') loadFiles(currentDir);
    if (tabName === 'status') loadStatus();
    if (tabName === 'tasks') loadTasks();
    if (tabName === 'cron') loadCron();
    if (tabName === 'agents') loadAgents();
    if (tabName === 'health') { loadEvents(); loadHealthStats(); loadTrend(); }
  });
});

// --- Clock ---
setInterval(() => {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' });
}, 1000);

// --- Spoon Meter ---
const spoonMeter = document.getElementById('spoon-meter');
for (let i = 0; i <= 12; i++) {
  const spoon = document.createElement('div');
  spoon.className = 'spoon';
  spoon.textContent = i;
  spoon.dataset.value = i;
  if (i === 0) spoon.classList.add('crashed');
  spoon.addEventListener('click', () => {
    selectedSpoons = i;
    document.querySelectorAll('.spoon').forEach(s => s.classList.remove('active'));
    spoon.classList.add('active');
  });
  spoonMeter.appendChild(spoon);
}

// --- Severity Selector ---
function selectSeverity(sev) {
  selectedSeverity = sev;
  document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.severity-btn[data-sev="${sev}"]`).classList.add('active');
}

// --- Quick Log ---
async function quickLog(type, label, severity) {
  const body = {
    event_type: type,
    label: label,
    severity: severity,
    spoons: selectedSpoons,
    notes: '',
    source: 'quick'
  };
  const res = await fetch(`${API}/api/health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (res.ok) {
    loadEvents();
    loadHealthStats();
    loadTrend();
    loadLabels();
  }
}

// --- Health Form ---
document.getElementById('health-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    event_type: document.getElementById('event-type').value,
    label: document.getElementById('event-label').value,
    severity: selectedSeverity,
    spoons: selectedSpoons,
    notes: document.getElementById('notes').value,
    source: 'manual'
  };
  const res = await fetch(`${API}/api/health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (res.ok) {
    e.target.reset();
    selectedSpoons = null;
    selectedSeverity = null;
    document.querySelectorAll('.spoon').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active'));
    loadEvents();
    loadHealthStats();
    loadTrend();
    loadLabels();
  }
});

// --- Load Events ---
async function loadEvents() {
  const res = await fetch(`${API}/api/health`);
  const events = await res.json();
  const list = document.getElementById('event-list');
  if (events.length === 0) {
    list.innerHTML = '<div style="color:var(--text-dim);padding:12px">No events yet</div>';
    return;
  }
  list.innerHTML = events.map(ev => {
    const typeEmoji = {
      seizure: '🧠', aura: '⚡', medication: '💊', sleep: '😴',
      mood: '😊', pain: '🤕', symptom: '⚠️', appointment: '📅', note: '📝'
    };
    const emoji = typeEmoji[ev.event_type] || '•';
    return `
      <div class="event-item">
        <div class="event-time">${new Date(ev.timestamp).toLocaleString('en-IE')}</div>
        <div>
          <span style="margin-right:4px">${emoji}</span>
          <span class="event-label">${ev.label || ev.event_type}</span>
          ${ev.severity ? `<span style="color:var(--text-dim)"> · ${ev.severity}/5</span>` : ''}
          ${ev.spoons !== null ? `<span class="spoon-tag ${ev.spoons > 6 ? 'spoon-high' : 'spoon-low'}">${ev.spoons} spoons</span>` : ''}
        </div>
        ${ev.notes ? `<div style="color:var(--text-dim);margin-top:4px;font-size:0.8rem">${ev.notes}</div>` : ''}
      </div>
    `;
  }).join('');
}

// --- Health Stats ---
async function loadHealthStats() {
  const res = await fetch(`${API}/api/health/stats`);
  const stats = await res.json();
  document.getElementById('stat-today').textContent = stats.today || 0;
  document.getElementById('stat-avg').textContent = stats.avgSpoons || '--';
  document.getElementById('stat-trend').textContent = stats.trend || '--';
}

// --- Spoon Trend ---
async function loadTrend() {
  const res = await fetch(`${API}/api/health/trend`);
  const data = await res.json();
  const chart = document.getElementById('spoon-trend');
  if (data.length === 0) {
    chart.innerHTML = '<div style="color:var(--text-dim);text-align:center;padding-top:30px">No data yet</div>';
    return;
  }
  const maxSpoons = 12;
  const bars = data.map((d, i) => {
    const height = (d.avgSpoons / maxSpoons) * 80;
    const day = new Date(d.date).toLocaleDateString('en-IE', { weekday: 'short' });
    return `
      <div class="trend-bar" style="left:${(i / data.length) * 100}%;height:${height}px" title="${day}: ${d.avgSpoons} spoons (${d.count} events)">
      </div>
    `;
  }).join('');
  chart.innerHTML = `<div class="trend-line">${bars}</div>`;
}

// --- Event Types ---
async function loadEventTypes() {
  const res = await fetch(`${API}/api/health/types`);
  const types = await res.json();
  const container = document.getElementById('event-types');
  if (types.length === 0) {
    container.innerHTML = 'No events logged';
    return;
  }
  container.innerHTML = types.map(t => `
    <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border)"
      <span>${t.event_type}</span>
      <span style="color:var(--text-dim)">${t.count}</span>
    </div>
  `).join('');
}

// --- Export CSV ---
async function exportHealth() {
  const res = await fetch(`${API}/api/health?limit=1000`);
  const events = await res.json();
  const csv = [
    'timestamp,event_type,label,severity,spoons,notes,source',
    ...events.map(e => 
      `"${e.timestamp}","${e.event_type}","${e.label || ''}",${e.severity || ''},${e.spoons || ''},"${e.notes || ''}","${e.source || ''}"`
    )
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `health-export-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Health Labels ---
async function loadLabels() {
  const res = await fetch(`${API}/api/health/labels`);
  const labels = await res.json();
  const datalist = document.getElementById('label-suggestions');
  datalist.innerHTML = labels.map(l => `<option value="${l}">`).join('');
}

// --- Tasks ---
document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    title: document.getElementById('task-title').value,
    description: document.getElementById('task-desc').value,
    assigned_to: document.getElementById('task-assigned').value,
    requested_by: document.getElementById('task-requester').value,
    due_date: document.getElementById('task-due').value || null
  };
  const res = await fetch(`${API}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (res.ok) {
    e.target.reset();
    loadTasks();
  }
});

async function loadTasks() {
  const res = await fetch(`${API}/api/tasks`);
  const tasks = await res.json();
  const list = document.getElementById('task-list');
  if (tasks.length === 0) {
    list.innerHTML = '<div style="color:var(--text-dim);padding:12px">No tasks yet</div>';
    return;
  }
  list.innerHTML = tasks.map(t => {
    const statusClass = `status-${t.status}`;
    const isDone = t.status === 'done';
    return `
      <div class="task-item">
        <span class="status-dot ${statusClass}"></span>
        <span class="task-title" style="${isDone ? 'text-decoration:line-through;color:var(--text-dim)' : ''}">${t.title}</span>
        <div class="task-time">${t.assigned_to ? '→ ' + t.assigned_to : ''} ${t.status} ${t.due_date ? '· due ' + t.due_date : ''}</div>
        ${t.description ? `<div style="color:var(--text-dim);margin-top:4px;font-size:0.8rem">${t.description}</div>` : ''}
        <div class="task-actions">
          ${!isDone ? `<button onclick="toggleTask(${t.id}, 'done')">Mark done</button>` : `<button onclick="toggleTask(${t.id}, 'open')">Reopen</button>`}
          ${t.status === 'open' ? `<button onclick="toggleTask(${t.id}, 'in_progress')">Start</button>` : ''}
          ${t.status === 'in_progress' ? `<button onclick="toggleTask(${t.id}, 'blocked')">Block</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

async function toggleTask(id, status) {
  const res = await fetch(`${API}/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, completed_at: status === 'done' ? new Date().toISOString() : null })
  });
  if (res.ok) loadTasks();
}

// --- Cron ---
async function loadCron() {
  const statusRes = await fetch(`${API}/api/cron/status`);
  const status = await statusRes.json();
  const current = document.getElementById('cron-current');
  if (status.note) {
    current.innerHTML = `<div style="color:var(--text-dim);padding:8px">${status.note}</div>`;
  } else {
    const healthy = (status.failed_jobs || 0) === 0;
    current.innerHTML = `
      <div style="font-size:1.1rem;margin-bottom:8px">
        <span class="${healthy ? 'cron-ok' : 'cron-fail'}">●</span>
        ${healthy ? 'All jobs healthy' : `${status.failed_jobs} failed`}
      </div>
      <div style="color:var(--text-dim);font-size:0.875rem">
        ${status.enabled_jobs || 0} / ${status.total_jobs || 0} jobs enabled
        ${status.last_failure ? `<br>Last failure: ${new Date(status.last_failure).toLocaleString('en-IE')}` : ''}
      </div>
    `;
  }

  // Job details
  const jobsRes = await fetch(`${API}/api/cron/jobs`);
  const jobs = await jobsRes.json();
  const jobsContainer = document.getElementById('cron-jobs');
  if (jobs.length === 0) {
    jobsContainer.innerHTML = '<div style="color:var(--text-dim)">No job details available</div>';
  } else {
    jobsContainer.innerHTML = jobs.map(j => {
      const statusColor = j.status === 'ok' ? 'var(--accent)' : j.status === 'failed' ? 'var(--danger)' : 'var(--warn)';
      return `
        <div style="padding:8px;border-bottom:1px solid var(--border)"
          <div style="display:flex;justify-content:space-between"
            <span style="font-weight:500">${j.name}</span>
            <span style="color:${statusColor}">${j.status}</span>
          </div>
          <div style="color:var(--text-dim);font-size:0.75rem"
            ${j.schedule} · Next: ${j.next || 'unknown'}
          </div>
        </div>
      `;
    }).join('');
  }

  // History
  const list = document.getElementById('cron-list');
  list.innerHTML = status.timestamp ? `
    <div class="cron-item">
      <div class="event-time">${new Date(status.timestamp).toLocaleString('en-IE')}</div>
      <span>${status.enabled_jobs || 0} enabled · ${status.failed_jobs || 0} failed · ${status.total_jobs || 0} total</span>
    </div>
  ` : '<div style="color:var(--text-dim);padding:12px">No snapshots yet</div>';
}

// --- Agents ---
async function loadAgents() {
  const res = await fetch(`${API}/api/agents`);
  const agents = await res.json();
  const list = document.getElementById('agent-list');
  if (agents.length === 0) {
    list.innerHTML = '<div style="color:var(--text-dim);padding:12px">No agents registered</div>';
    return;
  }
  list.innerHTML = agents.map(a => {
    const lastSeen = a.last_seen ? new Date(a.last_seen) : null;
    const minsAgo = lastSeen ? Math.floor((Date.now() - lastSeen) / 60000) : null;
    const statusColor = minsAgo !== null && minsAgo < 30 ? 'var(--accent)' : minsAgo !== null && minsAgo < 120 ? 'var(--warn)' : 'var(--danger)';
    const statusText = minsAgo !== null && minsAgo < 30 ? 'Online' : minsAgo !== null && minsAgo < 120 ? 'Stale' : 'Offline';
    return `
      <div style="padding:12px;border-bottom:1px solid var(--border)"
        <div style="display:flex;justify-content:space-between;align-items:center"
          <div>
            <span style="font-weight:500;font-size:1rem"
              ${a.name || a.id}
            </span>
            <span style="color:var(--text-dim);font-size:0.8rem;margin-left:8px"
              ${a.role || ''}
            </span>
          </div>
          <span style="color:${statusColor};font-size:0.875rem"
            ● ${statusText}
          </span>
        </div>
        <div style="color:var(--text-dim);font-size:0.75rem;margin-top:4px"
          ${lastSeen ? `Last seen: ${minsAgo}m ago` : 'Never seen'}
          ${a.credits_remaining ? ` · ${a.credits_remaining} credits` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// --- File Explorer ---
async function loadFiles(dir) {
  currentDir = dir;
  const res = await fetch(`${API}/api/files?dir=${encodeURIComponent(dir)}`);
  const data = await res.json();
  const tree = document.getElementById('file-tree');
  let html = dir !== '.' ? `<div class="file-item" onclick="loadFiles('${dir.split('/').slice(0, -1).join('/') || '.'}')">..</div>` : '';
  html += data.files.map(f => `<div class="file-item ${f.isDirectory ? 'dir' : ''}" onclick="${f.isDirectory ? `loadFiles('${dir === '.' ? f.name : dir + '/' + f.name}')` : `previewFile('${dir === '.' ? f.name : dir + '/' + f.name}')`}">${f.isDirectory ? '[D]' : '[F]'} ${f.name}</div>`).join('');
  tree.innerHTML = html;
}

async function previewFile(filePath) {
  const res = await fetch(`${API}/api/files/read?path=${encodeURIComponent(filePath)}`);
  const data = await res.json();
  document.getElementById('file-preview').textContent = data.content || data.error || 'Empty file';
}

// --- Status ---
async function loadStatus() {
  const res = await fetch(`${API}/api/status`);
  const data = await res.json();
  const sys = data.system;
  
  let html = `
    <div style="margin-bottom:16px">
      <div style="font-size:1.1rem;font-weight:600;margin-bottom:8px"
Karen Dashboard v2</div>
      <div style="color:var(--text-dim);font-size:0.875rem"
Uptime: ${Math.floor(data.uptime / 60)}m · Clients: ${data.clients}</div>
    </div>
    
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:16px"
      <div class="stat-box"
        <div class="stat-value" style="color:${sys.memory.percent > 80 ? 'var(--danger)' : sys.memory.percent > 60 ? 'var(--warn)' : 'var(--accent)'}"
${sys.memory.percent}%</div>
        <div class="stat-label"
RAM · ${sys.memory.used}MB / ${sys.memory.total}MB</div>
      </div>
      <div class="stat-box"
        <div class="stat-value" style="color:${sys.disk.percent > 80 ? 'var(--danger)' : sys.disk.percent > 60 ? 'var(--warn)' : 'var(--accent)'}"
${sys.disk.percent}%</div>
        <div class="stat-label"
Disk · ${sys.disk.used}MB / ${sys.disk.total}MB</div>
      </div>
    </div>
    
    <div style="margin-bottom:16px"
      <div style="font-weight:500;margin-bottom:8px"
Load Average</div>
      <div style="display:flex;gap:12px"
        <div class="stat-box" style="flex:1"
          <div class="stat-value" style="font-size:1rem"
${data.system.load[0].toFixed(2)}</div>
          <div class="stat-label"
1m</div>
        </div>
        <div class="stat-box" style="flex:1"
          <div class="stat-value" style="font-size:1rem"
${data.system.load[1].toFixed(2)}</div>
          <div class="stat-label"
5m</div>
        </div>
        <div class="stat-box" style="flex:1"
          <div class="stat-value" style="font-size:1rem"
${data.system.load[2].toFixed(2)}</div>
          <div class="stat-label"
15m</div>
        </div>
      </div>
    </div>
    
    <div style="margin-bottom:16px"
      <div style="font-weight:500;margin-bottom:8px"
Agents</div>
      ${data.agents.map(a => `
        <div style="display:flex;justify-content:space-between;padding:8px;border-bottom:1px solid var(--border)"
          <span>${a.name || a.id}</span>
          <span style="color:${a.status === 'online' ? 'var(--accent)' : a.status === 'stale' ? 'var(--warn)' : 'var(--danger)'}"
● ${a.status}${a.minsAgo ? ` (${a.minsAgo}m ago)` : ''}</span>
        </div>
      `).join('')}
    </div>
    
    <div style="color:var(--text-dim);font-size:0.75rem"
      ${sys.hostname} · ${sys.platform} · Port ${data.port}
    </div>
  `;
  
  document.getElementById('status-output').innerHTML = html;
}

// --- SSE ---
const es = new EventSource(`${API}/api/events`);
es.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  if (data.type === 'health') { loadEvents(); loadHealthStats(); loadTrend(); }
  if (data.type === 'task') loadTasks();
  if (data.type === 'cron') loadCron();
  if (data.type === 'agent') loadAgents();
};

// Init
loadEvents();
loadLabels();
loadHealthStats();
loadTrend();
