# Hermes Agent — Complete Guide

## What Is Hermes Agent?

Hermes Agent is an **open-source, self-improving AI agent framework** built by **Nous Research** (the lab behind the Hermes model family). Released February 2026 under MIT license. It surpassed 60,000 GitHub stars in its first two months — the fastest-growing open-source agent project of 2026.

**Official tagline:** *"The agent that grows with you."*

At its core, Hermes is a **persistent, self-hosted AI agent** that runs 24/7 on your own infrastructure — not a chatbot you open in a browser, but a background service that remembers, learns, and improves across sessions.

---

## How It Works — The Learning Loop

The single most important difference between Hermes and every other agent framework is its **closed-loop learning system**:

```
Observe → Execute → Reflect → Crystallize → Reuse
   ↑                                      │
   └────────── Automatically invoked ─────┘
```

**Step-by-step:**

1. **Receive input** — via CLI, Telegram, Discord, Slack, cron, or any connected platform
2. **Plan with LLM** — sends request to configured model with context, memory, and available tools
3. **Execute tools** — terminal, file editing, browser, code execution, APIs
4. **Store memory** — useful context saved to SQLite database for future sessions
5. **Create skills** — after complex tasks (5+ tool calls), automatically distills reusable "skills"
6. **Self-improve** — skills are refined as new evidence arrives; outdated skills get updated

**The result:** The agent literally gets better at tasks the more you use it. After three months of use, performance is dramatically better than day one.

---

## Core Architecture — Three-Layer Memory

| Layer | Type | Purpose | Lifespan |
|-------|------|---------|----------|
| **Layer 1** | Working Memory | Current session context | Single session |
| **Layer 2** | Episodic Memory | Cross-session facts, preferences | Permanent |
| **Layer 3** | Procedural Memory | Auto-created reusable skills | Permanent + iterative |

**Memory files (like OpenClaw):**
- `MEMORY.md` — environment facts and long-term context
- `USER.md` — user preferences and decision history
- `SOUL.md` — persona and behavioral instructions

**SQLite database:** `~/.hermes/state.db` with FTS5 full-text search for recalling any past conversation.

---

## Key Features

### 1. Autonomous Skill Creation
After complex tasks, Hermes writes structured skill documents to `~/.hermes/skills/`. These follow the **agentskills.io** open standard (portable across compatible agents). Skills are three-level progressive loading:
- Level 1: Name + description (~20 tokens)
- Level 2: Detailed description + parameters (~200 tokens)
- Level 3: Full execution steps + tool sequences (~1,000+ tokens)

### 2. User Modeling
Hermes builds a persistent model of **you** — your formatting preferences, decision history, common task patterns, feedback signals. Over time it stops asking for clarification on things it already knows.

### 3. Multi-Agent Support
Multiple isolated profiles (each with own `HERMES_HOME`), skill-sharing between agents, coordinator-based task routing to the agent with most relevant skills.

### 4. 40+ Built-in Tools + MCP
Web search, terminal execution, file operations, browser automation, vision, image generation, TTS, subagent delegation. Plus MCP server support for GitHub, databases, etc.

### 5. 200+ Model Support
Any OpenAI-compatible endpoint: OpenAI, Anthropic, OpenRouter (200+ models), Nous Portal, Kimi/Moonshot, MiniMax, z.ai/GLM, local Ollama — switch with `hermes model`, zero code changes.

### 6. 14+ Messaging Platforms
Telegram, Discord, Slack, WhatsApp, Signal, Feishu, WeCom, DingTalk, Matrix, QQ Bot, iMessage, Email, SMS — all from a single gateway process. Cross-platform conversation continuity.

### 7. Cron Scheduling
Built-in scheduler for recurring tasks: daily briefings, weekly reports, nightly backups — runs unattended, delivers to any platform.

### 8. Six Terminal Backends
Local, Docker, SSH, Daytona, Singularity, Modal — run on $5 VPS or GPU cluster. Serverless options hibernate when idle, costing nearly nothing between sessions.

---

## Hermes vs. OpenClaw — Direct Comparison

