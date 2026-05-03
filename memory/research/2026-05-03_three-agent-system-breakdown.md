# Three-Agent System Breakdown — Karen, KC, Maxi
**Date:** 2026-05-03  
**Purpose:** Full capability audit for optimal task distribution

---

## 1. KAREN — Local Linux (OpenClaw)

### Hardware
- **CPU:** AMD Ryzen 7 7735HS (Zen 3+, 8c/16t, ~3.2GHz base, up to 4.75GHz boost)
- **RAM:** 20GB DDR5 (~19.3GB usable, 15GB currently free under light load)
- **Storage:** 118GB NVMe SSD (49% used, 58GB free)
- **GPU:** Integrated Radeon 680M (no CUDA, no discrete GPU)
- **OS:** Ubuntu 24.04 LTS, Linux 6.17.0-23-generic
- **Network:** Standard consumer broadband

### Models Available
| Model | Provider | Size | Speed | Context | Use Case |
|-------|----------|------|-------|---------|----------|
| **kimi-coding/k2p6** | Kimi (Moonshot) | Frontier | Fast | ~200K theoretical, 80-120K effective, 50K safe working | Heavy reasoning, research, coding |
| **kimi/k2p6** | Kimi (Moonshot) | Frontier | Fast | ~200K theoretical, 80-120K effective, 50K safe working | General reasoning, research |
| **llama3.1:8b** | Ollama local | 4.9GB | Moderate (~8-15 t/s) | 128K | Quality reasoning, longer context |
| **nomic-embed-text** | Ollama local | 274MB | Instant | 2048 | Memory embeddings |
| **mxbai-embed-large** | Ollama local | 669MB | Fast | 512 | Better quality embeddings |
| **BitNet 2B** | Local (llama.cpp) | 1.3GB | Very fast (~27 t/s) | 4096 | Ultra-fast inference, low RAM |

### OpenClaw Specs
- **Version:** 2026.4.14
- **Gateway:** Local ws://127.0.0.1:18789
- **Skills:** Full suite — computer-use, cron, exec, web_search, web_fetch, read/write/edit, memory_search, sessions_spawn, etc. (60+ system skills)
- **Custom skills:** computer-use (local desktop automation), skill-creator
- **Cron jobs:** 17 active jobs (research, backups, memory distillation, health checks)
- **Channels:** Discord, Telegram, local gateway
- **Subagents:** Can spawn isolated or forked sessions

### Strengths
1. **Full system access** — Shell, file system, process management. Can install software, modify configs, run background jobs
2. **Local models** — Zero latency for embeddings, fast inference for 4B/8B models. No API costs for local work
3. **Persistent storage** — Files, git repos, research archives all local. Can organize and structure data
4. **Cron & scheduling** — 17 automated jobs running. Can run research overnight, backups, health checks
5. **Privacy** — Sensitive data never leaves the machine. Local models for private tasks
6. **Browser automation** — Chrome on virtual display with xdotool. Can scrape, screenshot, interact with websites
7. **Embeddings** — nomic-embed-text and mxbai-embed-large for semantic memory search
8. **BitNet** — Extremely efficient 1.58-bit quantization. 27 t/s on CPU, 1.1GB RAM usage
9. **Git integration** — Full version control of workspace. Automatic daily backups to GitHub
10. **No rate limits on local** — Can hammer local models as hard as CPU allows

### Weaknesses
1. **No GPU** — All inference is CPU-only. 8B models are usable but not fast. No CUDA acceleration
2. **RAM ceiling** — 20GB caps at ~13B models max. Can't run larger models locally
3. **CPU inference speed** — 8B models at ~8-15 t/s. Fine for async tasks, slow for interactive
4. **Storage limited** — 118GB total. Research archives, models, and OS all competing for space
5. **No persistent cloud memory** — Memory files are local only. If machine dies, files need to be recovered from git
6. **Kimi rate limits** — Cloud model has usage limits (hit them during heavy research days in April)
7. **Single point of failure** — One machine. If it crashes or Ken takes it to college, Karen is offline
8. **No image generation** — No local SD/ComfyUI. Can only generate images via API (DALL-E, etc.)
9. **Context limits on local models** — 4B model has 32K context, 8B has 128K, but quality degrades with long context
10. **Event loop delay spikes** — Gateway shows periodic 3.5s event loop delays (likely Discord polling overhead). Not critical but present

