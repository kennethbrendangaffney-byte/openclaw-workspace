// Agent Mesh Dashboard — Frontend
// Vanilla JS, no build step, dark mode by default

const API = '/api';
let currentTab = 'status';
let eventSource = null;

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initSSE();
  showTab('status');
});

// --- SSE ---
function initSSE() {
  eventSource = new EventSource(`${API}/events`);
  eventSource.onopen = () => {
    document.getElementById('liveDot').classList.remove('offline');
  };
  eventSource.onerror = () => {
    document.getElementById('liveDot').classList.add('offline');
    setTimeout(initSSE, 5000);
  };
  eventSource.addEventListener('agent_status', e => {
    const data = JSON.parse(e.data);
    updateAgentCard(data);
  });
  eventSource.addEventListener('new_health_event', e => {
    const data = JSON.parse(e.data);
    prependHealthEvent(data);
    refreshSpoonGauge();
  });
  eventSource.addEventListener('task_update', e => {
    const data = JSON.parse(e.data);
    refreshTasks();
  });
}

// --- Tabs ---
function showTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  let panel = document.getElementById(`panel-${tab}`);
  if (!panel) {
    panel = document.createElement('div');
    panel.id = `panel-${tab}`;
    panel.className = 'panel active';
    document.getElementById('panels').appendChild(panel);
  }
  panel.classList.add('active');
  document.querySelector(`.nav-btn[data-tab="${tab}"]`).classList.add('active');

  // Load tab content
  switch(tab) {
    case 'status': loadStatus(panel); break;
    case 'health': loadHealth(panel); break;
    case 'tasks': loadTasks(panel); break;
    case 'files': loadFiles(panel); break;
  }
}

// --- Status Panel ---
async function loadStatus(container) {
  container.innerHTML = '<div class="loading">Loading agents...</div>';
  try {
    const res = await fetch(`${API}/agents`);
    const agents = await res.json();
    container.innerHTML = '<div class="card"><div class="card-header"><span class="card-title">Agents</span></div></div>';
    const card = container.querySelector('.card');
    agents.forEach(agent => {
      card.appendChild(renderAgentCard(agent));
    });
    // Workspace summary
    const wsRes = await fetch(`${API}/workspace`);
    const ws = await wsRes.json();
    card.innerHTML += `<div style="margin-top:12px;font-size:0.8rem;color:var(--text-secondary)">Recent memory: ${ws.recentDays.join(', ') || 'none'}</div>`;
  } catch (err) {
    container.innerHTML = `<div class="empty">Error loading agents: ${err.message}</div>`;
  }
}

function renderAgentCard(agent) {
  const div = document.createElement('div');
  div.className = 'agent-card';
  div.id = `agent-${agent.id}`;
  div.innerHTML = `
    <div class="agent-avatar">${agentAvatar(agent.id)}</div>
    <div class="agent-info">
      <div class="agent-name">${agent.name} <span class="agent-role">${agent.role}</span></div>
      <div class="agent-status">
        <span class="status-dot ${agent.status || 'unknown'}"></span>
        ${agent.status || 'unknown'} · ${timeAgo(agent.last_heartbeat)}
      </div>
    </div>
    <div class="agent-meta">
      ${agent.model ? `<div>${agent.model}</div>` : ''}
      ${agent.credits_remaining !== null ? `<div>${agent.credits_remaining} cr</div>` : ''}
    </div>
  `;
  return div;
}

function updateAgentCard(data) {
  const card = document.getElementById(`agent-${data.id}`);
  if (card) {
    const dot = card.querySelector('.status-dot');
    dot.className = `status-dot ${data.status}`;
    const statusText = card.querySelector('.agent-status');
    statusText.innerHTML = `<span class="status-dot ${data.status}"></span> ${data.status} · just now`;
  }
}

function agentAvatar(id) {
  const map = { karen: '🦞', kc: '🧠', maxi: '🔍', maya: '📚', ken: '👤' };
  return map[id] || '🤖';
}

