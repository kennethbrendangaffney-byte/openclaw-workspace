# OpenClaw Framework Updates — May 11, 2026

> Research date: 2026-05-11 | Current version: 2026.5.2 (8b2a6e5)
> Sources: docs.openclaw.ai, GitHub releases, llms.txt index

---

## Latest Release: 2026.5.2 (Pre-release, May 11)

### Build & Tooling
- **pnpm 11 upgrade** — workspace package management upgraded to pnpm 11 across Docker, install, update, and release workflows
- **Stricter Vitest lint rules** — focused, disabled, conditional, hook, matcher, and expectation hazards now caught
- **Stricter TypeScript** — implicit returns, side-effect imports, overrides, and unused production code checks enabled
- **Pinned oxfmt defaults** — formatting behavior stable across upgrades

### Models & Local Inference
- **Provider-level localService startup** — on-demand local model servers start before OpenAI-compatible requests, including one-shot model probes
- **Local model lean mode** (`agents.defaults.experimental.localModelLean`) — drops `browser`, `cron`, and `message` tools from the default tool surface to reduce prompt size for weaker local backends. Useful for small-context local models that choke on the full schema set

### Agent Runtime
- **Trimmed default system prompts** — reduced prompt tokens while preserving GPT-5 personality guidance
- **`/context map` command** — sends a treemap image of current session context contributors
- **Process tool improvements** — agents now instructed to inspect background sessions with `process log` before sending interactive input; uses `waitingForInput`/`stdinWritable` hints
- **Compaction fixes** — scoped background exec/process session references preserved across embedded compaction and after-turn runtime contexts
- **Codex app-server** — always owns workspace, edit, patch, exec, process, and plan tools; deferred OpenClaw dynamic tools run through Codex's own searchable code execution surface
- **Image tool model overrides** — explicit overrides honored even when `agents.defaults.imageModel` is unset

### Slack Channel Improvements
- **unfurlLinks / unfurlMedia config** — per-account overrides to suppress Slack link/media previews without workspace-wide settings
- **replyBroadcast support** — agents can opt into Slack's parent-channel reply_broadcast for thread replies
- **Mention metadata preservation** — agents can distinguish direct bot mentions from implicit thread wakes
- **DM canonicalization** — outbound delivery-mirror routes for native DM channel IDs now route to peer user session, preventing split DM threads

### Discord Voice
- **Realtime voice diagnostics** — speaker turns, playback resets, barge-in detection, audio cutoff analysis
- **`talk.realtime.instructions`** — operators can append realtime voice style instructions while preserving built-in agent-consult guidance
- **Pure-JS opusscript default** — avoids slow native @discordjs/opus builds outside voice-performance lanes; opt-in native install available

### Plugin SDK
- **Deprecated public subpaths** — legacy barrel/test/zod kept for backwards compatibility; provider-specific helpers moved to provider-owned modules
- **Active model metadata exposure** — runtime-supplied model metadata available to native plugin tool factories for diagnostics/policy
- **Session actions** — bundled-plugin session actions, `sendSessionAttachment`, Cron-backed `scheduleSessionTurn`/`tag` cleanup under grouped session namespace
- **Media understanding** — `extractStructuredWithModel(...)` + optional provider-side `extractStructured(...)` for bounded image-first structured extraction

### Skills & Gateway
- **Private skill archive upload** — opt-in `skills.install.allowUploadedArchives` for trusted Gateway clients to stage/install zip-backed skills
- **Gateway protocol compatibility range** — native apps advertise v3/v4 compatibility so clients can connect after additive updates
- **Stale runtime chunks** — `sessions_send` ACP manager and `web_fetch` runtime chunks kept importable after package updates to prevent live gateway breakage before restart
- **Restart-sentinel fix** — async state probes during post-attach startup prevent Windows/redirected-state-directory blocking

### QA & Automation
- **Telegram live PR evidence** — Convex-leased credentials, Crabbox transcript capture, motion GIF previews, inline PR comments
- **Telegram desktop scenario builder** — leases Crabbox, installs native Telegram Desktop, configures OpenClaw gateway with leased bot credentials, records VNC artifacts