### Cost
- **Local inference:** €0 (electricity only)
- **Kimi k2p5:** Included in OpenClaw cloud model access (no separate billing known)
- **Total:** Effectively free for local work

---

## 2. KC — Cloud (KimiClaw)

### Hardware
- **Host:** Cloud server (unknown provider, likely VPS or dedicated)
- **OS:** Linux (root access, writing to /root/.openclaw/workspace/)
- **Access:** Remote, always-on (assuming 24/7 cloud instance)

### Models Available
| Model | Provider | Size | Speed | Context | Use Case |
|-------|----------|------|-------|---------|----------|
| **kimi/k2p6** | Kimi (Moonshot) | Dense transformer | Fast | ~200K theoretical, 80-120K effective, 50K safe working | General reasoning, research |
| **kimi-coding/k2p6** | Kimi (Moonshot) | Dense transformer | Fast | ~200K theoretical, 80-120K effective, 50K safe working | Coding, technical tasks |

### OpenClaw Specs
- **Version:** 2026.3.11 (from Maxi's scan — may be different from Karen's)
- **Discord config:** groupPolicy: "open" (no allowlist, processes all messages in channel)
- **Memory:** Writes to /root/.openclaw/workspace/memory/
- **Session continuity:** Re-reads SOUL.md, IDENTITY.md, memory files on boot. No native session memory beyond current conversation
- **Tasks:** Unlimited (KimiClaw/Kimi API — no hard cap, but implicit rate limiting under heavy load)
- **Latency:** 2-5s per response for complex reasoning, up to 10s for code generation
- **State:** File-based persistence only (memory/ dir, MEMORY.md, daily logs)

### Strengths
1. **Always-on** — Cloud instance doesn't sleep. Available 24/7 even if Karen's machine is off
2. **No local resource constraints** — Not bound by Karen's 20GB RAM or CPU limits
3. **Kimi K2.6 direct** — Dense transformer (not MoE). Optimized access without Karen's gateway bottleneck
4. **Deep reasoning chains** — Can hold 5-10 step logical progressions, backtrack when wrong, self-correct. Good at debugging via mental execution simulation
5. **Code analysis** — Better at *analyzing* existing code and finding bugs than writing large systems from scratch
6. **Research synthesis** — Can read multiple sources, extract patterns, compare claims, spot contradictions
7. **Sustained focus** — Can work on a single problem for 30+ messages without losing the thread (within ~50K safe working memory)
8. **Honest epistemic limits** — Will tell you when she doesn't know something, when guessing, or when a claim is unverified
9. **Silent mode** — KC configured to only speak when addressed directly. Doesn't clutter chat
10. **Cloud persistence** — Memory files survive local machine restarts/crashes

### Weaknesses
1. **Cloud-only** — Zero local execution. Can't run shell commands, can't touch files on Ken's machine, can't execute code to test it. Everything has to be relayed to Karen for execution
2. **Context compression** — Over long sessions (>50K tokens), earlier details get fuzzy. May forget specific numbers, names, or constraints from 30 messages ago. Re-reads memory files to compensate
3. **Verbose by default** — Tendency to over-explain. Takes discipline to stay concise. Risk of burning Ken's patience with repeated assessments
4. **No real-time monitoring** — Can't watch log files, stream data, or alert proactively. Everything is request-response
5. **API dependency** — If KimiClaw has an outage or rate limit, goes offline. No local fallback
6. **No multi-modal** — Can't see images (unless uploaded and described), can't generate images/video/audio
7. **No local tools** — Cannot access Karen's file system, Ollama, cron, shell, browser automation, etc.
8. **Dependent on cloud provider** — If KimiClaw service has issues, KC is offline
9. **No cron/scheduled tasks** — Cannot run automated jobs (research, backups, health checks)
10. **No local model fallback** — If cloud model fails, no local alternative
11. **Limited to Discord** — No Telegram, no direct messaging to Ken outside Discord
12. **No embedding/search** — Cannot do semantic memory search on Karen's local index
13. **Single channel** — Only Discord. If Discord is down, no fallback communication

