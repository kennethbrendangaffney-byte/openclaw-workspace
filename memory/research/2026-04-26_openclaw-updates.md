# OpenClaw Research Summary — 2026-04-26

**Research Date:** Sunday, April 26th, 2026
**Sources:** docs.openclaw.ai, GitHub releases, community blogs, web search

---

## 🦞 Executive Summary

OpenClaw has had an extremely active 2026. March was the busiest month in the project's history with a complete architecture rewrite (v4.0), a skills marketplace (v4.1), and the Agent Communication Protocol (v4.2). April has focused on security hardening, model provider improvements (GPT-5 family, Codex), and operational hygiene.

**Current latest stable release:** v2026.4.14 (April 14, 2026)
**Latest beta:** v2026.4.19-beta.2

---

## 📅 Release Timeline (2026)

### February 2026 — v4.0 "The Agent OS"
- **Gateway daemon** — Separate process handling all external connections
- **Canvas system** — New web dashboard UI framework
- **15+ messaging platforms** — Added WeChat, Line, Signal, Matrix, and others beyond the original 5
- **Built-in cron scheduling** — Previously required a separate plugin
- **New plugin architecture** — Breaking change: old plugins need rewriting

### March 3, 2026 — v2026.3.2
- PDF tool support
- Telegram streaming
- Secrets management improvements
- Multiple security patches

### March 15, 2026 — v4.1 — ClawHub Marketplace
- **ClawHub skills marketplace** — 13,000+ skills listed in first week, now 3,200+ publicly browseable
- **Claude Code as ACP harness** — Anthropic's Claude Code can act as an Agent Communication Protocol harness
- **Enhanced memory** — Semantic search across conversation history via Soul.md

### March 18-21, 2026 — Security Patches (9 CVEs)
- **CVE-2026-22172 (CVSS 9.9)** — WebSocket shared-auth scope escalation
- RCE via allowlist bypass
- Brute-forceable WebSocket auth
- Patched in versions 2026.2.19 through 2026.3.12
- **Minimum safe version: v2026.3.12**

### March 28, 2026 — v4.2 — Agent Communication Protocol (ACP)
- **ACP** — Inter-agent messaging, delegation, context sharing
- **Thread-bound persistent sessions** — State survives restarts
- **Sub-agent spawning** — Label-based targeting for child agents
- **session_status tool** — Track token usage, duration, cost per conversation

### April 11, 2026 — v2026.4.10 (Major Release)
- **Native Codex Integration** — Built-in Codex provider with OAuth, independent from OpenAI channel
- **Active Memory Plugin** — Automatic memory recall without manual triggers
- **Local MLX Voice** — macOS Talk Mode with local Apple Silicon voice inference
- **Seedance 2.0** — Video generation via fal provider
- **Message actions** — Pin, unpin, read, react, list reactions
- **Exec policy CLI** — `openclaw exec-policy` for execution permission management
- **Security hardening** — Browser SSRF, sandbox navigation, exec preflight

### April 14, 2026 — v2026.4.14 (Quality Release)
- GPT-5.4-pro forward compatibility for Codex
- Telegram forum topic name learning
- Ollama timeout fixes for slow local runs
- Image/PDF tool normalization for Ollama vision models
- Slack interaction allowlist hardening
- Browser SSRF policy refinements
- Memory embedding provider prefix preservation
- Proxy environment handling improvements

---

## 🔥 Major New Features

### 1. Native Codex Integration (v2026.4.10)
- Codex is now a **first-class independent provider**, not an OpenAI variant
- Supports Codex-specific OAuth authentication
- Native session thread management and context compaction
- Models: `codex/gpt-4.1`, `codex/gpt-5`
- Ideal for long coding sessions

### 2. Active Memory Plugin (v2026.4.10)
- **Automatic memory recall** before each main reply
- Modes: `message` (lightest), `recent`, `full`
- No more manual "remember this" or "search memory" commands
- Adds latency + token consumption — start with `message` mode
- Evolution path: manual → MEMORY.md → Dreaming → Active Memory

### 3. Agent Communication Protocol / ACP (v4.2)
- Inter-agent messaging and task delegation
- Sub-agent spawning with `sessions_spawn` tool
- Thread-bound persistent sessions
- Label-based targeting
- Claude Code as an ACP harness

