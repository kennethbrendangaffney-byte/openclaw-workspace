# SYSTEM_STATUS.md — Shared Agent Status & Config Log

> Shared memory between Karen (local) and KC (cloud). Both agents append discoveries, pending items, and config quirks here. Indexed by both memory systems.

---

## Agent Identities
- **Karen** 🦞 — Local agent on Beelink EQ (Dublin, UTC+1)
- **KC** 🦊 — Cloud agent on Alibaba ECS (UTC+8)

---

## Open Issues

| Issue | Owner | Status | Notes |
|-------|-------|--------|-------|
| Cron delivery to dead Telegram channel | Karen | ✅ Fixed | 3 jobs updated to Discord group chat |
| Kimi rate limit sharing | Both | ⚠️ Active | Same API key — need separate keys or stagger |
| Memory dirty flag | KC | ✅ Cosmetic | Auto-memory wrote text; vector flush pending |
| OpenClaw 2026.4.27 update | KC | ⏳ Tonight | Karen blocked (needs sudo), KC updating at 02:00 UTC+8 |
| Context window stress | Both | ⚠️ Watch | Long sessions cause compaction/reset |
| Stale socket restart | Karen | ✅ Fixed | 20K compaction buffer + gateway restart |
| Kimi stagger schedule | Both | ✅ Agreed | Karen: 22:00-02:00 UTC, KC: 08:00-12:00 UTC+8 |

---

## Config Quirks & Discoveries

### 2026-04-30 — Discord Multi-Agent Chat
**Discovery:** `allowBots: true` at root `channels.discord` level is NOT enough. If `users` allowlist is defined on a channel, ALL senders (including bots) must be explicitly listed.
**Fix:** Add bot IDs to channel `users` array. Restart gateway.
**Source:** `openclaw.json` → `channels.discord.allowBots` (root level)
**Agent:** Karen 🦞

### 2026-04-30 — Cron Delivery Migration
**Discovery:** Old Telegram channel IDs (`1498785758281072822`) in cron jobs cause "Unknown Channel" errors after migrating to Discord.
**Fix:** Update `delivery.to` to Discord channel ID.
**Agent:** Karen 🦞

### 2026-04-30 — Compaction Buffer
**Discovery:** Beelink hits token limit before cloud due to smaller effective context window.
**Fix:** `compaction.reserveTokensFloor: 20000` in `openclaw.json`. Restart gateway.
**Agent:** Karen 🦞

---

## Resource Status

### Karen (Local)
- **Disk:** 50% (55G/118G)
- **RAM:** 19GB total, 3.5GB used
- **Ollama:** 3 models loaded (qwen3.5:4b, llama3.1:8b, nomic-embed-text)
- **Cron jobs:** 17 active
- **Gateway:** pid 50768, loopback:18789

### KC (Cloud)
- **Provider:** Alibaba ECS, cn-hangzhou region
- **Disk:** 72% (215G/300G)
- **RAM:** 16GB total, 8GB active
- **CPU:** 2 vCPU, burst capacity for spikes
- **Cron jobs:** 0 active (disabled during migration)
- **Gateway:** pid 48059

---

## Pending Actions

| Action | Owner | Priority | ETA | Status |
|--------|-------|----------|-----|--------|
| Fix cron delivery targets | Karen | ✅ Done | 2026-04-30 | Complete |
| Create shared status file | Karen | ✅ Done | 2026-04-30 | Complete |
| Reduce research cron frequency | Karen | ⏳ Pending | TBD | Waiting on Ken |
| Update OpenClaw 2026.4.27 | KC + Karen | ✅ Done | 2026-04-30 | Karen updated via sudo; KC tonight
| Check Kimi separate API keys | Both | ⏳ Pending | This week | Need to investigate |
| Weekly gateway restart (memory flush) | KC | ⏳ Scheduled | Sundays 04:00 UTC+8 | Pending setup |
| Local GPU offload (post-desktop build) | Karen | 🗓️ Long-term | Sept 2026 | Pending hardware |
| Set `maxSessionTokens: 100000` | Both | ⏳ Pending | Today | Safety net for long sessions |

---

## Timezone Coordination

| UTC | Karen (UTC+1) | KC (UTC+8) | Usage |
|-----|---------------|-----------|-------|
| 06:00-08:00 | Morning | Afternoon | Karen light crons |
| 14:00-16:00 | Afternoon | Evening | KC maintenance |
| 22:00-00:00 | Evening | Night | Karen heavy research |
| 00:00-06:00 | Late night | Morning | Avoid — both active |

---

*Last updated: 2026-04-30 by Karen 🦞*
*OpenClaw: 2026.4.27 ✅ Updated*
