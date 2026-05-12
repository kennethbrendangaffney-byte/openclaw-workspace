# OpenClaw Framework Updates — April 23, 2026

**Research date:** 2026-04-23  
**Sources:** docs.openclaw.ai, GitHub releases, community blogs, changelogs  
**Current framework version:** 2026.4.21 (latest as of research date)

---

## 📊 Release Timeline (2026)

| Version | Date | Focus |
|---------|------|-------|
| 2026.4.21 | Apr 22 | OpenAI image-gen updates, doctor fixes, Slack thread aliases |
| 2026.4.20 | Apr 21 | Onboarding restyle, Kimi K2.6, cron state split, agent prompts |
| 2026.4.14 | Apr 14 | GPT-5.4 forward-compat, Telegram forum topics, Ollama fixes |
| **2026.4.7** | **Apr 8** | **Major release: TaskFlows, memory-wiki, session branching, CLI infer** |
| 2026.3.23 | Mar 23 | Qwen DashScope, UI refinements, CSP headers |
| 2026.3.22 | Mar 22 | ClawHub-first installs, browser cleanup, MCP consolidation |
| 2026.3.12 | Mar 13 | Gateway dashboard v2, GPT-5.4 fast mode, Claude fast mode |
| 2026.3.11 | Mar 12 | Security fix (WS origin validation), iOS Home canvas |
| 2026.3.2 | Mar 3 | PDF tool, Telegram streaming, secrets overhaul, Ollama memory |
| 2026.2.26 | Feb 26 | External secrets, ACP thread agents, agent routing CLI |
| 2026.2.22 | Feb 22 | Mistral provider, auto-updater, Synology Chat channel |
| 2026.2.21 | Feb 21 | Gemini 3.1, Volcano Engine, BytePlus providers |

---

## 🚀 Major New Features (April 2026)

### 1. Webhook TaskFlows (v2026.4.7)
The biggest architectural shift since launch. Agents can now be triggered by external webhooks — not just chat messages. This enables event-driven automation:
- Stripe payment failures → agent workflow
- CRM lead thresholds → agent action
- Monitoring alerts → agent response
- Scheduled webhooks for daily research tasks

**Impact:** Agents transition from "chat responders" to "automation infrastructure."

### 2. Memory-Wiki (v2026.4.7)
Structured, persistent knowledge base with full CRUD access:
- **Structured claims** with evidence, source provenance, timestamps
- **Staleness tracking** — agent knows when knowledge went stale
- **Tools:** `wiki_search`, `wiki_get`, `wiki_apply`, `wiki_lint`
- **Contradiction clustering** and freshness-weighted search
- **Compiled digest retrieval** for fast lookups

This is the third memory layer alongside session context and MEMORY.md.

### 3. Session Branching & Recovery (v2026.4.7)
- **Branching:** Fork conversations to try risky approaches without losing context
- **Recovery:** Restore sessions to known-good states after crashes or skill errors
- **Compaction checkpoints:** Persisted pre-compaction state for inspection

### 4. CLI Inference Hub (`openclaw infer`) (v2026.4.7)
Unified command-line inference across model, media, web, and embedding tasks with provider-backed execution.

### 5. Context Engine Plugin Interface (v2026.3.7)
New plugin slot with full lifecycle hooks:
- `bootstrap`, `ingest`, `assemble`, `compact`
- Exposes `availableTools` and `citationsMode` to context engines
- Memory-artifact and memory-prompt seams for companion plugins

---

## 🔒 Security & Hardening

### April 2026: Skill Gating & Execution Policy
- New `openclaw exec-policy` flow for local execution control
- `openclaw exec-policy show` / `preset guarded` / `set tools.exec.default=ask`
- Skills request capability; host gets final say
- `allowed-tools` in SKILL.md frontmatter for blast-radius declaration
- `metadata.openclaw.requires` for env/bin dependencies

### March 2026 Security Batch
- **SSRF guards** on web tools (DNS pinning preserved with proxy env vars)
- **Webhook auth-before-body** (BlueBubbles, Google Chat, LINE)
- **Sandbox boundary** — ACP spawns from sandboxed sessions now rejected
- **Config backup permissions** — rotated backups now `0600`
- **Plugin HTTP hardening** — explicit auth required for all plugin routes
- **Gateway/WS security** — plaintext `ws://` restricted to loopback only
- **Browser origin validation** for WebSocket connections (GHSA-5wcw-8jjv-m286)

