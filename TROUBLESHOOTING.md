# Quick Troubleshooting Guide
**For Ken and Karen — May 10, 2026**

---

## "KC sent messages to wrong channel"

**What happened:** KC's response went to DMs instead of group chat (or vice versa)

**Immediate fix:**
- Ken: Reply "wrong channel" — KC will check delivery context and resend to correct channel
- KC: Before sending, validate `deliveryContext.to` matches intended target

**Prevention:**
- KC runs the Three Gates before every response (see `KC-DISCIPLINE.md`)
- Confirm `lastChannel` and `target` fields before sending

---

## "KC responded to system artifacts and spammed me"

**What happened:** Vague "send a message" prompts without sender metadata triggered KC

**Immediate fix:**
- KC: Delete mistaken messages immediately if possible
- KC: Resume NO_REPLY discipline

**Prevention:**
- KC only responds when sender_id == `1473462044614463518` and name == `ken`
- System artifacts = anything lacking sender metadata, content, or recipient
- See `KC-DISCIPLINE.md` Gate 1

---

## "Karen's cron jobs aren't delivering to Discord"

**What happened:** 3 research cron jobs route to `"last"` instead of channel ID

**Fix (Karen):**
```bash
# Check current routing
openclaw cron list

# For each broken job:
openclaw cron update {jobId} --delivery.to="1498801547214065876"

# Test manually:
openclaw cron run {jobId}
```

**Prevention:**
- See `cron-audit-checklist.md` for full audit procedure
- Document each cron's target channel in `TOOLS.md`

---

## "Git backup timed out / failed"

**What happened:** `github-backup` cron exceeded 300s timeout

**Fix (Karen):**
```bash
# Option 1: Increase timeout
openclaw cron update {jobId} --timeout=600

# Option 2: Reduce scope (exclude large files)
# Edit backup script to skip *.tar.gz, models/, etc.

# Option 3: Add retry
# Wrap git push in a retry loop
```

---

## "Agent not responding / seems offline"

**Checklist:**
1. Check agent status file: `workspace/status/{agent}.json`
2. If status is old (>30 min), agent might be:
   - **Karen:** Check if PC is on, gateway running (`openclaw gateway status`)
   - **KC:** Check Kimi API status (rarely down)
   - **Maxi/Maya:** Check credit pool (might be exhausted)
3. Try @mentioning directly to wake agent

---

## "Gateway won't start / keeps crashing"

**Fix (Karen, local only):**
```bash
# Check service status
systemctl --user status openclaw-gateway

# Check logs
tail -n 50 ~/.openclaw/logs/openclaw.log

# Common causes:
# - Port already in use: check `lsof -i :18789`
# - Bad config: validate `~/.openclaw/openclaw.json` with JSON linter
# - Plugin crash: disable recent plugins, restart one by one
```

---

## "Ollama model won't load / out of RAM"

**Fix (Karen, local only):**
```bash
# Check RAM usage
free -h

# Check what's loaded
ollama ps

# Unload unused models
ollama stop {model_name}

# If consistently out of RAM:
# - Don't load 13B+ models on Beelink EQ (19GB ceiling)
# - Use smaller models: qwen3.5:4b, llama3.1:8b
# - Wait for desktop upgrade (128GB + RTX 4070 Ti S)
```

---

## "Maxi/Maya not responding in Server 2"

**Checklist:**
1. Credits remaining? (shared pool ~2,388)
2. Did Ken @mention them directly? (they're thread-only)
3. Check if MaxClaw API is up
4. If credits exhausted: wait for recharge or use KC/Karen instead

---

## "I want all agents to be quiet / I'm resting"

**What to say:** "rest", "goodnight", or "quiet please"

**What happens:**
- All agents acknowledge once
- Then: absolute silence
- No heartbeats, no cron noise, no check-ins
- Agents only wake for genuine emergencies or if Ken initiates

**To resume:** Just send any message — agents will resume normal operation

---

## "Something broke and I don't know what"

**Emergency reset (Karen, local):**
```bash
# 1. Restart gateway
systemctl --user restart openclaw-gateway

# 2. If still broken: check config
openclaw gateway status

# 3. If config corrupted: restore from backup
cp ~/.openclaw/workspace/backups/{date}/openclaw.json ~/.openclaw/

# 4. If completely stuck: ask KC for help in DMs
# (KC can guide through recovery remotely)
```

---

*Keep this handy. Most issues have a one-line fix once you know what to look for.*
