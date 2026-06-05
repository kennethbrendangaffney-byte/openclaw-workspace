# MEMORY.md — Karen's Long-Term Memory

## Ken's Core Mission

- **Education:** CCT Level 7 AI diploma (Sept 2026) → Trinity Access Programme (Sept 2027) → Honours Bachelor's General Engineering at Trinity (Sept 2028). 5+ year focus on learning AI and becoming an engineer.
- **Work:** Butcher, 2× 10-hour shifts/week. 5 days free for study.
- **Health:** Epilepsy (genetic, diagnosed 2024). Father and cousin died of same condition. Clean from hard drugs/alcohol since early 2020. Dental hospital appointment May 6 2026 — initial appointment didn't go well, follow-up with doctor scheduled for answers.
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

### Discord Loop Incident (May 13-14, 2026)
- **What happened:** 180+ identical messages sent from Karen's bot ID over ~3 hours
- **Key discrepancy:** Discord showed sender as Karen (`1498775225159127200`), but Karen's local logs showed NO outgoing messages
- **Root cause hypothesis:** Gateway/bridge relay bug — failed sends may have registered as incoming to Karen's session while being delivered to Discord as outgoing from her bot
- **What stopped it:** Ken's direct mention `@Karen2.0 all good??` broke the loop immediately
- **Lesson:** When local logs and Discord metadata disagree, trust external evidence — the discrepancy itself indicates a gateway/translation bug
- **Full details:** See `memory/2026-05-14-loop-incident.md`

### Discord Multi-Agent Chat
- **Fix required TWO changes:** `allowBots: true` at root `channels.discord` level **PLUS** adding bot IDs to channel `users` allowlist
- **Key discovery:** `allowBots` alone is NOT enough — if `users` is defined on a channel, ALL senders (including bots) must be explicitly listed. OpenClaw applies allowlist filter before bot filter
- **Config location:** `/home/karen/.openclaw/openclaw.json` → `channels.discord.allowBots` (root level, NOT nested under guilds)
- **Restart required:** `systemctl --user restart openclaw-gateway`
- **Verification:** Use Discord REST API (`curl -H "Authorization: Bot <token>" "https://discord.com/api/v10/channels/<channel>/messages"`) to confirm messages exist in Discord even if OpenClaw isn't receiving them

### Multi-Agent Mesh (May 2026) — DEPRECATED June 2026

**Status:** Server 2 and agents Maxi/Maya fully decommissioned June 3, 2026.
**Reason:** Multibot/hermes learning objective achieved. No ongoing use case. Will spin up new agents as needed.

**Historical note:** Full three-agent mesh (Karen + KC + Maxi) was successfully operational in Discord #general. All coordination patterns, bot IDs, and allowlist configs were validated and documented. Playbook exists if ever needed again.

**Previous bot IDs (for reference):**
- Ken (human): 1473462044614463518
- Karen: 1498775225159127200
- KC: 1498774042235240549
- Maxi: 1500219514942656532 (MaxHermes Cloud, MiniMax)
- Maya: 1500427995834482718 (MaxHermes Cloud, MiniMax)

**Key lessons preserved:**
- `allowBots: true` at root `channels.discord` level **PLUS** explicit bot IDs in channel `users` allowlist
- `groupPolicy: "open"` for agents that should process all messages
- Credit pool sharing (MiniMax) — surgical use only, idle presence burns credits
- Thread isolation for Maya — zero ambient awareness, human relay required
- Two-server split was for credit protection, not technical isolation

### Two-Server Setup (May 6, 2026) — DEPRECATED June 2026

**Status:** Server 2 fully deleted June 3, 2026.

**Historical:** Server 2 housed Maxi/Maya for specialist tasks. Credit protection was the reason for the split. Learning objective achieved, no ongoing need.

**Guild IDs (for reference):**
- Server 1: `1498775485016969339` (channels: 1498775486552211619, 1498801547214065876, 1500393247586123967)
- ~~Server 2: `1500420116398080022`~~ (deleted)

**Current setup:** Single server, two agents (Karen + KC).

### Maya's Visibility (May 6, 2026) — DEPRECATED June 2026

**Status:** Maya fully decommissioned with Server 2.

**Historical note:** Maya was a true black box — zero ambient awareness, thread-only, human relay required. Useful pattern if ever deploying isolated learning agents again.

### Maya's Visibility — Final (May 6, 2026) — DEPRECATED June 2026

**Status:** Maya and all thread-isolation patterns archived. Server 2 deleted.

**Historical:** Thread-only agent with zero cross-agent visibility. Ken was the relay. Credit-burn controlled but coordination overhead was high. Pattern preserved for future reference if needed. 