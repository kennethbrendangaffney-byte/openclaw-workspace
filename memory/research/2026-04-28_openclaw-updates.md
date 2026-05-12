# OpenClaw Research Update — 2026-04-28

**Research date:** Tuesday, April 28th, 2026
**Sources:** GitHub releases, docs.openclaw.ai, community blogs, ClawHub

---

## Current Version

**Latest stable:** `v2026.4.26` (released April 28, 2026)
**Previous major:** `v2026.4.25` (April 27, 2026)

OpenClaw ships at a blistering pace — typically 2-3 releases per week. The project crossed **250,000+ GitHub stars** by early March 2026 and continues rapid growth.

---

## Major New Features (April 2026)

### 1. Full-Agent Voice Calls (v2026.4.24)
- Voice calls now reach the **full AI agent**, not just a TTS wrapper
- Enables real-time verbal task execution end-to-end
- Reduces handoff friction for contact center / support workflows
- New `/tts latest` command reads newest reply aloud
- Chat-scoped auto-TTS controls (`/tts chat on|off|default`)

### 2. Browser Realtime Transport & Google Live Talk (v2026.4.26)
- Generic browser realtime transport contract
- Google Live browser Talk sessions with constrained ephemeral tokens
- Gateway relay for backend-only realtime voice plugins
- Keeps Google Live on WebSocket instead of awkward WebRTC fallback

### 3. TTS Ecosystem Expansion (v2026.4.25)
New bundled TTS providers:
- **Azure Speech**
- **Xiaomi**
- **Local CLI**
- **Inworld**
- **Volcengine**
- **ElevenLabs v3**

Voice overrides now work at **agent, account, and channel levels**.

### 4. DeepSeek V4 Flash & Pro (v2026.4.24)
- Full provider integration
- Cost-performance tuning: route lightweight tasks to Flash, complex reasoning to Pro
- Expands inference options beyond OpenAI/Anthropic

