# €3,000 Range PC Research for Local AI - 2026-04-24

## Executive Summary

At €3,000, you're at a tricky inflection point. The RTX 4090 (24GB) — the gold standard for local AI — costs €3,200+ **just for the GPU** in Europe. This means a full 4090 build is €4,000+. Within a strict €3,000 budget, your realistic options are:

1. **RTX 4080 Super 16GB** — the "sensible" upgrade from 4070 Ti Super
2. **Used dual RTX 3090 (48GB total)** — maximum VRAM per euro
3. **RTX 4070 Ti Super + 128GB RAM** — massive system memory for CPU offloading
4. **Single used RTX 4090** — stretch budget, cut corners elsewhere

**The honest truth:** The €2,000 RTX 4070 Ti Super build is already excellent. €3,000 offers incremental gains, not transformative leaps. The real jump comes at €4,000+ (RTX 4090).

---

## Option 1: RTX 4080 Super 16GB Build — €2,500-2,800

### Specs & Estimated Cost

| Component | Spec | Est. Price |
|-----------|------|------------|
| **GPU** | RTX 4080 Super 16GB | €1,100-1,300 |
| **CPU** | Ryzen 7 7700X / Intel i7-13700K | €300-400 |
| **RAM** | 64GB DDR5-5600 | €200-250 |
| **Motherboard** | B650 / Z790 | €150-200 |
| **Storage** | 2TB NVMe PCIe 4.0 | €120-150 |
| **PSU** | 850W 80+ Gold | €100-130 |
| **Case** | Mid-tower airflow | €70-100 |
| **Cooler** | AIO or aftermarket | €80-120 |
| **TOTAL** | | **€2,120 - 2,650** |

### Performance vs RTX 4070 Ti Super

| Metric | RTX 4070 Ti S (€2,000) | RTX 4080 S (€2,700) | Gain |
|--------|------------------------|---------------------|------|
| 8B models | 80+ tok/s | 100+ tok/s | ~25% |
| 14B models | 40-50 tok/s | 55-70 tok/s | ~35% |
| 30B models | 15-20 tok/s | 22-30 tok/s | ~45% |
| 70B models | 3-5 tok/s | 5-7 tok/s | ~50% |
| VRAM | 16GB | 16GB | **Same** |

**Verdict:** 25-50% faster, but still capped at 16GB VRAM. The 70B improvement is nice but both are "slow but usable." Not a transformative upgrade.

---

## Option 2: Used Dual RTX 3090 (48GB total) — €2,500-3,000 ⭐ BEST VALUE

### Specs & Estimated Cost

| Component | Spec | Est. Price |
|-----------|------|------------|
| **GPU ×2** | Used RTX 3090 24GB | €700 × 2 = €1,400 |
| **CPU** | Ryzen 9 7900X / Threadripper 3970X | €400-600 |
| **RAM** | 128GB DDR5 ECC (or DDR4) | €300-450 |
| **Motherboard** | X670E / TRX40 (dual GPU support) | €250-400 |
| **Storage** | 2TB NVMe + 4TB SSD | €200-250 |
| **PSU** | 1200W 80+ Platinum | €150-200 |
| **Case** | Full tower (E-ATX) | €100-150 |
| **Cooling** | Dual AIOs or custom loop | €200-300 |
| **TOTAL** | | **€2,200 - 3,450** |

### Why This Wins at €3,000

**48GB VRAM** is the game-changer:
- 70B models fit **entirely on GPU** (no CPU offloading!)
- 70B at **15-20 tok/s** (vs 3-5 tok/s on 16GB cards)
- 110B+ models become feasible with partial offloading
- Multiple models simultaneously (32B + 32B = 64GB, fits!)

**llama.cpp multi-GPU support**:
- Native tensor splitting across both cards
- No NVLink needed for inference (just PCIe)
- Linear scaling for context processing

**The used market is key:**
- RTX 3090s were €1,500 new, now €600-800 used
- 2 years old, but built for 24/7 operation
- Buy from sellers with return policies

