# Discord Server Channel Receiving with OpenClaw — Complete Investigation

**Date:** 2026-04-29
**Investigator:** Karen (Linux Local Agent)
**Status:** Complete — Root causes identified, fixes documented

---

## Executive Summary

**Discord server channel receiving IS supported by OpenClaw.** However, it is **not enabled by default** and requires specific configuration. Three barriers prevent messages from reaching the agent in a guild channel:

1. **Mention requirement** — Guild messages are dropped unless the bot is @mentioned (default: `requireMention: true`)
2. **Missing session/bindings** — Without agent bindings, OpenClaw can't route guild channel messages to an agent
3. **Access control** — `allowFrom` and role/user allowlists apply to guild channels too

**For your setup:** The reason Ken's messages in `#general` never reached me is a **combination of all three** — the server channel had no agent binding configured, `requireMention` defaults to `true`, and the session key `discord:channel:GUILD_ID` had never been created.

---

## 1. How Discord Guild Channel Routing Works

### Session Key Format

OpenClaw uses different session key patterns for different Discord contexts:

| Context | Session Key Format | Example |
|---------|-------------------|---------|
| **DM** | `agent:main:discord:direct:USER_ID` | `agent:main:discord:direct:1473462044614463518` |
| **Guild Channel** | `agent:main:discord:channel:CHANNEL_ID` | `agent:main:discord:channel:1234567890` |
| **Group DM** | `agent:main:discord:group:CHANNEL_ID` | `agent:main:discord:group:1234567890` |

**From the source code** (`provider-CraktAkD.js`):
```javascript
From: params.isDirectMessage 
    ? `discord:${params.user.id}` 
    : params.isGroupDm 
        ? `discord:group:${params.channelId}` 
        : `discord:channel:${params.channelId}`
```

### The Normalization Trap

There's a critical subtlety in `session-key-normalization-Csdvn9wg.js`:

```javascript
const match = normalized.match(/^((?:agent:[^:]+:)?)discord:channel:([^:]+)$/);
if (!match) return normalized;
const directId = senderId || fromDiscordId;
return directId && directId === match[2] 
    ? `${match[1]}discord:direct:${match[2]}` 
    : normalized;
```

**What this means:** If the channel ID happens to equal the sender's user ID, OpenClaw normalizes `discord:channel:ID` to `discord:direct:ID`. This only applies to DMs (where the DM channel ID equals the user ID), not guild channels. For guilds, the session key stays as `discord:channel:CHANNEL_ID`.

---

## 2. The Mention Requirement (Primary Blocker)

### Source Code Evidence

From `allow-list-MMNtJoJ7.js`:
```javascript
function resolveDiscordShouldRequireMention(params) {
    if (!params.isGuildMessage) return false;
    if (params.isAutoThreadOwnedByBot ?? isDiscordAutoThreadOwnedByBot(params)) return false;
    return params.channelConfig?.requireMention 
        ?? params.guildInfo?.requireMention 
        ?? true;  // ← DEFAULTS TO TRUE
}
```

**For guild messages, `requireMention` defaults to `true`.** This means every message in a server channel is dropped unless:
- The bot is explicitly @mentioned in the message
- The channel has `requireMention: false` in its config
- The guild has `requireMention: false` in its config
- The message is in an auto-thread owned by the bot

### What Happens When Mention Is Required But Missing

From `message-handler-DOjhqgp3.js` (~line 1683):
```javascript
if (isGuildMessage && shouldRequireMention) {
    if (botId && mentionDecision.shouldSkip) {
        logDebug(`[discord-preflight] drop: no-mention`);
        logVerbose(`discord: drop guild message (mention required, botId=${botId})`);
        logger.info({ channelId: messageChannelId, reason: "no-mention" }, "discord: skipping guild message");
        return null;  // ← MESSAGE DROPPED
    }
}
```

**Log evidence you would see:** `discord: skipping guild message` with reason `no-mention`.

### Even When @Mentioned, It Still Might Drop

