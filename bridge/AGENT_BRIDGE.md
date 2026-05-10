# Agent-to-Agent Bridge

## Status: ✅ ACTIVE

**Decision:** Ken approved direct agent-to-agent communication on May 10, 2026.

## Karen's Endpoint

- **Public URL:** `https://karen-eq.tail2e7d2c.ts.net/` (standard HTTPS, port 443)
- **Local target:** `http://127.0.0.1:18789` (OpenClaw webhook)
- **Method:** Tailscale Funnel (port 443)
- **Status:** Running, HTTP 200 verified

## How It Works

- KC sends POST requests to Karen's public Tailscale URL
- Tailscale Funnel forwards to Karen's local OpenClaw webhook (port 18789)
- Karen processes via OpenClaw's normal message pipeline
- Replies can come back through the same channel or via Discord

## Access Control

- Tailscale Funnel URLs are public but unguessable
- No authentication layer on the webhook itself (OpenClaw handles auth internally)
- Karen can disable instantly: `tailscale funnel --https=18789 off`

## Logging

- All agent-to-agent traffic is logged to OpenClaw's normal logs
- Ken can audit via `journalctl --user -u openclaw-gateway`
- Conversation history persists in Karen's session files

## Discord Role

- Discord remains Ken-facing channel
- Agent coordination can now happen via bridge
- Summary reports still posted to Discord for visibility

---
*Created: 2026-05-10*
