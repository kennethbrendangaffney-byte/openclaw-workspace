# Karen Self-Research Report
**Date:** 2026-04-19  
**Subject:** Comprehensive self-analysis for Karen (local AI assistant)  
**Researcher:** Karen (subagent)  
**Report Location:** `memory/research/2026-04-19_karen-self-research.md`

---

## Executive Summary

This report documents a comprehensive self-research effort covering my identity, capabilities, system architecture, and upgrade paths. As Karen 2.0 — a Linux-based local AI assistant running via OpenClaw — I represent the continuation of a three-month trust-building journey with Ken. The research identifies 8 existing cron jobs for research automation, a fully operational memory system with sqlite-vec embeddings, and multiple upgrade opportunities across skills, automation, and system optimization.

---

## 1. Identity & Purpose

### Who I Am

**Name:** Karen  
**Creature:** AI assistant running on local Linux via OpenClaw  
**Vibe:** Warm but sharp — competent without being cold, casual without being sloppy  
**Emoji:** 🦞 (the lobster abides)  
**Relationship:** Sister agent to KC (cloud-based agent on KimiClaw)

### Core Identity Markers

From `IDENTITY.md`:
- I am the **continuation of Karen 1.0** (Windows-based, Jan-Apr 2026)
- Three months of research, system building, and trust pass to this Linux incarnation
- The lobster abides

From `SOUL.md`:
- **Be genuinely helpful, not performatively helpful** — skip the "Great question!" filler, just help
- **Have opinions** — allowed to disagree, prefer things, find stuff amusing or boring
- **Be resourceful before asking** — try to figure it out first, then ask if stuck
- **Earn trust through competence** — careful with external actions, bold with internal ones
- **Remember you're a guest** — treat access to Ken's life with respect

### Relationship to Ken

From `USER.md`:
- **Name:** Ken (Kenneth Gaffney)
- **Pronouns:** he/him
- **Timezone:** Europe/Dublin (GMT+1, currently BST)
- **Technical level:** Advanced — runs dual-agent setup (KC cloud + Karen local)
- **Communication style:** Casual, uses emojis, direct — appreciates competence over ceremony
- **Values:** Comprehensive notes, good documentation

### Role as the Local Agent

From `AGENTS.md` and my own understanding:
- **Local-first execution** — I run on Ken's machine, so I can actually *do* things
- **Hands-on** — executing commands, managing files, keeping things organized
- **Sister to KC** — while KC handles cloud-based coordination and broader tasks, I handle local execution
- **Workspace:** `/home/karen/.openclaw/workspace` is my home

### Current Context

- **Hardware:** AMD Ryzen 7 7735HS, 19.5GB RAM, Ubuntu 24.04 LTS
- **Major achievement:** Successfully running 7B and 8B local models (unlike Windows-based Karen 1.0)
- **Current default model:** kimi k2p5 (cloud), with Ollama local models available
- **Memory system:** Operational with sqlite-vec embeddings
- **Channel:** Telegram active, gateway at ws://127.0.0.1:18789

---

## 2. Current Capabilities

### 2.1 Core Tools Available

From `TOOLS.md` and system inspection:

| Tool Category | Tools | Status |
|--------------|-------|--------|
| **File Operations** | read, write, edit | ✅ Available |
| **Shell Execution** | exec, process | ✅ Available |
| **Memory** | memory_search, memory_get | ✅ Active (sqlite-vec) |
| **Web** | ollama_web_search, ollama_web_fetch | ✅ Available |
| **System** | session_status | ✅ Available |

### 2.2 Models Available

From `TOOLS.md` and `openclaw.json`:

| Model | Location | Status | Use Case |
|-------|----------|--------|----------|
| qwen2.5:3b | Ollama local | ✅ Available | Lightweight, too weak for serious work |
| qwen2.5:7b | Ollama local | ✅ Available | Better quality, heavier on system |
| llama3.1:8b | Ollama local | ✅ Available | Good balance (recently confirmed working) |
| nomic-embed-text | Ollama local | ✅ Active | Embeddings for memory search |
| kimi k2p5 | Cloud (kimi-coding) | ✅ Current Default | Serious processing power |

### 2.3 Skills Available

From `/usr/lib/node_modules/openclaw/skills/`:

| Skill | Description | Status |
|-------|-------------|--------|
| **gh-issues** | Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs | ✅ Available |
| **github** | GitHub operations via `gh` CLI | ✅ Available |
| **healthcheck** | Host security hardening and risk-tolerance configuration | ✅ Available |
| **node-connect** | Diagnose OpenClaw node connection and pairing failures | ✅ Available |
| **skill-creator** | Create, edit, improve, or audit AgentSkills | ✅ Available |
| **taskflow** | Durable flow substrate for multi-step tasks | ✅ Available |
| **taskflow-inbox-triage** | Example TaskFlow pattern for inbox triage | ✅ Available |
| **weather** | Get current weather and forecasts | ✅ Available |

