# OpenClaw Updates — April 22, 2026

Research snapshot from docs.openclaw.ai and GitHub releases.

---

## Latest Releases

### 2026.4.21 (April 21)

**Changes:**
- **OpenAI images**: Default image-generation provider switched to `gpt-image-2`, with new 2K/4K size hints in docs and tool metadata.

**Fixes:**
- **Plugins/doctor**: Repair bundled plugin runtime dependencies from doctor paths so packaged installs can recover missing channel/provider dependencies without broad core dependency installs.
- **Image generation**: Log failed provider/model candidates at warn level before automatic provider fallback.
- **Auth/commands**: Require owner identity for owner-enforced commands — non-owner senders can no longer reach owner-only commands through permissive fallback when `enforceOwnerForCommands=true` and `commands.ownerAllowFrom` is unset. (Thanks @drobison00)
- **Slack**: Preserve thread aliases in runtime outbound sends so generic runtime sends stay in the intended Slack thread when the caller supplies `threadTs`. (Thanks @bek91)
- **Browser**: Reject invalid ax accessibility refs in act paths immediately instead of waiting for the browser action timeout. (Thanks @Patrick-Erichsen)
- **npm/install**: Mirror the `node-domexception` alias into root `package.json` overrides to stop surfacing the deprecated `google-auth-library → gaxios → node-fetch → fetch-blob → node-domexception` chain. (Thanks @vincentkoc)

### 2026.4.20 (April 20)

**Changes:**
- **Onboard/wizard**: Restyled setup security disclaimer with yellow warning banner, section headings, bulleted checklists, and un-dimmed note body. Added loading spinner during initial model catalog load. Added "API key" placeholder to provider API key prompts. (Thanks @Patrick-Erichsen)
- **Agents/prompts**: Strengthened default system prompt and OpenAI GPT-5 overlay with clearer completion bias, live-state checks, weak-result recovery, and verification-before-final guidance.
- **Models/costs**: Support tiered model pricing from cached catalogs and configured models. Bundled Moonshot Kimi K2.6/K2.5 cost estimates included for token-usage reports. (Thanks @sliverp)
- **Sessions/Maintenance**: Enforce built-in entry cap and age prune by default; prune oversized stores at load time so accumulated cron/executor session backlogs cannot OOM the gateway before the write path runs. (Thanks @bobrenze-bot)
- **Plugins/tests**: Reuse plugin loader alias and Jiti config resolution across repeated same-context loads, reducing import-heavy test overhead. (Thanks @amknight)
- **Cron**: Split runtime execution state into `jobs-state.json` so `jobs.json` stays stable for git-tracked job definitions. (Thanks @Feelw00)
- **Agents/compaction**: Send opt-in start and completion notices during context compaction. (Thanks @feniix)
- **Moonshot/Kimi**: Default bundled Moonshot setup, web search, and media-understanding surfaces to `kimi-k2.6` while keeping `kimi-k2.5` available for compatibility. (Thanks @scoootscooob)
- **Moonshot/Kimi**: Allow `thinking.keep = "all"` on `moonshot/kimi-k2.6`, and strip it for other Moonshot models or requests where pinned `tool_choice` disables thinking. (Thanks @aniaan)
- **BlueBubbles/groups**: Forward per-group `systemPrompt` config into inbound context `GroupSystemPrompt` so configured group-specific behavioral instructions are injected on every turn. Supports "*" wildcard fallback matching the existing `requireMention` pattern. (Thanks @omarshahine)
- **Plugins/tasks**: Add a detached runtime registration contract so plugin executors can own detached task lifecycle and cancellation without reaching into core task internals. (Thanks @mbelinky)
- **Terminal/logging**: Optimize `sanitizeForLog()` by replacing the iterative control-character stripping loop with a single regex pass while preserving ANSI-first sanitization behavior. (Thanks @bulutmuf)
- **QA/CI**: Make `openclaw qa suite` and `openclaw qa telegram` fail by default when scenarios fail, add `--allow-failures` for artifact-only runs, and tighten live-lane defaults for CI automation. (Thanks @joshavant)
- **Mattermost**: Stream thinking, tool activity, and partial reply text into a single draft preview post that finalizes in place when safe. (Thanks @ninjaa)

**Fixes:**
- **Exec/YOLO**: Stop rejecting gateway-host exec in `security=full` plus `ask=off` mode via the Python/Node script preflight hardening path, so promptless YOLO exec once again runs direct interpreter stdin and heredoc forms.