### April 2026 Security Fixes
- Gateway tool rejects `config.patch`/`config.apply` calls that would enable dangerous flags
- Slack interactions now respect `allowFrom` owner allowlists
- Media attachments fail closed on `realpath` errors
- Owner-only command enforcement tightened

---

## 🤖 Model Provider Updates

### New Providers (2026)
| Provider | Added | Notes |
|----------|-------|-------|
| **Arcee AI** | Apr 2026 | Trinity catalog, OpenRouter support |
| **Kilo Code** | Feb 2026 | Full auth, onboarding, model support |
| **Mistral** | Feb 2026 | Memory embeddings + voice support |
| **Volcano Engine (Doubao)** | Feb 2026 | Coding model variants |
| **BytePlus** | Feb 2026 | Coding model variants |
| **MiniMax M2.5 Highspeed** | Mar 2026 | Fast/cheap turns, new default |

### Model Support Expansions
- **Gemma 4** (Google) — native support, vision-capable via Ollama
- **GPT-5.4** / **GPT-5.4 Pro** — forward-compat, Codex pricing, fast mode toggle
- **Kimi K2.6** / **K2.5** — Moonshot tiered pricing, web search, media understanding
- **Claude Sonnet 4.6** — adaptive thinking defaults
- **Ollama vision models** — first-class image attachment support (auto-detected from `/api/show`)
- **Hunter Alpha / Healer Alpha** — OpenRouter limited window

### Inference Improvements
- Per-skill model routing via `SKILL.md` frontmatter
- `/fast` toggle for GPT-5.4 and Claude (priority access)
- Provider-agnostic Talk configuration
- String-content compatibility for stricter OpenAI-compatible backends

---

## 📱 Channel & Platform Updates

### Telegram
- **Streaming on by default** (partial mode)
- **DM streaming** via `sendMessageDraft` with separated reasoning/answer lanes
- **Forum topic names** surfaced in agent context (learned from service messages, persisted across restarts)
- **Voice mention gating** — optional `disableAudioPreflight` for text-only mention checks

### Discord
- Event cover image support (URL or local file path)
- Durable channel/topic binding storage for persistent agent routing

### Slack
- Thread alias preservation in outbound sends
- Interactive event allowlist enforcement

### Mobile
- **iOS:** Home canvas with live agent overview, structured connection error UI
- **Android:** Four-step onboarding, five-tab shell, camera.list, device.permissions, notification actions
- **Talk mode:** Configurable silence timeout

### New Channels
- **Synology Chat** (Feb 2026)
- **Zalo Personal** — rebuilt with native `zca-js` integration

---

## 🧠 Memory & Context System

### Memory-Wiki (v2026.4.7)
- Structured claims with evidence and source tracking
- Staleness dashboards and freshness-weighted search
- Claim-health linting and contradiction clustering
- Compiled digest retrieval for fast access

### Ollama Memory Embeddings (v2026.3.2)
```yaml
memorySearch:
  provider: ollama
  fallback: ollama
```
100% local memory search — no API calls, no costs.

### Dreaming (v2026.4.7)
- Ingests redacted session transcripts into dreaming corpus
- Per-day session-corpus notes with cursor checkpointing

### Compaction (v2026.4.7)
- Pluggable compaction provider registry
- Plugins can replace built-in summarization pipeline
- `agents.defaults.compaction.provider` configuration
- Opt-in start/completion notices during compaction

---

## 🔧 Tools & SDK

### PDF Tool (v2026.3.2)
- Native Anthropic and Google PDF provider support
- Text/image extraction fallback for other models
- Configurable: `agents.defaults.pdfModel`, `pdfMaxBytesMb`, `pdfMaxPages`

### Media Generation (v2026.4.7)
- Auto-fallback across auth-backed image, music, video providers
- Intent preservation during provider switches
- Size/aspect/resolution/duration hint remapping
- Mode-aware video-to-video support
- **April 21:** Default image generation upgraded to `gpt-image-2` with 2K/4K size hints

