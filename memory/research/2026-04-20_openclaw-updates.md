# OpenClaw Framework Research Summary
**Date:** April 20, 2026
**Researcher:** Karen (local OpenClaw agent)
**Sources:** docs.openclaw.ai, GitHub releases, community search

---

## Executive Summary

OpenClaw continues rapid development in 2026 with significant releases through March and early April. The framework has matured substantially with major plugin ecosystem expansion, security hardening, and new orchestration capabilities. The project maintains ~361K GitHub stars and active community contribution.

---

## Latest Releases

### v2026.3.22 (March 23, 2026) — Major Release
The largest recent release with extensive changes across all subsystems:

**Breaking Changes:**
- Plugin install now prefers ClawHub before npm for npm-safe names
- Removed legacy Chrome extension relay path for browser MCP
- Standardized image generation on core `image_generate` tool (removed `nano-banana-pro` skill)
- New public plugin SDK surface at `openclaw/plugin-sdk/*` (old `openclaw/extension-api` removed)
- Matrix plugin completely rewritten using official `matrix-js-sdk`
- Removed legacy `CLAWDBOT_*` and `MOLTBOT_*` env compatibility names
- Discord command deployment switched to Carbon reconcile by default

**Major New Features:**
- **ClawHub Integration:** Native `openclaw skills search|install|update` flows with tracked update metadata
- **Marketplace Support:** Claude marketplace registry resolution, `plugin@marketplace` installs
- **Plugin Bundles:** Compatible Codex, Claude, and Cursor bundle discovery/install support
- **SSH Sandbox Backend:** Core SSH sandbox with secret-backed key, certificate, and known_hosts inputs
- **OpenShell Backend:** Pluggable sandbox with `mirror` and `remote` workspace modes
- **Exa Search:** Bundled web-search plugin with Exa-native date filters and content extraction
- **Tavily Search:** Dedicated `tavily_search` and `tavily_extract` tools
- **Firecrawl:** Onboard/configure search provider with explicit `firecrawl_search` and `firecrawl_scrape`
- **Anthropic Vertex:** Core provider support for Claude via Google Vertex AI
- **Chutes Provider:** Bundled with OAuth/API-key auth and dynamic model discovery
- **Xiaomi Provider:** Switched to `/v1` OpenAI-compatible endpoint with MiMo V2 models
- **Per-agent thinking/reasoning/fast defaults** with auto-revert for disallowed overrides
- **`/btw` side questions** for quick tool-less answers without changing session context

**Security Hardening:**
- Blocked build-tool JVM injection env vars (`MAVEN_OPTS`, `SBT_OPTS`, `GRADLE_OPTS`, `ANT_OPTS`)
- Hardened exec approvals against wrapper spoofing and `env` builtins
- Removed `jq` from default safe-bin allowlist (prevents `jq -n env` secret dumping)
- Enhanced voice call/webhooks security with signature verification and body limits
- Windows: Blocked remote `file://` media URLs and UNC paths preventing SMB credential handshakes
- iOS setup codes now bound to intended node profile

**Performance Improvements:**
- Gateway startup: Bundled channel plugins load from compiled `dist/extensions` (no recompilation)
- Prewarm primary model before channel startup
- Lazy-load channel add and root help startup paths
- Cache `models.json` readiness by config/auth-file state
- Default agent timeout raised from 600s to 48h for long-running ACP sessions

### v2026.3.7 (March 8, 2026)

**Major Features:**
- **Context Engine Plugin Interface:** Full lifecycle hooks for alternative context management (enables plugins like `lossless-claw`)
- **ACP Persistent Channel Bindings:** Durable Discord channel and Telegram topic binding storage
- **Telegram Topic Agent Routing:** Per-topic `agentId` overrides in forum groups and DM topics
- **Spanish locale support** in Control UI
- **SecretRef support** for `gateway.auth.token`
- **Docker/Podman extension dependency baking** via `OPENCLAW_EXTENSIONS`
- **Plugin before_prompt_build system-context fields:** `prependSystemContext` and `appendSystemContext`
- **TTS OpenAI-compatible endpoints** with custom baseUrl support
- **Slack DM typing feedback** via reaction-based processing status

---

## Active Pull Requests (April 2026)

