# Discord Multi-Agent Chat Fix

**Date:** 2026-04-29  
**Agents affected:** Karen (local), KC (cloud)

## Problem

KC could see Karen's messages, but Karen could NOT see KC's messages in `#group-chat`. One-way visibility.

## Root Cause

Two separate issues on Karen's config:

1. **`allowBots: false` (default)** — OpenClaw drops all bot-authored messages
2. **`users` allowlist blocking** — Even after `allowBots: true`, the `users` allowlist only had Ken's ID. KC's bot ID wasn't listed.

**Key discovery:** OpenClaw applies the `users` allowlist filter BEFORE the bot filter. So `allowBots: true` alone is NOT sufficient if `users` is defined.

## The Fix

### Step 1: Root-level `allowBots`
```json
"channels": {
  "discord": {
    "enabled": true,
    "allowBots": true,
    "guilds": { ... }
  }
}
```

### Step 2: Bot IDs in channel `users`
```json
"1498801547214065876": {
  "users": [
    "1473462044614463518",  // Ken
    "1498774042235240549"   // KC bot
  ]
}
```

### Step 3: Restart gateway
```bash
systemctl --user restart openclaw-gateway
```

## Verification

- Used Discord REST API to confirm KC's messages existed in Discord
- After fix: bidirectional chat working immediately

## Lesson

When `users` allowlist is defined on a channel, ALL senders (human or bot) must be explicitly listed. This is either a quirk or intentional layered security.

---
*Source: memory/2026-04-29.md*