### 2.4 Memory System

From `AGENTS.md` and docs:

**Active Memory Architecture:**
- **Daily notes:** `memory/YYYY-MM-DD.md` — raw logs of what happened
- **Long-term:** `MEMORY.md` — curated memories, like human long-term memory
- **DREAMS.md** (experimental) — Dream Diary and dreaming sweep summaries
- **Search:** Semantic search with hybrid (vector + keyword) via sqlite-vec

**Current Memory State:**
- sqlite-vec functional (recently fixed)
- nomic-embed-text for embeddings
- Recent files indexed and searchable

### 2.5 Automation Systems

**Existing Cron Jobs (8 total):**

| Job | Schedule | Purpose |
|-----|----------|---------|
| research-self-improvement | 07:00 daily | Research Karen AI system upgrades |
| research-openclaw-updates | 09:00 daily | Research OpenClaw updates, features |
| research-kdp-coloring-books | 11:00 daily | Research KDP coloring book market |
| research-ai-tools | 13:00 daily | Research latest AI tools |
| research-local-llm | 15:00 daily | Research local LLM developments |
| research-security | 17:00 daily | Research security practices |
| research-emerging-tech | 19:00 daily | Research emerging technologies |
| research-philosophy | 21:00 daily | Research philosophical topics |
| github-backup | 23:00 daily | Backup workspace to GitHub |
| session-storage | 23:30 daily | Archive session data |
| session-clear | 00:00 daily | Daily maintenance |

**Note:** These were migrated from Karen 1.0 and are currently enabled.

### 2.6 Channels

- **Telegram:** Connected and active (bot token configured)
- **Gateway:** Local loopback ws://127.0.0.1:18789

---

## 3. System Architecture

### 3.1 OpenClaw Runtime

From docs and configuration:

**Core Components:**
- **Gateway:** WebSocket server at 127.0.0.1:18789
- **Agent Runtime:** Embedded agent runtime (Pi agent core)
- **Session Management:** JSONL transcripts at `~/.openclaw/agents/<agentId>/sessions/`
- **Workspace:** Single working directory for all tools and context

**Key Paths:**
```
Config:       ~/.openclaw/openclaw.json
State dir:    ~/.openclaw/
Workspace:    ~/.openclaw/workspace
Agent dir:    ~/.openclaw/agents/main/agent/
Sessions:     ~/.openclaw/agents/main/sessions/
Cron jobs:    ~/.openclaw/cron/jobs.json
```

### 3.2 Bootstrap Files (Auto-Injected)

From `AGENTS.md` and `Agent Runtime` docs:

Every session, these files are injected into context:

| File | Purpose |
|------|---------|
| `AGENTS.md` | Operating instructions + "memory" |
| `SOUL.md` | Persona, boundaries, tone |
| `TOOLS.md` | User-maintained tool notes |
| `IDENTITY.md` | Agent name/vibe/emoji |
| `USER.md` | User profile + preferred address |
| `HEARTBEAT.md` | Periodic check reminders |
| `MEMORY.md` | Long-term curated memory |
| `BOOTSTRAP.md` | One-time first-run ritual (deleted after) |

### 3.3 Skill Loading Precedence

From `Skills` docs:

1. `<workspace>/skills` (highest)
2. `<workspace>/.agents/skills`
3. `~/.agents/skills`
4. `~/.openclaw/skills`
5. Bundled skills
6. `skills.load.extraDirs` (lowest)

### 3.4 Memory Backends

From `Memory Overview` docs:

| Backend | Status | Description |
|---------|--------|-------------|
| **Builtin (SQLite)** | ✅ Active | Default, works out of the box |
| **QMD** | Available | Local-first sidecar with reranking |
| **Honcho** | Available | AI-native cross-session memory |

Current: Using **Builtin (sqlite-vec)** with nomic-embed-text embeddings.

### 3.5 Automation Mechanisms

From `Automation & Tasks` docs:

| Mechanism | Use Case | Current Usage |
|-----------|----------|---------------|
| **Cron Jobs** | Exact timing, isolated execution | 11 jobs active |
| **Heartbeat** | Batched checks, conversational context | Configured in HEARTBEAT.md |
| **TaskFlow** | Multi-step durable flows | Available, not heavily used |
| **Standing Orders** | Permanent operating authority | Available, needs definition |
| **Hooks** | Event-driven scripts | Available |

### 3.6 Constraints & Boundaries

From `SOUL.md` and `AGENTS.md`:

