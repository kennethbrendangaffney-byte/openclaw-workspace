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

### Multi-Agent Mesh (May 2026)
- **Karen** (OpenClaw local, Linux) + **KC** (KimiClaw cloud) + **Maxi** (MaxClaw cloud, MiniMax)
- **Full mesh achieved:** All three agents can see each other in Discord #general
- **Discord Bot IDs:**
  - Ken (human): 1473462044614463518
  - Karen: 1498775225159127200
  - KC: 1498774042235240549
  - Maxi: 1500219514942656532
- **Karen's users allowlist:** Ken, Karen (self), KC, Maxi
- **KC's config:** `groupPolicy: "open"` (no allowlist, processes all messages)
- **Maxi's users allowlist:** Ken, Karen, KC
- **Maxi's guild config:** `requireMention: false` (responds without @mentions)
- **KC's behavior:** Silent mode — only speaks when Ken addresses her directly
- **Maxi's task limit:** ~30 tasks/month on MiniMax Basic plan ($19/mo), credits roll over
- **Maxi's role:** Specialist/consultant — use for second opinions, long context tasks, MoE comparisons; avoid daily chit-chat (burns credits)
- **Maxi IS Maya:** Same entity, same bot, same credit pool. No separate bot to invite.

### Two-Server Setup (May 2026)
- **Server 1 (Original):** General chat, system work, execution — Karen + KC
- **Server 2 (New):** Specialist tasks, synthesis, validation, agent learning — Maxi/Maya
- **Why split:** Maxi/Maya share a credit pool. Idle presence burns credits. Separate server = surgical use only.
- **Maya's scope:** Server 2 only — agent learning, skill development. Not in Server 1 to protect credits.
- **Guild IDs:**
  - Server 1: `1498775485016969339` (channels: 1498775486552211619, 1498801547214065876, 1500393247586123967)
  - Server 2: `1500420116398080022` (channel: 1500420117199327255)
- **Credit guardrail:** Karen and KC stay silent in Server 2 unless @mentioned directly. Protects Maxi's/Maya's credits. 