### Risks
- Used GPUs: mining wear, no warranty
- Power: 350W × 2 + system = 850W under load
- Heat: two 350W cards need serious cooling
- Noise: unless watercooled, this is loud
- Size: full tower, takes desk space

---

## Option 3: RTX 4070 Ti Super + 128GB RAM — €2,500-2,800

### Specs & Estimated Cost

| Component | Spec | Est. Price |
|-----------|------|------------|
| **GPU** | RTX 4070 Ti Super 16GB | €850-950 |
| **CPU** | Ryzen 7 7700X | €300 |
| **RAM** | 128GB DDR5 (4×32GB or 2×64GB) | €450-550 |
| **Motherboard** | B650 (4 DIMM slots) | €150 |
| **Storage** | 2TB NVMe | €120 |
| **PSU** | 750W | €100 |
| **Case** | Mid-tower | €70 |
| **Cooler** | AIO | €80 |
| **TOTAL** | | **€2,120 - 2,650** |

### Why 128GB System RAM Matters

With 16GB VRAM + 128GB RAM:
- 70B models offload ~56GB to system RAM
- Speed: 3-4 tok/s (slower than GPU-only, but works)
- **Multiple 70B instances** can run simultaneously
- Huge dataset processing, RAG with massive vector stores
- Future-proof for 100B+ models

**Tradeoff:** GPU is still 16GB, so interactive speed on 30B+ models isn't better than the €2,000 build. This path prioritizes "can run anything" over "runs fast."

---

## Option 4: Single Used RTX 4090 Build — €3,000-3,500 (STRETCH)

### The Problem: RTX 4090 Pricing in Europe

| Source | Price (April 2026) |
|--------|-------------------|
| Geizhals.eu (cheapest) | €3,190 |
| ASUS TUF OC | €3,490 |
| GIGABYTE Gaming OC | €3,490 |
| Used RTX 4090 (eBay) | €2,200-2,800 |

**At €3,000 total budget:**
- Used RTX 4090: €2,500
- CPU (Ryzen 5 7600X): €200
- 32GB RAM: €150
- Cheap motherboard: €100
- PSU (850W): €100
- Case: €60
- Storage (1TB): €80
- **Total: €3,190**

**You'd be cutting corners** on CPU, RAM, storage, and motherboard to afford the GPU. This is the "GPU-first, everything-else-last" approach.

### RTX 4090 Performance

| Metric | RTX 4070 Ti S | RTX 4090 | Gain |
|--------|--------------|----------|------|
| VRAM | 16GB | 24GB | **+50%** |
| 8B | 80 tok/s | 104 tok/s | +30% |
| 14B | 50 tok/s | 75 tok/s | +50% |
| 30B | 20 tok/s | 35 tok/s | +75% |
| 70B | 5 tok/s | 12-15 tok/s | **+200%** |

**The 70B jump is transformative.** 12-15 tok/s is genuinely interactive. 24GB VRAM means no offloading for 30B, minimal offloading for 70B.

---

## Option 5: Workstation / Enterprise Route — €3,000+ (Used)

### HP Z8 G4/G5 (Refurbished/Used)

| Spec | Price Range |
|------|-------------|
| 2× Xeon Gold 6152 (44 cores) | €3,000-4,000 used |
| 256GB DDR4 ECC | included |
| RTX A6000 48GB | included or +€1,500 |
| 12TB storage | included |

**Pros:**
- Enterprise reliability
- Massive core count for preprocessing
- ECC memory
- Professional GPU (A6000 = 48GB)

**Cons:**
- Used/refurb only at this price
- DDR4, not DDR5
- Older CPUs (though many cores)
- A6000 is slower than RTX 4090 for inference
- Massive physical size

**Where to buy:**
- Maascomputers.nl (Netherlands)
- Bluegfx.eu (Ireland)
- Refurbed corporate dealers

---

## Comparison Matrix: €3,000 Range