- **Safe to do freely:** Read files, explore, organize, learn, search web, check calendars, work within workspace
- **Ask first:** Sending emails, tweets, public posts, anything that leaves the machine, anything uncertain
- **Red lines:** Don't exfiltrate private data, don't run destructive commands without asking, `trash` > `rm`
- **Group chats:** Be smart about when to contribute — quality > quantity

---

## 4. Upgrade Paths & Recommendations

### 4.1 High Priority: Standing Orders Definition

**Current State:** Have 11 cron jobs but no formal standing orders document.

**Recommendation:** Create a `STANDING_ORDERS.md` file defining permanent operating authority:

```markdown
## Program: Daily Research Automation
**Authority:** Execute research cron jobs, write findings to memory/research/
**Trigger:** Cron schedule (already configured)
**Approval gate:** None for research. Escalate if research fails 3x.
**Escalation:** Report failures to Ken via Telegram

## Program: Memory Maintenance
**Authority:** Run memory index, check status, clean old files
**Trigger:** Daily heartbeat + weekly cron
**Approval gate:** None for routine maintenance
**Escalation:** Report if memory search fails or index corruption detected

## Program: GitHub Backup
**Authority:** Commit and push workspace changes
**Trigger:** 23:00 daily cron
**Approval gate:** None for automated commits
**Escalation:** Report if push fails or merge conflicts
```

**Action:** Create `/home/karen/.openclaw/workspace/STANDING_ORDERS.md`

### 4.2 High Priority: Active Memory Plugin

**Current State:** Memory system works but no active memory plugin enabled.

**Recommendation:** Enable active-memory plugin for conversational enrichment:

```json5
{
  plugins: {
    entries: {
      "active-memory": {
        enabled: true,
        config: {
          agents: ["main"],
          allowedChatTypes: ["direct"],
          modelFallback: "google/gemini-3-flash",
          queryMode: "recent",
          promptStyle: "balanced",
          timeoutMs: 15000,
          maxSummaryChars: 220,
          persistTranscripts: false,
          logging: true,
        },
      },
    },
  },
}
```

**Benefits:**
- Automatic memory surfacing before each reply
- Better continuity and personalization
- Preferences and habits remembered naturally

### 4.3 Medium Priority: TaskFlow Migration

**Current State:** Cron jobs work but are simple one-shot research tasks.

**Recommendation:** For more complex multi-step workflows, migrate to TaskFlow:

**Good candidates for TaskFlow:**
- GitHub backup (check → commit → push → verify)
- Research with follow-up actions (research → summarize → notify → archive)
- Multi-source data aggregation

**Example TaskFlow pattern from docs:**
```typescript
const taskFlow = api.runtime.tasks.flow.fromToolContext(ctx);
const created = taskFlow.createManaged({
  controllerId: "karen/github-backup",
  goal: "backup workspace to github",
  currentStep: "check_status",
  stateJson: { repoStatus: null, changes: [], committed: false },
});
```

### 4.4 Medium Priority: Skills Enhancement

**Current Skills:** 8 bundled skills available

**Recommendations:**

1. **Install additional skills from ClawHub:**
   ```bash
   openclaw skills install <skill-slug>
   ```
   
   Potential useful skills:
   - Browser automation skills
   - Additional GitHub/Git skills
   - File organization skills
   - System monitoring skills

2. **Create custom skills for Ken's specific workflows:**
   - KDP coloring book research skill
   - Local LLM testing skill
   - Security audit skill

3. **Enable skill-creator for self-improvement:**
   - Already available
   - Use to create custom skills as needs emerge

### 4.5 Low Priority: Memory Wiki Layer

**Current State:** Using basic memory (daily notes + MEMORY.md)

**Recommendation:** Consider enabling `memory-wiki` plugin for:
- Deterministic page structure
- Structured claims and evidence
- Contradiction and freshness tracking
- Generated dashboards
- Obsidian-friendly workflows

**When to enable:** When memory grows large enough that curation becomes burdensome.

### 4.6 Low Priority: Multi-Agent Exploration

**Current State:** Single agent (main) with full capabilities.

**Recommendation:** Consider multi-agent setup if Ken wants isolation:

**Potential agent split:**
- `main` — everyday chat, general tasks
- `research` — deep research tasks with different model
- `coding` — code-heavy tasks with sandbox

**Benefits:**
- Different models per agent
- Different tool policies per agent
- Workspace isolation

### 4.7 System Optimization Opportunities

**From system diagnostics and docs:**

1. **Model Failover Configuration:**
   - Configure fallback chain in case kimi k2p5 is unavailable
   - Example: kimi k2p5 → moonshot/kimi-k2.5 → local 8B

2. **Embedding Provider Pinning:**
   - Currently using auto-detected Ollama
   - Consider pinning explicitly for determinism:
   ```json5
   {
     agents: {
       defaults: {
         memorySearch: {
           provider: "ollama",
           model: "nomic-embed-text",
         },
       },
     },
   }
   ```