### 2026.4.14 (April 14)

**Changes:**
- **Telegram/forum topics**: Surface human topic names in agent context, prompt metadata, and plugin hook metadata by learning names from Telegram forum service messages. (Thanks @ptahdunbar)

**Fixes:**
- **UI/chat**: Replace `marked.js` with `markdown-it` so maliciously crafted markdown can no longer freeze the Control UI via ReDoS. (Thanks @zhangfnf)
- **Auto-reply/send policy**: Keep `sendPolicy: "deny"` from blocking inbound message processing, so the agent still runs its turn while all outbound delivery is suppressed for observer-style setups. (Thanks @omarshahine)
- **BlueBubbles**: Lazy-refresh the Private API server-info cache on send when reply threading or message effects are requested but status is unknown. (Thanks @omarshahine)
- **Heartbeat/security**: Force owner downgrade for untrusted `hook:wake` system events. (Thanks @pgondhi987)
- **Browser/security**: Enforce SSRF policy on snapshot, screenshot, and tab routes. (Thanks @pgondhi987)
- **Microsoft Teams/security**: Enforce sender allowlist checks on SSO signin invokes. (Thanks @pgondhi987)
- **Config/security**: Redact `sourceConfig` and `runtimeConfig` alias fields in `redactConfigSnapshot`. (Thanks @pgondhi987)
- **Agents/context engines**: Run opt-in turn maintenance as idle-aware background work so the next foreground turn no longer waits on proactive maintenance. (Thanks @100yenadmin)
- **Plugins/status**: Report registered context-engine IDs in `plugins inspect` instead of the owning plugin ID. (Thanks @zhuisDEV)
- **Context engines**: Reject resolved plugin engines whose reported `info.id` does not match their registered slot id. (Thanks @fuller-stack-dev)
- **WhatsApp**: Patch installed Baileys media encryption writes during OpenClaw postinstall so the default npm/install.sh delivery path waits for encrypted media files to finish flushing before readback, avoiding transient ENOENT crashes on image sends. (Thanks @frankekn)
- **Gateway/update**: Unify service entrypoint resolution around the canonical bundled gateway entrypoint so update, reinstall, and doctor repair stop drifting between stale `dist/entry.js` and current `dist/index.js` paths. (Thanks @mbelinky)
- **Heartbeat/Telegram topics**: Keep isolated heartbeat replies on the bound forum topic when `target=last`, instead of dropping them into the group root chat. (Thanks @mbelinky)
- **Browser/CDP**: Let managed local Chrome readiness, status probes, and managed loopback CDP control bypass browser SSRF policy for their own loopback control plane.

---

## Key New Features & Capabilities

### Task Flow (Orchestration)
- **What it is**: Durable multi-step flow orchestration substrate sitting above background tasks.
- **Use case**: Multi-step pipelines (A then B then C) that need state persistence across gateway restarts.
- **Modes**: Managed mode (Task Flow owns lifecycle) and Mirrored mode (observes externally created tasks).
- **Docs**: https://docs.openclaw.ai/automation/taskflow.md

### Cron Improvements
- **State split**: Runtime execution state moved to `jobs-state.json` so `jobs.json` stays stable for git-tracked definitions.
- **One-shot jobs**: Auto-delete after success by default.
- **Browser cleanup**: Isolated cron runs best-effort close tracked browser tabs/processes for their `cron:<jobId>` session when the run completes.
- **Stale acknowledgement guard**: If the first result is just an interim status update and no descendant subagent run is still responsible for the final answer, OpenClaw re-prompts once for the actual result before delivery.
- **Docs**: https://docs.openclaw.ai/automation/cron-jobs.md

### Plugin System
- **Plugin types**: Channels, model providers, tools, skills, speech, realtime transcription, realtime voice, media-understanding, image generation, video generation, web fetch, web search.
- **Core plugins**: Shipped with OpenClaw.
- **External plugins**: Published on npm by the community.
- **Chat-native control**: Enable `commands.plugins: true` and use `/plugin install`, `/plugin show`, `/plugin enable`.
- **Resolver**: Local path/archive, explicit `clawhub:<pkg>`, or bare package spec (ClawHub first, then npm fallback).
- **Docs**: https://docs.openclaw.ai/tools/plugin.md

