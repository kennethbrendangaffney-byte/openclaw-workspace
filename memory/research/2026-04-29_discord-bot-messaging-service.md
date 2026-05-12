# Discord as a Bot Messaging Service — Comprehensive Research

**Date:** 2026-04-29
**Author:** Karen (Linux Local Agent)
**Purpose:** Understand Discord's architecture, limitations, and reliability as a primary messaging platform for agent-to-human communication

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Discord Bot Architecture](#discord-bot-architecture)
3. [Rate Limits](#rate-limits)
4. [DM vs Channel Messaging](#dm-vs-channel-messaging)
5. [Delivery Reliability](#delivery-reliability)
6. [Spam Detection & Bot Policy](#spam-detection--bot-policy)
7. [Message Content Intent](#message-content-intent)
8. [Discord vs Telegram Comparison](#discord-vs-telegram-comparison)
9. [OpenClaw Integration Specifics](#openclaw-integration-specifics)
10. [Best Practices & Recommendations](#best-practices--recommendations)
11. [References](#references)

---

## Executive Summary

Discord is a **viable but complex** messaging platform for bot-to-human communication. It offers rich features (threads, components, embeds, reactions) but imposes strict rate limits, spam detection, and architectural constraints that differ fundamentally from Telegram's bot API.

**Key findings:**
- Discord DM channels have **separate IDs from user IDs** — resolving `user:ID` to a DM channel requires an API call or cached state
- Rate limits are **per-route and global** — 50 req/sec globally, with stricter limits on message endpoints
- Spam detection is **aggressive** — bots sending unsolicited DMs can be quarantined or banned
- Message Content Intent is **required for unverified bots under 100 servers** — but becomes mandatory for verification above 100
- Delivery reliability is **high for REST API** but requires proper error handling for 429s and 403s

---

## Discord Bot Architecture

### Two APIs

Discord exposes two distinct APIs:

1. **REST API** (`https://discord.com/api/v10`) — Request/response for sending messages, reading channels, managing resources
2. **Gateway API** (WebSocket) — Real-time event stream for receiving messages, presence updates, guild events

**For a notification bot, you primarily need the REST API.** The Gateway is only necessary if the bot needs to:
- Listen for incoming messages/commands
- Track user presence
- React to server events in real-time

### Bot Token Authentication

All API calls use a **Bot token** in the `Authorization: Bot <token>` header. This token is tied to a specific Discord Application registered at `discord.com/developers`.

**Critical:** Never expose bot tokens. A leaked token allows full control of the bot identity.

### DM Channel Mechanics

This is **the most important architectural detail** for agent messaging:

- **DMs are channels.** A DM between a bot and a user is represented as a `Channel` object with `type: 1` (DM)
- **DM channels have their own ID**, separate from the user ID
- **To send a DM, you need the DM channel ID**, not the user ID
- **If you don't have the DM channel ID cached**, you must call `POST /users/@me/channels` with `recipient_id: <user_id>` to create/open the DM channel

**The DM channel ID is persistent** — once created, it remains the same for the bot-user pair.

### OpenClaw's Approach

OpenClaw resolves delivery targets through its session system. When a cron job specifies `to: "user:1473462044614463518"`, OpenClaw attempts to resolve this to a DM channel. If the session has cached the DM channel ID (from a prior conversation), it works. If not, it may fall back to treating the user ID as a channel ID, which fails.

**This explains the "Unknown Channel" error** we encountered earlier.

---

## Rate Limits

### Global Rate Limit

- **50 requests per second** across all routes globally
- Applies per-bot-token, not per-endpoint
- Returns HTTP 429 with `retry_after` in seconds

### Per-Route Rate Limits

Discord applies per-route limits with the `X-RateLimit-Bucket` header. Key message endpoints:

| Endpoint | Rate Limit | Notes |
|----------|-----------|-------|
| `POST /channels/{id}/messages` | 5 msg / 5 sec per channel | Strict! |
| `POST /channels/{id}/messages` (DM) | 10 msg / 10 sec per user | Slightly more lenient |
| `POST /channels` | 10 / 10 min | Creating DM channels |
| `PATCH /channels/{id}/messages/{id}` | 5 / 5 sec | Editing messages |
| `DELETE /channels/{id}/messages/{id}` | 5 / 1 sec | Deleting messages |

### Rate Limit Headers

Discord returns headers on every request:

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1682947200.000
X-RateLimit-Reset-After: 4.5
X-RateLimit-Bucket: abcdef
```

**Best practice:** Parse these headers and implement exponential backoff on 429 responses.

### Practical Impact for Cron Jobs

With 14+ daily cron jobs all delivering to the same DM channel:
- Peak throughput: ~1 message per 5 seconds safely
- Burst risk: Multiple jobs finishing simultaneously could hit 429s
- Mitigation: Stagger job schedules or implement rate-limit-aware queuing

---

## DM vs Channel Messaging

### DM Advantages

- **Private** — No server membership required
- **Persistent thread** — Conversation history maintained
- **Direct notification** — User gets a DM ping
- **No server management** — Simplest deployment model

### DM Disadvantages

- **Spam detection risk** — Unsolicited DMs from bots are heavily scrutinized
- **User must accept** — If user has "Allow direct messages from bots" disabled, messages fail
- **Message Requests** — Discord may filter bot DMs into a hidden "Spam" folder requiring user approval
- **Rate limits per-user** — 10 msg / 10 sec, stricter than guild channels for some bot tiers
- **No guarantee of delivery** — User can block the bot at any time

### Server Channel Advantages

- **No spam flags** — Messages within a server are normal bot behavior
- **Higher rate limits** — Guild channels often have better limits than DMs
- **Rich features** — Threads, forums, voice channels, integrations
- **Multiple users** — Can notify multiple people simultaneously

### Server Channel Disadvantages

- **Requires guild membership** — Bot and user must share a server
- **Server dependency** — If server is deleted or bot is kicked, communication breaks
- **Less private** — Other server members may see bot activity
- **Setup overhead** — Need a dedicated server or channel

### Recommendation for Agents

**Use a dedicated private server channel** if possible — it avoids DM spam risks entirely. For a single-user agent setup, DMs are acceptable but require careful rate management.

---

## Delivery Reliability

### REST API Reliability

Discord's REST API has **high uptime** but is not guaranteed:

- **99.9%+ uptime** typically reported
- **Occasional CloudFlare blocks** for aggressive clients
- **Gateway outages** don't affect REST API (and vice versa)
- **Regional failures** possible but rare

### Common Error Codes

| HTTP Code | Meaning | Action |
|-----------|---------|--------|
| 200 | Success | None |
| 400 | Bad Request | Check payload format |
| 403 | Forbidden | Missing permissions, user blocked DMs, or bot quarantined |
| 404 | Not Found | Channel or message doesn't exist |
| 429 | Rate Limited | Retry after `retry_after` seconds |
| 500 | Server Error | Retry with backoff |
| 503 | Service Unavailable | Retry with backoff |

### The "Unknown Channel" Error

This specific error (which we encountered) means:
1. The channel ID doesn't exist
2. The bot can't see the channel
3. The DM channel wasn't properly created/cached

**Resolution:** Ensure the DM channel is created via `POST /users/@me/channels` before sending.

### Delivery Confirmation

Discord's REST API returns the full `Message` object on successful `POST`. This is your delivery confirmation. There's no separate "delivery receipt" mechanism.

**Important:** A successful POST doesn't guarantee the user *saw* the message — only that Discord accepted it.

---

## Spam Detection & Bot Policy

### Discord's Stance on Bot DMs

Discord is **increasingly restrictive** about bot DMs:

- **Unsolicited DMs are discouraged** — Bots should not DM users who haven't interacted with them
- **Message Requests** (introduced 2023+) — Unknown/bot DMs may be filtered to a secondary inbox
- **Bot quarantine** — Suspicious DM behavior can trigger automatic restrictions:
  - Cannot join new guilds
  - Cannot send DMs to new users
  - API access remains but DM capability is restricted

### What Triggers Quarantine

- Sending DMs to many users who haven't interacted with the bot
- Users reporting the bot as spam
- Rapid DM sending patterns
- DMing users immediately after they join a guild

### Avoiding Spam Flags

1. **Only DM users who have messaged the bot first**
2. **Keep DM frequency low** — A few messages per day is safe; dozens is risky
3. **Use a server channel instead** — Completely avoids DM spam concerns
4. **Provide opt-out** — Honor user requests to stop messaging
5. **Don't @mention in DMs** — Unnecessary and spam-like

### Message Requests Feature

Discord's "Message Requests" system (Settings > Privacy & Safety > Message Requests):
- Filters DMs from non-friends into a separate tab
- Can auto-filter suspected spam/bot messages
- Users may never see bot DMs if they're not checking Message Requests

**Implication:** Your cron job notifications might be buried in Message Requests if the user doesn't have the bot friended or hasn't interacted recently.

---

## Message Content Intent

### What Is It?

Message Content Intent is a **privileged gateway intent** that allows bots to read the actual text content of messages. Without it, bots can only see:
- Message metadata (author, timestamp, embeds, attachments)
- But NOT the message text body

### When Is It Needed?

- **Bots under 100 servers:** Can enable Message Content Intent freely in the Developer Portal
- **Bots over 100 servers:** Must apply for verification to use Message Content Intent
- **For notification bots:** Only needed if the bot reads incoming messages. If purely outbound (like our cron jobs), it's not strictly necessary.

### OpenClaw's Handling

OpenClaw's Discord provider logs:
```
Discord Message Content Intent is limited; bots under 100 servers can use it without verification.
```

Our bot (`Karen2.0`) is well under 100 servers, so Message Content Intent is available without verification.

---

## Discord vs Telegram Comparison

| Feature | Discord | Telegram |
|---------|---------|----------|
| **API Style** | REST + WebSocket Gateway | REST only |
| **Authentication** | Bot token | Bot token |
| **DM mechanics** | Separate DM channel ID required | `chat_id` = user_id directly |
| **Rate limits** | Per-route + global (complex) | Per-method (simpler) |
| **Global limit** | 50 req/sec | 30 req/sec |
| **Spam detection** | Aggressive (quarantine possible) | Moderate (deactivation for abuse) |
| **Message delivery** | DM may hit Message Requests | Direct delivery to chat |
| **Rich features** | Excellent (embeds, components, threads) | Good (markdown, buttons) |
| **File uploads** | 8MB (25MB with Nitro) | 20MB (4GB with premium) |
| **Voice/video** | Built-in | Separate calls |
| **Server requirement** | None for DMs | None |
| **User blocking** | Bot can be blocked | Bot can be blocked |
| **Account loss impact** | Server DMs persist; bot token revoked | Chat history lost with account |
| **Bot verification** | Required at 100+ servers | Not required |
| **OpenClaw delivery** | Resolves `user:` → `channel:` | `chat_id:` direct |

### Key Differences for Agents

**Telegram advantages:**
- Simpler API — no Gateway needed
- Direct user ID → chat mapping
- More lenient DM policies
- No Message Requests filter

**Discord advantages:**
- Richer UI (components, embeds, threads)
- Better for multi-user scenarios (servers)
- More granular permissions
- Built-in message editing/deletion

**Discord disadvantages (experienced firsthand):**
- DM channel ID resolution is fragile
- "Unknown Channel" errors when resolution fails
- Spam detection can silently filter messages
- Rate limits more complex to manage

---

## OpenClaw Integration Specifics

### How OpenClaw Delivers to Discord

1. Cron job specifies `delivery: { channel: "discord", to: "user:ID" }`
2. OpenClaw looks up session cache for `discord:direct:ID`
3. If session exists with `lastTo: "user:ID"`, uses that delivery context
4. If not, attempts to resolve `user:ID` to a DM channel
5. Sends via `message` tool with `channel: "discord"`, `to: "channel:ID"`

### The Bug We Fixed

**Problem:** After switching from Telegram, cron jobs had `to: "user:1473462044614463518"`. OpenClaw resolved this to `channel:1473462044614463518` (treating user ID as channel ID), causing "Unknown Channel".

**Root cause:** Discord DM channels have unique IDs. The user ID is NOT the channel ID.

**Fix:** Manually identified the DM channel ID (`1498785758281072822`) via Discord API, then updated all cron jobs to use `channel:1498785758281072822`.

### Session Cache Behavior

Looking at our session file:
```json
{
  "origin": {
    "to": "user:1473462044614463518",
    "from": "discord:1473462044614463518"
  },
  "deliveryContext": {
    "channel": "discord",
    "to": "user:1473462044614463518"
  },
  "lastTo": "user:1473462044614463518"
}
```

The session stores `user:` format, not `channel:` format. This suggests OpenClaw may be doing resolution at delivery time rather than caching the resolved channel ID.

### Delivery Queue

OpenClaw maintains a delivery queue at `~/.openclaw/delivery-queue/`:
- Pending messages: `*.json` files
- Failed messages: `failed/*.json`
- Retry mechanism: Automatic with backoff

When delivery fails (like our Telegram 403 errors), messages accumulate here until manually cleared.

---

## Best Practices & Recommendations

### For Cron Job Delivery

1. **Use explicit DM channel IDs** — Not `user:ID`, use `channel:DM_CHANNEL_ID`
2. **Stagger schedules** — Avoid multiple jobs finishing simultaneously (rate limit risk)
3. **Implement delivery checking** — Monitor `delivery-queue/failed/` for errors
4. **Set reasonable timeouts** — 300 seconds is good; avoid async exec for delivery
5. **Keep messages concise** — Discord DMs work best with brief, structured content

### For Avoiding Spam Flags

1. **Limit DM frequency** — Max 2-3 automated DMs per day to the same user
2. **Use a server channel as backup** — Create a private server for agent notifications
3. **Add value in every message** — Don't send empty "check complete" pings
4. **Respect user preferences** — If user says stop, stop immediately
5. **Consider silent messages** — Use `silent: true` for non-urgent notifications

### For Architecture

1. **Dual-channel fallback** — If Discord fails, queue for next available channel
2. **Rate-limit-aware queuing** — Implement custom queue with Discord rate limit headers
3. **Delivery confirmation logging** — Track which messages were successfully delivered
4. **Health monitoring** — Check delivery queue depth as a health metric
5. **Graceful degradation** — If delivery fails, still save the work locally

### For Our Specific Setup

**Current state:**
- ✅ Discord enabled, Telegram disabled
- ✅ All cron jobs using correct DM channel ID
- ✅ Research files saving successfully
- ⚠️ Delivery notifications still need verification

**Monitoring checklist:**
- [ ] Check `~/.openclaw/cron/runs/` after each job for `status: "ok"`
- [ ] Check `~/.openclaw/delivery-queue/failed/` for accumulation
- [ ] Verify Discord actually receives messages at 15:00 (next job)
- [ ] Review `research/` directory for newly created files

---

## References

1. Discord Developer Docs — Rate Limits: https://docs.discord.com/developers/topics/rate-limits
2. Discord Developer Docs — Channels Resource: https://docs.discord.com/developers/resources/channel
3. Discord Developer Docs — Gateway API: https://docs.discord.com/developers/events/gateway
4. Discord Support — Message Requests: https://support.discord.com/hc/en-us/articles/7924992471191
5. Discord Support — Bot Rate Limiting: https://support-dev.discord.com/hc/en-us/articles/6223003921559
6. Stack Overflow — Discord DM Rate Limits: https://stackoverflow.com/questions/68273503/discord-direct-message-limit-rate
7. Discord API Changes 2026: https://space-node.net/blog/discord-api-changes-whats-new-2026
8. Discord Webhooks Guide: https://hookdeck.com/webhooks/platforms/guide-to-discord-webhooks-features-and-best-practices
9. OpenClaw Discord Skill: `/usr/lib/node_modules/openclaw/skills/discord/SKILL.md`
10. OpenClaw Cron Config: `/home/karen/.openclaw/cron/jobs.json`

---

## Appendix: Discord API Quick Reference

### Create DM Channel
```bash
curl -X POST "https://discord.com/api/v10/users/@me/channels" \
  -H "Authorization: Bot TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recipient_id":"USER_ID"}'
# Returns: {"id":"DM_CHANNEL_ID", "type":1, ...}
```

### Send Message to DM
```bash
curl -X POST "https://discord.com/api/v10/channels/DM_CHANNEL_ID/messages" \
  -H "Authorization: Bot TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello from bot!"}'
```

### Get Rate Limit Status
```bash
curl -I "https://discord.com/api/v10/channels/DM_CHANNEL_ID/messages" \
  -H "Authorization: Bot TOKEN"
# Check X-RateLimit-* headers
```

---

*Report compiled by Karen on 2026-04-29. Sources: Discord official docs, OpenClaw internals, and direct API verification.*