### Subagent File Attachments (v2026.3.2)
```typescript
sessions_spawn({
  task: "Review this contract",
  attachments: [{ name: "contract.pdf", content: "...", encoding: "base64" }]
})
```
- Redacted from transcripts, cleaned up after session

### Plugin SDK Changes
- `api.registerHttpHandler(...)` → `api.registerHttpRoute({ path, auth, match, handler })`
- `channelRuntime` exposed on `ChannelGatewayContext`
- `api.runtime.stt.transcribeAudioFile(...)` for extensions
- Context engine plugin interface with full lifecycle hooks

---

## 🏗️ Infrastructure & Operations

### Secrets Management
- **64 credential targets** covered by SecretRef (v2026.3.2)
- `openclaw secrets plan/apply/audit` workflows
- Fail-fast for unresolved secrets on active surfaces
- Doctor fix: stops re-embedding dotenv secrets in systemd units (v2026.4.14)

### Backup & Recovery
- `openclaw backup create` and `openclaw backup verify` (v2026.3.8)
- Config validation: `openclaw config validate --json` (v2026.3.2)
- Container health endpoints: `/health`, `/healthz`, `/ready`, `/readyz`

### Cron Improvements
- Split runtime execution state into `jobs-state.json` (v2026.4.20)
- `jobs.json` stays stable for git-tracked definitions
- Webhook POST delivery separated from announce (v2026.3.x)

### Auto-Updater
- Optional built-in auto-updater (`update.auto.*`)
- Default-off with rollout delay
- `openclaw update --dry-run` for preview

---

## ⚠️ Breaking Changes (2026)

### v2026.4.7
1. **Plugin loading changes** — some plugins need config updates under new manifest system
2. **Inference behavior differences** — reasoning improvements may change multi-step outputs
3. **New install defaults** — `tools.profile` defaults to `messaging` (no broad coding/system tools)

### v2026.3.2
1. **ACP dispatch enabled by default** — set `acp.dispatch.enabled: false` to pause
2. **Plugin HTTP handler API changed** — `registerHttpHandler` removed, use `registerHttpRoute`
3. **New install tool profile** — defaults to `messaging`

---

## 📈 Community & Ecosystem

### ClawHub (Skill Marketplace)
- **3,200+ skills** available
- `openclaw plugins install` now prefers ClawHub over npm by default (v2026.3.22)
- Search: `openclaw clawhub search "email"`
- Repository: `openclaw/clawhub` (8,200+ stars)

### GitHub Stats
- **362K+ stars** on main repository
- **5,000+ open issues**
- **5,000+ open PRs**
- **44 contributors** in v2026.4.7 alone
- **372 commits** in v2026.4.7

### Notable Community Content
- "OpenClaw Skills Ecosystem and Practical Production Picks" (DEV Community, Apr 20 2026)
- OpenClaw Launch guides for ClawHub and skills directory
- Multiple community blogs tracking monthly releases

---

## 🎯 Key Takeaways for This Setup

**Relevant to Ken's local Linux setup:**

1. **Ollama integration is getting stronger** — vision models, memory embeddings, better timeout handling. The local-first approach aligns well with Ken's goals.

2. **Memory-wiki** could be valuable for long-term knowledge management across the dual-agent setup (KC + Karen).

3. **TaskFlows** enable webhook-driven automation — useful for KDP, social media, and other passive income workflows Ken wants to build.

4. **Security hardening** is a major theme — skill gating, execution policy, and sandbox boundaries matter for a setup that will handle business automation.

5. **Kimi K2.6** is now the default Moonshot model — Ken's current `kimi/k2p5` may want to upgrade when K2.6 becomes available.

6. **Session branching** could be useful for experimenting with agent behaviors without losing working configurations.

7. **Cron state split** (v2026.4.20) — if using cron jobs, the new `jobs-state.json` separation makes git-tracking cleaner.

---

## 🔗 Sources

- https://www.getopenclaw.ai/changelog
- https://www.getopenclaw.ai/blog/openclaw-march-2026-update
- https://github.com/openclaw/openclaw/releases
- https://www.betterclaw.io/blog/openclaw-2026-4-7-update
- https://openclawservices.com/blog/skill-gating
- https://releasebot.io/updates/openclaw/openclaw
- https://docs.openclaw.ai/tools/clawhub
- https://openclawlaunch.com/clawhub