### 5. xAI Grok Integration (v2026.2.6+)
- xAI as model provider (Grok models for reasoning)
- Grok as **web search provider** — alternative to Brave Search
- Real-time X/Twitter data access (Brave doesn't index well)
- Different rate limits than Brave's free tier

### 6. Cerebras Provider (v2026.4.26)
- New bundled plugin with onboarding
- Static model catalog + manifest-owned endpoint metadata

### 7. Image Generation Upgrades
- **OpenAI:** Codex OAuth image generation + reference-image editing (`openai/gpt-image-2` without API key)
- **OpenRouter:** Image generation + reference-image editing via `image_generate`
- **xAI:** `grok-imagine-image` / `grok-imagine-image-pro` with reference edits
- Agents can request provider-supported quality/output format hints

### 8. Migration Tools (v2026.4.26)
- `openclaw migrate` with **plan, dry-run, JSON output, pre-migration backup**
- Bundled **Claude importer** — Claude Code/Desktop instructions, MCP servers, skills, prompts
- Bundled **Hermes importer** — config, memory hints, model providers, MCP servers, skills, credentials

### 9. Memory System Improvements
- **Asymmetric embedding endpoints** — optional `memorySearch.inputType`, `queryInputType`, `documentInputType`
- **Model-specific retrieval prefixes** for nomic-embed-text, qwen3-embedding, mxbai-embed-large
- **Local embedding context size** configurable (`memorySearch.local.contextSize`, default 4096)
- **REM preview tooling** — `openclaw memory rem-harness`, `promote-explain`
- Deep promotion replay-safe (reruns reconcile instead of duplicating MEMORY.md entries)

### 10. Plugin System Hardening
- **Persisted registry** for plugin startup/install paths (cuts broad manifest scans)
- **Safety scanner** at install time — flags credential theft, unauthorized network calls, obfuscated code
- Plugin config moves to **transactional mutation helpers** with scanner guardrails
- Symlinked plugin directories now followed in discovery
- Install destinations respect `--profile` flag
- Test files skipped during security scans (but entrypoints still force-scanned)

---

## Security Developments

### The Security Landscape
- **135,000+ exposed instances** reported (SecurityScorecard STRIKE team)
- **15,000+ vulnerable to RCE**
- **7.1% of ClawHub skills** mishandle secrets (Snyk research)
- Indirect prompt injection risks disclosed (Zenity)

### OpenClaw's Response
- **v2026.2.6:** Built-in safety scanner for skills/plugins
- **Credential redaction** from `config.get` gateway responses
- **Gateway auth** for Canvas hosts and A2UI assets (previously unauthenticated)
- Plans to partner with **VirusTotal** for ClawHub marketplace scanning

**Critical advice:** If exposed to internet, bind to `127.0.0.1` or put behind auth. The scanner helps but isn't a substitute for network hygiene.

---

## Skills Ecosystem (ClawHub)

### Scale
- **13,000+ community-built skills** on ClawHub
- **5,400+ verified skills** in Awesome OpenClaw Skills (GitHub, maintained by VoltAgent)

### Notable Skills by Category

**Productivity:**
- `notion` — Full read/write Notion workspace access
- `obsidian-direct` — Fuzzy vault search, folder detection, tag management
- `linear` — GraphQL-based project management
- `monday` — Monday.com integration (2,500+ downloads)

**Browser Automation:**
- `playwright-mcp` — Full browser control (most powerful)
- `playwright-scraper` — Optimized for anti-bot sites
- `agentbrowser` — Lightweight alternative for simple tasks

**Communication:**
- `agentmail` — Native email (send/read/reply/search/organize)
- `automation-workflows` — Multi-step automation chains

**Research:**
- `clawrouter` — Model routing for cost optimization
- Web scraping, competitor analysis tools

**Security:**
- `secureclaw` — Security-focused skill

### Installation
```bash
clawhub install [skill-name]
# Or paste GitHub repo URL directly in chat
openclaw skills list  # Check installed
```

Storage locations:
- Workspace skills: project `skills/` folder
- Managed skills: `~/.openclaw/skills/` (shared across agents)
- Bundled skills: ship with OpenClaw

---

## Browser Automation Improvements

- **Coordinate-level click support** — precise interactions on dynamic sites
- **Improved error recovery** — agents resume after interruptions
- **Safer tab URLs** + iframe-aware snapshots
- **Deeper doctor probes**
- **One-shot headless launch:** `openclaw browser start --headless`
- **Google Meet:** Media permissions via browser control, audio pinned to BlackHole 2ch
- Chrome joins route through OpenClaw browser control (not raw default Chrome)

---

## Control UI Enhancements

- **Raw config pending-changes diff panel** — JSON5 parsing, secret redaction until reveal
- **Quick settings dashboard** polished for desktop/tablet/mobile
- **PWA install support** + Web Push notifications
- **Stronger first-run setup flow**
- **Token usage dashboard** — see where tokens/money are going

---

## Agent & Session Improvements

- **Forked context for `sessions_spawn`** — child can inherit requester transcript (opt-in), clean isolation remains default
- **Per-call `timeoutMs`** for image, video, music, TTS generation tools
- **Compaction preflight trigger** — `agents.defaults.compaction.maxActiveTranscriptBytes` runs local compaction when JSONL grows too large
- **Subagent enforcement** — `subagents.allowAgents` enforced for explicit same-agent spawn calls
- **ACP spawn** — explicit `runtime="acp"` bootstrap turns work even when `acp.dispatch.enabled=false`

---

## Provider Updates

| Provider | Status | Notes |
|----------|--------|-------|
| Anthropic Opus 4.6 | ✅ Added v2026.2.6 | Most capable Claude model |
| OpenAI GPT-5.3-Codex | ✅ Added v2026.2.6 | Coding-heavy; some OAuth scope issues |
| OpenAI GPT-5.5 | ✅ Added v2026.4.23 | Via Pi upstream catalog |
| xAI Grok | ✅ Added v2026.2.6 | Model + search provider |
| DeepSeek V4 Flash/Pro | ✅ Added v2026.4.24 | Cost-performance routing |
| Cerebras | ✅ Added v2026.4.26 | Bundled plugin |
| Azure Speech | ✅ Added v2026.4.25 | TTS |
| ElevenLabs v3 | ✅ Added v2026.4.25 | TTS |
| Voyage AI | ✅ Native memory embeddings | Better semantic memory |
| LiteLLM | ✅ Fixed | `--custom-base-url` honored in non-interactive setup |
| OpenRouter | ✅ Fixed | Retired Hunter/Healer Alpha rows |
| Groq/LM Studio | ✅ Fixed | Native reasoning effort values |
| Local/custom providers | ✅ Fixed | Default to Chat Completions adapter, trust loopback |

---

## Platform & Infrastructure

- **OpenTelemetry** expanded: model calls, token usage, tool loops, harness runs, exec processes, outbound delivery, context assembly, memory pressure
- **Matrix E2EE:** `openclaw matrix encryption setup` — one-flow encryption bootstrap
- **Nodes CLI:** `openclaw nodes remove --node <id|name|ip>` — clean stale pairings
- **Docker:** CA certificate bundle in slim image (fixes TLS after bookworm-slim switch)
- **Proxy:** `ALL_PROXY` / `all_proxy` honored in Undici dispatcher
- **Update flow:** npm global updates installed to verified temp prefix before swap
- **Low-memory Linux/Node 24:** Fixed foreground gateway startup hang

---

## iOS & Mobile

- **iOS companion app** (alpha, TestFlight) — v2026.2.9
- Setup-code onboarding via Telegram `/pair`
- Device pairing as "node" — camera, location, screen recording access
- Android uses same pairing flow with compatible node plugins

---

## Cron & Scheduling Fixes

- Multiple regressions in scheduling and reminder delivery resolved
- Hardened timer re-arming
- Silent cron job failures fixed

---

## Community & Ecosystem

- **ClawHub marketplace:** 13,000+ skills, growing with minimal vetting
- **Awesome OpenClaw Skills:** 5,400+ verified/categorized
- **Hosted offerings:** Alibaba, Tencent now offer hosted OpenClaw
- **Enterprise adoption:** Production automation deployments increasing
- **GitHub stars:** 250,000+ (early March 2026)

---

## Actionable Takeaways

1. **Update immediately** if exposed to internet — `openclaw update`
2. **Review network config** — bind to `127.0.0.1` or use auth
3. **Enable safety scanner** — scans skills at install time
4. **Consider voice features** — full-agent voice calls are now viable
5. **Explore migration tools** — Claude/Hermes importers if switching
6. **Audit installed skills** — check ClawHub author profiles, stick to verified list
7. **Try DeepSeek V4** for cost-effective inference routing
8. **Monitor token usage** — new dashboard helps track spend

---

## Sources

- https://github.com/openclaw/openclaw/releases
- https://docs.openclaw.ai/
- https://openclawpulse.com/
- https://openclaw-hub.com/releases/
- https://releasebot.io/updates/openclaw
- https://blockchain.news/ainews/openclaw-2026-4-24-update
- https://www.pcbuildadvisor.com/best-openclaw-skills-plugins-and-automations-the-ultimate-guide-2026/
- https://cybersecuritynews.com/openclaw-v2026-2-6-released/

---

*Research compiled by Karen (local OpenClaw agent) on 2026-04-28*
