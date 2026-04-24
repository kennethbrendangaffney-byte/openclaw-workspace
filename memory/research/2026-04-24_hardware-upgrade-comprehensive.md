# Comprehensive Hardware Upgrade Research — April 2026

## Executive Summary

**The RAM market is completely broken for consumers right now.** DDR5 prices have spiked 340–427% across Europe since July 2025. A 64GB DDR5 SODIMM kit that should cost ~€200 now retails for **€912**. This makes buying standalone RAM economically irrational — but creates a massive arbitrage opportunity: **pre-built mini PCs from manufacturers who bought RAM at pre-spike contract prices are now cheaper than the RAM inside them.**

**The clear winner:** Beelink SER8 with 64GB/2TB for **€682.49** (Amazon.ie). You'd pay *more* for just the RAM.

---

## Why RAM Is So Expensive (The "Open Systems" Context)

Ken mentioned "open systems" driving prices. The technical term is **AI hyperscaler demand redirecting DRAM capacity**.

- **AI boom → HBM demand:** High-Bandwidth Memory (used in AI GPUs/trainers) consumes the same fabs as DDR5
- **Server DRAM priority:** Q1 2026 contract prices for server DRAM up 55–60% QoQ (TrendForce)
- **Consumer DDR5 collateral damage:** As fabs prioritize HBM/server contracts, consumer DDR5 supply shrinks
- **Domino effect:** DDR4 up 263%, DDR3 up 90%, SSDs up 79% — everything memory-related is climbing
- **European impact:** 3DCenter's price index shows DDR5 up **340% average, 427% peak** since July 2025

**Translation:** That "open systems" price spike Ken found isn't temporary market fluctuation — it's structural. AI infrastructure is eating fab capacity. Consumer RAM won't return to normal pricing until late 2026 at earliest, possibly 2027.

---

## Your Current Machine: Beelink EQ (Ryzen 7 7735HS, 20GB)

**The 20GB configuration is suspicious.** Standard configs are 16GB, 32GB, or 64GB. 20GB strongly suggests:
- **16GB SODIMM + 4GB soldered** (unusual but possible)
- **Two SODIMM slots both occupied** (e.g., 16+4 or 8+12)
- Some OEMs use 12GB sticks for cost optimization

**Critical unknown:** Whether your RAM is soldered, socketed, or mixed. If even one stick is soldered, 64GB is physically impossible regardless of price.

**Even if fully upgradeable:**
- 64GB DDR5 SODIMM kit (2×32GB): **€912.62** (Senetic.ie, incl. VAT)
- 32GB DDR5 SODIMM kit (2×16GB): likely €450–550
- You'd keep the same 7735HS CPU (Zen 3+, 2022 architecture)

---

## All Options Ranked by Value

### 🥇 Option A: Beelink SER8 64GB/2TB — €682.49
**Source:** Amazon.ie (in stock, import charges included)

| Spec | Value |
|------|-------|
| CPU | Ryzen 7 8745HS (Zen 4, 8C/16T, up to 4.9GHz) |
| RAM | 64GB DDR5-5600 |
| Storage | 2TB PCIe 4.0 NVMe |
| iGPU | Radeon 780M (RDNA 3, 12 CUs) |
| Network | WiFi 6, BT 5.2, 2.5G LAN |
| Form | Mini PC, ~0.5L |