function timeAgo(iso) {
  if (!iso) return 'never';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs/24)}d ago`;
}

// --- Health Panel ---
async function loadHealth(container) {
  container.innerHTML = '<div class="loading">Loading health data...</div>';
  try {
    const [todayRes, labelsRes, historyRes] = await Promise.all([
      fetch(`${API}/health/today`),
      fetch(`${API}/health/labels`),
      fetch(`${API}/health?limit=20`)
    ]);
    const today = await todayRes.json();
    const labels = await labelsRes.json();
    const history = await historyRes.json();

    container.innerHTML = '';

    // Spoon gauge
    const spoonPct = today.avgSpoons ? (today.avgSpoons / 12) * 100 : 0;
    const gaugeColor = spoonPct > 60 ? 'var(--success)' : spoonPct > 30 ? 'var(--warning)' : 'var(--danger)';
    container.innerHTML += `
      <div class="card">
        <div class="card-header"><span class="card-title">Spoons</span><span class="card-subtitle">${today.date}</span></div>
        <div class="spoon-gauge">
          <div class="spoon-circle" style="background: conic-gradient(${gaugeColor} 0%, ${gaugeColor} ${spoonPct}%, var(--surface-hover) ${spoonPct}%)">
            <div class="spoon-value">${today.avgSpoons || '—'}</div>
          </div>
          <div class="spoon-label">Average today<br>${today.eventCount} events</div>
        </div>
      </div>
    `;

    // Quick add
    container.innerHTML += `
      <div class="card">
        <div class="card-header"><span class="card-title">Log Event</span></div>
        <div class="quick-add">
          <input type="text" id="hl-label" list="hl-labels" placeholder="Symptom or note..." style="flex:2">
          <datalist id="hl-labels">${labels.map(l => `<option value="${l}">`).join('')}</datalist>
          <select id="hl-severity">
            <option value="">Severity</option>
            <option value="1">1 — Mild</option>
            <option value="2">2</option>
            <option value="3">3 — Moderate</option>
            <option value="4">4</option>
            <option value="5">5 — Severe</option>
          </select>
          <select id="hl-spoons">
            <option value="">Spoons</option>
            ${[12,11,10,9,8,7,6,5,4,3,2,1,0].map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
          <input type="text" id="hl-notes" placeholder="Notes (optional)" style="flex:2">
          <button class="btn" onclick="logHealth()">Add</button>
        </div>
      </div>
    `;

    // Timeline
    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    history.forEach(event => {
      timeline.appendChild(renderTimelineItem(event));
    });
    container.appendChild(timeline);
  } catch (err) {
    container.innerHTML = `<div class="empty">Error: ${err.message}</div>`;
  }
}

function renderTimelineItem(event) {
  const div = document.createElement('div');
  div.className = 'timeline-item';
  div.dataset.id = event.id;
  div.innerHTML = `
    <div class="timeline-dot severity-${event.severity || '1'}"></div>
    <div class="timeline-time">${new Date(event.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
    <div class="timeline-label">${event.label} <span class="timeline-spoons">${event.spoons !== null ? '🥄'.repeat(Math.min(event.spoons, 12)) : ''}</span></div>
    ${event.notes ? `<div class="timeline-note">${event.notes}</div>` : ''}
  `;
  return div;
}

function prependHealthEvent(event) {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  timeline.insertBefore(renderTimelineItem(event), timeline.firstChild);
}

async function refreshSpoonGauge() {
  const res = await fetch(`${API}/health/today`);
  const data = await res.json();
  // Re-render gauge if visible
  const panel = document.getElementById('panel-health');
  if (panel && panel.classList.contains('active')) {
    loadHealth(panel);
  }
}

async function logHealth() {
  const label = document.getElementById('hl-label').value;
  const severity = document.getElementById('hl-severity').value;
  const spoons = document.getElementById('hl-spoons').value;
  const notes = document.getElementById('hl-notes').value;
  if (!label) return toast('Enter a label');

  const res = await fetch(`${API}/health`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_type: 'symptom', label, severity: severity || null, spoons: spoons || null, notes: notes || null })
  });
  if (res.ok) {
    toast('Logged ✓');
    document.getElementById('hl-label').value = '';
    document.getElementById('hl-severity').value = '';
    document.getElementById('hl-spoons').value = '';
    document.getElementById('hl-notes').value = '';
  } else {
    toast('Failed to log');
  }
}

// --- Tasks Panel ---
async function loadTasks(container) {
  container.innerHTML = '<div class="loading">Loading tasks...</div>';
  try {
    const res = await fetch(`${API}/tasks`);
    const tasks = await res.json();
    container.innerHTML = '';

    // Add task form
    container.innerHTML += `
      <div class="card">
        <div class="card-header"><span class="card-title">New Task</span></div>
        <div class="quick-add">
          <input type="text" id="task-title" placeholder="What needs doing?" style="flex:2">
          <select id="task-assign">
            <option value="">Assign to...</option>
            <option value="karen">Karen</option>
            <option value="kc">KC</option>
            <option value="maxi">Maxi</option>
            <option value="maya">Maya</option>
          </select>
          <button class="btn" onclick="addTask()">Add</button>
        </div>
      </div>
    `;

    // Task list
    const list = document.createElement('div');
    if (tasks.length === 0) {
      list.innerHTML = '<div class="empty">No tasks yet</div>';
    } else {
      tasks.forEach(task => list.appendChild(renderTaskItem(task)));
    }
    container.appendChild(list);
  } catch (err) {
    container.innerHTML = `<div class="empty">Error: ${err.message}</div>`;
  }
}

function renderTaskItem(task) {
  const div = document.createElement('div');
  div.className = 'task-item';
  div.dataset.id = task.id;
  div.innerHTML = `
    <div class="task-status ${task.status}"></div>
    <div class="task-title">${task.title}</div>
    <div class="task-meta">${task.assigned_to || 'unassigned'} · ${task.status}</div>
  `;
  div.addEventListener('click', () => toggleTaskStatus(task.id, task.status));
  return div;
}

async function toggleTaskStatus(id, current) {
  const next = current === 'done' ? 'open' : 'done';
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: next, completed_at: next === 'done' ? new Date().toISOString() : null })
  });
  if (res.ok) {
    toast(next === 'done' ? 'Task done ✓' : 'Task reopened');
    refreshTasks();
  }
}

async function addTask() {
  const title = document.getElementById('task-title').value;
  const assigned = document.getElementById('task-assign').value;
  if (!title) return toast('Enter a title');
  const res = await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, assigned_to: assigned || null })
  });
  if (res.ok) {
    toast('Task added ✓');
    document.getElementById('task-title').value = '';
    refreshTasks();
  }
}

async function refreshTasks() {
  const panel = document.getElementById('panel-tasks');
  if (panel && panel.classList.contains('active')) {
    loadTasks(panel);
  }
}

// --- Files Panel ---
let currentPath = '';

async function loadFiles(container, path = '') {
  currentPath = path;
  container.innerHTML = '<div class="loading">Loading...</div>';
  try {
    const res = await fetch(`${API}/files?dir=${encodeURIComponent(path)}`);
    const data = await res.json();
    container.innerHTML = '';

    // Breadcrumb
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'card';
    breadcrumb.innerHTML = `<div class="card-title">${path || 'workspace'}</div>`;
    container.appendChild(breadcrumb);

    // File list
    const list = document.createElement('div');
    list.className = 'file-list';

    // Parent dir
    if (path) {
      const parent = document.createElement('div');
      parent.className = 'file-row';
      parent.innerHTML = '<span class="file-icon">⬆️</span><span class="file-name dir">..</span>';
      parent.addEventListener('click', () => {
        const parts = path.split('/').filter(Boolean);
        parts.pop();
        loadFiles(container, parts.join('/'));
      });
      list.appendChild(parent);
    }

    // Sort: dirs first
    const dirs = data.files.filter(f => f.type === 'dir');
    const files = data.files.filter(f => f.type === 'file');

    [...dirs, ...files].forEach(f => {
      const row = document.createElement('div');
      row.className = 'file-row';
      row.innerHTML = `
        <span class="file-icon">${f.type === 'dir' ? '📁' : '📄'}</span>
        <span class="file-name ${f.type}">${f.name}</span>
      `;
      row.addEventListener('click', () => {
        if (f.type === 'dir') {
          loadFiles(container, f.path);
        } else {
          viewFile(f.path);
        }
      });
      list.appendChild(row);
    });
    container.appendChild(list);
  } catch (err) {
    container.innerHTML = `<div class="empty">Error: ${err.message}</div>`;
  }
}

async function viewFile(filePath) {
  try {
    const res = await fetch(`${API}/files/${encodeURIComponent(filePath)}`);
    const data = await res.json();
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.8); z-index: 50;
      display: flex; align-items: center; justify-content: center;
      padding: var(--spacing);
    `;
    modal.innerHTML = `
      <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); width: 100%; max-width: 800px; max-height: 80vh; overflow: auto; padding: var(--spacing);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing);">
          <span style="font-weight: 600;">${data.path}</span>
          <button class="btn btn-secondary" onclick="this.closest('div[style*=\"position: fixed\"]').remove()">Close</button>
        </div>
        <pre style="white-space: pre-wrap; font-size: 0.85rem; color: var(--text); max-height: 60vh; overflow: auto;">${escapeHtml(data.content)}</pre>
      </div>
    `;
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
  } catch (err) {
    toast(`Error: ${err.message}`);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// --- Toast ---
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// --- Expose globals for inline onclick handlers ---
window.showTab = showTab;
window.logHealth = logHealth;
window.addTask = addTask;
