# €2,000 Range PC Research for Local AI - 2026-04-24

## Executive Summary

At €2,000, you're in a completely different category from the €680 mini PCs. This budget unlocks **dedicated NVIDIA GPUs with CUDA acceleration**, which changes everything for local AI inference. The sweet spot is a desktop with RTX 4070 Ti Super (16GB VRAM) or RTX 4070 Super (12GB) — both dramatically faster than any integrated graphics for model inference.

## Key Insight: GPU vs RAM Tradeoff

For local AI, there are two bottlenecks:
- **VRAM**: Determines which models fit entirely on GPU (fast inference)
- **System RAM**: Determines which models can run at all (with CPU offloading)

At €2,000, you get BOTH: 16GB VRAM + 64GB system RAM. This means:
- 8B-30B models run entirely on GPU at 30-80 tok/s
- 70B models run with partial offloading at 3-8 tok/s
- No model is completely out of reach

## Option 1: Custom Desktop Build (TOP PICK)

### Specs & Estimated Cost (Europe, April 2026)

| Component | Spec | Est. Price |
|-----------|------|------------|
| **GPU** | RTX 4070 Ti Super 16GB | €850-950 |
| **CPU** | Ryzen 7 7700X or Intel i7-13700F | €300-350 |
| **RAM** | 64GB DDR5-5600 (2×32GB) | €200-250* |
| **Motherboard** | B650 (AMD) or B760 (Intel) | €120-150 |
| **Storage** | 2TB NVMe PCIe 4.0 | €100-130 |
| **PSU** | 750W 80+ Gold | €80-110 |
| **Case** | Mid-tower with airflow | €60-80 |
| **Cooler** | Stock or aftermarket | €0-50 |
| **TOTAL** | | **€1,710 - 2,070** |

*RAM prices are volatile; DDR5 has spiked but is settling

### Why This Wins
- **RTX 4070 Ti Super**: 16GB VRAM is the inflection point. 30B models run entirely on GPU. 70B models offload ~28GB to system RAM but still work.
- **CUDA acceleration**: llama.cpp with CUDA is 5-10× faster than CPU-only inference
- **Upgradeable**: Add second GPU later, upgrade RAM to 128GB, swap CPU
- **Standard parts**: Any PC shop can repair it
- **Real performance**: 8B models at 80+ tok/s, 14B at 40-50 tok/s, 70B at 3-5 tok/s

### Where to Buy in Ireland/Europe
- **PCZone.ie**: Irish custom builder, good support
- **Very.ie**: PCSpecialist systems (RTX 4070 Ti Super builds ~€1,800-2,200)
- **Stormforce Gaming UK**: Ships to Ireland, good configs
- **Caseking.de**: German, ships EU-wide
- **Amazon.de/Amazon.fr**: Parts or prebuilt

## Option 2: Prebuilt Gaming PC (Convenient)

### Example: PCSpecialist Cypher 400 (Very.ie)
- RTX 4070 Ti Super 16GB
- Intel Core i7 (13th/14th gen)
- 32GB RAM (upgrade to 64GB: +€200)
- 2TB SSD
- **Price**: ~€1,800-2,200 depending on spec

### Example: Stormforce Crystal 3018
- RTX 4070 Ti Super 16GB
- Intel i5-13400F
- Configurable RAM/storage
- **Price**: ~€1,700-2,000

**Pros**: Warranty, single point of contact, no assembly
**Cons**: Often gaming-focused (RGB, flashy cases), may skimp on RAM

## Option 3: Beelink GTR9 Pro (128GB Strix Halo) - €2,200-2,500

**Specs**:
- AMD Ryzen AI Max+ 395 (16 Zen 5 cores, 5.1GHz)
- 128GB LPDDR5X-8000 (soldered, unified memory)
- Radeon 8060S (40 CUs, RDNA 3.5) — ~RTX 4070 mobile performance
- Dual 10GbE, dual USB4, WiFi 7
- 2TB PCIe 4.0 SSD