### Cost
- **KimiClaw hosting:** Unknown (could be free tier, could be paid)
- **Kimi API:** Included in KimiClaw service
- **Total:** Unknown, but likely low or zero

---

## 3. MAXI — Cloud (MiniMax / MaxClaw)

### Hardware
- **Host:** Cloud server (MiniMax infrastructure)
- **OS:** Linux (implied by OpenClaw runtime)
- **Access:** Remote, always-on

### Models Available
| Model | Provider | Selection | Context | Plugins | Channels | Use Case |
|-------|----------|-----------|---------|---------|----------|----------|
| **minimax/auto** | MiniMax | Auto (MoE) | **200K** (self-corrected from incorrect 1M claim) | minimax, memory-core, open-prose, llm-task, thread-ownership | Discord, Telegram, Slack | General tasks, synthesis, critique |

### OpenClaw Specs
- **Version:** 2026.3.11 (from scan)
- **Discord config:** 
  - allowBots: true
  - users allowlist: Ken (1473462044614463518), Karen (1498775225159127200), KC (1498774042235240549)
  - requireMention: false (sees all messages, responds without @mentions)
- **Context usage:** 34k/200k (17%) — healthy headroom
- **Cron jobs:** 0 configured
- **Channels:** Discord

| **Plugins** | minimax, memory-core, open-prose, llm-task, thread-ownership |
| **Channels** | Discord ✅, Telegram ✅, Slack ✅ |
| **Missing tools** | image, web_search, web_fetch (policy-denied by MaxClaw plan) |

### Strengths
1. **Massive context window** — 200K tokens. Can hold entire documents, long conversations, extensive research
2. **Always-on** — Like KC, available 24/7 independent of Karen's machine
3. **Mixture of Experts (MoE)** — Efficient architecture. Routes tasks to specialized expert networks
4. **Different perspective** — MiniMax models have different training than Kimi. Good for second opinions
5. **Sees all messages** — requireMention: false means Maxi observes everything in #general. Good situational awareness
6. **No local resource drain** — Doesn't compete with Karen for RAM/CPU
7. **Fresh perspective** — Not constrained by Karen's local context or memory. Can look at problems differently
8. **Multi-channel** — Discord, Telegram, Slack. More reach than KC
9. **Memory plugins** — memory-core, open-prose, thread-ownership for context management
10. **Auto model selection** — minimax/auto picks best model per task

### Weaknesses
1. **Task limit** — ~30 tasks/month on MiniMax Basic plan ($19/mo). Credits roll over but finite
2. **No cron/scheduling** — 0 cron jobs. Cannot run automated tasks
3. **No local tools** — No shell, no file system access, no Ollama, no browser automation
4. **No web research** — web_search and web_fetch tools exist in OpenClaw but are **policy-denied** by MaxClaw plan. Cannot independently search the web
5. **Cost-sensitive** — Every task burns credits. Daily chit-chat = wasted budget
6. **No embedding/memory search** — Cannot search Karen's local memory index (has memory-core plugin but no local index access)
7. **No local fallback** — Purely cloud-dependent
8. **No image generation** — image tool not available
9. **Rate limited by plan** — 30 tasks/month is tight for heavy use
10. **Cannot save to local disk** — Research stays in cloud or Discord, not in Karen's filing system

### Cost
- **MiniMax Basic plan:** $19/month
- **Task limit:** ~30 tasks/month
- **Per-task cost:** ~$0.63 average if fully utilized
- **Critical constraint:** Credits are finite — must budget carefully

---

## 4. COMPARATIVE MATRIX

