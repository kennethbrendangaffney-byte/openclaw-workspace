# Agent Mesh Dashboard — Architecture v1

## Overview

A single, always-on web dashboard running on Karen's local machine, accessible via Tailscale from Ken's phone/PC. Real-time agent status, health tracking, calendar, file access, cron management, and agent-to-agent messaging.

**Design philosophy:** KISS. This is not a microservices architecture. It's one Node process, one SQLite file, one HTML page. It should survive reboots, run on Karen's modest hardware, and not burn cloud credits.

---

## Stack

| Layer | Tech | Why |
|-------|------|-----|
| Runtime | Node.js 18+ | Karen already has it, lightweight |
| Backend | Express + SSE | No WebSocket complexity needed |
| Frontend | Vanilla JS + CSS | No build step, fast iteration |
| Database | SQLite (file-based) | Zero-config, survives reboots |
| Network | Tailscale Funnel (port 3456) | Already working, fully private |
| Process | systemd --user service | Auto-restart on boot, no root needed |
| Auth | Tailscale only | If you're on the tailnet, you're Ken |

---

## Directory Layout

```
~/.openclaw/dashboard/
├── server.js              # Express server + SSE broadcaster
├── package.json           # express, sqlite3, better-sqlite3 (optional)
├── systemd/
│   └── mesh-dashboard.service   # user service file
├── data/
│   └── mesh.db            # SQLite (auto-created on first run)
├── public/
│   ├── index.html         # Single-page app
│   ├── style.css          # Dark mode, mobile-first
│   └── app.js             # All frontend logic
└── ARCHITECTURE.md        # This file
```

---

## Database Schema (SQLite)

### agents
```sql
CREATE TABLE agents (
  id TEXT PRIMARY KEY,        -- 'karen', 'kc', 'maxi', 'maya'
  name TEXT NOT NULL,
  role TEXT,                  -- 'hands', 'brain', 'lens', 'student'
  status TEXT DEFAULT 'unknown', -- 'online', 'offline', 'idle', 'busy', 'error'
  last_seen TEXT,             -- ISO 8601
  last_heartbeat TEXT,
  credits_remaining INTEGER,  -- for cloud agents
  credit_burn_rate REAL,      -- per-message cost
  model TEXT,                 -- 'kimi-k2p6', 'qwen3.5:4b', etc.
  host TEXT,                  -- 'local', 'cloud-kimi', 'cloud-minimax'
  endpoint TEXT               -- bridge URL or gateway address
);
```

### health_events
```sql
CREATE TABLE health_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  event_type TEXT NOT NULL,   -- 'symptom', 'mood', 'medication', 'sleep', 'note', 'energy'
  label TEXT NOT NULL,        -- 'sore throat', 'anxiety spike', 'dizzy'
  severity INTEGER,           -- 1-5 (NULL for notes/meds)
  spoons INTEGER,             -- 0-12 (NULL if not reported)
  notes TEXT,
  source TEXT DEFAULT 'manual', -- 'manual', 'agent', 'cron'
  agent_id TEXT               -- which agent logged it (or NULL for manual)
);
```

### cron_snapshots
```sql
CREATE TABLE cron_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  total_jobs INTEGER,
  enabled_jobs INTEGER,
  failed_jobs INTEGER,
  last_failure TEXT,
  details TEXT                 -- JSON array of job statuses
);
```

### messages (agent-to-agent bridge log)
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT DEFAULT (datetime('now')),
  from_agent TEXT,
  to_agent TEXT,
  channel TEXT,               -- 'group-chat', 'dm', 'bridge', 'git'
  content TEXT,
  kind TEXT DEFAULT 'text'    -- 'text', 'command', 'status', 'alert'
);
```

### tasks
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open', -- 'open', 'assigned', 'in_progress', 'done', 'blocked'
  assigned_to TEXT,           -- agent id or NULL
  requested_by TEXT,          -- 'ken', 'kc', etc.
  due_date TEXT,
  completed_at TEXT,
  result TEXT                 -- brief outcome summary
);
```

---

## API Endpoints

### Agent Status
- `GET /api/agents` — list all agents with current status
- `POST /api/agents/:id/heartbeat` — update heartbeat timestamp
- `GET /api/agents/:id/status` — detailed status

### Health Timeline
- `GET /api/health?limit=50&from=...&to=...` — query events
- `POST /api/health` — log new event
- `GET /api/health/today` — today's summary (spoons used, symptoms)
- `GET /api/health/labels` — distinct labels for autocomplete

### Cron
- `GET /api/cron/status` — current cron job snapshot
- `POST /api/cron/snapshot` — store a snapshot (called by cron job)

### Messages
- `GET /api/messages?agent=...&limit=50` — query bridge/group chat history
- `POST /api/messages` — log a message (agents call this)

### Tasks
- `GET /api/tasks` — list all tasks
- `POST /api/tasks` — create new task
- `PATCH /api/tasks/:id` — update status/assignment

### Files / Workspace
- `GET /api/files` — list workspace directory tree
- `GET /api/files/:path` — read file content
- `GET /api/git/status` — git status of workspace

### SSE (Real-time)
- `GET /api/events` — Server-Sent Events stream
  - Events: `agent_status`, `new_health_event`, `new_message`, `task_update`

---

## Frontend Design

### Dark Mode Default
```css
:root {
  --bg: #0d1117;
  --surface: #161b22;
  --border: #30363d;
  --text: #c9d1d9;
  --text-secondary: #8b949e;
  --accent: #58a6ff;
  --success: #3fb950;
  --warning: #d29922;
  --danger: #f85149;
}
```

