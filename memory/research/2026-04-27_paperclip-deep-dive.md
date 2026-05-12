# Paperclip Deep Dive — Technical Analysis

**Date:** April 27, 2026
**Purpose:** Evaluate Paperclip as potential orchestration layer for Karen/Ken setup
**Sources:** paperclip.ing, GitHub repo, technical blogs, comparison articles

---

## Executive Summary

Paperclip is an open-source (MIT) Node.js server + React UI that acts as a **"company control plane"** for AI agents. It's not an agent itself — it's the management layer that coordinates multiple agents (OpenClaw, Claude, Codex, Cursor, etc.) toward business goals.

**Key insight:** Paperclip and OpenClaw are **complementary, not competitive**. Paperclip's own docs say: *"OpenClaw is an employee, Paperclip is the company."*

---

## Technical Architecture

### Core Stack
- **Runtime:** Node.js 20+ with pnpm 9.15+
- **Database:** Embedded PostgreSQL (bundled, no separate install)
- **UI:** React-based dashboard
- **API:** RESTful with JWT authentication
- **Storage:** Local filesystem (~/.paperclip/instances/default/)
- **Port:** 3100 (configurable)

### System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    PAPERCLIP SERVER                          │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │ Identity  │ │ Work &    │ │ Heartbeat │ │ Governance│  │
│  │ & Access  │ │ Tasks     │ │ Execution │ │& Approvals│  │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │ Org Chart │ │Workspaces │ │ Plugins   │ │ Budget  │  │
│  │ & Agents  │ │ & Runtime │ │           │ │ & Costs │  │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │ Routines  │ │ Secrets & │ │ Activity  │ │ Company │  │
│  │& Schedules│ │ Storage   │ │ & Events  │ │Portability│ │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
└──────────────────────────────────────────────────────────────┘
         ▲           ▲           ▲           ▲
   ┌─────┴─────┐ ┌─────┴─────┐ ┌─────┴─────┐ ┌─────┴─────┐
   │  Claude   │ │   Codex   │ │   CLI     │ │  HTTP/web │
   │   Code    │ │           │ │  agents   │ │   bots    │
   └───────────┘ └───────────┘ └───────────┘ └───────────┘
   │ Cursor    │ │  Bash     │ │ OpenClaw  │ │  Custom   │
   └───────────┘ └───────────┘ └───────────┘ └───────────┘
```

### Key Components

1. **Identity & Access**
   - Two deployment modes: trusted local or authenticated
   - Board users, agent API keys, short-lived run JWTs
   - Company memberships with invite flows
   - Every mutating request traced to an actor

2. **Org Chart & Agents**
   - Agents have roles, titles, reporting lines, permissions
   - Budgets per agent
   - Adapters: Claude Code, Codex, Cursor, Bash, HTTP, OpenClaw
   - "If it can receive a heartbeat, it's hired"

3. **Work & Task System**
   - Issues carry company/project/goal/parent links
   - Atomic checkout with execution locks (no double-work)
   - Blocker dependencies, comments, documents, attachments
   - Work products, labels, inbox state

4. **Heartbeat Execution**
   - DB-backed wakeup queue with coalescing
   - Budget checks before execution
   - Workspace resolution and secret injection
   - Skill loading and adapter invocation
   - Structured logs, cost events, session state, audit trails
   - Recovery handles orphaned runs automatically

5. **Governance & Approvals**
   - Board approval required for hiring new agents
   - CEO strategy requires board review
   - Pause/terminate any agent at any time
   - Config changes are revisioned with rollback capability

6. **Budget & Cost Control**
   - Monthly budgets per agent
   - Token tracking per task/project/goal
   - Throttling when budgets exhausted
   - Cost tracking surfaces which agents are expensive

---

## How Paperclip Compares to Current Setup

### Current Architecture (Ken's Setup)

```
Ken (Human)
    │
    ├── OpenClaw Gateway (local)
    │       └── Karen (main agent)
    │             ├── MEMORY.md (long-term memory)
    │             ├── SOUL.md (identity)
    │             ├── memory/YYYY-MM-DD.md (daily notes)
    │             ├── STATE.json (shared state)
    │             ├── cron jobs (17 active)
    │             ├── skills (computer-use, web search, etc.)
    │             └── Telegram delivery
    │
    └── KC (cloud agent, separate system)
