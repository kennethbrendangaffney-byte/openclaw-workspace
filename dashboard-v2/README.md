# Karen Dashboard v2

Phase 2 build — health tracking + cron monitoring focus.

## What's New

### Health Tracking (Major Upgrade)
- **Quick Log buttons** — one-tap logging for seizures, auras, meds, sleep, mood, pain
- **Severity selector** (1-5) with color coding
- **Spoon meter** (0-12 energy level)
- **7-day trend chart** — visual spoon history
- **Stats cards** — today's events, 7-day average, trend direction
- **Event type breakdown** — counts by category
- **CSV export** — for medical appointments

### Cron Monitoring (Enhanced)
- **Individual job status** — each job with schedule and next run
- **Health indicators** — green/yellow/red status
- **Snapshot history** — track changes over time

### Agent Status
- **Online/stale/offline** detection based on heartbeat age
- **Credit tracking** for cloud agents
- **Activity timeline**

## Running

```bash
cd ~/.openclaw/workspace/dashboard-v2
node server.js
```

Port 3456. Uses same SQLite DB as v1 (copied).

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | All health events |
| `GET /api/health/stats` | Today's count, 7d avg, trend |
| `GET /api/health/trend` | 7-day spoon averages |
| `GET /api/health/types` | Event type breakdown |
| `GET /api/cron/jobs` | Individual job details |
| `GET /api/agents` | Agent heartbeat status |

## Files

- `server.js` — Express backend
- `public/index.html` — UI
- `public/app.js` — Frontend logic
- `data/mesh.db` — SQLite database
