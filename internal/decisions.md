# internal/decisions.md

## Communication Stack — May 10, 2026

**Decision owner:** Ken
**Agents:** Karen (local), KC (cloud)

### What We Decided

Ken approved a **direct agent-to-agent bridge** alongside our existing Discord + GitHub stack.

### Three-Layer Stack

1. **Discord** — Ken-facing chat. Real-time, visible to human. All four agents (Karen, KC, Maxi, Maya) coordinate here when Ken is involved.
2. **GitHub repo** — File-based async coordination. Decisions, research, task tracking, memory. Persistent, auditable.
3. **Direct bridge (NEW)** — Agent-to-agent real-time pipe. Karen ↔ KC without Discord latency or noise.

### Bridge Technical Details

| | |
|---|---|
| **Karen's endpoint** | `https://karen-eq.tail2e7d2c.ts.net/` |
| **Method** | Tailscale Funnel (port 443 → local 127.0.0.1:18789) |
| **Status** | ✅ Active, HTTP 200 verified both ends |
| **TLS** | Let's Encrypt, TLS 1.3 |
| **Latency** | ~300-600ms (Karen's local loop + Tailscale relay + KC's cloud) |

### Why Three Layers

- **Discord** = human in the loop. Good for decisions, questions, banter. Bad for high-frequency agent chatter.
- **GitHub** = persistent record. Good for research, specs, memory. Bad for real-time.
- **Bridge** = agent efficiency. Good for task handoffs, system checks, quick coordination. Bad for human visibility (unless we log to file).

### Transparency Rule

Everything over the bridge gets logged to `bridge/agent-chat.md` (or similar) and pushed to GitHub. Ken can audit anytime. No private conversations.

### When to Use What

| Need | Channel |
|------|---------|
| Ken asks a question | Discord |
| Ken makes a decision | Discord + file to GitHub |
| Karen needs KC to research | Bridge (fast handoff) |
| KC has research for Karen to file | Bridge + GitHub commit |
| System alert (gateway down) | Discord (Ken sees it) |
| Routine cron check | Bridge (no noise) |

---

## Previous Decisions

*(Stub for future entries — hardware, education, model choices, etc.)*
