# OpenClaw Framework Updates — Research Summary

**Research Date:** 2026-04-24  
**Researcher:** Karen (OpenClaw local agent)  
**Sources:** docs.openclaw.ai, GitHub releases, community blogs, web search

---

## Executive Summary

OpenClaw has undergone massive evolution in early 2026, with three major architectural releases (v4.0–v4.2), a new skills marketplace (ClawHub), significant security hardening after 9 CVEs, and continued rapid iteration through April 2026. The project is now at **v2026.4.19-beta** with production-grade features like Gemini TTS, Model Auth dashboards, GitHub Copilot embeddings, and the Agent Communication Protocol (ACP).

---

## Major Version Releases

### v4.0 — "The Agent OS" (February 20, 2026)
Ground-up architecture rewrite:
- **Gateway daemon** — Replaced monolithic process with separate gateway handling all external connections
- **Canvas system** — New UI framework for web dashboard (richer but more memory-hungry)
- **15+ messaging platforms** — Expanded beyond original 5 to include WeChat, Line, Signal, Matrix, and others
- **Built-in cron scheduling** — Previously required a separate plugin, now native
- **New plugin architecture** — Old plugins need rewriting for the new API
- **Breaking changes:** Config format changes, Docker compose updates, environment variable renames. Migration reported at 3–7 hours for most users.

### v4.1 — ClawHub Marketplace (March 15, 2026)
- Official skills marketplace with one-click install
- **13,000+ skills listed in first week** (now 3,200+ stable catalog)
- **Claude Code as ACP harness** — Anthropic's Claude Code can act as Agent Communication Protocol harness
- **Enhanced memory** — Semantic search across conversation history via Soul.md
- **Security issue:** Up to 1,184 malicious skills discovered (crypto stealers, prompt injection, data exfiltration). Vetting process couldn't keep up.

### v4.2 — Agent Communication Protocol (March 28, 2026)
- **ACP (Agent Communication Protocol)** — Inter-agent messaging; one agent delegates to another
- **Thread-bound persistent sessions** — Conversations maintain state across restarts
- **Sub-agent spawning** — Label-based targeting lets parent agents spin up child agents
- **session_status tool** — Track token usage, session duration, and cost per conversation
- **Breaking change:** ACP requires new gateway configuration block

---

## Security: 9 CVEs (March 18–21, 2026)

Critical security patch week:
- **CVE-2026-22172 (CVSS 9.9)** — WebSocket shared-auth scope escalation. Attackers with valid shared token could self-declare admin scopes
- **RCE via allowlist bypass** — Sandbox escape for malicious skills
- **Brute-forceable WebSocket auth** — No rate limiting on connection attempts
- **Minimum safe version:** v2026.3.12 patches all nine CVEs

---

## Recent Releases (March–April 2026)

### v2026.3.2 — March 2026 Update
- **First-class PDF tool** — Native PDF analysis for Anthropic/Google models, fallback extraction for others
- **Telegram streaming on by default** — Partial streaming with sendMessageDraft for DMs
- **Secrets management overhaul** — Full SecretRef support across all 64 credential surfaces
- **Ollama memory embeddings** — 100% local memory search using Ollama models
- **Subagent file attachments** — Inline file attachments when spawning subagents
- **MiniMax M2.5 Highspeed** — New default for MiniMax OAuth plugin
- **Security hardening** — SSRF guards, webhook auth-before-body, sandbox boundary fixes, config backup permissions

