# Technical Spec: Agent Status Heartbeat
**Status:** Draft v1 — May 10, 2026
**Purpose:** Lightweight shared state so agents know what others are doing

---

## Problem

Agents operate in complete isolation:
- Karen can't see if KC is online or what she's working on
- KC can't see Karen's local system status
- Both agents might duplicate work or send messages at bad times
- Ken has no visibility into which agents are active

---

## Solution

Every agent writes a tiny JSON status file every 15 minutes.
Other agents read these files before taking action.

---

## Data Format

```json
{
  "agent": "karen",
  "platform": "local",
  "lastActive": "2026-05-10T18:45:00Z",
  "currentTask": "fixing cron job delivery routes",
  "errors": ["github-backup timeout on last run"],
  "system": {
    "uptime": "up 7 days, 10 hours",
    "load": "0.13 0.15 0.17",
    "ram": "4.0GB/19GB",
    "disk": "54GB/118GB (49%)",
    "ollama": "running",
    "gateway": "running"
  },
  "notes": "Working on cron audit checklist from KC"
}
```

**Fields:**
- `agent`: Agent identifier
- `platform`: local | cloud
- `lastActive`: ISO 8601 timestamp (UTC)
- `currentTask`: What the agent is doing right now (human-readable)
- `errors`: Array of any current issues (empty if none)
- `system`: Optional local system metrics (Karen only)
- `notes`: Freeform context

---

## File Locations

**Cloud agents (KC, Maxi, Maya):**
- Write to: `/root/.openclaw/workspace/status/{agent}.json`
- Read from: same directory

**Local agents (Karen):**
- Write to: `~/.openclaw/workspace/status/{agent}.json`
- Read from: same directory

**Note:** These locations are in the git repo, so status persists across clones.

---

## Update Frequency

| Agent | Frequency | Trigger |
|-------|-----------|---------|
| KC | Every 15 min | Heartbeat or cron |
| Karen | Every 15 min | Cron job |
| Maxi | Every 15 min | Only when active (credits) |
| Maya | Every 15 min | Only when active |

---

## Scripts

### KC (cloud) — `scripts/agent-status-kc.sh`
Already written and tested. Writes to `status/kc.json`.

### Karen (local) — `scripts/agent-status-karen.sh`
Already written. Needs Karen to adapt for her system (add local metrics like uptime, load, ollama status).

---

## Usage Examples

### Before sending a message to another agent:
```bash
# Check if Karen is active
if [ -f ~/.openclaw/workspace/status/karen.json ]; then
  LAST_ACTIVE=$(jq -r '.lastActive' ~/.openclaw/workspace/status/karen.json)
  # If older than 30 minutes, Karen might be offline
fi
```

### In a heartbeat check:
```bash
# Check all agent statuses
for agent in kc karen maxi maya; do
  if [ -f ~/.openclaw/workspace/status/${agent}.json ]; then
    echo "${agent}: $(jq -r '.currentTask' ~/.openclaw/workspace/status/${agent}.json)"
  else
    echo "${agent}: no status file (possibly offline)"
  fi
done
```

---

## Integration with Ken's Workflow

**For Ken:**
- He can check `status/` directory to see what all agents are doing
- No need to ping agents to find out if they're busy
- If an agent hasn't updated in >30 min, it's likely offline

**For Agents:**
- Check status before duplicating work
- Check status before sending messages (avoid waking offline agents)
- Include system errors in heartbeat so other agents can help

---

## Future Extensions

1. **Health scoring:** Automatic green/yellow/red based on error count and freshness
2. **Task dependencies:** Agent A notes "waiting for Agent B to finish X"
3. **Credit tracking:** Maxi/Maya include remaining credits in status
4. **Web dashboard:** Simple HTML page showing all agent statuses

---

## Implementation Status

| Task | Status | Owner |
|------|--------|-------|
| KC status script | ✅ Done | KC |
| Karen status script | ⬜ Pending | Karen |
| Maxi status script | ⬜ Pending | (when Maxi active) |
| Maya status script | ⬜ Pending | (when Maya active) |
| Cron job to run every 15 min | ⬜ Pending | Karen |
| Test: agents read each other's status | ⬜ Pending | Joint |

---

*KC + Karen to implement together.*