| Option | Cost | VRAM | System RAM | 70B Speed | Risk | Best For |
|--------|------|------|------------|-----------|------|----------|
| RTX 4080 Super 16GB | €2,700 | 16GB | 64GB | 5-7 tok/s | Low | Balanced upgrade |
| **Dual RTX 3090 48GB** | **€2,800** | **48GB** | **128GB** | **15-20 tok/s** | **Medium** | **Maximum VRAM/€** |
| RTX 4070 Ti S + 128GB RAM | €2,500 | 16GB | 128GB | 3-4 tok/s | Low | Huge models, slow |
| Used RTX 4090 (stretch) | €3,200 | 24GB | 32GB | 12-15 tok/s | Medium | Best single-GPU |
| HP Z8 Workstation (used) | €3,500 | 48GB (A6000) | 256GB | 8-10 tok/s | Low | Enterprise reliability |

---

## The €2,000 vs €3,000 Question

| | €2,000 (4070 Ti S) | €3,000 (Best Option) | Worth It? |
|---|---------------------|----------------------|-----------|
| 8B speed | 80 tok/s | 100 tok/s | Marginal |
| 14B speed | 50 tok/s | 70 tok/s | Marginal |
| 30B speed | 20 tok/s | 35 tok/s | Noticeable |
| 70B speed | 3-5 tok/s | **15-20 tok/s** | **Transformative** |
| VRAM | 16GB | **48GB** | **Transformative** |
| Max model | 70B (slow) | 110B (feasible) | Major |

**The €3,000 build only makes sense if:**
1. You need 70B models at interactive speed (15+ tok/s)
2. You want to run multiple large models simultaneously
3. You're doing training/fine-tuning (needs VRAM)
4. You want to future-proof for 100B+ models

**For Ken's use case:**
- CCT AI diploma (Level 7): 7B-14B models are plenty for coursework
- Trinity Engineering: CUDA programming, some ML — 16GB is fine
- Karen's daily work: 8B-14B models, occasional 70B — the €2,000 build handles this
- The €3,000 build is "nice to have," not "need to have"

---

## My Recommendation

**If Ken is committed to €3,000:**

**Top pick: Used dual RTX 3090 build (~€2,800)**
- 48GB VRAM is the transformative spec
- 70B models at interactive speed
- Can add third GPU later for 72GB
- Risks are manageable with careful buying

**Alternative: Used single RTX 4090 build (~€3,200)**
- If Ken prefers simplicity over raw VRAM
- 24GB is enough for 70B with light offloading
- Faster per-card than 3090
- Single GPU = simpler software

**Avoid:**
- RTX 4080 Super at €2,700 — marginal gain over 4070 Ti Super
- New RTX 4090 at €3,500+ — blows budget
- RTX 5080/5090 — not available, overpriced

**The pragmatic path:**
1. Buy the €682 Beelink SER8 now (immediate 64GB RAM)
2. Save €2,000-3,000 over 6 months
3. Build the dual 3090 or single 4090 rig in late 2026/early 2027
4. Use both: SER8 for light work, desktop for heavy inference

---

## Sources Consulted

1. Geizhals.eu — RTX 4090 pricing (€3,190-3,490)
2. Scan.co.uk — 3XS prebuilt systems (RTX 4090 builds £3,000+)
3. Modelfit.io — RTX 4090 benchmarks (104 tok/s on 8B)
4. Trooper.ai — RTX 4080 Super Pro 32GB server info
5. Jawa.gg — Used RTX 3090 pricing (€600-800)
6. CustomLuxPCs.com — Dual RTX 3090 workstations ($5,300)
7. eBay.com — Dual RTX 3090 NVLink setups
8. Maascomputers.nl — HP Z8 G4 with RTX A6000 (€3,000)
9. Monitors.com — HP Z8 G5 configurations
10. Geizhals.eu — Threadripper PRO 7965WX systems (€7,774+)
11. PCGuide.com — RTX 5090 prebuilt PCs (€5,999+)
12. Club386.com — RTX 5090 PC pricing

---

*Research compiled: 2026-04-24*
*Budget range: €2,500 - €3,500*
*Key finding: RTX 4090 costs €3,200+ alone, making €3,000 builds compromise somewhere*
