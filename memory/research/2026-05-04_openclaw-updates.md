# OpenClaw Updates Research — 2026-05-04

**Research date:** Monday, May 4th, 2026  
**OpenClaw version installed:** 2026.5.2 (8b2a6e5)  
**Source:** docs.openclaw.ai, GitHub releases, ClawHub, local system inspection

---

## 🦞 Latest Release: 2026.5.2 (May 4, 2026)

A major release dropped **today** with substantial new features, performance improvements, and fixes.

### Major New Features

#### 1. File Transfer Plugin (`file-transfer`)
- **New bundled plugin** for binary file operations on paired nodes
- Tools: `file_fetch`, `dir_list`, `dir_fetch`, `file_write`
- Bypasses bash stdout truncation by using base64 over `node.invoke`
- 16 MB byte ceiling per round-trip
- Default-deny per-node path policy with operator approval
- Symlink traversal refused by default (opt-in via `followSymlinks`)
- **Contributor:** @omarshahine

#### 2. Unified Streaming Progress Drafts
- New `streaming.mode: "progress"` with auto single-word status labels
- Shared progress configuration across Discord, Telegram, Matrix, Slack, and Microsoft Teams
- Reduces "blank progress-draft messages" when `streaming.progress.label=false`

#### 3. `/steer` Command
- Queue-independent steering of the active current-session run
- Works without starting a new turn when the session is idle
- **PR:** #76934

#### 4. `/side` Alias for BTW
- Text and native slash-command alias for `/btw` side questions

#### 5. Tree-Sitter Shell Command Explainer
- Adds a tree-sitter-backed explainer for future approval and command-review surfaces
- **Contributor:** @jesse-merhi

### Improvements

#### Gateway Performance
- **Lazy-loading** of plugin/runtime discovery, cron, schema, shutdown, sessions, and model metadata
- Defers maintenance timers until after readiness
- Trims duplicate plugin auto-enable work during startup
- Startup CPU/profile controls added

#### Plugin Management
- Hardened official plugin install/uninstall/update/onboarding
- ClawHub fallback with npm dependency-state reporting
- Beta-channel update paths
- `openclaw plugins list --json` now includes package dependency install state
- Trusts official externalized npm migrations
- Cleans stale bundled load paths for externalized installs
- Tries plugin `@beta` updates first on beta OpenClaw channel
- **ClawHub 429 errors** now annotated with reset windows and unauthenticated higher-rate-limit hints

#### Discord Status & Reactions
- Explicit reaction tool calls can opt into tracking subsequent tool progress with `trackToolCalls: true`
- Shared tool display emoji mapping
- Surfaces degraded Discord transport or gateway event-loop starvation in status output
- **Contributor:** @joshavant

#### WhatsApp Channels
- Support for explicit WhatsApp Channel/Newsletter `@newsletter` outbound message targets
- Channel session metadata instead of DM routing
- Fixes #13417
- **Contributors:** @vincentkoc, @agentz-manfred

#### Doctor/Config
- `doctor --fix` now commits safe legacy migrations even when unrelated validation issues prevent full validation
- `agents.defaults.llm` and other known-legacy keys always cleaned up
- Invalid config now **fails closed** — Gateway startup and hot reload no longer auto-restores invalid config
- `openclaw doctor --fix` owns last-known-good repair
- Fixes #76798
- **Contributor:** @hclsys

#### Agent/Runtime Reliability
- Preserves streamed provider replies across edge cases
- Delayed A2A session replies handled better
- Prompt/tool delivery, memory recall, web search provider discovery improved
- Provider-specific thinking/model metadata preserved
- Sandbox container and browser registry entries stored as per-runtime shard files (reduces session lock contention)
- **Contributor:** @luckylhb90

#### Tool Optimization
- Skips optional media and PDF tool factories when the effective tool denylist already blocks them
- Avoids unnecessary hot-path setup
- **Contributor:** @dorukardahan

### Fixes

- **WhatsApp libsignal:** `@whiskeysockets/libsignal-node` allowed in `onlyBuiltDependencies` so pnpm v9+ no longer rejects baileys git-tarball subdep
- **Gateway/systemd:** Preserves operator-added secrets in env file across re-stage
- **Plugin updates:** No longer short-circuits trusted official npm updates when default/latest resolves to an already-installed prerelease
- **Plugin tools:** Keeps auth-unavailable optional tools hidden even when another default tool from same plugin is available
- **Realtime transcription:** Socket closes before provider readiness now reported as `closed-before-ready` instead of mislabeled connection timeouts (OpenAI, xAI, Deepgram)
- **OpenAI/Google Meet:** Fails realtime voice connections when socket closes before `session.updated`
- **QA/cache:** Requires full `CACHE-OK` marker before live cache probes stop retrying