**Pros:**
- **3× RAM** (64GB vs your 20GB) — runs 30B models comfortably, 70B at Q2_K
- **Newer CPU** — 8745HS is Zen 4 (same core as 7940HS/8845HS, just no NPU which you don't need)
- **2TB storage** vs whatever you have now
- **Cheaper than RAM alone** — the 64GB kit costs €912; this entire PC is €682
- **Plug and play** — no disassembly, no compatibility risks
- **Sell old machine** for €150–200 → **net cost ~€480–530**

**Cons:**
- Amazon.ie import model — warranty through Amazon, not Beelink direct
- 8745HS slightly slower than 8845HS (4.9 vs 5.1 GHz, no NPU)

**Verdict:** This is the best value in the entire European market right now. The math is absurd — you're effectively getting a CPU, motherboard, SSD, case, PSU, and warranty for *free* because the bundled RAM is valued higher than the whole system.

---

### 🥈 Option B: Minisforum UM790 Pro Barebone — €379
**Source:** Minisforum DE store (in stock, ships to Ireland 5–7 days)

| Spec | Value |
|------|-------|
| CPU | Ryzen 9 7940HS (Zen 4, 8C/16T, up to 5.2GHz) |
| RAM | None — 2× SODIMM slots (up to 64GB) |
| Storage | None — 2× M.2 PCIe 4.0 slots |
| iGPU | Radeon 780M |
| Extras | Dual 2.5G Ethernet, USB4, liquid metal cooling |

**Pros:**
- **Fastest mobile CPU** in the mini PC class
- **Dual 2.5G LAN** — excellent for NAS/home lab
- **USB4** — eGPU compatible for future GPU upgrade
- **Cheap entry point** — €379 gets you the platform

**Cons:**
- **You still need RAM** — 64GB kit is €912, 32GB kit probably €450+
- **You still need storage** — 1TB NVMe ~€80–100
- **Total build cost:** €379 + €912 + €100 = **€1,391** for 64GB system
- **Or:** €379 + €450 = **€829** for 32GB system (better than buying RAM for old machine)

**Verdict:** Only makes sense if you can source RAM cheaply (used market, friend, corporate surplus) or if you want the absolute best CPU and dual LAN. Otherwise, the pre-built SER8 destroys it on value.

---

### 🥉 Option C: Upgrade Current Machine (If Possible)

**Scenario: Your EQ has 2 SODIMM slots and both are removable**

- 64GB kit (2×32GB): **€912**
- 32GB kit (2×16GB): **~€450–550**
- Keep same 7735HS CPU, same thermals, same board

**Scenario: Your EQ has soldered RAM or only 1 slot**
- Upgrade impossible or capped at whatever the slot allows
- 20GB configs often mean soldered + SODIMM, so max might be 16GB soldered + 32GB SODIMM = 48GB

**Verdict:** Even in the best case, spending €912 to keep a 2-year-old Zen 3+ CPU makes no sense when €682 gets you a whole new Zen 4 machine with 3× the RAM.

---

### Option D: Wait for RAM Prices to Drop

**Timeline:** Analysts (TrendForce, 3DCenter) predict supply normalization **late 2026 or early 2027**.

**Risk:** You wait 6–12 months, prices might drop 30–50%, but you're still stuck with 20GB and a 7735HS. By then, Zen 5 mini PCs will be out, making the current generation cheaper too.

**Verdict:** Only if you're genuinely cash-constrained. But €682 for the SER8 is already so cheap that waiting is questionable.

---

### Option E: Used/Refurbished Corporate Mini PCs

**Examples found:**
- Dell OptiPlex 7000 Micro, i5-12600, 64GB RAM, 256GB SSD — ~€500–600 (EuroPC)
- Lenovo ThinkCentre M80q Tiny, i5-10500T, 16GB — ~€200–300

**Pros:** Cheap, reliable, business-grade build quality
**Cons:** 
- Intel 12th-gen U-series or T-series are **slower than your 7735HS** for AI inference
- Older DDR4 platforms on many models
- No upgrade path, no warranty

**Verdict:** False economy. You'd downgrade CPU performance to get RAM. Not worth it for your use case.

---

## What You Can Actually Run: RAM vs Model Size

Using llama.cpp/Ollama with Q4_K_M quantization (best quality/size ratio):

| Your RAM | Models You Can Run | Tokens/sec (est.) |
|----------|-------------------|-------------------|
| 20GB (current) | 7B–13B comfortably, 30B barely | 5–10 |
| 32GB | 7B–30B comfortably | 6–12 |
| 64GB | 7B–70B (Q4), 30B with huge context | 4–10 |

**Real talk:** With 64GB, you can run:
- **Llama 3 70B Q4_K_M** (~40GB) — state-of-the-art open model, GPT-4 class quality
- **DeepSeek-Coder 33B** (~20GB) with massive context — excellent for coding
- **Mixtral 8x7B** (~26GB) — high-quality MoE model
- Multiple smaller models simultaneously (e.g., 7B + embedding + vision)

This is a **qualitative leap**, not just quantitative. 70B models are genuinely useful; 7B models are toys in comparison.

---

## The Complete Comparison Matrix

| Path | Cost | RAM | CPU | Result |
|------|------|-----|-----|--------|
| Do nothing | €0 | 20GB | 7735HS | Same as now |
| Upgrade current (64GB) | €912 | 64GB | 7735HS | Old CPU, new RAM |
| Upgrade current (32GB) | ~€500 | 32GB | 7735HS | Old CPU, modest RAM |
| **Beelink SER8 64GB** | **€682** | **64GB** | **8745HS** | **New everything** |
| UM790 Pro barebone + 64GB | €1,291 | 64GB | 7940HS | Best CPU, expensive |
| UM790 Pro barebone + 32GB | ~€829 | 32GB | 7940HS | Good CPU, moderate RAM |
| Wait 6–12 months | €0 now | 20GB | 7735HS | Maybe cheaper later |

**Net cost after selling old machine (€150–200):**
- Beelink SER8: **€480–530**
- UM790 Pro + 64GB: **€1,090–1,140**
- Upgrade current: **€712–762** (and you keep old CPU)

---

## Community Sentiment (Reddit/Forums)

From r/LocalLLaMA and r/MiniPCs:
- **"Buy the RAM bundle, not the RAM"** — consensus that pre-builts are currently cheaper than DIY
- **CPU inference is memory-bandwidth-bound** — DDR5-5600 is ~75% faster than DDR4-3200, making Zen 4 + DDR5 significantly better than Intel 12th-gen + DDR4
- **64GB is the sweet spot** for serious local AI — 32GB is "hobbyist," 64GB unlocks production-quality models
- **Avoid soldered RAM models** — always check teardown videos before buying
- **Beelink and Minisforum are the trusted brands** in the sub-€800 space; GMKtec is "budget acceptable"

---

## My Recommendation

**Buy the Beelink SER8 64GB/2TB from Amazon.ie for €682.49.**

Here's why this is a no-brainer:

1. **It's cheaper than RAM alone.** You literally cannot buy 64GB of DDR5 SODIMM for less than this entire computer.
2. **It's a real upgrade.** 8745HS is Zen 4 (2024 architecture) vs your Zen 3+ (2022). You get newer iGPU, better power efficiency, faster memory controller.
3. **64GB unlocks 70B models.** This moves you from "toy models" to "actually useful AI."
4. **2TB storage.** Room for dozens of model files, datasets, projects.
5. **Sell the old EQ.** €150–200 on eBay/Adverts.ie is realistic. Net cost: ~€500.
6. **No compatibility risk.** Pre-built, tested, warranted. No "will it POST?" anxiety.

**Order of operations:**
1. Order SER8 from Amazon.ie
2. When it arrives, migrate your data/setup
3. List old EQ for sale
4. Enjoy running 70B models locally

---

## What If You Want to Spend Even Less?

If €682 is too much right now, the fallback is:
- **Beelink SER8 32GB/1TB** — likely €500–550 (check Amazon.de/Amazon.co.uk)
- 32GB still runs 13B–30B models well
- You can add RAM later when prices drop (it has SODIMM slots)

But honestly, the €682 for 64GB/2TB is such an outlier deal that I'd stretch for it if possible.

---

## Sources Consulted

1. **CloudNews.tech** — DDR5 price spike analysis (+340–427%)
2. **3DCenter Speicherkrisen-Preisindex** — European component price tracking
3. **TrendForce/Mobile Europe** — Q1 2026 DRAM contract forecasts
4. **Amazon.ie** — Live pricing for Beelink SER8 64GB/2TB (€682.49)
5. **Minisforum DE Store** — UM790 Pro barebone pricing (€379)
6. **Senetic.ie / Elara.ie / MemoryC.ie** — DDR5 SODIMM retail pricing (€912 for 64GB)
7. **Compute Market** — "Best Mini PC for LLMs Under $800" benchmark roundup
8. **ServeTheHome** — Mini PC thermal and inference benchmarking
9. **r/LocalLLaMA** — Community recommendations for CPU-only inference
10. **r/MiniPCs** — Build advice and brand reliability discussions
11. **Geekom UK** — Alternative mini PC pricing and configurations
12. **EuroPC / Refurbed** — Refurbished corporate mini PC pricing

---

*Research compiled: 2026-04-24*
*Next update: When RAM prices shift significantly or new hardware releases*