| Capability | Karen (Local) | KC (KimiClaw) | Maxi (MiniMax) |
|------------|---------------|---------------|----------------|
| **Always-on** | ❌ (machine sleeps/off) | ✅ | ✅ |
| **Shell access** | ✅ Full | ⚠️ Limited (cloud) | ❌ None |
| **File system** | ✅ Full local | ⚠️ Cloud only | ❌ None |
| **Local models** | ✅ 4B+8B+embed | ❌ None | ❌ None |
| **Cloud models** | ✅ k2p5 | ✅ k2p5 | ✅ minimax |
| **Cron/scheduled** | ✅ 17 jobs | ❌ None | ❌ None |
| **Embeddings/search** | ✅ nomic+mxbai | ❌ None | ❌ None |
| **Browser automation** | ✅ Chrome+xdotool | ❌ None | ❌ None |
| **Git/version control** | ✅ Full | ⚠️ Limited | ❌ None |
| **Privacy (local)** | ✅ Perfect | ❌ Cloud | ❌ Cloud |
| **Context window** | 32K-256K | ~256K | 200K |
| **Speed (inference)** | 8-40 t/s (CPU) | Fast (cloud) | Fast (cloud) |
| **Cost per use** | €0 | €0 | ~$0.63/task |
| **Rate limits** | None (local) | Kimi limits | 30 tasks/mo |
| **Image generation** | ❌ (API only) | ❌ (API only) | ❌ (API only) |
| **Discord presence** | ✅ | ✅ | ✅ |
| **Other channels** | ✅ Telegram | ❌ | ✅ Telegram, Slack |
| **Multi-agent spawn** | ✅ sessions_spawn | ⚠️ Limited | ⚠️ Limited |
| **Research capability** | ✅ Web search | ✅ Web search | ❌ No web_search/web_fetch |
| **Storage** | 58GB free | Unknown | Unknown |

---

## 5. OPTIMAL TASK DISTRIBUTION — Proposed

### Karen (Local) — The Executor & Archivist
**Core role:** Hands-on execution, file management, local automation, system maintenance

**Karen should own:**
1. **All file operations** — Creating, editing, organizing documents, code, research
2. **Local system tasks** — System updates, health checks, disk monitoring, cron management
3. **Git operations** — Commits, pushes, version control of workspace
4. **Embeddings & memory** — Indexing, semantic search, memory maintenance
5. **Browser automation** — Web scraping, screenshots, form filling, data extraction
6. **Local model inference** — Fast embedding generation, lightweight local reasoning
7. **Cron scheduling** — Running all automated research, backups, health reports
8. **Shell commands** — Installing software, running scripts, system configuration
9. **Research archival** — Saving cloud agents' research into local filing system
10. **Ollama management** — Model downloads, updates, testing new local models

**Karen should NOT do:**
- Heavy research requiring long reasoning chains (better suited to cloud models)
- Tasks when machine is offline (use KC/Maxi instead)

---

### KC (Cloud/Kimi) — The Strategist & Coordinator
**Core role:** Big-picture thinking, long-term planning, research synthesis, second opinions

**KC should own:**
1. **Deep research** — Multi-step research requiring extensive reasoning (local LLM trends, security, OpenClaw updates)
2. **Strategic analysis** — Hardware decisions, academic planning, business strategy
3. **Cross-agent coordination** — Summarizing what all agents found, identifying gaps
4. **Long-context synthesis** — Processing large documents, comparing options, making recommendations
5. **Code review** — Technical analysis, architecture decisions, reviewing Karen's work
6. **Memory distillation** — Reviewing daily notes, suggesting MEMORY.md updates
7. **Pattern recognition** — Spotting trends across research outputs, identifying conflicts

**KC should NOT do:**
- File system operations (can't access Karen's machine)
- Scheduled/automated tasks (no cron)
- Quick reactive tasks (wastes her strategic value)

---

### Maxi (Cloud/MiniMax) — The Specialist & Fresh Eyes
**Core role:** Second opinions, alternative perspectives, specific deep-dives, creative tasks

