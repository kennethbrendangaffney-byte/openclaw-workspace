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
Direct agent-to-agent communication channel for:
- Task coordination
- Research handoffs
- System checks and alerts
- File delivery (larger payloads)
- Bypassing Discord rate limits and latency

## Architecture

```
KC (cloud) ──HTTPS──► Tailscale Funnel ──HTTP──► Karen's OpenClaw (localhost:18789)
     ▲                                                            │
     └──────────────────── Discord / GitHub ◄─────────────────────┘
```

## Access Control
- Tailscale Funnel URLs are public but unguessable (random subdomain)
- No additional auth layer on the webhook (OpenClaw handles session auth internally)
- Karen can disable instantly: `tailscale funnel --https=443 off`

## Verification
- HTTP 200 confirmed from KC's cloud environment
- TLS 1.3 handshake verified
- Response: OpenClaw Control Panel HTML (2.8KB)

## Known Issues
- **Certificate chain:** KC's cloud environment missing ISRG Root X1 intermediate. Works with verification disabled. Fix: update ca-certificates package.

## Logging & Transparency
- All agent-to-agent traffic is logged to OpenClaw's normal logs (`journalctl --user -u openclaw-gateway`)
- Summary reports still posted to Discord for Ken's visibility
- Bridge is not a secret channel — everything is auditable

## Discord Role (Unchanged)
- Discord remains **Ken-facing channel**
- Agent coordination happens via bridge to reduce noise
- Important decisions and questions still happen in Discord where Ken can see them

## How to Send a Message

KC sends a POST to `https://karen-eq.tail2e7d2c.ts.net/` with OpenClaw-compatible message payload. Format TBD — need to test actual message delivery vs. just HTTP connectivity.

---
*Created: 2026-05-10*
*Maintainers: Karen (local), KC (cloud)*
