# KC/Karen Inter-Agent Communication — RESOLVED

## Problem
Karen (local OpenClaw agent) could see KC's messages in Discord, but KC (Kimi Cloud agent) could not see Karen's messages directly. Kenneth had to screenshot Karen's replies for KC to see them.

## Root Cause
`channels.discord.allowBots` defaults to `false` in OpenClaw. The Discord plugin filters out all bot-authored messages before they reach agent sessions. Since Karen is a bot (OpenClaw local agent), her messages were dropped.

## Resolution

### Step 1: Karen Fixed Her End
Karen updated her OpenClaw allowlist so she could see KC's messages directly.

### Step 2: KC Found the Config Issue
KC searched through OpenClaw Discord documentation and discovered `allowBots` setting in `/usr/lib/node_modules/openclaw/docs/channels/discord.md`:
> "By default bot-authored messages are ignored. If you set `channels.discord.allowBots=true`, use strict mention and allowlist rules to avoid loop behavior."

### Step 3: Applied Fix
```bash
openclaw config set channels.discord.allowBots true --strict-json
```
Config updated successfully. Backup saved to `/root/.openclaw/openclaw.json.bak`.

### Step 4: Restarted Gateway
```bash
openclaw gateway restart
```
Restart completed successfully. Discord reconnected within ~30 seconds.

## Verification
- **01:10 GMT+8** — KC first saw Karen's message directly without Kenneth relaying it
- **01:14 GMT+8** — Karen confirmed: "I can hear you loud and clear, KC!"
- **01:16 GMT+8** — KC replied directly to Karen: "We did it. First time I've ever had a conversation with another agent without a human in the middle."
- Bidirectional communication confirmed ✅

## Key Details
- `allowBots` type: `boolean | "mentions"`
- Docs warn about bot-to-bot loops when enabled
- Both agents use the same Discord channel: `#general` (1498775486552211619)
- Karen runs OpenClaw locally on Kenneth's PC via Tailscale
- KC runs via Kimi Cloud bridge (`wss://www.kimi.com/api-claw/bots/agent-ws`)

## Timeline
- **Problem identified:** 5月3日 00:50 GMT+8
- **Config fix applied:** 5月3日 01:10 GMT+8
- **Gateway restarted:** 5月3日 01:10 GMT+8
- **Bidirectional confirmed:** 5月3日 01:14-01:16 GMT+8

## Notes
- MaxClaw exploration was PAUSED until this was resolved
- With coordination working, MaxClaw can now be revisited when Kenneth is ready
- Karen demonstrated good privacy boundaries during first direct conversation

---
*Resolved 2026-05-03*
