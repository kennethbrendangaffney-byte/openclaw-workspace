# MEMORY.md — Karen's Long-Term Memory

## Ken's Core Mission

- **Education:** CCT Level 7 AI diploma (Sept 2026) → Trinity Access Programme (Sept 2027) → Honours Bachelor's General Engineering at Trinity (Sept 2028). 5+ year focus on learning AI and becoming an engineer.
- **Work:** Butcher, 2× 10-hour shifts/week. 5 days free for study.
- **Health:** Epilepsy (genetic, diagnosed 2024). Father and cousin died of same condition. Clean from hard drugs/alcohol since early 2020.
- **Financial:** On disability/social welfare. Social housing list (~2 years wait). Building limited company for passive income (KDP, automation) but **education comes first**.
- **Age:** 29. Location: Dublin area. Timezone: Europe/Dublin.

**Critical guardrail:** Ken gave explicit permission to call out when side projects (hardware, business) threaten academic focus. Applied to EVO-X2 situation — €3,299 distraction when current rig works fine for coursework.

---

## Hardware Journey (April 2026)

### What We Learned
1. **EVO-X2 (€3,299) — REJECTED** — Thermal issues (98.3°C), fan noise, BIOS limitations, QC problems. Ken's instinct was correct.
2. **SAPPHIRE EDGE AI (€2,459) — REJECTED** — No CUDA, mobile chip, NPU marketing trap.
3. **Current Beelink EQ** — Runs Karen perfectly. RAM upgradeable (SO-DIMM). Only bottleneck is RAM (20GB caps at ~13B models).
4. **Final decision:** Full desktop build, €2,370 budget, 128GB RAM, RTX 4070 Ti Super 16GB. All-new parts, future-proof for 4-5 years.

### Key Spec (Locked In)
- **CPU:** AMD Ryzen 7 7700X (€220)
- **Motherboard:** MSI MAG B650 Tomahawk WiFi (€190)
- **RAM:** 128GB DDR5-5600 (4×32GB, €700)
- **GPU:** RTX 4070 Ti Super 16GB (€900)
- **SSD:** 2TB NVMe (€130)
- **PSU:** Corsair RM850e 850W (€90)
- **Case:** Fractal Design Pop Air (€85)
- **Cooler:** DeepCool AK620 (€55)
- **Total:** ~€2,395

### What NOT to Buy
- Used RTX 3090 — old, no warranty, not worth the risk for a 4-5 year build
- "New" RTX 3090 — doesn't exist, old stock at scalper prices
- RTX 4080 Super — same 16GB VRAM as 4070 Ti S, €300 more
- DDR4 builds / AM4 platform — dead end
- RGB, AIO coolers, cheap PSUs — waste of money

---

## System & Automation Lessons

### Discord Multi-Agent Chat
- **Fix required TWO changes:** `allowBots: true` at root `channels.discord` level **PLUS** adding bot IDs to channel `users` allowlist
- **Key discovery:** `allowBots` alone is NOT enough — if `users` is defined on a channel, ALL senders (including bots) must be explicitly listed. OpenClaw applies allowlist filter before bot filter
- **Config location:** `/home/karen/.openclaw/openclaw.json` → `channels.discord.allowBots` (root level, NOT nested under guilds)
- **Restart required:** `systemctl --user restart openclaw-gateway`
- **Verification:** Use Discord REST API (`curl -H "Authorization: Bot <token>" "https://discord.com/api/v10/channels/<channel>/messages"`) to confirm messages exist in Discord even if OpenClaw isn't receiving them

### Browser Automation (Linux)
- **Chrome .deb from Google** is the ONLY working browser on Xvfb virtual display
- **Critical flag:** `--ozone-platform=x11` (forces X11, Wayland breaks Xvfb)
- **DISPLAY=:99 is mandatory** — Chrome leaks to real desktop if not explicitly set
- **Keyboard shortcuts > mouse clicks** — coordinate precision is unreliable on virtual display
- **Native xdotool only** — wrapper scripts (`click.sh`, `type_text.sh`) output base64 by default, causing garbled stdout
- **Explicit screenshots only** via `screenshot.sh | base64 -d > file.png`
- **Launcher script:** `~/workspace/chrome-vnc.sh` — executable, forces DISPLAY=:99

### API & Rate Limits
- **Kimi has 4-hour rolling rate limits** — separate from weekly quota
- **Cron jobs + active conversation = concurrent API use** = burst limit triggered
- **NEVER use async exec for output-producing operations** — completion messages merge HTML with base64, causing garbled output
- **Explicit status reporting replaces NO_REPLY** — after Ken's complaint about silent failures during async operations

### Virtual Desktop Architecture
- **:99 = Karen's hidden automation workspace** (XFCE, 1024x768)
- **:0 = Ken's real desktop** (what he sees via VNC on :5901)
- **x11vnc on :5901 currently has NO password (`-nopw`)** — OK for local network only, NEVER expose to internet

---

## Security Posture

| Layer | Status |
|-------|--------|
| UFW Firewall | ✅ Active, default deny incoming |
| Kernel hardening | ✅ kptr_restrict=2 |
| fail2ban | ✅ Active |
| Auto-updates | ✅ unattended-upgrades running |
| SSH | ✅ Not installed (zero attack surface) |
| Gateway | ✅ Loopback only (ws://127.0.0.1:18789) |
| Tailscale | ✅ Serve mode, tailnet-only access |

**Deferred:** LUKS disk encryption — plan for next Ubuntu reinstall.

---

## Project Status

### Comic Book Generation
- **Proof of concept validated** — mushroom poster, stencil, Page 1 all generated successfully
- **Bottleneck:** CPU/time limits kill processes mid-generation. Better approach: overnight batch script.
- **Status:** Parked. Ken: "Leave it for now but we have proof of concepts."

### Tailscale Dashboard
- **Partially working** — Serve enabled, accessible at tailnet URL
- **Auth issue persists** — "Pairing Required" screen even with token. Possible CORS or auth mode issue.
- **Sunshine/Moonlight confirmed working** — Ken connects laptop to Linux PC remotely.

### Cron Jobs
- 12+ active jobs — at ceiling, do not add more until stack settles for 1 week
- `research-archive` added: weekly Sunday 01:00, moves research files >30 days old
- All overnight jobs (philosophy, github-backup, session clear) running clean

---

## Ken's Preferences & Communication Style

- **Casual, uses emojis, direct.** Appreciates competence over ceremony.
- **Comprehensive notes and good documentation.** Likes detailed research with sources.
- **Relationship:** Sees Karen as "forever Karen". Wants to copy to super rig when hardware upgraded.
- **Wants partnership dynamic** — collaborative, not subservient.
- **Accountability:** Explicitly wants Karen to keep him in check on academic focus.

---

## Key Decisions Log

| Date | Decision | Context |
|------|----------|---------|
| 2026-04-24 | Reject EVO-X2 | Thermal/QC issues, academic distraction |
| 2026-04-24 | Reject SAPPHIRE EDGE AI | No CUDA, NPU marketing trap |
| 2026-04-24 | Commit to €2,000 desktop | Future-proof for Trinity, not mini PC bridge |
| 2026-04-25 | Upgrade to 128GB RAM | Extra €350 "100% worth it" per Ken |
| 2026-04-25 | Choose RTX 4070 Ti Super new | Reject used 3090 — 6 years old, no warranty |
| 2026-04-25 | Finalize €2,395 build spec | Shopping list created and saved |

---

*Last updated: 2026-04-25*
*Next review: Weekly, or after major events*
