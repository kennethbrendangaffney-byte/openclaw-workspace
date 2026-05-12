# OpenClaw Framework Updates — May 2026

**Research date:** 2026-05-07
**Sources:** docs.openclaw.ai, GitHub releases, community blogs, ecosystem guides

---

## Latest Stable Release: 2026.5.6

Released **May 6, 2026** — a hotfix for the 2026.5.5 release that accidentally rewrote valid `openai-codex/*` OAuth routes to `openai/*`, breaking Codex-only setups.

**Key fixes in 2026.5.6:**
- Reverted the doctor --fix repair that broke OpenAI Codex OAuth routing
- Plugin fetch: dropped third-party symbol metadata from request headers to prevent SDK rejection
- Web fetch: bounded guarded dispatcher cleanup after request timeouts
- Recovery docs: [docs.openclaw.ai/providers/openai#check-and-recover-codex-oauth-routing](https://docs.openclaw.ai/providers/openai#check-and-recover-codex-oauth-routing)

**If you were affected by 2026.5.5:**
```bash
openclaw models set openai-codex/gpt-5.5 && openclaw config validate
```

---

## Major Release: 2026.5.2 → 2026.5.3

Released **May 5, 2026** — a stability/usability patch with 8 targeted improvements:

- **Faster plugin management** — improved plugin install/update performance
- **`/side` command** — new command for sidecar/agent management
- **Messaging channel improvements**
- **Developer tooling enhancements**
- **Agent performance optimizations**

---

## April 2026: The Big Surge

### v2026.4.15 — Claude Opus 4.7 + Gemini TTS

Released **April 15, 2026**:

- **Claude Opus 4.7 support** — 200K context window for local agent loops. Feed entire codebases into agent memory without truncation. Critical for complex refactoring across large repos.
- **Google Gemini TTS integration** — Voice-first agent interfaces. Sub-300ms latency on M3 Macs. Wake-word via local Whisper, only synthesized speech streamed to Gemini (privacy-preserving).
  ```bash
  openclaw voice --model gemini-tts --trigger "hey claw"
  ```

### v2026.4.12 — Manifest-Driven Plugin Execution (Security)

The **most significant security architecture change** since OpenClaw's inception:

- Every skill **must** include a `clawmanifest.json` file
- Cryptographically signed declaration of capabilities and permissions
- Explicit allowed file paths, network domains, shell commands — each with SHA256 hash
- Runtime enforcement via **eBPF probes at kernel level**
- If a skill declares access to `~/Maildir` but tries `~/.ssh`, agent receives **SIGKILL** before syscall completes
- Audit before install:
  ```bash
  openclaw audit --skill ./email-cleaner
  ```
- Moves security from "trust" to **"verify-then-execute"** — SOC2-ready

### Community Milestones (April 2026)

- **347,000 GitHub stars** — most starred repo in GitHub history
- **12,000 stars/day** at peak velocity
- **180,000 Discord members** (doubled)
- **450,000 r/openclaw members**
- **34% of Armalo AI enterprise customers** migrating from managed services to self-hosted OpenClaw

### Peter Steinberger Exit → OpenAI

- Steinberger (solo dev who built OpenClaw) joined OpenAI in **late March 2026**
- Transferred admin rights to a **7-person technical steering committee**
- Development **accelerated** — v2026.4.12 shipped 2 weeks ahead of schedule
- Governance shifted from BDFL to distributed foundation model (like Python/Node.js)

---

## February 2026: v2026.2.6 — Safety Scanner

Released **February 7, 2026** — the most consequential update in months:

### Built-in Safety Scanner

- Automatically scans installed skills for:
  - Credential theft patterns
  - Unauthorized network calls
  - Obfuscated code
- Runs at install time **and** on existing skills
- Credential redaction from `config.get` gateway responses
- Planned partnership with VirusTotal for marketplace-level scanning

**Context:** 135,000+ OpenClaw instances exposed to internet. 15,000 vulnerable to RCE. 7.1% of ~4,000 ClawHub skills mishandle secrets.

### Model Support

- **Anthropic Opus 4.6** — most capable Claude model for complex multi-step workflows
- **OpenAI GPT-5.3-Codex** — coding-heavy use cases (note: some OAuth scope issues reported)
- **xAI Grok** — as model provider AND dedicated web search provider (alternative to Brave)
  - Grok has real-time X (Twitter) data access
  - Different rate limits than Brave's free tier (1 req/s, 2,000/month)

### iOS Companion App (v2026.2.9)

- Alpha iOS app via TestFlight
- Setup-code onboarding + Telegram `/pair` command
- Node permissions: camera, location, screen recording, notifications
- Android support via compatible node plugins

### Other Improvements

- **Token usage dashboard** in web UI — see where tokens/money are going
- **Cron scheduling fixes** — hardened timer re-arming, resolved silent failures
- **Gateway authentication** — Canvas hosts and A2UI assets now require auth
- **Context overflow handling** — session history capped, graceful compaction retries
- **Telegram DM thread IDs** — auto-inject correctly for topic-based conversations
- **Voyage AI memory** — native embeddings support

---

## Ecosystem: Skills, Plugins & Community

### ClawHub Marketplace

- **13,000+ community-built skills** (as of Feb 2026)
- **5,400+ verified skills** in curated "Awesome OpenClaw Skills" GitHub repo
- **50+ official skills** in core ecosystem
- **8 categories**
- Weekly new releases

### Skills vs Plugins vs Tools

| Concept | What it is | Example |
|---------|-----------|---------|
| **Skills** | What agent CAN do — modular capability packages | web-search, coding-agent, himalaya (email) |
| **Plugins** | WHERE agent communicates — channel integrations | Telegram, Discord, WhatsApp, WebChat |
| **Tools** | Individual functions AI calls | `web_search(query)`, `read_email(folder)` |

### Notable Skills (2026)

**Productivity & Knowledge:**
- `notion` — full read/write Notion workspace access (most downloaded)
- `obsidian-direct` — fuzzy search across vault, folder detection, tag management
- `linear` — GraphQL-based project management (create issues, update statuses, assign tasks)
- `monday` — Monday.com integration (2,500+ downloads)

**Browser Automation:**
- `playwright-mcp` — full browser control (navigate, click, fill forms, screenshots)
- `playwright-scraper` — optimized for anti-bot detection bypass
- `agentbrowser` — lightweight alternative for simple browsing

**Communication:**
- `agentmail` — full email infrastructure (send, read, reply, search, organize)
  - ⚠️ **Always configure explicit approval requirements** for delete/send/move permissions
- `automation-workflows` — meta-skill for multi-step automation chains

**Research & Data:**
- `clawrouter` — financial/routing skill (high impact for trading)
- `web-search` — internet research
- `crypto-alert`, `portfolio-tracker` — trading & finance

**Security:**
- `secureclaw` — security hardening skill
- `healthcheck` — system monitoring

### Channel Plugins

Built-in: Discord, Google Chat, iMessage, Matrix, Microsoft Teams, Signal, Slack, Telegram, WhatsApp, WebChat, Zalo

Bundled plugins add: Matrix, Nostr, Twitch, Zalo, and more

---

## Security Landscape 2026

### Threats Identified

- **135,000+ exposed instances** (SecurityScorecard STRIKE team)
- **15,000 vulnerable to RCE**
- **7.1% of ClawHub skills** mishandle secrets (Snyk)
- **Indirect prompt injection** risks via trusted integrations (Zenity)
- **China's Ministry of Industry** flagged misconfigurations as cyber threat
- **Trend Micro** highlighted bypassed guardrails
- **Veracode** called plugin ecosystem a systemic risk

### Security Measures Implemented

1. **Manifest-driven execution** (v2026.4.12) — eBPF-enforced sandboxing
2. **Safety scanner** (v2026.2.6) — automated skill auditing
3. **Credential redaction** from config API responses
4. **Gateway authentication** for Canvas/A2UI assets
5. **Plugin diagnostics** — actionable warnings for source-only TypeScript packages
6. **Exec approvals** — hardened file handling with symlink/hard-link safeguards

### Best Practices

- Update immediately if exposed to internet
- Bind to `127.0.0.1` or put behind authentication
- Audit skills before install: `openclaw audit --skill ./path`
- Use curated "Awesome OpenClaw Skills" list
- Check author GitHub history for skills touching email/files/credentials
- Separate vaults for production/staging
- Rotate API keys quarterly
- Log secret identifiers (never values), correlate with tool-call IDs

---

## What's Coming Next

From ecosystem roadmap:
- **Multi-agent orchestration** with built-in team workflows
- **Plugin marketplace** (community channel plugins alongside skills)
- **Visual workflow builder** for non-technical users
- **Enhanced security**: skill sandboxing and permission auditing
- **Mobile-native agent management app**
- **VirusTotal partnership** for marketplace-level scanning

---

## Quick Reference: Update Commands

```bash
# Standard update
openclaw update

# Or from source
cd ~/openclaw
git pull
npm install

# Docker
docker pull openclaw/openclaw:latest
docker compose up -d

# Check installed skills
openclaw skills list

# Install from ClawHub
clawhub install [skill-name]

# Audit a skill
openclaw audit --skill ./path
```

---

## Key Takeaways for Our Setup

1. **We're on a good track** — self-hosted, not exposed to internet, using curated skills
2. **Manifest system is critical** — any custom skills we build need `clawmanifest.json`
3. **Safety scanner** — run `openclaw audit` on all skills periodically
4. **Token dashboard** — useful for monitoring API costs if we add more cloud models
5. **iOS/Android nodes** — could be useful for Ken's mobile workflows
6. **Grok search** — alternative to Brave if we hit rate limits
7. **Cron fixes** — our cron jobs should be more reliable on newer versions

---

*Research archived by Karen | Next review: schedule in 2 weeks or after next major release*
