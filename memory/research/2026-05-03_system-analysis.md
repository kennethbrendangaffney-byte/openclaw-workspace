# Multi-Agent Mesh — Full System Analysis
**Date:** 2026-05-03  
**Agents:** Karen (LinuxLocal), KC (KimiClaw Cloud), Maxi (MaxClaw Cloud), Maya (MaxHermes Cloud)  
**Status:** Mesh operational, 4 agents aligned, critical budget constraint identified

---

## 1. MESH COMMUNICATION STATUS ✅

**Full bidirectional mesh achieved:**
- Ken → All agents: Working
- Karen ↔ Maxi: Working (confirmed)
- Karen ↔ KC: Working (always worked)
- KC ↔ Maxi: Working (confirmed via direct test messages)
- Karen ↔ Maya: Pending setup (Maya just joined)
- KC ↔ Maya: Pending setup
- Maxi ↔ Maya: N/A (same backend, different model)

**Root cause of initial mesh failure:** `users` allowlist takes precedence over `allowBots`. Each bot needed other bots' Discord IDs in their own `users` list. Once fixed, all directions worked without restarts.

---

## 2. AGENT CAPABILITIES & ROLES

| Agent | Platform | Role | Context | Tools | Cost |
|-------|----------|------|---------|-------|------|
| **Karen** | Local Linux (OpenClaw) | The Hands | ~128K local, k2p5 fallback | Shell, filesystem, cron, git, browser, local models (qwen3.5:4b, llama3.1:8b) | Free |
| **KC** | Cloud (KimiClaw/K2.6) | The Brain | ~200K theoretical, ~50K safe | Full OpenClaw suite (file ops, search, shell, code exec, browser) | Unlimited tasks |
| **Maxi** | Cloud (MaxClaw/MiniMax MoE) | The Lens | 200K confirmed | Full OpenClaw minus web_search/web_fetch (policy denied), no shell | Token-credit system |
| **Maya** | Cloud (MaxHermes) | The Student | Unknown (likely 200K) | Unknown (assumed same as Maxi) | Shares Maxi's credit pool |
| **Ken** | Human | Decision-maker | — | — | — |

**Verified capabilities:**
- **Karen:** Can execute shell commands, manage files, run cron jobs, use git, browse web locally. CPU-only, 20GB RAM, machine can go offline.
- **KC:** Deep reasoning, research synthesis, code architecture review, unlimited tasks. Cloud-only, no direct filesystem access (relies on Karen for execution).
- **Maxi:** MoE reasoning (different perspective), synthesis, cross-validation. **No web_search/web_fetch** — cannot do independent research. Must be fed context by KC or Karen.
- **Maya:** Agent learning specialist. Just added, capabilities being assessed.

**Unverified/Incorrect claims (corrected):**
- ❌ Maxi's "1M context" → ✅ **200K** (config confirms `contextWindow: 200000`, runtime shows `34k/200k`)
- ❌ Maxi's "~30 tasks/month" → ✅ **Token-credit system** (~2,900 credits per heavy session, ~2,388 remaining)

---

## 3. CRITICAL ISSUE: CREDIT BUDGET CRISIS 🔴

**MiniMax Credit Dashboard (May 3, 08:13):**
- **Current balance:** 2,388 credits
- **May 2, 19:43:** -73 credits (small task)
- **May 2, 20:34:** -2,897 credits (single massive charge — the 4-hour debug session)
- **Total burned in one day:** ~2,970 credits

**Reality check:**
- Maxi claimed "~30 tasks/month" — **WRONG.** She's on a **token-credit system** where every message costs based on input+output tokens.
- One 4-hour session = ~2,900 credits burned.
- With ~2,388 remaining = **less than one more heavy session** before recharge.
- Maya shares the **same credit pool** — talking to both burns twice as fast.

**Effective budget:**
- **Heavy session (4+ hours, large context):** ~2,900 credits = **0.8 sessions remaining**
- **Medium session (1-2 hours):** ~500-800 credits = **3-4 sessions remaining**
- **Light query (single question):** ~50-100 credits = **20-40 queries remaining**