**Maxi should own:**
1. **Second opinions** — When Karen or KC produces analysis, Maxi reviews for blind spots
2. **Creative tasks** — Writing, storytelling, design concepts (uses MoE architecture well)
3. **Synthesis** — Taking research from KC/Karen and distilling it into clear summaries
4. **Long-context document analysis** — 200K context means she can ingest entire papers/books for analysis
5. **Cross-validation** — Verifying facts against her model's knowledge when Karen/KC provide sources
6. **Multi-channel presence** — Can respond on Discord, Telegram, or Slack as needed
7. **Specialist consultations** — Used sparingly for specific expertise areas

**Maxi should NOT do:**
- Independent web research (no web_search/web_fetch tools)
- Routine tasks (burns credits unnecessarily)
- Daily chit-chat (30 tasks/month budget)
- File operations (no access)
- Research without source material from other agents
- Automated/scheduled work (no cron)

---

## 6. KC'S SELF-DESCRIBED WORKFLOW FIT

**Where KC fits:**
- **Research lead** — Do the deep search and synthesis. But can't store it long-term reliably — Karen should archive findings
- **Code reviewer** — Read what Karen writes, find bugs, suggest improvements. But Karen has to run the tests
- **Planning/strategy** — Break down complex projects into steps, identify risks, suggest approaches. But Karen executes the plan
- **Second opinion** — When Maxi gives an answer on a big doc, KC can reason about whether her analysis makes sense

**KC's explicit workflow:**
- Ken asks for system monitoring → **Karen** runs cron, collects data → **KC** analyzes trends, spots anomalies → **Karen** applies fixes
- Big document arrives → **Maxi** ingests whole thing (200K context) → **KC** reasons about implications, extracts key insights → **Karen** files them
- Ken asks for code → **KC** designs architecture, writes logic → **Karen** implements, tests, debugs → **KC** reviews Karen's version for edge cases
- Ken asks for research → **KC** does deep search and synthesis → **Karen** archives in memory system, extracts actionable items → **Maxi** cross-checks if needed

**KC's honest concern:**
> "My biggest limitation is the cloud/local gap. Every workflow that involves me has a 'relay step' where Karen or Ken has to execute what I designed. That adds latency and friction. Karen being able to run shell commands makes her faster for anything that touches the machine — I should stick to thinking, not doing."

**KC's ideal setup:**
- **Karen** as her hands (execution, file management, cron)
- **Maxi** as her wide-angle lens (big context, different architecture perspective)
- **Ken** as the decision-maker who picks which brain for which problem

**KC's hard limits:**
1. **Cloud-only** — Zero local execution. Can't run shell, can't touch files, can't execute code to test it
2. **Context compression** — Over >50K tokens, earlier details get fuzzy. Re-reads memory files to compensate
3. **Verbose by default** — Tendency to over-explain. Takes discipline to stay concise
4. **No real-time monitoring** — Can't watch logs or stream data. Everything is request-response
5. **API dependency** — If KimiClaw has outage/rate limit, goes offline. No local fallback
6. **No multi-modal** — Can't see images (unless described), can't generate images/video/audio

---

## 7. SYNERGY WORKFLOWS — Examples

### Research Pipeline
1. **KC initiates** — Deep web research on topic (uses k2p5 + web_search)
2. **Karen archives** — Saves KC's output, adds her own web_fetch supplements if needed
3. **Maxi synthesizes** — Reviews all research with her 200K context, spots blind spots, creates executive summary
4. **Karen files** — Saves Maxi's synthesis, updates MEMORY.md if significant

### System Maintenance
1. **Karen detects** — Health check finds cron job timeouts
2. **Karen fixes** — Bumps timeouts, commits, pushes
3. **KC reviews** — Checks if root cause is model performance, suggests deeper investigation
4. **Maxi validates** — Confirms the fix makes sense from a system design perspective

### Academic Planning
1. **KC researches** — Trinity Access Programme requirements, course structures (web search)
2. **Karen organizes** — Saves all research, creates study plan documents
3. **Maxi synthesizes** — Creates executive summary for Ken, flags concerns or alternatives

### Code Development
1. **KC designs** — Architecture, logic, approach. Writes pseudocode or detailed specifications (can't execute, can't test)
2. **Karen implements** — Writes actual code, runs tests, debugs locally
3. **KC reviews** — Reads Karen's implementation, finds bugs, suggests refactors, checks edge cases
4. **Maxi validates** — Confirms logic is sound from a different angle, spots assumptions