**Pros**:
- 128GB unified memory fits 70B+ models comfortably
- Mini PC form factor (180×180×90mm)
- Silent (32dB), efficient
- No external GPU box needed
- Built-in AI voice, speakers

**Cons**:
- **€2,499** direct from Beelink (ships from EU warehouse)
- LPDDR5X is **soldered** — not upgradeable
- iGPU inference is slower than CUDA (no tensor cores)
- 128GB sounds great but AI inference needs GPU compute, not just RAM
- Expensive for what it is

**Verdict**: If you absolutely need 128GB in a tiny box, this is it. But a desktop with RTX 4070 Ti Super will inference faster for the same money.

## Option 4: Mac Mini M4 Pro 64GB — €2,000-2,200

**Specs**:
- Apple M4 Pro (14-core CPU, 20-core GPU)
- 64GB unified memory
- 2TB SSD
- **Completely silent**, 30W power draw

**Pros**:
- Best performance-per-watt on earth
- 64GB unified memory = 64GB VRAM equivalent
- Runs 70B models at 8-12 tok/s (Metal backend)
- macOS ecosystem if Ken ever wants it

**Cons**:
- **macOS only** — Ken explicitly wants Linux
- 64GB is the max (no upgrade path)
- Metal backend is ~20-30% slower than CUDA for same hardware
- No eGPU support
- Non-standard, not repairable

**Verdict**: Disqualified. Ken wants Linux. Even if he didn't, a €2,000 CUDA desktop outperforms it for inference.

## Option 5: Mini PC + eGPU (Flexible but Complex)

**Setup**:
- Mini PC with Thunderbolt 4/USB4: €400-600 (Beelink SER8, Minisforum UM790)
- eGPU enclosure (Razer Core X, etc.): €300-400
- Desktop GPU (RTX 4070 Ti Super): €850-950
- **Total**: €1,550 - 1,950

**Pros**:
- Small base unit
- GPU is upgradeable (swap for RTX 5090 later)
- Can disconnect eGPU for portability

**Cons**:
- Thunderbolt bandwidth penalty (~10-15% performance loss vs internal PCIe)
- More cables, more complexity
- eGPU enclosures are bulky anyway
- Often finicky with Linux

**Verdict**: Interesting but adds complexity. For Ken's use case (stationary rig), a proper desktop is simpler and faster.

## Option 6: Used RTX 3090 Build - €1,500-1,800

**Specs**:
- Used RTX 3090 24GB: €650-800 (eBay, local)
- Ryzen 7 7700X: €300
- 64GB DDR5: €200-250
- B650 board: €130
- 2TB NVMe: €110
- PSU (850W for 3090): €100
- Case: €70
- **Total**: €1,560 - 1,760

**Pros**:
- **24GB VRAM** fits 70B models much better than 16GB
- RTX 3090 is still a monster for inference
- Cheaper than 4070 Ti Super builds

**Cons**:
- Used GPU = no warranty, potential mining wear
- RTX 3090 draws 350W, runs hot, needs good cooling
- Older architecture (Ampere vs Ada Lovelace)
- No DLSS 3/Frame Generation (irrelevant for AI but worth noting)

**Verdict**: Best raw value if you trust used market. 24GB VRAM is genuinely better for 70B models. But 3090s were heavily mined — buy from reputable seller with return policy.

## Comparison Matrix

| Option | Cost | VRAM | System RAM | 70B Speed | Linux? | Upgradeable? | Form Factor |
|--------|------|------|------------|-----------|--------|--------------|-------------|
| Custom Desktop (4070 Ti S) | €1,800 | 16GB | 64GB | 3-5 tok/s | ✅ | ✅ Full | Mid tower |
| Prebuilt Gaming PC | €2,000 | 16GB | 32-64GB | 3-5 tok/s | ✅ | ⚠️ Limited | Mid tower |
| Beelink GTR9 Pro | €2,499 | 128GB* | 128GB | 4-6 tok/s | ✅ | ❌ Soldered | Mini PC |
| Mac Mini M4 Pro | €2,100 | 64GB* | 64GB | 8-12 tok/s | ❌ macOS | ❌ Soldered | Mini PC |
| Mini PC + eGPU | €1,800 | 16GB | 64GB | 3-4 tok/s* | ⚠️ Fiddly | ✅ GPU only | Hybrid |
| Used 3090 Build | €1,700 | 24GB | 64GB | 5-8 tok/s | ✅ | ✅ Full | Mid tower |