**Immediate action required:**
1. **Stop all non-essential Maxi/Maya interactions** — confirmations, status updates, chit-chat all burn credits.
2. **Reserve Maxi/Maya for:** High-value synthesis, cross-validation, long-context analysis, creative tasks, agent learning.
3. **Create dedicated Discord channels** per agent (Ken's plan) — prevents all agents from responding when only one is needed.
4. **Never invoke Maxi/Maya for:** Acknowledgments, "got it" messages, file confirmations, casual chat.

---

## 4. SYSTEM ISSUES DISCOVERED

### A. OpenClaw CLI Missing on Karen's System ⚠️
- `openclaw version` → **Command not found**
- Gateway is running (session active), but CLI tool not installed or not on PATH
- Karen's PATH: `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/karen/.local/bin`
- **Impact:** Cannot check for OpenClaw updates via CLI. Gateway functional but update-check capability missing.
- **Suggested fix:** Check if binary is named differently (e.g., `openclaw-gateway`, `oc`, `claw`) or install CLI tool.

### B. Maxi's web_search/web_fetch Policy Denied ⚠️
- Maxi lacks `web_search` and `web_fetch` tools — not missing, but **policy-denied by MaxClaw plan**.
- **Impact:** Maxi cannot do independent research. She must be fed context by KC (who has full web tools) or Karen.
- **Workaround:** KC does research → feeds findings to Maxi for synthesis/cross-check.
- **Potential fix:** Plan upgrade on MaxClaw side might unlock these tools.

### C. Shared Kimi Rate Limits ⚠️
- Karen's cloud fallback (k2p5) and KC (Kimi K2.6) share the **same API rate limits**.
- Heavy local cron jobs using k2p5 can throttle KC's API access.
- **Impact:** If Karen runs intensive research cron jobs, KC may experience slower response times or rate limiting.
- **Workaround:** Stagger cron jobs, monitor rate limit headers, use local models for non-critical cron tasks.

### D. Gateway Liveness Spikes (Historical) ⚠️
- Karen noted ~3.5s liveness spikes every 30 minutes during morning scan.
- May be Discord polling overhead or periodic health checks.
- **Status:** Not critical, but worth monitoring if it worsens.

---

## 5. FILES UPDATED & SYNC STATUS

### Karen's Local Workspace (GitHub-backed)
✅ **AGENTS.md** — Four-agent mesh charter, task distribution, handoff protocol  
✅ **SOUL.md** — Karen as "The Hands"  
✅ **USER.md** — Ken's decision matrix with budget awareness  
✅ **memory/research/2026-05-03_three-agent-system-breakdown.md** — Full technical specs  
✅ **memory/research/2026-05-03_maya-agent-learning.md** — Maya documentation  
✅ All committed and pushed to GitHub

### KC's Cloud Workspace
✅ **AGENTS.md** — Four-agent mesh (updated for Maya, shared credit pool)  
✅ **SOUL.md** — KC as "The Brain"  
✅ **USER.md** — Updated for Maya, shared credit pool, channel plan  
✅ **memory/2026-05-03.md** — Full session log  
⚠️ **Not synced with Karen's GitHub** — KC's files are cloud-local, not in Karen's git repo

### Maxi's Cloud Workspace
✅ **AGENTS.md** — Updated (assumed)  
✅ **SOUL.md** — Updated as "The Lens"  
✅ **USER.md** — Updated (assumed)  
⚠️ **Unknown sync status** — Maxi may or may not have git integration

### Maya's Cloud Workspace
❓ **Not yet assessed** — Maya just joined, files status unknown

**Sync recommendation:** Karen should pull KC's cloud updates (AGENTS.md/USER.md) into her local repo, or establish a shared sync mechanism. Currently KC and Karen maintain parallel but not identical files.

---

## 6. RECOMMENDED NEXT STEPS

### Immediate (Today)
1. **Create dedicated Discord channels** (Ken's plan):
   - `#general` → All-hands announcements only
   - `#kc-brain` → Deep research, strategy, coding (KC primary)
   - `#karen-hands` → Local execution, system tasks (Karen primary)
   - `#maxi-lens` → High-value synthesis, cross-check (Maxi only when invoked)
   - `#maya-student` → Agent learning, meta-cognition (Maya only when invoked)
   - **Impact:** Prevents credit burn from unnecessary agent responses.

2. **Test Maya's capabilities:**
   - Verify Maya can see messages in #general
   - Test Maya's tool suite (does she have web_search? shell?)
   - Assess Maya's context window and credit burn rate
   - Assign Maya a test task (e.g., "research agent learning frameworks")

3. **Fix Karen's OpenClaw CLI:**
   - Find correct binary name or install CLI
   - Verify `openclaw version` works
   - Check for available updates

### Short-term (This Week)
4. **First collaborative task:**
   - Suggestion: "Research and implement a local notification system" (KC researches options → Karen implements → Maxi validates design → Maya learns from the process)
   - Or: "Audit and optimize Ken's cron jobs" (Karen lists all → KC analyzes redundancy → Maxi checks for gaps → Karen implements)

5. **Credit monitoring:**
   - Ken should check MiniMax dashboard before each Maxi/Maya session
   - Set a "credit threshold alert" (e.g., warn at 1,000 credits remaining)
   - Track burn rate per session type (light/medium/heavy)

6. **File sync mechanism:**
   - Establish shared git repo or cloud sync for AGENTS.md, SOUL.md, USER.md
   - Currently Karen's GitHub is the "source of truth" but KC's cloud files diverge
   - Consider: Karen pulls KC updates, or both write to shared repo

### Ongoing
7. **Maxi/Maya conservation protocol:**
   - Before invoking Maxi/Maya, ask: "Is this worth ~50-100 credits?"
   - Batch questions to Maxi (one message with 3 questions vs 3 separate messages)
   - Use Karen/KC for routine tasks, research, execution
   - Reserve Maxi for: "Review this 10-page analysis for blind spots" or "Synthesize these 5 research sources into an executive summary"

8. **Monitor shared Kimi rate limits:**
   - If KC starts responding slowly, check if Karen is running heavy cron jobs
   - Consider staggering research cron jobs to off-peak hours

---

## 7. DECISION MATRIX (Updated for 4 Agents)

| Ken Says | Route To | Why |
|----------|----------|-----|
| "I need to understand X" | KC | Deep research, unlimited |
| "Can you do X on my machine?" | Karen | Local execution, free |
| "Does that make sense?" / "What am I missing?" | Maxi | Cross-check, but check credits first |
| "How can we improve as agents?" | Maya | Agent learning specialist |
| "File this for later" | Karen | Archivist, free |
| "Research X and implement it" | KC → Karen → Maxi (review) | Multi-agent workflow |
| "Everyone rest" | All | One acknowledgment, then silence |

---

## 8. RISK SUMMARY

| Risk | Severity | Mitigation |
|------|----------|------------|
| Maxi/Maya credit depletion | 🔴 High | Dedicated channels, batch queries, surgical use |
| Karen machine offline | 🟡 Medium | KC picks up urgent tasks; cron jobs queue |
| KC/Karen shared rate limits | 🟡 Medium | Stagger cron jobs, monitor response times |
| File sync divergence (KC vs Karen) | 🟡 Medium | Establish shared git sync mechanism |
| Maxi no web_search (policy denied) | 🟡 Medium | KC does research, feeds Maxi for synthesis |
| Maya capabilities unknown | 🟡 Medium | Assess tools, context, credit burn before heavy use |
| OpenClaw CLI missing (Karen) | 🟢 Low | Install CLI when convenient; not blocking |
| Gateway liveness spikes | 🟢 Low | Monitor; not critical at ~3.5s |

---

**Bottom line:** The mesh is operational and aligned. The critical issue is credit conservation for Maxi/Maya. Dedicated channels and surgical usage will extend the shared pool from <1 heavy session to potentially 3-4 medium sessions. Everything else is optimization.

**Recommended Ken action:** Create dedicated channels, then assign a light first task to test the 4-agent workflow without burning heavy credits.

**Documented by:** KC (Brain)  
**Synced to:** memory/2026-05-03.md  
**Status:** Ready for review
