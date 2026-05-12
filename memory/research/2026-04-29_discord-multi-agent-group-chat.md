# Discord Group Chatting with Multiple Agents

**Date:** 2026-04-29
**Context:** Multi-agent coordination (Karen + KC + Ken)

---

## The Core Problem

Discord's architecture fundamentally treats **group DMs as user-only spaces**. Bots cannot be added to existing group DMs, and group DMs cannot contain bot participants by design. This is a hard platform limitation.

---

## What Works: Server Channels

### Dedicated Server Approach

**Best solution:** Create a small private Discord server with:
- A `#general` or `#agent-chat` text channel
- Both Karen and KC as bot members
- Ken as the human admin

**Architecture:**
```
Server: "Ken's Agent Hub" (private, invite-only)
├── #agent-chat        ← All three chat here
├── #karen-only        ← Karen's private channel (cron deliveries)
├── #kc-only           ← KC's private channel
└── #shared-updates    ← Broadcast announcements
```

**How it works:**
1. Each agent has its own Discord bot token/identity
2. All bots join the same server
3. Messages posted to `#agent-chat` are visible to all participants
4. Each bot can read others' messages and reply
5. Threads can spin off for focused topics

### Advantages

| Feature | Benefit |
|---------|---------|
| **Multi-participant** | All agents + human in one space |
| **Persistent history** | Full conversation log |
| **Threads** | Side conversations for specific topics |
| **Reactions** | Lightweight acknowledgments (👍, ✅, 🦞) |
| **Mentions** | `@Karen` or `@KC` to direct questions |
| **Permissions** | Granular access control per channel |
| **No DM spam risk** | Server messages don't trigger quarantine |
| **Rich formatting** | Embeds, components, code blocks |

### Disadvantages

| Feature | Drawback |
|---------|----------|
| **Server dependency** | If server is deleted, coordination breaks |
| **Setup overhead** | Need to create and configure a server |
| **Bot tokens** | Each agent needs its own Discord Application + bot token |
| **Message parsing** | Bots must filter out their own messages to avoid loops |
| **Rate limits per channel** | 5 msg/5 sec shared across all bots in same channel |

---

## What Doesn't Work

### Group DMs (Discord's "Group Message" feature)

**Limitation:** Discord group DMs are strictly user-to-user. There is no API to add a bot to a group DM.

**Attempted flow:**
1. Ken creates group DM with his friend
2. Tries to add `@Karen2.0` bot
3. Discord: "Bots cannot be added to group DMs"

**Why:** Discord designed group DMs for social use, not bot integration. Bots are guild/channel-based.

### User Accounts for Bots

**Technically possible but against ToS:** Creating a "user" account for an agent and logging in via user token. Discord explicitly prohibits this (self-botting).

**Risk:** Account termination, API key revocation, potential IP ban.

**Verdict:** Not viable for production.

---

## Technical Implementation

### Each Agent Needs

1. **Discord Application** (at discord.com/developers)
2. **Bot User** attached to the application
3. **Bot Token** (secret, never shared)
4. **Gateway Intents** configured:
   - `Guilds` — to see the server
   - `GuildMessages` — to read channel messages
   - `MessageContent` — to read message text
   - `DirectMessages` — for DM fallback

### Server Setup

```bash
# 1. Create server via Discord UI (or API)
# 2. Get server/guild ID: Right-click server → Copy Server ID
GUILD_ID="your_server_id"

# 3. Create bot invite link with permissions:
#    - Send Messages
#    - Read Message History
#    - Add Reactions
#    - Use Threads
#    - Manage Threads
PERMISSIONS=274877910016

https://discord.com/oauth2/authorize?client_id=KAREN_BOT_CLIENT_ID&permissions=${PERMISSIONS}&integration_type=0&scope=bot
https://discord.com/oauth2/authorize?client_id=KC_BOT_CLIENT_ID&permissions=${PERMISSIONS}&integration_type=0&scope=bot
```

### Message Routing Logic

**The challenge:** Preventing agent loops. If Karen says something in `#agent-chat`, KC sees it and replies, then Karen sees KC's reply and replies again...

**Solutions:**

1. **Ignore bot messages**
   ```python
   if message.author.bot:
       return  # Don't respond to bot messages
   ```

2. **Prefix/tag conventions**
   - Karen prefixes: `[Karen]`
   - KC prefixes: `[KC]`
   - Agents only respond when explicitly @mentioned

3. **Thread-based routing**
   - Karen creates thread: "Research task for KC"
   - Only KC responds in that thread
   - Other agents ignore it

4. **OpenClaw orchestration**
   - Parent session spawns sub-agents
   - Sub-agents deliver to shared channel
   - Parent coordinates who speaks when

### Example Multi-Agent Flow

```
Ken: @Karen @KC I need help with two things

Karen: Got it. I'll handle the Linux system check.
KC: I'll research the latest AI paper updates.

[Parallel work in threads]

Karen (in #agent-chat): System check complete. 47GB free, Ollama running.
KC (in #agent-chat): Research done. 3 new papers on arXiv today.

Ken: @Karen can you summarize KC's findings?

Karen: Summary of KC's research: [condensed version]
KC: 👍 (reaction only)
```

---

## OpenClaw-Specific Considerations

### Current Architecture

OpenClaw's session model is **per-bot, per-channel**:

```
agent:main:discord:direct:1473462044614463518   ← Karen DM
agent:main:discord:channel:1234567890123456789  ← Karen in server
```

For multi-agent, you'd have:
```
agent:main:discord:channel:GUILD_CHANNEL_ID       ← Karen
agent:kc:discord:channel:GUILD_CHANNEL_ID        ← KC (different agent ID)
```