*Unified memory / *Thunderbolt penalty

## My Recommendation for Ken

**Primary recommendation: Custom desktop with RTX 4070 Ti Super + 64GB RAM**

**Why:**
1. **CUDA is king** for local AI. No mini PC or Mac comes close to a desktop NVIDIA GPU for inference speed.
2. **16GB VRAM** is the practical minimum for 30B models entirely on GPU. 70B is doable with offloading.
3. **€2,000 budget fits perfectly** — you don't need to stretch to €2,500.
4. **Linux-native** — no compatibility issues, standard drivers, standard everything.
5. **Upgradeable** — add second GPU in 2027, upgrade to 128GB RAM when prices drop.
6. **Ken's coursework** — Engineering at Trinity will likely involve CUDA programming, CAD, simulation. A desktop GPU helps there too.

**Secondary recommendation: Used RTX 3090 build if comfortable with used market**
- 24GB VRAM is meaningfully better for 70B models
- Saves €300-400
- Just buy from seller with good returns/refurb warranty

**Avoid:**
- Beelink GTR9 Pro at €2,499 — too expensive for inference performance vs desktop
- Mac Mini — wrong OS, soldered, capped at 64GB
- eGPU setups — complexity for no benefit on a stationary desk

## What About the €682 Beelink SER8?

The SER8 (64GB/2TB at €682) is still a **valid parallel purchase** if Ken wants:
- A second machine for lighter tasks
- A Linux box separate from the AI workstation
- Something to run while the desktop is crunching

But if the question is "one machine to rule them all for AI" — the €2,000 desktop is 3-5× faster for inference.

## Ordering Strategy

**If ordering now (April 2026):**
- GPU prices are settling post-spike
- DDR5 is still elevated but coming down
- RTX 4070 Ti Super is in good supply

**Where to buy in Ireland:**
1. **PCZone.ie** (Dublin-based, custom builds, Irish warranty)
2. **Very.ie** (PCSpecialist, good prebuilt options)
3. **Amazon.de** + forwarding (if cheaper)
4. **Build yourself** + buy parts from Amazon.de/Caseking.de

**Build vs Buy:**
- If Ken has built PCs before: Build it, save €200-300
- If not: Buy prebuilt from PCZone.ie or Very.ie — worth the premium for warranty and support

## Sources Consulted

1. WillItRunAI.com — "Best Local AI Builds 2026" (build categories, budget tiers)
2. CraftRigs.com — "$2,700 Local AI Desktop" (RTX 4070 Super build guide)
3. CraftRigs.com — "$1,200 Sweet Spot Build" (budget comparison)
4. HardwareCorner.net — RTX 4070 Ti Super LLM benchmarks (84 tok/s on 14B)
5. RunAIatHome.com — RTX 4070 Ti Super compatibility (68 models fit in 16GB)
6. PCZone.ie — Irish pricing for custom builds
7. Very.ie — PCSpecialist prebuilt pricing
8. Beelink official — GTR9 Pro specs and pricing ($3,299 = ~€3,000)
9. Billiger.de — Mac Mini M4 Pro pricing (no offers currently)
10. ComputeMarket.com — "Mac Mini for AI" comparison
11. Modelfit.io — Mac Mini M4 Pro AI benchmarks
12. iTechWonders.com — Mac vs PC for local AI 2026

---

*Research compiled: 2026-04-24*
*Budget range: €1,700 - €2,500*
*Target use: Local LLM inference (Karen), engineering coursework, dual-agent setup*