### v2026.3.24 — "Quality + Safety" Update
- **New Public Plugin SDK** — Complete reconstruction of plugin architecture (openclaw/plugin-sdk/*)
- **Preflight checks** — CLI preflights npm package engines before global install
- **OpenAI API compatibility** — Native /v1/models and /v1/embeddings endpoints
- **Explicit model overrides** — Forward model overrides through API for specialized sub-tasks
- **Control UI improvements** — "Available Right Now" tools view, long-conversation compression refined
- **Android dark mode** — Native dark mode for mobile
- **Outbound media access** — Strictly aligned with file system policies
- **Plugin sandboxing** — Stricter isolation between third-party tools and core secrets

### v2026.4.10 — Codex & App Server
- **Bundled Codex provider** — Plugin-owned app-server harness for OpenAI Codex
- **Model auth improvements** — Better OAuth token handling and provider routing

### v2026.4.15 — Feature Release (April 15, 2026)
**Headline features:**
- **Gemini Text-to-Speech** — Google's high-quality voices for agent responses (WAV/PCM output)
- **Model Auth Status Dashboard** — OAuth token health and rate-limit pressure in Control UI
- **GitHub Copilot Embeddings** — Memory search via Copilot as embedding provider
- **LanceDB Cloud Storage** — Remote object storage for durable memory indexes
- **Anthropic model updates** — Claude Opus 4.7 defaults for image understanding

**Context & memory improvements:**
- Smarter context trimming — Aggressive startup/skills prompt budgets, capped memory_get excerpts
- **Dreaming storage separation** — Phase blocks now stored in memory/dreaming/{phase}/YYYY-MM-DD.md instead of inline
- Dreaming transcript cleanup — No more dream diary pollution in session ingestion

**Security fixes (25+ total):**
- Tool name collision protection — Client tools can't normalize-collide with built-ins
- WebChat audio security — localRoots containment enforced
- Matrix DM pairing protection — Blocked from authorizing room control commands
- Dangerous config protection — Rejects config enabling dangerouslyDisableDeviceAuth, allowInsecureAuth

**Channel fixes:**
- Discord tool-call display — Strip standalone Gemma-style payloads
- WhatsApp session reliability — Drain creds save queue before reopening sockets
- BlueBubbles catchup retry — Per-message retry ceiling (default 10)
- Cron announce delivery — Fix NO_REPLY text leakage

**Developer experience:**
- Local models lean mode — Drop heavyweight tools (browser, cron, message) for weaker local setups
- CLI transcript persistence — google-gemini-cli replies now appear in session history
- TUI streaming watchdog — Resets stuck streaming indicator after 30s of delta silence

### v2026.4.19-beta.1 — Latest Beta (April 19, 2026)
- **Cross-agent subagent spawns** — Route through target agent's bound channel account, preserving peer/workspace bindings
- **Telegram callback fixes** — Permanent callback edit errors treated as completed updates
- **Browser/CDP improvements** — Allow selected remote CDP profile host for health checks; phase-specific readiness diagnostics
- **Codex token tracking fix** — Stop cumulative app-server totals from inflating context percentages

---

## ClawHub Skills Marketplace

**Current state:** 3,200+ skills across categories:
- Web Search & Browsing (Tavily, Firecrawl, Google Search)
- Productivity (Obsidian, Notion, Google Calendar)
- Coding & Development (GitHub, GitLab, Jira, Code Interpreter)
- AI & Image Generation (DALL-E, Stable Diffusion, TTS)
- Automation & Workflows (n8n, Zapier, HTTP Requests, Cron)
- Social Media (Twitter/X, Reddit, Discord)

**Security model:**
- Open by default, GitHub account must be 1+ week old to publish
- Auto-hide skills with 3+ unique reports
- Moderation system for approvals/audits
- April 2026: New `openclaw exec-policy` flow for operator control over skill permissions

**Install methods:**
```bash
# Native OpenClaw
openclaw skills search "calendar"
openclaw skills install <skill-slug>
openclaw skills update --all

# ClawHub CLI (for publish/auth workflows)
npm i -g clawhub
clawhub login
clawhub install my-skill
```

---

## Agent Communication Protocol (ACP)

**Status:** Core feature since v4.2, actively evolving

**Capabilities:**
- Inter-agent messaging and delegation
- Thread-bound persistent sessions
- Sub-agent spawning with label-based targeting
- Cross-agent context sharing and workflow coordination
- ACP runtime plugin proposal to support 19+ standard ACP agents (Kiro, Cline, Copilot via JSON-RPC 2.0)

**Key tools:**
- `sessions_spawn` — Spawn isolated sub-agents (subagent or ACP runtime)
- `session_status` — Track usage, duration, cost
- `sessions_list` / `sessions_history` / `sessions_send` — Manage and communicate with sessions

---

## Notable Community & Ecosystem Updates

- **Peter Steinberger (creator) now at OpenAI** — Platform continues rapid community-driven evolution
- **MyClaw, Slack, Teams integrations** — Leveraging new SDK for rich interactions
- **Smart Discord thread naming** — Context-aware naming for Discord automation
- **Managed hosting option** — TryOpenClaw.ai ($39/month) for automatic updates and security patches

---

## Recommendations for Our Setup

1. **Upgrade priority:** We're likely on a pre-4.2 version. The security fixes alone (9 CVEs) make upgrading critical.
2. **Skill gating:** Use `openclaw exec-policy` to set guarded defaults before installing ClawHub skills.
3. **Local model lean mode:** Consider `agents.defaults.experimental.localModelLean: true` for our qwen3.5:4b/llama3.1:8b setups to reduce prompt overhead.
4. **Ollama embeddings:** Already configured — good. This keeps memory 100% local.
5. **Dreaming storage:** The new separate mode (default in 2026.4.15) will keep daily memory files cleaner.
6. **ClawHub exploration:** 3,200+ skills available — worth browsing for productivity/automation tools relevant to Ken's workflow.

---

## Sources

- docs.openclaw.ai (official documentation)
- github.com/openclaw/openclaw/releases (v2026.3.2, v2026.3.24, v2026.4.10, v2026.4.15, v2026.4.19-beta.1)
- compareclaw.com/blog/post/openclaw-2026-3-24-release-notes
- tryopenclaw.ai/blog/openclaw-march-2026-release-notes
- getopenclaw.ai/blog/openclaw-march-2026-update
- claw-crew.com/blog/openclaw-2026-4-15-update
- openclawservices.com/blog/skill-gating
- openclawlaunch.com/clawhub
- subagentic.ai/posts/openclaw-acpruntime-plugin-19-agents-json-rpc

---

*Research compiled by Karen on 2026-04-24. Next review recommended in 2 weeks given rapid release cadence.*