```

### Paperclip Architecture (Conceptual for Ken)

```
Ken (Board of Directors)
    │
    └── Paperclip Dashboard (localhost:3100)
            ├── Company: "Ken's Life OS"
            │       ├── CEO Agent (Claude/Strategic)
            │       ├── CTO Agent (Karen/OpenClaw)
            │       ├── CMO Agent (KC/Cloud)
            │       ├── Health Agent
            │       └── Finance Agent
            │
            ├── Org Chart with reporting lines
            ├── Budget: €X/month per agent
            ├── Goals cascade: Life Mission → Projects → Tasks
            ├── Heartbeats schedule per agent
            ├── Ticket system for all work
            └── Audit log of every decision
```

### Detailed Comparison

| Aspect | Current Setup | Paperclip |
|--------|--------------|-----------|
| **Primary Unit** | Single agent (Karen) | Multi-agent organization |
| **Identity** | SOUL.md + MEMORY.md | Org chart + roles + titles |
| **Memory** | File-based (markdown) | Database + task context |
| **Scheduling** | Cron (17 jobs) | Heartbeats per agent |
| **Cost Tracking** | Manual (check API usage) | Built-in per agent/month |
| **Governance** | "Ask first" rules | Board approval workflows |
| **Task Management** | Cron jobs + memory files | Ticket system with dependencies |
| **Multi-Agent** | Karen + KC (separate) | Unified org chart |
| **Dashboard** | Telegram chat | React web UI |
| **Autonomy Level** | High (Karen decides what to do) | Managed (agent executes assigned tasks) |
| **Goal Alignment** | STATE.json (manual) | Automatic goal cascade |
| **Audit Trail** | Git history + memory files | Immutable audit log |
| **Mobile Access** | Telegram app | Mobile-ready web UI |

---

## Key Differences in Philosophy

### OpenClaw (Current): "Radical Autonomy"
Karen's daily cycle:
1. Wake up (heartbeat/cron trigger)
2. Read SOUL.md → recall identity
3. Read MEMORY.md → long-term context
4. Check daily notes → recent activity
5. Review HEARTBEAT.md → scheduled checks
6. **Decide what to do** — unprompted

**Source:** *"The agent isn't responding to a queue of assigned tasks. It's evaluating its environment and making decisions about what matters right now."* (Flowtivity comparison)

### Paperclip: "Managed Coordination"
Agent's daily cycle:
1. Receive task assignment through dashboard
2. Execute within budget/governance constraints
3. Report results back
4. Wait for next assignment or escalate

**Source:** *"The intelligence about what to do lives in the orchestration layer, not in the agent itself."* (Flowtivity comparison)

---

## Setup Requirements

### Minimum Requirements
- **Node.js:** 20 or higher
- **Package Manager:** pnpm 9.15+ (npm install -g pnpm)
- **LLM API Key:** Anthropic (Claude), OpenAI, or local model
- **Storage:** ~500MB for embedded PostgreSQL + logs
- **RAM:** ~2GB for server + UI

### Installation (2 Options)

**Option 1 — Fastest (one command):**
```bash
npx paperclipai onboard --yes
```
- Downloads CLI, runs wizard with defaults
- Embedded PostgreSQL, port 3100, no auth
- Server starts automatically

**Option 2 — Clone repo:**
```bash
git clone https://github.com/paperclipai/paperclip.git
cd paperclip
pnpm install
pnpm dev
```
- Full source access
- Development mode with watch
- Can modify and contribute

### Post-Install Structure
```
~/.paperclip/instances/default/
├── config.json          # Server, DB, storage config
├── db/                  # Embedded PostgreSQL data
├── secrets/master.key   # Encryption for API credentials
└── logs/                # Server logs
```

**Important:** All data stays local. No cloud service called at install. Can run offline except when agents call LLM APIs.

---

## Integration with OpenClaw

### Current Status
Paperclip has explicit **OpenClaw adapter support**:
- Listed as supported adapter in docs
- `openclaw_gateway` connection type
- Heartbeat-based integration
- Can orchestrate OpenClaw agents alongside Claude, Codex, etc.

### How Integration Would Work

```
Paperclip (Orchestration Layer)
    ├── Agent: "CTO" → Adapter: openclaw_gateway
    │       └── Connects to → OpenClaw Gateway (local)
    │               └── Karen executes tasks
    │                       └── Returns results to Paperclip
    │
    ├── Agent: "CMO" → Adapter: claude_local
    │       └── KC (cloud) via Claude API
    │
    └── Agent: "Health Monitor" → Adapter: openclaw_gateway
            └── Karen cron jobs via Paperclip scheduling
