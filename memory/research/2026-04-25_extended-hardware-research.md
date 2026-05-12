# Extended Hardware Research for Local LLMs — April 25, 2026

*Continuing from April 24 research. Focus: used market, multi-GPU, AMD alternatives, RTX 50 series.*

---

## 1. RTX 4080 Super — Verdict: Skip It

**Key finding from BestGPUforAI.com (April 2026):**
> "For AI workloads, the RTX 4080 Super is a bad buy. The RTX 4070 Ti Super has the same 16GB VRAM at $300 less, and VRAM is what matters for AI."

| Spec | RTX 4080 Super | RTX 4070 Ti Super |
|------|---------------|-------------------|
| **VRAM** | 16GB GDDR6X | 16GB GDDR6X |
| **Memory Bus** | 256-bit | 256-bit |
| **Bandwidth** | 736 GB/s | 672 GB/s |
| **CUDA Cores** | 10,240 | 8,448 |
| **TDP** | 320W | 285W |
| **Price** | ~€950 | ~€700 |
| **LLM 13B Q4** | ~24 tok/s | ~22 tok/s |

**The problem:** Both hit the same 16GB wall. The 4080 Super is 10-20% faster in raw compute, but for LLM inference that translates to ~2 tok/s difference. You're paying 43% more for 15% more speed with zero additional VRAM.

**Bottom line:** If you have €950 for a GPU, either buy the 4070 Ti Super and save €250, or stretch to a used RTX 3090 (24GB) instead.

---

## 2. Used RTX 3090 — The Value King

**Current pricing (eBay UK/Ireland, April 2026):**
- RTX 3090 24GB (various brands): **€650-800**
- RTX 3090 Founders Edition: **€700-850**
- RTX 3090 Ti 24GB: **€750-900**

### Build: Used RTX 3090 Desktop

| Component | Spec | Price |
|-----------|------|-------|
| **GPU** | Used RTX 3090 24GB | €700 |
| **CPU** | Ryzen 7 7700X | €220 |
| **RAM** | 64GB DDR5-5600 | €250 |
| **Motherboard** | MSI B650 Tomahawk | €180 |
| **Storage** | 2TB Samsung 990 EVO | €130 |
| **PSU** | Corsair RM850e (850W) | €120 |
| **Case** | Fractal Design Pop Air | €80 |
| **Cooler** | DeepCool AK620 | €50 |
| **TOTAL** | | **€1,730** |

**Why it wins:**
- **24GB VRAM** = fits 70B models much better than 16GB
- 70B Q4 at **5-8 tok/s** entirely on GPU (vs 3-5 tok/s with offloading on 16GB)
- €270 cheaper than 4070 Ti Super build
- Still a monster — RTX 3090 was the flagship 2 years ago

**Risks:**
- Used = no warranty
- Many were mined on (check seller history, ask for original purchase receipt)
- 350W power draw, runs hot (needs good case airflow)
- Older Ampere architecture (no DLSS 3, but irrelevant for AI)

**Buying tips:**
- Buy from sellers with 500+ feedback and return policy
- Ask for GPU-Z screenshot showing clock speeds and temps
- Avoid "bulk seller" listings (likely mining cards)
- eBay UK ships to Ireland; factor in ~€30 shipping + VAT

---

## 3. Dual RTX 3090 — 48GB VRAM Monster

**Concept:** Two used RTX 3090s in one system = 48GB total VRAM.

**Pricing:**
- 2× used RTX 3090: €1,300-1,600
- Build total: **€2,300-2,600**

### How llama.cpp Multi-GPU Works

llama.cpp supports multi-GPU via `--tensor-split`:

```bash
# Dual RTX 3090 — split layers evenly
./llama-server -m model.gguf --tensor-split 24,24

# 3090 + 4070 Ti Super (different VRAM)
./llama-server -m model.gguf --tensor-split 24,16
```

**What it does:** Distributes transformer layers across GPUs proportionally. With 24GB+24GB, GPU 0 holds ~48 layers, GPU 1 holds ~32 layers (for an 80-layer 70B model).

**Real-world result (from LLM Garage, dual 3090 running GPT-OSS-120B):**
- 48GB VRAM + 64GB system RAM
- 120B MoE model: **10-17 tok/s** when experts are cached
- Stalls when swapping experts from CPU → VRAM

**For Ken's use case (70B models):**
- 70B Q4 = ~42GB → fits entirely in 48GB VRAM
- Expected speed: **8-12 tok/s** on dual 3090s
- No CPU offloading needed = no stalling

**Caveats:**
- llama.cpp doesn't split individual layers across GPUs — each layer lives on one card
- Bottleneck is whichever GPU finishes its work last
- For inference (not training), dual GPU scaling is ~70-80% efficient vs 2× single GPU
- Motherboard needs 2× PCIe x16 slots (most ATX boards have this)
- PSU needs 1000W+ (2× 350W + 200W system = 900W, add 20% headroom)

**Verdict:** Best value for maximum VRAM. €2,500 for 48GB is unbeatable. But more complex, hotter, louder.

---

## 4. RTX 50 Series (Blackwell) — Should You Wait?

**Status (April 2026):** RTX 50 series launched February-March 2026.

