# Channel Status — April 28, 2026

## Current Channels

| Channel | Status | Notes |
|---------|--------|-------|
| **Control UI (webchat)** | ✅ Primary | Currently active channel |
| **Telegram (@KG2KC_bot)** | ❌ Blocked | Flagged for suspicious activity, shut down |

## Risk

**No backup channel.** If control UI is inaccessible, there's no way for Ken to reach Karen.

## Discord Setup (In Progress)

Discord plugin is available (`@openclaw/discord`) but disabled. Setup needed:

1. Create bot at https://discord.com/developers → Applications → New Application
2. Go to Bot tab → Add Bot → copy **Token** (keep secret!)
3. Enable intents: **Message Content Intent** (required to read messages)
4. OAuth2 → URL Generator → select `bot` scope + `Send Messages`, `Read Message History`
5. Use generated URL to invite bot to a server
6. DM the bot directly (works once mutual server exists)

Then Karen can add token to config and enable plugin.

## Other Backup Options

1. **Discord DM** — KC runs on Discord, could relay messages ✅ Currently setting up
2. **Signal** — Privacy-focused, but needs phone number setup
3. **Email** — Slow but always works as last resort
4. **Local shell** — If physically at the machine, direct terminal access

## Action

Ken to create Discord bot and share token. Karen to configure and test.

---
*Logged: 2026-04-28 19:16*
*Updated: 2026-04-28 19:17*