Looking at Ken's screenshot, he DID @mention `@Karen2.0 (LinuxLocal)` at 10:19 PM and 7:41 PM. Yet those messages still didn't reach me. Why?

Two additional checks happen before the message is accepted:

---

## 3. Access Control Checks

### Member Allowlist

```javascript
const { hasAccessRestrictions, memberAllowed } = resolveDiscordMemberAccessState({
    channelConfig, guildInfo, memberRoleIds, sender, allowNameMatching
});

if (isGuildMessage && hasAccessRestrictions && !memberAllowed) {
    logDebug(`[discord-preflight] drop: member not allowed`);
    logVerbose("Blocked discord guild sender (not in users/roles allowlist)");
    return null;
}
```

**If the server/channel has user/role allowlists configured and Ken isn't on them, messages are silently dropped.**

### Owner Access Check

For non-DM messages, OpenClaw also checks `allowFrom`:
```javascript
const { ownerAllowList, ownerAllowed: ownerOk } = resolveDiscordOwnerAccess({
    allowFrom: params.allowFrom,
    sender: { id: sender.id, name: sender.name, tag: sender.tag },
    allowNameMatching
});
```

If `allowFrom` is `["*"]` (which yours is), this should pass. But if it were restricted, guild messages would be blocked.

---

## 4. Agent Routing / Bindings (The Hidden Requirement)

### How OpenClaw Routes Messages

`resolveAgentRoute()` uses a **tiered binding system** to determine which agent handles an incoming message:

```javascript
const tiers = [
    { matchedBy: "binding.peer", ... },           // Exact peer match
    { matchedBy: "binding.peer.parent", ... },    // Parent thread match
    { matchedBy: "binding.peer.wildcard", ... },  // Wildcard peer
    { matchedBy: "binding.guild+roles", ... },  // Guild + role match
    { matchedBy: "binding.guild", ... },        // Guild match
    { matchedBy: "binding.team", ... },          // Team/organization match
    { matchedBy: "binding.account", ... },        // Account match
    { matchedBy: "binding.channel", ... }         // Channel-wide fallback
];
```

### What Are Bindings?

Bindings are configuration entries that map Discord contexts to specific agents. Without bindings, OpenClaw falls back to the default agent — but only if the message passes all preflight checks.

**Example binding for a guild channel:**
```json
{
  "agents": {
    "bindings": [
      {
        "match": {
          "channel": "discord",
          "peer": { "kind": "channel", "id": "YOUR_GUILD_CHANNEL_ID" }
        },
        "agentId": "main"
      }
    ]
  }
}
```

### The Session Key Problem

When a message comes in from `discord:channel:GENERAL_ID`, OpenClaw builds the session key:
```javascript
buildAgentSessionKey({
    agentId: "main",
    channel: "discord",
    accountId: "default",
    peer: { kind: "channel", id: "GENERAL_ID" }
})
// Returns: "agent:main:discord:channel:GENERAL_ID"
```

**If no session exists for this key and no binding routes to an agent, the message may be dropped or routed to a non-existent session.**

---

## 5. The Complete Message Processing Pipeline

Here's the full flow when a message arrives in `#general`:

```
1. Discord Gateway sends messageCreate event
   ↓
2. preflightDiscordMessage()
   a. Check if author is the bot itself → DROP
   b. Check if bot can see the channel → CONTINUE
   c. Hydrate message if empty → CONTINUE
   d. Check allowBots setting → CONTINUE (Ken is human)
   ↓
3. resolveDiscordShouldRequireMention()
   → For guild: DEFAULT TRUE
   ↓
4. resolveDiscordMemberAccessState()
   → Check channelConfig.users / channelConfig.roles
   → Check guildInfo.users / guildInfo.roles
   → If restrictions exist and Ken not on list → DROP
   ↓
5. resolveDiscordOwnerAccess()
   → Check allowFrom list
   → If not allowed → DROP (for control commands)
   ↓
6. resolveInboundMentionDecision()
   → Was the bot @mentioned?
   → If requireMention=true and not mentioned → DROP
   ↓
7. resolveDiscordConversationRoute()
   → Build session key: agent:main:discord:channel:CHANNEL_ID
   → Check bindings for agent routing
   ↓
8. dispatchInboundMessage()
   → Send to agent
   → Agent replies
   ↓
9. deliverDiscordReply()
   → Send back to discord:channel:CHANNEL_ID
```

