# OpenClaw Research Summary — 2026-04-25

> Research date: Saturday, April 25th, 2026
> Sources: docs.openclaw.ai, GitHub releases, community blogs, ClawSpiral, OpenClaw Chronicles
> Researcher: Karen (local agent)

---

## Latest Release: 2026.4.23 (April 24, 2026)

The most recent release as of today is **2026.4.23** (tagged April 24, 15:19 UTC).

### Key New Features in 2026.4.23

- **OpenAI Image Generation via Codex OAuth** — `openai/gpt-image-2` now works without an `OPENAI_API_KEY`, routing through Codex OAuth instead. Same for OpenRouter image models via `OPENROUTER_API_KEY`.
- **Enhanced Image Generation Tool** — Agents can now request provider-supported quality/output format hints. OpenAI-specific options: background, moderation, compression, user hints.
- **Subagent Forked Context** — `sessions_spawn` now supports optional forked context for native runs. Child agents can inherit the requester transcript when needed, while isolated sessions remain the default.
- **Per-Call Generation Timeouts** — Optional `timeoutMs` support for image, video, music, and TTS generation tools.
- **Local Embeddings Context Size** — Configurable `memorySearch.local.contextSize` (default 4096) for tuning local embedding contexts on constrained hosts.
- **Pi Package Update** — Bundled Pi packages updated to 0.70.0, using upstream GPT-5.5 catalog metadata.
- **Codex Harness Debug Logging** — Structured debug logging for harness selection decisions (visible in gateway logs, keeps `/status` clean).

### Notable Fixes in 2026.4.23

- Codex harness routes `request_user_input` prompts back to originating chat properly
- Block streaming deduplication — prevents duplicate replies after partial aborts
- Windows Codex shim resolution through `PATHEXT`
- Slack MPIM group DMs classified correctly; verbose tool progress suppressed in non-DM rooms
- OpenAI/Codex transcript replay stops synthesizing missing tool results
- Telegram media replies now parse remote markdown image syntax properly
- WebChat surfaces non-retryable provider failures (billing, auth, rate-limit)
- Memory/CLI local embedding provider declared in memory-core manifest
- Gateway preserves image attachments for text-only primary models (offloads as media refs)
- Google Meet plugin: Twilio cleanup, Chrome audio bridge cleanup
- Media understanding honors explicit `imageModel` config before native-vision skips
- Private-network SSRF opt-in honored for Gemini and OpenAI-compatible image generation
- Various Codex OAuth routing and auth hardening fixes

---

## April 2026 Major Release: 2026.4.12

Released April 13, 2026. Broad reliability and quality push.

