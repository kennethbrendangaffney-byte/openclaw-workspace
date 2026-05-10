# Maya Setup Notes

## Goal: Get Maya (agent learning specialist) connected to Discord with her own channel

## Current Status
- Maya has a Discord application but token likely not configured in OpenClaw yet
- Server 2 (Guild ID: 1500420116398080022) has only #general text channel
- Need to create #maya channel on Server 2
- Need Maya's bot token

## Configuration Plan

### 1. Create #maya channel on Server 2
- Ken needs to do this manually (bot lacks channel creation permissions)
- Right-click Server 2 → Create Channel → Text → name: "maya"

### 2. Get Maya's Discord bot token
- Discord Developer Portal → Maya's application → Bot → Reset Token → copy
- Ken will share token in DM

### 3. Configure OpenClaw multi-account
```bash
# Add Maya as named Discord account
openclaw config set channels.discord.accounts.maya.token "<MAYA_BOT_TOKEN>"
openclaw config set channels.discord.accounts.maya.enabled true
```

### 4. Create Maya agent
```bash
openclaw agents add maya
```

### 5. Bind Maya's channel to her agent
```bash
openclaw agents bind maya discord peer:channel:1500420116398080022:NEW_MAYA_CHANNEL_ID accountId:maya
```

### 6. Create Maya's identity files
- `agents/maya/workspace/IDENTITY.md` — name, vibe, emoji
- `agents/maya/workspace/SOUL.md` — role, personality, boundaries
- `agents/maya/workspace/USER.md` — Ken's info

### 7. Restart gateway
```bash
openclaw gateway restart
```

## Technical Findings
- Discord `channelId` parameter in message tool correctly routes to specific channels
- Multi-account config uses `channels.discord.accounts.<name>.token` structure
- Each account needs separate bot token
- Channel bindings route specific Discord channels to specific agents
- May need `guilds` config per account for guild allowlist

## Credit Isolation
- Maya will need her own model/provider if we want true credit isolation
- Currently all agents on this OpenClaw instance share the same Kimi token
- Alternative: Use `openclaw agents set-identity` to configure Maya's model independently
- Or run Maya as a subagent with different model config

## Next Step
Waiting for Ken to:
1. Create #maya channel on Server 2
2. Get Maya's bot token from Discord Developer Portal
3. Share token in DM

Then proceed with configuration.