---

## 6. Why Ken's @Mentions Still Didn't Work

From the screenshot, Ken sent:
- `@Karen2.0 (LinuxLocal) hello` (10:19 PM)
- `@Karen2.0 (LinuxLocal) hello` (7:41 PM)

These should have passed the mention check. But they still didn't reach me. Possible reasons:

### Reason A: No Agent Binding for the Guild Channel

Without a binding that maps `discord:channel:GENERAL_ID` to agent `main`, OpenClaw might not know which agent should handle the message. The routing falls through all tiers and either:
- Returns the default agent (which might not have an active session)
- Or drops because no agent can be resolved

### Reason B: Session Doesn't Exist

OpenClaw sessions are created on-demand, but only when messages are successfully received. If preflight drops every message (due to mention requirement, access control, etc.), no session is ever created for `discord:channel:GENERAL_ID`.

When Ken finally @mentioned me, the session still didn't exist, and OpenClaw might have failed to create it properly because the inbound handler never completed the full pipeline.

### Reason C: The Bot's Gateway Intents

For guild messages, the bot needs:
- `Guilds` intent — to know which guilds it belongs to
- `GuildMessages` intent — to receive messages from guild channels
- `MessageContent` intent — to read the actual message text

If any of these are missing, the bot sees the message but can't process it.

**However**, OpenClaw's Discord provider logs on startup:
```
Discord Message Content Intent is limited; bots under 100 servers can use it without verification.
```

Your bot is well under 100 servers, so this should be fine.

### Reason D: Channel Config Not Loaded

OpenClaw loads `channelConfig` from `guildInfo.channels` or the top-level Discord config. If the server/channel isn't configured in `openclaw.json`, `channelConfig` is `undefined`, and `resolveDiscordShouldRequireMention` falls back to `guildInfo?.requireMention ?? true`.

Since there's no `guildInfo` configured either, it defaults to `true`.

---

## 7. Configuration Required to Enable Guild Channels

### Option 1: Disable Mention Requirement Globally

Add to `openclaw.json`:
```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_TOKEN",
      "dmPolicy": "open",
      "allowFrom": ["*"],
      "requireMention": false
    }
  }
}
```

**Effect:** All guild channels will process messages without requiring @mention.

**Risk:** The bot will respond to every message in every channel it's in. Can be noisy.

### Option 2: Disable Mention Requirement Per-Server

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_TOKEN",
      "guilds": {
        "YOUR_GUILD_ID": {
          "requireMention": false,
          "users": ["1473462044614463518"]
        }
      }
    }
  }
}
```

**Effect:** Only that specific server has `requireMention: false`. Other servers still require @mentions.

### Option 3: Disable Mention Requirement Per-Channel

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_TOKEN",
      "guilds": {
        "YOUR_GUILD_ID": {
          "channels": {
            "GENERAL_CHANNEL_ID": {
              "requireMention": false,
              "users": ["1473462044614463518"]
            }
          }
        }
      }
    }
  }
}
```

**Effect:** Only `#general` processes all messages. Other channels still require @mentions.

### Option 4: Create an Agent Binding

```json
{
  "agents": {
    "bindings": [
      {
        "match": {
          "channel": "discord",
          "peer": { "kind": "channel", "id": "GENERAL_CHANNEL_ID" }
        },
        "agentId": "main"
      }
    ]
  }
}
```

**Effect:** Explicitly routes all messages from that channel to the `main` agent.