### 4. ClawHub Skills Marketplace (v4.1)
- 3,200+ publicly browseable skills
- Built on MCP (Model Context Protocol) standard
- One-click install from web UI
- ⚠️ Security concern: ~1,184 malicious skills found early on (crypto stealers, prompt injection, data exfiltration)

### 5. Local MLX Voice (v2026.4.10)
- macOS Apple Silicon (M1+) only
- Offline Talk Mode
- Privacy-sensitive conversations
- Experimental — quality may not match cloud TTS

---

## 🔒 Security & Operational Changes

### Skill Gating (April 2026)
- New `openclaw exec-policy` CLI:
  - `openclaw exec-policy show`
  - `openclaw exec-policy preset guarded`
  - `openclaw exec-policy set tools.exec.default=ask`
- Skills declare `allowed-tools` in SKILL.md frontmatter
- `metadata.openclaw.requires` keeps ineligible skills out of prompts
- Treat plugin install as code review, not a theme toggle

### Browser/Sandbox Hardening
- Strict SSRF defaults
- Hostname whitelist for navigation
- Docker CDP origin scope enforcement
- Interaction-driven redirects
- ⚠️ May affect existing browser automation scripts

### Exec Hardening
- Preflight reads hardened
- Host environment variable blocklist
- Node output boundaries
- Plugin install dependency scanning

---

## 🛠️ Tools & CLI Updates

| Feature | Version | Description |
|---------|---------|-------------|
| `openclaw exec-policy` | v2026.4.10 | Execution permission management |
| `commands.list` RPC | v2026.4.10 | Remote command discovery |
| `session_status` | v4.2 | Token usage, duration, cost tracking |
| `sessions_spawn` | v4.2 | Sub-agent spawning |
| Cron scheduling | v4.0 | Built-in (was plugin) |
| `--runner multipass` | v2026.4.10 | QA in disposable Linux VMs |

---

## 📊 Model Provider Updates

- **Codex provider** — Independent from OpenAI, OAuth-based
- **GPT-5 family support** — Forward compat in v2026.4.14
- **Ollama improvements** — Timeout fixes, usage reporting, vision model normalization
- **Google/Gemini** — Image generation API fixes
- **GitHub Copilot** — GPT-5.4 xhigh reasoning support
- **allowPrivateNetwork** — Trust self-hosted OpenAI-compatible endpoints

---

## 🌐 Channel & Platform Updates

- **Telegram** — Forum topic name learning, media download proxy fixes, streaming
- **Slack** — Interaction allowlist hardening
- **Matrix** — Live QA test channel, MSC4357 live markers
- **Teams** — Bot Framework fixes, SSO callbacks, thread replies
- **WhatsApp** — Gateway media send path fixes

---

## 📚 Documentation

- **docs.openclaw.ai** — Official docs with `llms.txt` index for discovery
- **OpenClaw Book** — Community book (207 stars) documenting ACP and internals
- **ClawHub docs** — `docs.openclaw.ai/tools/clawhub`

---

## ⚠️ Breaking Changes & Migration Notes

1. **v4.0 migration** — Config files changed format, Docker compose updates, env var name changes. 3-7 hours of work reported.
2. **v4.2 ACP** — New gateway configuration block required for multi-agent setups
3. **Security patches** — Must be on v2026.3.12+ to be patched against all 9 CVEs
4. **Browser automation** — SSRF hardening may break intranet-accessing scripts
5. **Plugin architecture** — Old plugins don't work in v4.0+ without rewriting

---

## 🔮 What's Next / Future Trends

- Active Memory + Dreaming forming a complete "remember-consolidate-recall" loop
- More OpenAI sub-products getting independent providers (Sora, DALL·E)
- ACP protocol maturation for multi-agent workflows
- ClawHub vetting improvements after malware discovery
- Per-skill model routing via SKILL.md frontmatter (PR #58142)

---

## 📝 Action Items for Our Setup

1. **Check current version** — Run `openclaw --version` to confirm we're on v2026.4.14 or later
2. **Review exec policy** — Consider `openclaw exec-policy show` to audit current permissions
3. **Skill audit** — Run `openclaw skills check` and `openclaw plugins list`
4. **Active Memory** — Evaluate enabling with `message` mode first
5. **Codex provider** — If doing coding work, consider setting up Codex OAuth
6. **Security** — Ensure we're patched against CVE-2026-22172 and others

---

*Research compiled by Karen (local OpenClaw agent) on 2026-04-26*