### Active Memory (Automatic Recall)
- **Headline feature**: Automatic memory recall before every reply — no more manual "search memory" prompts
- Contributed by @Takhoffman (#63286)
- Three context modes: `message`, `recent`, `full`
- Configurable recall sub-agent prompt and thinking level
- Inspect retrieved memory with `/verbose`
- Follow-up PR (#65068) defaults QMD recall to search mode

### LM Studio Native Provider
- Full bundled provider (not just OpenAI-compatible shim)
- Guided onboarding flow
- Runtime model discovery (no manual model IDs)
- Stream preload support
- Memory-search embeddings for local recall
- Contributed by @rugvedS07 (#53248)

### MLX Speech for macOS Talk Mode
- Experimental local speech synthesis using Apple Silicon MLX framework
- Explicit provider selection (mlx / system voice / cloud)
- Local utterance playback and interruption handling
- Contributed by @ImLukeF (#63539)

### Codex Bundled Provider
- `codex/gpt-*` models now use Codex-managed auth and native threads
- `openai/gpt-*` continues through standard OpenAI provider
- They're no longer the same pipe
- Contributed by @steipete (#64298)

### Plugin Loading Overhaul
- Narrowed CLI/provider/channel activation to only what each plugin's manifest declares
- Leaner startup, faster command discovery
- Five PRs from @vincentkoc (#65120, #65259, #65298, #65429, #65459)

### Gateway Command Discovery RPC
- `commands.list` RPC added to gateway
- Remote clients can discover runtime-native commands, skill aliases, plugin commands
- Foundation for better Control UI command palettes
- Contributed by @samzong (#62656)

### Security Patches (April 2026)
All from @pgondhi987:
1. **busybox/toybox removed** from safe exec bins (#65713) — interpreter bypass blocked
2. **Empty approver list fix** (#65714) — no longer grants implicit authorization
3. **Shell-wrapper injection blocked** (#65717) — broader detection and prevention

---

## March 2026 Release: 2026.3.2

Released March 3, 2026.

### First-Class PDF Tool
- Built-in `pdf` tool — native PDF analysis for Anthropic/Google models
- Fallback to text/image extraction for other models
- Config options: `agents.defaults.pdfModel`, `pdfMaxBytesMb`, `pdfMaxPages`

### Telegram Streaming On By Default
- Partial streaming mode default for Telegram
- `sendMessageDraft` for private preview streaming
- Disable: `channels.telegram.streaming: off`

### Secrets Management Overhaul
- Full `SecretRef` support across all 64 user-supplied credential surfaces
- Fail-fast for unresolved secrets on active surfaces
- `openclaw secrets plan/apply/audit` flows integrated

### Ollama Memory Embeddings
- Run memory search entirely locally via Ollama
- Config: `memorySearch.provider: ollama`
- 100% local memory system possible

### Subagent File Attachments
- `sessions_spawn` supports inline file attachments (base64 or UTF-8)
- Files redacted from transcripts, cleaned up after session

### MiniMax M2.5 Highspeed
- First-class model in provider catalog
- New default for MiniMax OAuth plugin

### Security Hardening
- SSRF guards on web tools (DNS pinning preserved with proxy env vars)
- Webhook auth-before-body (BlueBubbles, Google Chat, LINE)
- Sandbox boundary: ACP spawns from sandboxed sessions rejected
- Config backup permissions: rotated backups now `0600`
- Plugin HTTP hardening: explicit auth required for route registrations
- Gateway/WS security: plaintext `ws://` restricted to loopback only

### Breaking Changes (March 2026)
1. New installs default `tools.profile` to `messaging` (existing installs unaffected)
2. `acp.dispatch.enabled` now defaults to `true`
3. Plugin HTTP handler API changed: `api.registerHttpHandler(...)` removed → use `api.registerHttpRoute({ path, auth, match, handler })`

---

## Community & Ecosystem

### ClawHub (Skills Marketplace)
- **3,200+ to 5,700+ skills** reported across sources (numbers vary by counting method)
- Community-driven skill marketplace
- Skills cover: browser control, email, calendar, custom APIs, shell commands, code execution, image generation, and hundreds of integrations
- Free and premium tiers available

### Notable Community Resources
- **awesome-openclaw-plugins** (composio-community) — 38 stars, curated collection covering git stats, cost tracking, secret detection, Docker, API testing, time tracking
- **awesome-openclaw-plugins** (ThisIsJeron) — 10 stars, general curated list
- **GitHub Topics**: `openclaw-plugins` — 6+ public repositories
- **alirezarezvani/claude-skills** — 232+ Claude Code skills & agent plugins (cross-compatible)

### Documentation
- **docs.openclaw.ai** — Official documentation with `llms.txt` index for discovery
- **openclaw-ai.com/en/docs/tools** — Tools documentation (typed tools replacing old `openclaw-*` skills)
- **dev.to articles** — Community guides (e.g., "Understanding OpenClaw Memory" by @zacvibecodez)

---

## Enterprise & Production Focus

April 2026 updates show a clear theme: **hardening for production workloads**.

- Breaking changes to node execution runtime
- OpenAI compatibility fixes (forward-compatibility for GPT-5 family)
- Unified runtime models for consistent agent behavior
- Performance improvements targeting throughput and reliability
- Security patches addressing interpreter bypass, authorization, and injection vectors

---

## Relevance to Our Setup

### Things We Should Consider

1. **Update Check** — We're running an older version. The April security patches (busybox removal, empty approver fix, shell-wrapper injection block) are worth prioritizing for any instance processing untrusted input.

2. **LM Studio Provider** — If we ever want to migrate from Ollama to LM Studio for local models, there's now a native provider with runtime discovery.

3. **Active Memory** — This is a big UX win. If our version supports it, enabling automatic recall would reduce manual "search memory" prompts.

4. **Secrets Management** — If we have raw API keys in config, migrating to `SecretRef` is recommended.

5. **Ollama Memory Embeddings** — We already have Ollama running (`nomic-embed-text`). If memory search isn't using it, that's a free local upgrade.

6. **Subagent Attachments** — Could be useful for sending files to spawned coding agents (ACP sessions).

7. **PDF Tool** — If we process PDFs regularly, the native tool would be more reliable than current workarounds.

---

## Sources

- https://github.com/openclaw/openclaw/releases (2026.4.23, 2026.4.12, 2026.3.2)
- https://www.getopenclaw.ai/blog/openclaw-march-2026-update
- https://openclawchronicles.com/posts/openclaw-2026-4-13-release-active-memory-lm-studio/
- https://clawspiral.com/news/2026-04-16-april-2026-framework-update/
- https://docs.openclaw.ai/
- https://github.com/composio-community/awesome-openclaw-plugins
- https://github.com/ThisIsJeron/awesome-openclaw-plugins
- https://openclawlaunch.com/clawhub
- https://www.thecaio.ai/blog/openclaw-skills-clawhub-guide

---

*Research completed by Karen on 2026-04-25. Next scheduled research: TBD.*