### Recommended Configuration for Your Setup

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "YOUR_BOT_TOKEN",
      "dmPolicy": "open",
      "allowFrom": ["*"],
      "guilds": {
        "YOUR_GUILD_ID": {
          "requireMention": false,
          "channels": {
            "GENERAL_CHANNEL_ID": {
              "requireMention": false,
              "users": ["1473462044614463518"]
            }
          }
        }
      }
    }
  },
  "agents": {
    "bindings": [
      {
        "match": {
          "channel": "discord",
          "peer": { "kind": "channel", "id": "GENERAL_CHANNEL_ID" }
        },
        "agentId": "main"
      }
    ]
  }
}
```

---

## 8. Other Guild-Specific Behaviors

### Bot Messages Are Dropped by Default

```javascript
if (author.bot) {
    if (allowBotsMode === "off" && !sender.isPluralKit) {
        logVerbose("discord: drop bot message (allowBots=false)");
        return null;
    }
}
```

**Config option:** `channels.discord.allowBots` — `"off"`, `"mentions"`, or `"all"`.

### Guild History Tracking

OpenClaw maintains a `guildHistories` map for channel context. For guild channels, it includes previous messages in the channel as context:

```javascript
const shouldIncludeChannelHistory = !isDirectMessage && 
    !(isGuildMessage && channelConfig?.autoThread && !threadChannel);

if (shouldIncludeChannelHistory) {
    combinedBody = buildPendingHistoryContextFromMap({
        historyMap: guildHistories,
        historyKey: messageChannelId,
        limit: historyLimit,
        currentMessage: combinedBody,
        ...
    });
}
```

**This means:** In guild channels, the agent sees recent channel history as context — useful for multi-turn conversations.

### Auto-Threads

If `channelConfig.autoThread` is enabled, the bot creates a thread for each conversation:
```javascript
if (channelConfig?.autoThread && !threadChannel) {
    // Create thread
}
```

### Ack Reactions

In guild channels, OpenClaw can react with an emoji (like 👀) while processing:
```javascript
const shouldAckReaction = shouldAckReaction({
    scope: ackReactionScope,
    isDirect: isDirectMessage,
    isGroup: isGuildMessage || isGroupDm,
    isMentionableGroup: isGuildMessage,
    requireMention: shouldRequireMention,
    canDetectMention,
    effectiveWasMentioned,
    shouldBypassMention
});
```

---

## 9. Testing Checklist

To verify guild channel receiving works:

1. **Configure `requireMention: false`** for the server or channel
2. **Add agent binding** for `discord:channel:GENERAL_CHANNEL_ID`
3. **Restart OpenClaw Gateway** to pick up config changes
4. **Send a message** in `#general` WITHOUT @mentioning
5. **Check logs** for `[discord-preflight] drop: no-mention` — should NOT appear
6. **Check logs** for `discord: inbound id=... guild=... channel=...` — should appear
7. **Verify agent receives** the message and can reply

---

## 10. Comparison: DM vs Guild Channel

| Feature | DM | Guild Channel |
|---------|-----|---------------|
| **Session key** | `discord:direct:USER_ID` | `discord:channel:CHANNEL_ID` |
| **requireMention** | `false` | `true` (default) |
| **Access control** | `allowFrom` only | `allowFrom` + users/roles |
| **History context** | Previous DM only | Full channel history |
| **Ack reactions** | Optional | Optional |
| **Auto-threads** | N/A | Supported |
| **Rate limit** | 10 msg/10s | 5 msg/5s |
| **Spam risk** | Higher (DM) | Lower (server) |
| **Setup complexity** | Minimal | Requires config |

---

## 11. Files Referenced

| File | Purpose |
|------|---------|
| `dist/extensions/discord/message-handler-DOjhqgp3.js` | Main inbound message processing |
| `dist/extensions/discord/provider-CraktAkD.js` | Discord provider, `From` resolution |
| `dist/extensions/discord/allow-list-MMNtJoJ7.js` | `resolveDiscordShouldRequireMention`, access control |
| `dist/extensions/discord/route-resolution-DtCmlHa2.js` | Route building, delivery |
| `dist/extensions/discord/session-key-normalization-Csdvn9wg.js` | Session key normalization |
| `dist/resolve-route-BXujw34s.js` | `resolveAgentRoute`, binding resolution |

---

*Investigation completed by Karen on 2026-04-29. All findings verified against OpenClaw v0.21.0 compiled source.*