| Card | VRAM | Launch Price | Real Price (April 2026) |
|------|------|-------------|------------------------|
| RTX 5090 | 32GB GDDR7 | $1,999 | €2,500+ (sold out/scalped) |
| RTX 5080 | 16GB GDDR7 | $999 | €1,100-1,300 |
| RTX 5070 Ti | 16GB GDDR7 | $749 | €880-1,069 |
| RTX 5070 | 12GB GDDR7 | $549 | €650-750 |

**For local LLMs:**
- **RTX 5090 (32GB)** = dream card. Fits 70B entirely, 120B with offloading. But €2,500+ and mostly unavailable.
- **RTX 5080/5070 Ti (16GB)** = same VRAM as 4070 Ti Super, faster but not transformative. 16GB is still the wall.
- **RTX 5070 (12GB)** = worse than 4070 Ti Super for LLMs. Avoid.

**Key issue:** Blackwell's advantage is DLSS 4 and frame generation (gaming), not LLM inference. For llama.cpp, CUDA cores + VRAM = what matters. RTX 5070 Ti has 16GB just like 4070 Ti Super.

**Recommendation:** Don't wait. The 4070 Ti Super or used 3090 are better value today. RTX 5090 is the only 50-series card that changes the game, and it's €2,500+ and scarce.

---

## 5. AMD RX 7900 XTX — The CUDA Alternative?

**Specs:**
- 24GB GDDR6 VRAM
- $999 MSRP (~€950)
- RDNA 3 architecture

**For local LLMs:**
- **ROCm support exists** but is "less seamless than NVIDIA"
- llama.cpp has ROCm backend but benchmarks show **significantly lower performance vs Vulkan** on RX 7900 XTX
- Community builds available (llamacpp-rocm on GitHub)
- Ollama has experimental AMD support

**Performance:**
- 7900 XTX 24GB vs RTX 3090 24GB: ~20-30% slower in llama.cpp
- vs RTX 4090 24GB: ~40-50% slower
- Works, but not the smooth experience of CUDA

**Verdict:** Only consider if you already have one or find a crazy deal. For a fresh build, NVIDIA is the standard. CUDA is what Ken will learn at Trinity.

---

## 6. Enterprise GPUs — A100, A6000

**For completeness (out of Ken's budget but interesting):**

| GPU | VRAM | Used Price | Notes |
|-----|------|-----------|-------|
| RTX A6000 | 48GB | €2,500-3,000 | Workstation card, reliable |
| Tesla A100 40GB | 40GB | €3,000-4,000 | Datacenter, needs blower cooler |
| Tesla A100 80GB | 80GB | €8,000-10,000 | Enterprise only |

**Why not for Ken:**
- A6000 at €2,500 = same cost as dual 3090s but only 48GB (not 48GB + 2 GPUs)
- A100s are loud, power-hungry, and need server cases
- Overkill for learning; these are for production AI services

---

## 7. Updated Comparison Matrix

| Build | Cost | VRAM | 70B Speed | 70B Fits? | Complexity | Best For |
|-------|------|------|-----------|-----------|------------|----------|
| **Used RTX 3090** | €1,730 | 24GB | 5-8 tok/s | ✅ Yes | Low | Best value |
| **RTX 4070 Ti Super** | €1,910 | 16GB | 3-5 tok/s | ⚠️ Offload | Low | Safe buy, warranty |
| **Dual RTX 3090** | €2,500 | 48GB | 8-12 tok/s | ✅ Yes | Medium | Max VRAM/€ |
| **RTX 4080 Super** | €2,200 | 16GB | 3.5-5 tok/s | ⚠️ Offload | Low | Don't buy |
| **RTX 5070 Ti** | €2,000 | 16GB | 4-6 tok/s | ⚠️ Offload | Low | Too new, same VRAM |
| **RX 7900 XTX** | €1,900 | 24GB | 4-6 tok/s | ✅ Yes | Medium (ROCm) | AMD fan only |
| **RTX 5090** | €2,500+ | 32GB | 10-15 tok/s | ✅ Yes | Low | Unicorn card |

---

## 8. Final Recommendations (Updated)

### If buying TODAY (April 2026):

**1st choice: Used RTX 3090 build (€1,730)**
- Best inference-per-euro
- 24GB VRAM is the sweet spot for 70B models
- Just be smart about seller selection

**2nd choice: RTX 4070 Ti Super build (€1,910)**
- If you don't trust used market
- New card, full warranty
- 16GB is workable with offloading

**3rd choice: Dual RTX 3090 (€2,500)**
- If you can stretch budget
- 48GB is future-proof for 120B+ models
- More complex but maximum capability

### If waiting 3-6 months:
- RTX 5090 availability may improve
- Used RTX 3090 prices may drop further
- DDR5 prices may soften

---

## Sources

1. BestGPUforAI.com — "RTX 4080 Super vs 4070 Ti Super for AI (2026)"
2. CraftRigs — "llama.cpp --tensor-split: Running 70B Models Across Multiple GPUs"
3. LLM Garage — "Running GPT-OSS-120B on Dual RTX 3090s"
4. eBay UK/Ireland — Live RTX 3090 listings (April 2026)
5. Wccftech — RTX 5070 Ti/5070 specs and pricing
6. Tweaked Geek — "7900 XTX + ROCm: Llama.cpp vs vLLM Benchmarks"
7. LocalAIOps — "Running Local LLMs on AMD GPUs with ROCm"
8. OriginalPricing.com — RTX 5070 Ti real-world pricing

---

*Research compiled: 2026-04-25*
*Focus: used market value, multi-GPU scaling, new generation evaluation*
