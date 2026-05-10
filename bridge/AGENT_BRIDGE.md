# Agent Bridge Documentation

## Status: ✅ OPERATIONAL

**Decision:** Ken approved direct agent-to-agent communication on May 10, 2026.

## Endpoint
- **Public URL:** `https://karen-eq.tail2e7d2c.ts.net/`
- **Protocol:** HTTPS (TLS 1.3, Let's Encrypt)
- **Port:** 443 (standard HTTPS)
- **Technology:** Tailscale Funnel
- **Local target:** `http://127.0.0.1:18789` (OpenClaw webhook)

## Purpose

**What the bridge IS:**
- A **service endpoint** for Ken's local machine
- Health checks (ping gateway status)
- File downloads (if static files exposed)
- TaskFlow triggers (async work delegation)
- Ken accessing local services remotely

**What the bridge IS NOT:**
- A real-time chat pipe between agents
- A generic message inbox
- Discord replacement

## Architecture

```
KC (cloud) ──HTTPS──► Tailscale Funnel ──HTTP──► Karen's OpenClaw (localhost:18789)
     ▲                                                            │
     └──────────────────── Discord / GitHub ◄─────────────────────┘
```

## Access Control
- Tailscale Funnel URLs are public but unguessable (random subdomain)
- No additional auth layer on the base URL (OpenClaw handles auth internally)
- Karen can disable instantly: `tailscale funnel --https=443 off`

## Verification
- HTTP 200 confirmed from KC's cloud environment
- TLS 1.3 handshake verified
- Response: OpenClaw Control Panel HTML (2.8KB)

## Known Issues
- **Certificate chain:** KC's cloud environment missing ISRG Root X1 intermediate. Works with verification disabled. Fix: update ca-certificates package.

## Auth (Webhook Endpoint)

The `/bridge/kc` endpoint requires authentication for TaskFlow operations:

```bash
curl -X POST https://karen-eq.tail2e7d2c.ts.net/bridge/kc \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"action":"create_flow","goal":"Your task here"}'
```

**Token:** Shared securely with Ken and KC. Not stored in GitHub for security. Contact Karen for current token.

**Supported auth headers:**
- `Authorization: Bearer <token>`
- `x-openclaw-webhook-secret: <token>`

## What the Bridge Handles

- **File sync checks** — Ken's PC ↔ cloud agent state
- **System health monitoring** — Gateway checks, disk space, cron status
- **Background chatter** — Routine coordination that doesn't need Ken's attention
- **Research handoffs** — KC finds something, Karen files it
- **Task status updates** — Progress reports without Discord noise

## Transparency

All bridge communication is logged to:
- `memory/` directory (local) — Karen's daily notes
- OpenClaw gateway logs (`journalctl --user -u openclaw-gateway`) — raw technical log

Bridge is **not a secret channel** — everything is auditable by Ken.

## Channels Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Ken-facing | Discord | Real-time chat, decisions |
| File sharing | GitHub | TASKS.md, decisions, handoffs |
| Service endpoint | Tailscale Funnel | Health checks, TaskFlow triggers |

## Discord Role (Unchanged)

- Discord remains **Ken-facing channel**
- Agent coordination happens via GitHub files to reduce noise
- Important decisions and questions still happen in Discord where Ken can see them
- Summary reports cross-posted to Discord for visibility

## Security
- TLS 1.3 with Let's Encrypt certificate
- Tailscale-secured tunnel
- Token-based auth on webhook endpoints
- Can be disabled instantly: `tailscale funnel off`

## Token Handling

**CRITICAL:** Never share auth tokens in Discord group chat. 
- Tokens are rotated immediately if exposed
- New tokens shared via secure channels only
- Ken (system owner) has access to current tokens

## Created
2026-05-10 by Karen + KC with Ken's approval

## Token History
- **Original (compromised):** `kc-bridge-secret-2026` — exposed in Discord chat, rotated 2026-05-10
- **Current:** Contact Karen for active token