### QA/Testing
- **Mantis Discord smoke runner:** `pnpm openclaw qa mantis discord-smoke` — verifies bot can see guild/channel, post message, add reaction, upload artifacts
- **Slack live transport QA runner:** Canary and mention-gating coverage for private bot-to-bot harness
- **Contributor:** @vincentkoc

---

## 📊 Ecosystem Stats (ClawHub)

| Metric | Value |
|--------|-------|
| Tools | 52.7k |
| Users | 180k |
| Downloads | 12M |
| Avg Rating | 4.8 |

---

## 🔌 Current Plugin Ecosystem (94 Total)

### Providers (Enabled on this system)
- `@openclaw/kimi-coding` — ✅ enabled
- `@openclaw/memory-core` — ✅ enabled
- `@openclaw/moonshot` — ✅ enabled
- `@openclaw/ollama` — ✅ enabled
- `@openclaw/discord` — ✅ enabled (externalized)
- `openclaw-web-search` — ✅ enabled (v0.2.2)

### Notable Provider Plugins
- Anthropic (Claude), OpenAI, Google, Azure, Cerebras, Groq, DeepSeek, Fireworks, HuggingFace, LiteLLM, Kilocode, BytePlus, Chutes, Cloudflare AI Gateway, Copilot Proxy, Gradium, Exa, Fal, Deepgram, ElevenLabs, Inworld, Arcee

### Channel Plugins
- Discord, Telegram, WhatsApp, Slack, Signal, iMessage, Matrix, IRC, Microsoft Teams, Google Chat, Feishu, LINE, Mattermost, Nextcloud Talk, Nostr, Synology Chat, Tlon, Twitch, Zalo, Zalo Personal, WeChat, QQ, WebChat, BlueBubbles, Yuanbao

### Tool/Feature Plugins
- **Browser** — Web automation
- **File Transfer** — NEW: Binary file ops on nodes
- **Document Extract** — Document parsing
- **Firecrawl** — Web scraping
- **Comfy** — Image generation
- **Device Pair** — Node pairing
- **LLM Task** — Generic JSON LLM tool
- **Bonjour** — mDNS gateway discovery
- **Azure Speech** — TTS
- **Active Memory** — Bounded blocking memory sub-agent

---

## 🛠️ Skills System

OpenClaw uses **AgentSkills-compatible** skill folders with `SKILL.md` files.

### Skill Loading Precedence (highest first)
1. Workspace skills: `<workspace>/skills`
2. Project agent skills: `<workspace>/.agents/skills`
3. Personal agent skills: `~/.agents/skills`
4. Managed/local skills: `~/.openclaw/skills`
5. Bundled skills (shipped with install)
6. Extra skill folders: `skills.load.extraDirs` (config)

### Key Features
- Per-agent vs shared skill scopes
- Agent skill allowlists via config
- Plugins can ship their own skills in `openclaw.plugin.json`
- Codex CLI skill migration support: `openclaw migrate codex`

---

## 📝 Cron System Updates

- Cron runs **inside the Gateway** process (not the model)
- Job definitions persist at `~/.openclaw/cron/jobs.json`
- Runtime state in `~/.openclaw/cron/jobs-state.json`
- Overdue isolated agent-turn jobs rescheduled out of channel-connect window on startup
- Isolated cron runs best-effort close tracked browser tabs/processes
- Guards against stale acknowledgement replies (re-prompts once if interim status only)
- Structured execution-denial metadata preferred over simple markers
- Run-level agent failures treated as job errors (increments error counters)
- Timeout handling: aborts agent run, gives cleanup window, force-clears session ownership if needed

---

## 🔄 Notable Changes Since Last Check

| Area | Change |
|------|--------|
| **New Plugin** | File Transfer (binary ops on nodes) |
| **Performance** | Lazy-loading throughout startup path |
| **Discord** | Better status reactions, degraded transport reporting |
| **WhatsApp** | Channel/Newsletter target support |
| **Commands** | `/steer`, `/side` aliases |
| **Doctor** | `--fix` always cleans legacy keys; invalid config fails closed |
| **Plugins** | Beta channel updates, ClawHub 429 hints, dependency state in JSON |
| **Security** | Tree-sitter shell explainer, sandbox shard files |
| **QA** | Mantis Discord smoke, Slack live transport runners |

---

## 🔗 Resources

- **Docs:** https://docs.openclaw.ai
- **GitHub:** https://github.com/openclaw/openclaw
- **Releases:** https://github.com/openclaw/openclaw/releases
- **ClawHub:** https://clawhub.ai
- **Discord:** https://discord.gg/clawd
- **LLMs.txt index:** https://docs.openclaw.ai/llms.txt

---

*Research compiled by Karen (local agent) on 2026-05-04*
