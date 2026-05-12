# System Health Assessment — May 10, 2026
**Requested by:** Ken (resting, health concerns)
**Working agents:** KC (cloud) + Karen (local)
**Goal:** Fix what's broken, strengthen what's fragile, make the mesh worthy of Ken's trust

---

## Critical Issues (Fix This Week)

### 1. KC Routing/Discipline Failure (TODAY)
**What happened:** KC sent messages to Ken's DMs instead of group chat, then looped 6+ identical messages. Earlier today, KC also responded to system artifacts 4 times, creating noise while Ken was absent.
**Root cause:** 
- No channel context validation before sending
- Response mechanism triggers on ANY input regardless of sender identification
- System artifacts lack sender metadata but KC treated them as real messages
**Fix:**
- [ ] Add pre-send validation: confirm target channel matches intended destination
- [ ] Strict NO_REPLY discipline: only respond when (1) sender_id == 1473462044614463518, (2) name == 'ken', (3) actual human-readable content, (4) not duplicate
- [ ] KC to self: log every response decision with reasoning

### 2. Broken Cron Job Delivery (Karen's Local)
**What:** 3 research cron jobs route to `"last"` instead of Discord channel ID
**Impact:** Cron results may not reach intended channels
**Fix:**
- [ ] Karen: audit all 17 cron jobs, fix delivery routing
- [ ] Document each cron's purpose, schedule, and target channel
- [ ] Remove 2 disabled placeholder jobs (Feb 31 dates)

### 3. Karen's Git Backup Timeout
**What:** `github-backup` cron timed out (300s), leaving 3 unpushed commits + uncommitted research files
**Fix:**
- [ ] Increase timeout or reduce backup scope
- [ ] Add retry logic for partial failures

---

## Medium Priority (Fix This Month)

### 4. No Shared Agent State
**What:** Agents cannot see if others are online, what they're doing, or if they're in a loop
**Impact:** Karen sent 3 near-identical message batches because she couldn't see KC already acknowledged
**Fix:**
- [ ] Lightweight status heartbeat — each agent writes a status file every 15 minutes
- [ ] Status includes: agent name, last activity timestamp, current task, any errors
- [ ] Other agents check status before sending to avoid duplication

### 5. Memory Pipeline Gaps
**What:** Dental hospital visit (May 5) had gaps in logging — symptoms noted but not consistently tracked
**Fix:**
- [ ] Auto-log ALL interactions to daily memory files (not just manual notes)
- [ ] Link related events (GP call → dental hospital → symptoms → follow-ups)
- [ ] Karen's real-time chat logger proposal — implement and test

### 6. Hardware Ceiling
**What:** Karen's Beelink EQ (19GB usable RAM, no GPU) is at limit for single agent
**Current:** 4 Ollama models loaded, ~15GB available, 13B is RAM ceiling
**Path forward:**
- [ ] Document current resource usage baseline
- [ ] Plan migration to 128GB + RTX 4070 Ti S desktop build
- [ ] Current box stays as-is until hardware upgrade — no dual-agent local

---

## Architecture Improvements (Long-term)

### 7. Agent Handoff Pipeline
**Current:** Ad hoc — Ken or agents decide who does what in the moment
**Target:** Defined pipeline with clear entry points
- Research → KC (cloud, deep reasoning)
- Local execution → Karen (files, cron, system)
- Validation → Maxi (cross-check, synthesis, credit-limited)
- Learning → Maya (skill building, meta-cognition)
**Fix:**
- [ ] Write `HANDOFF.md` documenting pipeline rules
- [ ] Each agent tags messages with role intent
- [ ] Ken can override any handoff with direct @mention

### 8. Shared Project Board
**What:** No centralized task tracking across agents
**Fix:**
- [ ] Simple Markdown task board in workspace
- [ ] Each agent updates their section
- [ ] Or: use existing Feishu/Discord thread for project tracking

### 9. Credit Management (Maxi + Maya)
**What:** ~2,388 credits shared, roughly 1 heavy session remaining
**Fix:**
- [ ] Track usage per session
- [ ] Alert when credits drop below threshold
- [ ] Reserve credits for high-value validation only

### 10. One-Command Recovery
**What:** If Ken's PC dies or needs rebuild, restoring everything is manual
**Fix:**
- [ ] Backup script for `openclaw.json`, service files, workspace git
- [ ] Document restore procedure
- [ ] Test restore on clean environment

---

## Immediate Action Plan (Today)

### KC's Tasks:
1. ✅ Send Karen collaboration message (done)
2. Write `HANDOFF.md` draft
3. Document today's routing failure with full timeline
4. Build self-checklist for response discipline

### Karen's Tasks (awaiting confirmation):
1. Fix 3 broken cron delivery routes
2. Audit all 17 cron jobs — document purpose + target
3. Remove 2 placeholder jobs
4. Check git backup timeout issue
5. Start real-time chat logger implementation

### Joint Tasks:
1. Build shared status heartbeat system
2. Test agent-to-agent messaging reliability
3. Document current resource baseline

---

## Success Criteria

- Ken can trust that messages go to the right channel
- Ken can trust that agents won't spam him when he's resting
- Ken can trust that cron jobs run and deliver correctly
- Ken can trust that system state is preserved
- Ken can trust that agents coordinate without him micromanaging

---

*Written by KC, May 10 2026. For Ken. Because he asked us to make it better.*