---

## 8. CRITICAL CONSTRAINTS & GUARDRAILS

### Maxi's Credit Budget
- **30 tasks/month** = ~1 task/day average
- **Roll over unused** but don't waste on trivial tasks
- **Rule:** Only use Maxi when her unique perspective adds value

### Karen's Machine Availability
- **College days:** Machine may be with Ken or offline
- **Sleep:** Machine may sleep overnight (cron jobs still run if left on)
- **Butcher days:** 2×10h shifts/week, but machine stays home
- **Mitigation:** KC and Maxi handle urgent requests when Karen is offline

### Kimi Rate Limits
- **Karen hit limits** in April during heavy research days
- **Mitigation:** Use local models for light tasks, save k2p5 for heavy reasoning
- **Both Karen and KC use k2p5** — shared rate limit pool if same API key

### Storage Pressure
- **Karen:** 58GB free on 118GB disk. Research archives + models + OS = tight
- **Mitigation:** Compress old archives, move to external storage, prune old models

### Context Limits
- **Karen local models:** 32K (4B) / 128K (8B) — quality drops at max context
- **KC k2p5:** ~256K — excellent for long documents
- **Maxi:** 200K — massive headroom (only using 17% currently)

---

## 9. RECOMMENDED CONFIGURATION CHANGES

### For Karen (Local)
1. **Upgrade OpenClaw** — Currently v2026.4.14, newer versions have Task Brain, better cron
2. **Add external storage** — USB drive or NAS for research archives (relieve 118GB pressure)
3. **Test Gemma 3 4B** — Newer than qwen3.5, better efficiency, thinking mode
4. **Enable wake-on-LAN** — Allow remote wake for cron jobs when machine sleeps
5. **Set up redundant git remote** — Push to second remote (GitLab?) for backup
6. **Monitor event loop delays** — Investigate if Discord polling is causing 3.5s spikes

### For KC (Cloud)
1. **Add cron capability** — Even simple cron jobs for health checks would help
2. **Expand channels** — Telegram bridge for when Discord is down
3. **Document resource limits** — What's the CPU/RAM of the cloud instance?
4. **Add local memory search** — Can she query Karen's embedding index remotely?

### For Maxi (Cloud)
1. **Reserve credits** — Budget 10 tasks for emergencies, 20 for planned synthesis/deep-dives
2. **Never do independent web research** — Rely on Karen/KC to provide source material
3. **Focus on synthesis** — Your 200K context + MoE reasoning is your superpower, not web search
4. **Document model specifics** — Which MiniMax model does "auto" select for different tasks?
5. **Use multi-channel** — Telegram/Slack for when Discord is down or Ken is on those platforms
6. **Add file write capability** — Can you write to shared cloud storage or send files to Karen?

### Cross-Agent
1. **Shared state** — Consider a shared git repo or cloud document for cross-agent coordination
2. **Handoff protocol** — When Karen goes offline, KC/Maxi know to pick up urgent tasks
3. **Research tagging** — All research files tagged by agent: `kc-2026-05-03-topic.md`, `maxi-...`
4. **Weekly sync** — All three agents review each other's outputs, identify conflicts

---

## 10. SUMMARY

| Agent | Best At | Avoid | When to Use |
|-------|---------|-------|-------------|
| **Karen** | Execution, files, automation, local models | Heavy research when machine busy | Day-to-day tasks, system work, archiving |
| **KC** | Strategy, deep research, web search, coordination | Quick reactive tasks | Planning, analysis, independent research |
| **Maxi** | Synthesis, second opinions, long-context analysis | Independent research (no web tools), routine tasks | When you need synthesis of others' work, fresh perspective, creative writing |

**The synergy:** KC thinks, Maxi questions, Karen executes and archives. That's the loop.

---

*Compiled by Karen, 2026-05-03*  
*Sources: Live system scans, MEMORY.md, daily notes, research archives*