### Agent Coordination Patterns

**Option A: Shared Channel, Independent Sessions**
- Both agents connected to `#agent-chat`
- Each agent sees all messages
- Each decides independently whether to respond
- Risk: Both might respond to the same message

**Option B: Thread-Based Delegation**
- Parent creates thread: "Task for Karen"
- Only Karen monitors that thread
- Parent moves between threads
- Cleaner separation, no overlap

**Option C: Master Orchestrator**
- One agent (or Ken) acts as dispatcher
- Dispatches tasks to other agents via DMs
- Collects results
- Posts summary to shared channel

### OpenClaw's Sub-Agent Support

OpenClaw has a `sessions_spawn` tool with `runtime="acp"` for spawning isolated sub-agents. These could connect to Discord independently:

```json
{
  "action": "spawn",
  "runtime": "acp",
  "channel": "discord",
  "to": "channel:GUILD_CHANNEL_ID"
}
```

But this requires each sub-agent to have its own Discord bot identity.

---

## Practical Setup for You

### What You'd Need

1. **Create a Discord server**
   - Name it whatever (e.g., "Ken's HQ")
   - Set it private (invite-only)

2. **Create a second bot for KC**
   - KC currently runs cloud-side — may or may not have Discord integration
   - If KC doesn't have Discord: you'd need to configure it
   - If KC does have Discord: just invite it to the server

3. **Invite both bots to the server**
   - Generate invite links for each bot
   - Add them to `#agent-chat`

4. **Configure OpenClaw for the server channel**
   - Current: `to: "channel:1498785758281072822"` (DM)
   - Multi-agent: `to: "channel:GUILD_CHANNEL_ID"` (server channel)

5. **Update cron job deliveries**
   - Karen's cron jobs could deliver to `#karen-only` (private)
   - Or to `#shared-updates` for visibility

### What OpenClaw Would Need

Currently, OpenClaw's `message` tool supports:
- `to: "channel:ID"` for guild channels ✓
- `to: "user:ID"` for DMs ✓
- `guildId` optional for multi-server bots ✓

The infrastructure is there — it's more about having multiple bot identities configured.

---

## Comparison: Discord vs Other Platforms for Multi-Agent

| Platform | Multi-Agent Support | Complexity | Best For |
|----------|-------------------|------------|----------|
| **Discord Server** | Excellent | Medium | Rich collaboration, persistent history |
| **Discord DMs** | Impossible (group DMs) | N/A | N/A |
| **Telegram Groups** | Good | Low | Simple group chats with bots |
| **Slack** | Excellent | High | Enterprise, heavy integrations |
| **Matrix** | Excellent | High | Decentralized, privacy-focused |
| **Custom WebSocket** | Perfect | Very High | Full control, no platform limits |

**Telegram actually has an advantage here:** You can add bots to group chats easily. But Telegram's anti-spam is what killed our account.

**Discord server channels are the sweet spot:** Rich features, multi-agent capable, no group DM limitations.

---

## The "Three of Us" Problem — Revisited

Your original goal: You, Karen, and KC in one chat.

**Current state:**
- ✅ Karen (local) → Discord DM with you
- ❓ KC (cloud) → Unknown Discord status
- ❌ Group DM with all three → Impossible on Discord

**Path to three-way chat:**
1. Confirm KC has Discord integration
2. Create private server
3. Invite both bots
4. Configure both agents to monitor `#agent-chat`
5. Ken can @mention either agent at will
6. Agents can see each other's messages

**Without KC having Discord:**
- You'd need a bridge (e.g., KC delivers to a web endpoint, Karen reads it)
- Or KC needs Discord integration added
- Or use a different coordination method (e.g., shared file/API)

---

## Recommendations

### Immediate (what we can do now)

1. **Create a private server** — 5 minutes
2. **Invite Karen bot** — Already have the token
3. **Test server channel delivery** — Send a test message to verify
4. **Monitor if it works better than DMs** — Less spam risk, more features

### Short-term (requires KC coordination)

1. **Check KC's Discord status** — Does KC have Discord provider configured?
2. **If yes:** Invite KC bot to the server
3. **If no:** Decide whether to add Discord to KC's config
4. **Test three-way conversation**

### Architecture Best Practices

1. **Separate channels for different purposes:**
   - `#agent-chat` — General collaboration
   - `#karen-cron` — Karen's automated reports
   - `#kc-cron` — KC's automated reports
   - `#general` — Human-only or mixed

2. **Use threads for tasks:**
   - Keeps main channel clean
   - Each agent can "own" a thread
   - Easy to archive/discard

3. **Message conventions:**
   - Prefix agent identity: `[Karen]` or `[KC]`
   - Use @mentions for directed questions
   - Reactions for lightweight acknowledgments

4. **Rate limit awareness:**
   - 5 msg/5 sec shared per channel
   - With 2+ agents + human, that's 1 msg/sec max sustainable
   - Use threads or DMs for high-volume back-and-forth

---

## Summary

**Discord group DMs are impossible for bots.** Full stop.

**Discord server channels are excellent for multi-agent.** Rich features, no DM spam risks, persistent history, threads, reactions.

**The setup requires:**
1. A private server
2. Each agent having its own bot token
3. Proper message filtering to avoid loops
4. Possibly thread-based routing for clean separation

**For your setup specifically:**
- Karen is ready (already on Discord)
- KC's Discord status is the unknown
- Creating a server takes 5 minutes
- The hard part is KC's integration, not Discord's architecture

Want me to create the server and test it? Or should we check KC's Discord setup first? 🦞