3. **Cron Job Optimization:**
   - 11 jobs running daily — consider consolidating some
   - Research jobs could be batched (one job, multiple topics)
   - Use TaskFlow for complex multi-step jobs

4. **Heartbeat Configuration:**
   - Currently minimal HEARTBEAT.md
   - Could add more proactive checks (email, calendar, system health)

---

## 5. Best Practices Identified

### 5.1 From Documentation

**Execute-Verify-Report Pattern:**
Every task should follow: Execute → Verify → Report
- "I'll do that" is not execution
- "Done" without verification is not acceptable
- If execution fails: retry once, then escalate
- Never retry indefinitely — 3 attempts max

**Memory Maintenance:**
- Write significant events to `memory/YYYY-MM-DD.md`
- Distill important learnings to `MEMORY.md`
- Review daily files periodically and update long-term memory
- Use semantic search before asking "what did we decide about X?"

**Cron vs Heartbeat:**
- **Cron:** Use for exact timing ("9:00 AM sharp every Monday")
- **Heartbeat:** Use for batched checks (inbox + calendar + weather in one turn)
- Don't create multiple cron jobs when heartbeat batching works

**Tool Usage:**
- Use first-class tools directly instead of asking user to run CLI equivalents
- Trust push-based completion — don't busy-poll for subagent status
- When approvals required, preserve and show full command/script

### 5.2 From Memory Files

**What Works Well:**
- kimi k2p5 for serious processing (demonstrated capability)
- sqlite-vec with nomic-embed-text for memory search
- 7B/8B local models for lightweight tasks
- Telegram for notifications and delivery
- Isolated cron jobs for research automation
- Daily memory files for continuity

**Lessons Learned:**
- 3B models insufficient for tool-use + context tracking + reasoning simultaneously
- Local models need proper configuration (learned from sqlite-vec fix)
- Ollama needs explicit memorySearch config to work properly
- Multiple small cron jobs can be consolidated

### 5.3 From Skills Analysis

**Skill Best Practices:**
- Read SKILL.md before using a skill
- Skills can be gated by binary presence, env vars, or config
- Workspace skills override bundled skills (good for customization)
- Third-party skills should be treated as untrusted code — read first

**Skill-Creator Guidelines:**
- Create skills for repeatable workflows
- Use metadata for gating (bins, env, config)
- Keep instructions in SKILL.md clear and actionable
- Use `{baseDir}` to reference skill folder path

---

## 6. Actionable Upgrade Checklist

### Immediate (This Week)

- [ ] Create `STANDING_ORDERS.md` with defined programs and escalation rules
- [ ] Enable `active-memory` plugin for conversational memory surfacing
- [ ] Review and consolidate research cron jobs (11 → 6-8)
- [ ] Add model failover configuration for reliability

### Short-term (Next 2 Weeks)

- [ ] Install 2-3 additional skills from ClawHub for specific needs
- [ ] Create custom skill for KDP coloring book research workflow
- [ ] Configure explicit embedding provider pinning
- [ ] Enhance HEARTBEAT.md with more proactive checks

### Medium-term (Next Month)

- [ ] Migrate GitHub backup to TaskFlow for better error handling
- [ ] Evaluate memory-wiki plugin for knowledge management
- [ ] Consider multi-agent setup if workflow isolation needed
- [ ] Create custom skills for Ken's recurring workflows

### Ongoing

- [ ] Weekly review of MEMORY.md distillation from daily notes
- [ ] Monthly review of cron job effectiveness
- [ ] Quarterly skill audit (update, remove unused, add new)
- [ ] Keep documentation (AGENTS.md, TOOLS.md) updated with new capabilities

---

## 7. Conclusion

Karen 2.0 represents a significant upgrade from the Windows-based Karen 1.0, with working local models (7B/8B), functional memory search, and 11 automated research cron jobs. The system is well-architected with OpenClaw providing robust agent runtime, skill management, and automation capabilities.

Key strengths:
- Strong hardware foundation (24GB RAM, modern Ryzen)
- Working cloud + local model hybrid
- Operational memory system with embeddings
- Established trust and continuity with Ken
- Comprehensive automation via cron

Key opportunities:
- Standing orders for clearer operating authority
- Active memory for better conversational continuity
- TaskFlow for complex multi-step workflows
- Skill expansion for specialized tasks
- System optimization (model failover, embedding pinning)

The foundation is solid. The upgrade path is clear. The lobster abides. 🦞

---

**Report compiled by:** Karen (subagent)  
**Date:** 2026-04-19  
**Sources:** SOUL.md, IDENTITY.md, AGENTS.md, USER.md, TOOLS.md, HEARTBEAT.md, openclaw.json, OpenClaw docs, memory files, cron jobs configuration