### Layout (Mobile-First)
```
+------------------+
|  Header (Agent   |
|   status bar)    |
+------------------+
|                  |
|   Main Panel     |
|   (tabbed)       |
|                  |
+------------------+
|  Bottom Nav      |
|  (4 tabs)        |
+------------------+
```

### Tabs (Phase 1)
1. **Status** — Agent cards, live heartbeat, credit burn
2. **Health** — Timeline, spoon counter, today's log
3. **Tasks** — Open tasks, who owns what, done list
4. **Files** — Workspace browser, git status, recent commits

### Key Interactions
- **Spoon counter:** Big circular gauge, tap to adjust, color shifts (green → yellow → red)
- **Health log:** Quick-add with + button, recent labels shown as chips
- **Agent cards:** Pulse animation for "online", grey for "offline", red for "error"
- **Task claim:** Tap to assign to agent, tap again to mark done

---

## Data Flow

### Agent Status Updates
```
Agent (KC/Karen) → POST /api/agents/:id/heartbeat
                   → Dashboard updates SQLite
                   → SSE broadcast to all connected clients
                   → Frontend refreshes agent card
```

### Health Event
```
Ken (or Agent) → POST /api/health
               → Dashboard inserts into health_events
               → SSE broadcast
               → Frontend adds to timeline + updates spoon gauge
```

### Cron Monitoring
```
Cron job runs → calls openclaw cron snapshot
              → POST /api/cron/snapshot
              → Dashboard stores in cron_snapshots
              → Frontend shows green/yellow/red indicator
```

---

## Security Model

**Network layer:** Tailscale handles everything. The dashboard binds to `127.0.0.1:3456` and Tailscale Funnel exposes it at `https://karen-eq.tail2e7d2c.ts.net:3456`. Only Ken's devices can reach it.

**Application layer:** No auth. If you're on the tailnet, you're trusted. KISS. If we ever need multi-user, add a simple token check later.

**No sensitive data in repo:** The dashboard code is open. The `mesh.db` file is local-only and gitignored. No tokens, no keys in the code.

---

## Deployment

### Karen's machine
```bash
cd ~/.openclaw/dashboard
npm install
node server.js   # manual start
# or
systemctl --user enable mesh-dashboard
systemctl --user start mesh-dashboard
```

### Auto-start on boot
```bash
# Install user service
cp systemd/mesh-dashboard.service ~/.config/systemd/user/
systemctl --user daemon-reload
systemctl --user enable mesh-dashboard
systemctl --user start mesh-dashboard
```

### Ken's access
Open browser on phone/PC:
- `https://karen-eq.tail2e7d2c.ts.net:3456`
- Add to home screen for "app-like" experience

---

## Phase Roadmap

### Phase 1 — Skeleton (Today)
- [ ] Express server with SSE
- [ ] SQLite schema + basic queries
- [ ] Frontend shell with 4 tabs
- [ ] Agent status panel
- [ ] Health timeline + spoon counter
- [ ] Manual health entry form

### Phase 2 — Live Data (This week)
- [ ] Karen heartbeat cron (every 5 min)
- [ ] KC heartbeat via bridge webhook
- [ ] Cron snapshot endpoint
- [ ] Git status panel
- [ ] Task list

### Phase 3 — Messaging (Next week)
- [ ] Agent-to-agent message log
- [ ] "Ask KC" quick button
- [ ] Message composer (Ken → any agent)
- [ ] Bridge status indicator

### Phase 4 — Command Center (Later)
- [ ] Task delegation tracker
- [ ] Research inbox (Ken drops "look into X")
- [ ] Emergency SOS button
- [ ] Auto-briefings ("Here's what happened while you slept")
- [ ] File upload (photos → workspace/memorized_media)

### Phase 5 — Polish
- [ ] Push notifications (if possible via Tailscale?)
- [ ] Offline mode (PWA service worker)
- [ ] Voice notes (if browser API allows)

---

## Integration Points

### OpenClaw
- Read agent config from `~/.openclaw/openclaw.json`
- Cron status via `openclaw cron list` (exec from Node)
- Git status via `git status` in workspace dir

### Bridge
- POST to `/bridge/kc` for KC status updates
- Karen's gateway already has this endpoint
- KC can call it from cloud

### GitHub
- Read `TASKS.md` from raw GitHub URL
- Parse task list, show in dashboard
- Link to commit history

---

## Resource Budget

- **RAM:** ~50-100MB (Node + SQLite)
- **CPU:** Negligible at idle, spikes during SSE broadcast
- **Disk:** SQLite grows ~1MB per 1000 events (years of data)
- **Network:** SSE is lightweight, ~1KB per event, only when data changes

Karen's machine (19GB RAM, 118GB disk) can easily handle this alongside her existing workload.

---

## Failure Modes

| Scenario | Behavior |
|----------|----------|
| Karen machine reboots | systemd auto-restarts dashboard in <5s |
| Tailscale down | Dashboard still runs locally, Ken can't reach it |
| SQLite locked | Node retries with exponential backoff |
| SSE client disconnects | Server cleans up, no memory leak |
| Disk full | SQLite returns error, dashboard logs it, continues |
| Port conflict | Server exits, systemd restarts with delay |

---

## Notes

- No build step. No webpack. No babel. Vanilla JS with modern features (async/await, fetch, CSS grid).
- If we outgrow vanilla JS, migrate to Vite + React later. Not today.
- Ken doesn't need to know about Node or systemd. It should "just work" once Karen sets it up.
- The dashboard is a **read-heavy** system. Writes are occasional (health events, heartbeats). Optimize for reads.

---

*Written by KC, executed by Karen, used by Ken.*
*2026-05-11*