### Dependencies Refresh
- ACPX @agentclientprotocol/claude-agent-acp 0.33.1
- Codex ACP 0.14.0
- Baileys 7.0.0-rc10 (moved from @whiskeysockets/baileys to baileys)
- Google GenAI 2.0.1
- OpenAI 6.37.0
- AWS SDK 3.1045.0
- Kysely 0.29.0
- Tlon skill 0.3.6
- Aimock 1.19.5
- tsdown 0.22.0
- macOS Peekaboo bridge 3.0.0

### Fixes
- Google/Gemini: normalized retired Gemini 3 Pro Preview IDs → `google/gemini-3.1-pro-preview`
- Auth: single locked store write for successful model auth profile status (reduced post-reply latency)
- Codex: prompt-local current-turn context preserved through context-engine projection
- Telegram: agent-scoped media roots passed through gateway message actions
- Feishu: fallback to top-level group send when quoted replies target withdrawn messages
- Doctor: no longer flags live compatibility agent directory as orphaned when default agent ≠ main
- Auth/Claude CLI: fresher managed external CLI OAuth credentials persisted back to auth-profiles.json
- Codex rate limits: refreshed after subscription usage-limit failures (shows next reset time)
- Tasks: group and channel task completions routed through requester session for visible summaries

---

## Documentation Index (from llms.txt)

### New/Notable Docs Surfaces
- **ClawHub** — skill publishing, auth, HTTP API, telemetry, soul format
- **Automation** — cron jobs, hooks, standing orders, task flow, background tasks
- **Channels** — access groups, broadcast groups, channel routing, pairing, QA channel
- **Concepts** — active memory, agent workspace, context engine, delegate architecture, dreaming, experimental features, message lifecycle refactor, model failover, multi-agent routing, parallel specialist lanes, OpenClaw App SDK
- **CLI** — ACP, agent, approvals, backup, browser, channels, clawbot, commitments, completion, config, cron, daemon, dashboard, devices, directory, DNS, doctor, flows, gateway, health, hooks, infer, MCP, memory, message, migrate, models, node, onboard, pairing, path, plugins, proxy, QR, sandbox, secrets, security, sessions, setup, skills, status, system, tasks, TUI, uninstall, update, voicecall, webhooks, wiki

---

## Experimental Features (Opt-in)

| Surface | Key | Use When |
|---------|-----|----------|
| Local model lean | `agents.defaults.experimental.localModelLean` | Small local backend chokes on full tool surface |
| Session memory search | `agents.defaults.memorySearch.experimental.sessionMemory` | Index prior session transcripts (extra storage cost) |
| Structured planning tool | `tools.experimental.planTool` | Multi-step work tracking in compatible runtimes |

---

## Key Takeaways for Our Setup

1. **Local model lean mode** — Relevant for our qwen3.5:4b and llama3.1:8b setups. If agent turns start failing with malformed tool calls, this is the pressure-release valve.
2. **Cron improvements** — Better timeout handling, phase-specific watchdogs, stale acknowledgement guards. Our cron jobs (like this one) are more robust.
3. **Context map** — New `/context map` command for visualizing session context contributors. Could be useful for debugging complex sessions.
4. **Skills archive upload** — If we want to distribute custom skills between gateways, `skills.install.allowUploadedArchives` is now an option.
5. **Plugin SDK session actions** — Better programmatic session management for bundled plugins.
6. **Discord voice diagnostics** — If we ever enable voice features, the new diagnostics will help troubleshoot.

---

## Action Items

- [ ] Consider enabling `localModelLean` if local model agent turns degrade
- [ ] Review `/context map` for session debugging
- [ ] Check if any custom skills should use the new archive upload path
- [ ] Monitor 2026.5.2 pre-release stability before upgrading production gateway

---

*Filed by Karen | Cron research job: 2d7c55c1-711b-478e-81a1-e5007180f051*