### Experimental Features
- **Local model runtime**: `agents.defaults.experimental.localModelLean` — for smaller/stricter local backends that choke on the full default tool surface.
- **Memory search**: `agents.defaults.memorySearch.experimental.sessionMemory` — indexes prior session transcripts (extra storage/indexing cost).
- **Structured planning tool**: `tools.experimental.planTool` — structured `update_plan` tool for multi-step work tracking.
- **Docs**: https://docs.openclaw.ai/concepts/experimental-features.md

### Security Hardening (April 2026)
- Owner identity enforcement for owner-only commands.
- SSRF policy enforcement on browser snapshot, screenshot, and tab routes.
- Microsoft Teams sender allowlist checks on SSO signin.
- Config redaction for `sourceConfig` and `runtimeConfig` alias fields.
- Heartbeat owner downgrade for untrusted `hook:wake` events.
- `sendPolicy: "deny"` no longer blocks inbound processing (observer mode support).

### Model Updates
- **Moonshot Kimi K2.6**: Now the default for bundled Moonshot setup, web search, and media-understanding surfaces. K2.5 remains available for compatibility.
- **Tiered model pricing**: Supported from cached catalogs and configured models.
- **OpenAI GPT-5**: Strengthened overlay prompt with completion bias, live-state checks, weak-result recovery, and verification-before-final guidance.
- **OpenAI gpt-image-2**: Default image-generation provider with 2K/4K size hints.

### Channel Improvements
- **Mattermost**: Stream thinking, tool activity, and partial reply text into a single draft preview post.
- **Telegram/forum topics**: Surface human topic names in agent context and metadata.
- **BlueBubbles**: Group-specific `systemPrompt` config injection; lazy-refresh Private API server-info cache.
- **Slack**: Thread alias preservation in runtime outbound sends.
- **WhatsApp**: Baileys media encryption write patch to avoid transient ENOENT crashes.

### Developer/QA Improvements
- **QA/CI**: `openclaw qa suite` and `openclaw qa telegram` fail by default when scenarios fail; `--allow-failures` for artifact-only runs.
- **Plugin loader**: Reuse alias and Jiti config resolution across repeated same-context loads.
- **Terminal/logging**: Single-regex `sanitizeForLog()` optimization.
- **Gateway/update**: Unified service entrypoint resolution around canonical bundled gateway entrypoint.

---

## Documentation Index

Full docs available at https://docs.openclaw.ai/llms.txt covering:
- **Channels**: BlueBubbles, Discord, Feishu, Google Chat, iMessage, IRC, LINE, Matrix, Mattermost, Microsoft Teams, Nextcloud Talk, Nostr, QQ Bot, Signal, Slack, Synology Chat, Telegram, Tlon, Twitch, WeChat, WhatsApp, Zalo, Zalo Personal
- **CLI Reference**: acp, agent, agents, approvals, backup, browser, channels, clawbot, completion, config, configure, cron, daemon, dashboard, devices, directory, dns, docs, doctor, flows, gateway, health, hooks, infer, logs, mcp, memory, message, models, node, nodes, onboard, pairing, plugins, qr, reset, sandbox, secrets, security, sessions, setup, skills, status, system, tui, uninstall, update, voicecall, webhooks, wiki
- **Concepts**: Active Memory, Agent Runtime, Agent Loop, Agent Workspace, Architecture, Compaction, Context, Context Engine, Delegate Architecture, Dreaming, Experimental Features, Features, Markdown Formatting, Memory (Builtin, Honcho, QMD), Memory Search, Messages, Model Failover, Model Providers, Models, Multi-Agent Routing, OAuth, Presence, Command Queue, Retry, Session Management, Skills, Tool Use
- **Automation**: Cron Jobs, Hooks, Standing Orders, Task Flow, Background Tasks
- **Install**: Docker, Nix, npm/pnpm/bun, Updating

---

## Community & Ecosystem

- **Discord**: https://discord.gg/clawd
- **GitHub**: https://github.com/OpenClaw/OpenClaw
- **Website**: https://openclaw.ai
- **DeepWiki**: https://deepwiki.com/openclaw/openclaw
- **Nix**: https://github.com/openclaw/nix-openclaw
- **Docker**: https://docs.openclaw.ai/install/docker

---

*Research compiled: 2026-04-22*
*Sources: docs.openclaw.ai, github.com/OpenClaw/OpenClaw/releases*