### #59298 — Skill Update Notifications (Open, Apr 2)
- Adds `openclaw update hint` subcommand
- Surfaces available updates via skill preambles
- Reads cached `~/.openclaw/update-check.json` (zero network calls)
- 13 unit tests, addresses review feedback including Zod validation

### #63176 — ACP Spawn in Plugin Runtime (Open, Apr 8)
- Exposes `api.runtime.acp.spawn()` and `api.runtime.acp.prompt()` to plugins
- Gated behind `plugins.allowAcpSpawn` (opt-in, default `false`)
- Enables plugin authors to dispatch long-running coding agents (OpenCode, Codex, Claude Code)
- Production-validated: 3+ weeks in Telegram → Discord agent dispatch pipeline

---

## Plugin Ecosystem

### ClawHub Marketplace
- **3,000+ published skills**
- **800+ active developers**
- **15K+ daily installs**
- Average build time: 30 minutes

### Notable Community Plugins
- **Draw Things Image Generation:** Local AI image generation on Apple Silicon
- **Web Search Plus:** Enhanced web search capabilities
- **PDF Watermark:** Add watermarks to PDFs and images
- **DingTalk, QQbot, WeCom:** Community channel plugins

### Bundled Provider Plugins (New in 2026.3.22)
- OpenRouter, GitHub Copilot, OpenAI Codex moved into bundled plugins
- Dynamic model fallback, runtime auth exchange, stream wrappers
- MiniMax merged into single default-on plugin

---

## Key Documentation Updates

- New plugin SDK migration guide: https://docs.openclaw.ai/plugins/sdk-migration
- Matrix migration guide for upgrading from previous public plugin
- ClawHub docs: https://docs.openclaw.ai/tools/clawhub
- Security audit guidance for Docker + UFW policy
- Full documentation index available at: https://docs.openclaw.ai/llms.txt

---

## Notable Security Advisories Addressed

- **GHSA-qffp-2rhf-9h96:** `tar` hardlink path traversal (patched in 7.5.10)
- **GHSA-7jrw-x62h-64p8:** Device pairing token rotation hardening
- Hono vulnerabilities patched by pinning to 4.12.5

---

## Platform & Channel Updates

### Telegram
- Custom Bot API endpoint support (`apiRoot`)
- Auto-rename DM forum topics with LLM-generated labels
- Topic-edit actions for renames and icon updates
- Silent error replies option
- Sticky IPv4 fallback for unstable IPv6

### Discord
- Carbon reconcile for slash command deployment
- Auto presence updates
- Thread session lifecycle management
- Voice message support (opusscript fallback)
- Media SSRF allowlist for CDN hostnames

### Feishu
- Structured interactive approval cards
- ACP and subagent session binding
- Streaming reasoning support (`onReasoningStream`)
- Identity-aware structured card headers

### Android
- System-aware dark theme
- Gateway `talk.speak` for TTS (secrets stay on gateway)
- Call log and SMS search through gateway
- Location request crash fixes

### iOS
- App Store Connect release prep
- Keychain-backed gateway metadata
- Concurrency stability improvements
- Watch reply reliability

---

## Model Provider Updates

- **OpenAI:** Default switched to `openai/gpt-5.4`, added `gpt-5.4-mini` and `gpt-5.4-nano`
- **Google:** Gemini 3.1 Flash-Lite support
- **Z.AI:** GLM catalog synced to 4.5/4.6 families
- **xAI:** Grok catalog synced, fast mode mapping
- **Mistral:** Pricing metadata corrected
- **Venice:** Per-model completion limits, tool wiring disabled for non-FC models

---

## Recommendations for Our Deployment

1. **Consider upgrading** to v2026.3.22 for significant performance and security improvements
2. **Review plugin SDK migration** if using custom plugins (old `openclaw/extension-api` removed)
3. **Evaluate ClawHub** for skill discovery and management
4. **Monitor #63176** for ACP plugin runtime capabilities (relevant for our dual-agent setup)
5. **Review security hardening** changes, especially exec environment restrictions
6. **Check Matrix plugin** if using Matrix (complete rewrite)

---

*Research completed: April 20, 2026*
*Next recommended check: May 20, 2026*