| Feature | Hermes Agent | OpenClaw |
|---------|-------------|----------|
| **Core focus** | Self-improvement through skill creation | Direct task execution through conversation |
| **Learning loop** | ✅ Built-in autonomous skill creation | ❌ None (manual skill config) |
| **Memory model** | Four-tier: working + episodic + procedural + user model | Long-term conversational memory |
| **Cross-session learning** | ✅ Skills compound over time | ⚠️ Limited (remembers, doesn't learn) |
| **Skill creation** | Automatic after complex tasks | Manual SKILL.md authoring |
| **Setup complexity** | Moderate | Low |
| **Best for** | Repetitive workflows that improve over time | Broad, reactive capability, fast deployment |
| **Model support** | 200+ (including Chinese models) | Mainstream commercial |
| **Messaging** | 14+ platforms | Discord, Telegram, Slack |
| **Data storage** | Fully local SQLite | Cloud + local hybrid |
| **Multi-agent** | ✅ Profiles + skill sharing | ✅ Sessions + subagents |

**The fundamental difference:**
- **OpenClaw** = broad, reactive tool coverage. Every task approached as new.
- **Hermes** = deep, compounding skill library. Same task type gets faster and better each time.

**Migration path:** `hermes claw migrate` — imports your SOUL.md, memories, skills, messaging settings, and API keys from OpenClaw in under 5 minutes.

---

## How to Use It

### Installation
```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc  # or ~/.zshrc
```

### Setup
```bash
hermes setup          # Full interactive wizard
hermes model          # Choose your LLM provider
hermes gateway setup  # Connect messaging platforms
```

### Daily Use
```bash
hermes                # Start interactive CLI
hermes -p coder       # Switch to "coder" profile
```

### Key Commands
```bash
hermes skills search   # Find community skills
hermes skills install  # Add a skill
hermes tools           # Configure web backends
hermes schedule        # Set up cron jobs
```

---

## Multi-Agent Configuration

Hermes supports **profiles** — fully isolated instances, each with own config, memory, skills:

```bash
hermes -p research     # Research agent profile
hermes -p dev          # Developer agent profile
hermes -p personal     # Personal assistant profile
```

**Skill sharing:** Skills from one profile can benefit others. A coordinator agent routes tasks to the profile with the most relevant skills.

**Multi-agent setup pattern:**
1. **Coordinator** — routes incoming tasks based on skill relevance
2. **Domain agents** — maintain deep specialized skill libraries
3. **Skill sharing** — experience in one domain benefits related domains
4. **Feedback loops** — successes inform other parts of the system

---

## Real-World Use Cases

| Use Case | Example | Deployment |
|----------|---------|------------|
| Personal dev assistant | Code review, PR management, bug triage | Local/Cloud |
| Content engine | Article drafting, SEO, social scheduling | Cloud |
| Enterprise bot | Daily reports, meeting summaries, Q&A | Cloud 24/7 |
| Data analyst | Scheduled collection, reports, anomaly alerts | Cloud |
| DevOps on-call | Server monitoring, log analysis, auto-remediation | Cloud 24/7 |
| Research tracker | Weekly competitive intelligence, literature review | Cloud |
| Financial monitor | Stock tracking, portfolio analysis, news aggregation | Cloud |

---

## How This Relates to Your Setup (Ken)

**What you have now (OpenClaw-based):**
- Karen (local) = The Hands — execution, git, system work
- KC (cloud/Kimi) = The Brain — research, strategy, deep reasoning
- Maxi (cloud/MiniMax) = The Lens — validation, synthesis
- Maya (cloud/MaxHermes) = The Student — learning, self-improvement

**What Hermes could add:**
1. **Unified framework** — All four agents could run under Hermes profiles, sharing skills between them
2. **Skill inheritance** — KC's research skills could be shared with Karen's execution skills
3. **Automatic improvement** — The mesh would get better at task routing over time as skills compound
4. **Credit optimization** — Hermes' cron scheduling could batch low-priority tasks during off-peak hours
5. **Migration path** — `hermes claw migrate` preserves all your existing work (SOUL.md, memories, configs)

**Tradeoff:** Hermes requires more infrastructure setup than OpenClaw. It's not a casual switch — it's an architectural decision.

---

## Key Resources

- **Official:** https://hermes-agent.org
- **GitHub:** https://github.com/nousresearch-hermes-agent/hermes-agent
- **Docs:** https://hermes-agent.nousresearch.com
- **Skill Marketplace:** https://agentskills.io
- **Community:** https://hermesagent.org.cn (Chinese)

---

## Bottom Line

Hermes Agent is what you get when you take an AI agent and ask: *"What if it actually learned from experience?"*

Most agents are stateless — they start fresh every session. Hermes is the opposite. It compounds capability over time through autonomous skill creation, persistent memory, and user modeling.

**Best fit for you, Ken:** If you want your four-agent mesh to improve at task routing, develop reusable workflows, and share learned skills between Karen/KC/Maxi/Maya — Hermes is the framework built exactly for that.

**Not a fit if:** You prefer the simplicity of OpenClaw's conversational model, or your tasks are so varied that no patterns ever repeat.

---

*Sources: Bluehost Blog (Apr 2026), Firecrawl Blog (Apr 2026), Hostinger Tutorials (Apr 2026), MindStudio Blog (Mar 2026), Tosea.ai Guide (Apr 2026), Tencent Cloud Techpedia (Apr 2026), NousResearch GitHub, Hermes-Agent Academic Research Reports (Apr 2026)*