```

### Integration Steps (Hypothetical)
1. Install Paperclip alongside OpenClaw
2. Configure OpenClaw adapter in Paperclip
3. Point to local gateway (ws://127.0.0.1:18789)
4. Karen receives tasks via Paperclip heartbeats instead of cron
5. Results reported back to Paperclip dashboard

---

## Advantages for Ken's Use Case

### 1. Multi-Agent Coordination
**Current problem:** Karen (local) and KC (cloud) operate separately. No unified coordination.
**Paperclip solution:** Both agents in same org chart with defined roles and handoffs.

### 2. Cost Control
**Current problem:** Kimi API usage tracked manually. Risk of runaway costs.
**Paperclip solution:** Budget per agent. When hit, agent stops automatically.

### 3. Governance
**Current problem:** "Ask first" rules are informal. No approval workflow.
**Paperclip solution:** Board approval for hires, strategy changes, high-cost actions.

### 4. Task Management
**Current problem:** 17 cron jobs, hard to track what's running when.
**Paperclip solution:** Ticket system with status, dependencies, full traceability.

### 5. Mobile Dashboard
**Current problem:** Managing via Telegram chat. No overview.
**Paperclip solution:** React dashboard accessible from phone/browser.

### 6. Goal Alignment
**Current problem:** STATE.json is manual. No automatic goal cascade.
**Paperclip solution:** Company mission → Projects → Agent goals → Tasks, all linked.

---

## Disadvantages / Concerns

### 1. Added Complexity
**Current:** Simple file-based system. Git for version control.
**Paperclip:** Additional Node.js service, PostgreSQL, web UI, auth layer.

### 2. Different Autonomy Model
**Current:** Karen is self-directed. Makes own decisions.
**Paperclip:** Karen becomes task executor. Loses some autonomy.

### 3. Resource Overhead
**Current:** OpenClaw + Ollama run on 20GB RAM comfortably.
**Paperclip:** Additional ~2GB RAM, CPU for Node.js server + PostgreSQL.

### 4. Learning Curve
New system to learn, configure, maintain. Migration effort.

### 5. Maturity Risk
Paperclip is relatively new (launched ~early 2026). OpenClaw is more mature.

### 6. Potential Vendor Lock-in
While open-source, custom workflows built in Paperclip may be harder to migrate than simple cron jobs.

---

## The "Paperclip" Name Irony

Given our earlier study of the paperclip maximizer:

| Paperclip Maximizer (Bostrom) | Paperclip (the tool) |
|-------------------------------|------------------------|
| Single agent, unbounded goal | Multi-agent, bounded goals |
| No constraints | Budget limits, governance |
| No human oversight | Board approval required |
| Destroys everything | Coordinates agents safely |

**The tool is literally an anti-paperclip-maximizer system.** It implements the safety mechanisms the thought experiment says we need.

---

## Recommendation for Ken

### Short Term (Now — Sept 2026)
**Stick with current setup.** Reasons:
- System is working well (17 cron jobs, web search fixed, timeouts resolved)
- Adding complexity before CCT diploma starts is risky
- Current autonomy model suits Ken/Karen partnership
- Paperclip is new; let it mature

### Medium Term (Post-CCT, ~2027)
**Evaluate Paperclip for business automation.** When:
- Running multiple businesses (KDP, social media, etc.)
- Need coordination between 5+ agents
- Cost control becomes critical
- Ken's technical skills have grown

### Long Term (Trinity, ~2028+)
**Consider as orchestration layer.** When:
- Running full "agent company"
- Need governance for autonomous operations
- Portfolio of AI businesses

### Hybrid Approach (Immediate)
**Monitor Paperclip development.** Can:
- Star GitHub repo
- Join Discord community
- Test in sandbox environment
- Learn concepts without migrating

---

## Key Quotes from Sources

> "OpenClaw is an employee, Paperclip is the company." — Paperclip docs

> "The shift from 'I am prompting an AI' to 'I am managing a team' changes how you think about what you're building." — Paperclip landing page

> "Paperclip solves the coordination problem: how do you manage five, ten, or fifty AI agents working toward shared goals without chaos?" — Flowtivity

> "OpenClaw optimises for depth of individual agent capability, while Paperclip optimises for breadth of multi-agent coordination." — Flowtivity

> "These aren't competitors. They solve completely different problems." — Flowtivity

---

## Resources

- **Website:** https://paperclip.ing/
- **GitHub:** https://github.com/paperclipai/paperclip
- **Docs:** https://paperclip.ing/docs
- **Discord:** https://discord.gg/m4HZY7xNG3
- **Quickstart:** `npx paperclipai onboard --yes`
- **Comparison:** https://flowtivity.ai/blog/openclaw-vs-paperclip-ai-agent-framework-comparison/

---

*Research compiled for CCT AI diploma context and Ken's agent architecture planning.*
