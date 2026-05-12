# Hardware Research for Karen's Local AI Workstation
## Date: 2026-04-24
## Context: EVO-X2 rejected, need cost-effective hardware for 4-5 year local AI operation

---

## Executive Summary

Ken's **current Beelink (Ryzen 7 7735HS, 20GB RAM) already runs Karen well** for small models (qwen3.5:4b, llama3.1:8b). The limitation is RAM — 20GB caps him at ~13B parameter models. He doesn't need to spend €3,299. The sweet spot is **€600-800 for a 64GB DDR5 mini PC** that can run 30B models on CPU, with an eGPU upgrade path later.

---

## Current Machine Assessment

**What Ken already has:**
- Beelink EQ (AZW OEM board)
- AMD Ryzen 7 7735HS (8C/16T, Zen 3+, up to 4.75 GHz)
- Radeon 680M iGPU (RDNA 2, 12 CUs)
- 20GB RAM (likely soldered or partially upgradeable)
- Linux 6.17, running OpenClaw + Karen

**What it can already do:**
- qwen3.5:4b (3GB) — fast, works great
- llama3.1:8b (5.7GB) — works
- nomic-embed-text (274MB) — works
- BitNet 2B (1.1GB) — 27 tok/s
- Browser automation (Chrome/Xvfb) — works
- All file management, scripting, cron jobs — works

**The bottleneck:** 20GB RAM. He can't run 30B+ models or multiple models simultaneously without swapping.

---

## Research Sources Consulted

1. **sanj.dev** — "$1,000 Local LLM Rig (2026)" — RTX 3090-based builds for 70B models
2. **toolhalla.ai** — "Home AI Server Build Guide 2026" — Budget tiers from $300 to $5,000+
3. **vminstall.com** — "Beelink vs GMKtec vs Mac Mini" — Head-to-head AI benchmarks
4. **compute-market.com** — "Best Mac Mini Alternatives for AI 2026" — 6 mini PCs compared
5. **Amazon.ie / eBay.ie / minisforum.de** — Live European pricing

---

## Budget Tier Analysis

### Tier 1: Optimize Current Machine (€0–200)
- **Action:** Check if RAM is upgradeable; if yes, add 32GB stick
- **Result:** Potentially 40-52GB total — enough for 13B models comfortably
- **Pros:** Zero cost if not upgradeable; minimal spend if it is
- **Cons:** CPU remains 7735HS (Zen 3+); iGPU not great for GPU inference
- **Verdict:** Do this FIRST before buying anything

### Tier 2: 64GB DDR5 Mini PC (€600–800) — RECOMMENDED
**Options:**

**A. Beelink SER8 (Ryzen 7 8845HS)**
- 8C/16T Zen 4, Radeon 780M (RDNA 3)
- Up to 96GB DDR5-5600 (2x SO-DIMM, user-upgradeable)
- USB4 (eGPU compatible), dual M.2, 2.5GbE
- ~€550 barebone, ~€680 with 64GB/2TB on Amazon.ie
- Power: 45-65W, relatively quiet
- **Best for:** Budget-conscious, upgradeable, Linux-friendly

**B. Minisforum UM790 Pro (Ryzen 9 7940HS)**
- 8C/16T Zen 4 (slightly faster than 8845HS), Radeon 780M
- Up to 96GB DDR5, dual M.2
- ~€379 barebone (minisforum.de) + ~€150 for 64GB RAM = ~€529 total
- Better cooling than SER8, premium build
- **Best for:** Best value per euro, slightly faster CPU

**What 64GB DDR5 enables:**
- 30B parameter models at Q4_K_M (~20GB) — fits entirely in RAM
- CPU inference: 5-8 tok/s on 30B models (usable for reasoning tasks)
- Multiple smaller models loaded simultaneously
- Headroom for browser tabs, embeddings, file operations
- Can add eGPU later via USB4/Thunderbolt when budget allows

### Tier 3: GPU-Accelerated Desktop (€1,000–1,500)
- **Used RTX 3090 24GB:** ~€650-800 (eBay.ie)
- **CPU/Mobo:** Ryzen 7 7700X + B650 ~€160
- **RAM:** 64GB DDR5-8000 ~€110
- **PSU/Case/Storage:** ~€150
- **Total:** ~€1,100-1,400
- **Pros:** 24GB VRAM runs 32B models at 25-35 tok/s, 70B models possible
- **Cons:** Used GPU risk, bigger footprint, higher power (350W+), louder
- **Verdict:** Best inference/$ but overkill for Karen's current workload. Consider in 2027 when Ken has income from business or needs CUDA for engineering coursework.

### Tier 4: Mac Mini M4 Pro 64GB (~€2,000)
- **Pros:** Silent, 30W power, 273 GB/s memory bandwidth, polished
- **Cons:** macOS (Ken wants Linux), soldered RAM (no upgrade), no CUDA, no eGPU
- **Verdict:** Wrong ecosystem for Ken. He's building a Linux-based AI stack.

### Tier 5: Strix Halo 128GB (Beelink GTR9 Pro ~€2,200)
- **Pros:** 128GB unified memory, 70B models in RAM, dual 10GbE
- **Cons:** Same chip family as rejected EVO-X2, still first-gen, expensive
- **Verdict:** Wait for v2 refresh. The 128GB concept is perfect for AI, but first-gen Strix Halo has thermal/QC issues across manufacturers.

---

## Pricing Matrix (Europe/Ireland, April 2026)

| Option | Price (EUR) | RAM | Max Model | tok/s (30B) | Notes |
|--------|-------------|-----|-----------|-------------|-------|
| Current + RAM upgrade | €0-150 | ~40GB | 13B-30B (tight) | 3-5 (CPU) | Check upgradeable first |
| Minisforum UM790 Pro + 64GB | €529 | 64GB | 30B comfortably | 5-8 (CPU) | Best value |
| Beelink SER8 64GB | €680 | 64GB | 30B comfortably | 5-8 (CPU) | Amazon.ie, fast delivery |
| Used desktop + RTX 3090 | €1,100 | 64GB + 24GB VRAM | 70B (GPU) | 15-20 (GPU) | Best performance, used risk |
| Mac Mini M4 Pro 64GB | €2,000 | 64GB | 32B (RAM cap) | 10-12 | Wrong OS |
| Beelink GTR9 Pro 128GB | €2,200 | 128GB | 70B | 5-8 (iGPU) | Wait for v2 |

---

## Recommendation: Phased Approach

### Phase 1: Immediate (This Week)
**Check if current Beelink RAM is upgradeable.**
- Run `sudo dmidecode -t memory` to see if there are SO-DIMM slots
- If yes: Buy a 32GB DDR5 SO-DIMM (~€80-120) and install
- If no: Accept 20GB limit for now; proceed to Phase 2

### Phase 2: Medium-Term (Next 2-4 Months)
**Save for a 64GB mini PC.**
- **Top pick:** Minisforum UM790 Pro barebone (€379) + 64GB DDR5 kit (€150) = **€529 total**
- **Alternative:** Beelink SER8 64GB pre-configured (~€680) if Ken prefers one-box delivery
- Sell or repurpose current Beelink as a Proxmox node, home server, or give to family

Why UM790 Pro over SER8?
- Barebone pricing saves ~€150
- Ryzen 9 7940HS slightly faster than 8845HS
- Better thermal design (liquid metal, better heatsink)
- Dual M.2 slots for separate OS/model storage

### Phase 3: Long-Term (2027+)
**Add eGPU when budget/income allows.**
- USB4/TB4 eGPU enclosure (~€200-300)
- Used RTX 4060 Ti 16GB (~€300-400) or RTX 3090 (~€600-700)
- This turns the mini PC into a full AI workstation capable of training/fine-tuning
- Align with Trinity coursework timeline (Sept 2027)

### Phase 4: Avoid Until Mature
**Strix Halo v2 (128GB unified memory)**
- The concept is perfect for AI (no VRAM/RAM distinction)
- But first-gen issues (thermal, BIOS, QC) across all brands
- Wait for AMD to refresh the chip and manufacturers to fix cooling
- Revisit in late 2026/early 2027

---

## What About Karen's Specific Needs?

Karen currently runs on:
- **Small models:** qwen3.5:4b, llama3.1:8b (work fine on current 20GB)
- **Embeddings:** nomic-embed-text (tiny, works fine)
- **Browser automation:** Chrome on Xvfb (RAM-dependent; more RAM = more tabs)
- **Cron jobs:** 15+ background tasks (light CPU/RAM use)

With 64GB RAM, Karen could additionally run:
- **30B reasoning models** (Qwen 3.5 32B, Llama 3.3 30B) for serious coursework help
- **Local RAG pipeline** (vector DB + LLM + embeddings simultaneously)
- **Multiple model serving** (one for chat, one for coding, one for embeddings)
- **Larger context windows** without swapping

With eGPU added later:
- **70B models at interactive speeds** (15-20 tok/s)
- **Fine-tuning small models** (LoRA on 7B-13B)
- **Image generation** (Stable Diffusion locally)
- **CUDA-based ML frameworks** for engineering coursework

---

## Key Insight: Ken Doesn't Need to Spend €3,299

The EVO-X2 was attractive because 128GB sounds like "future-proof." But:
1. **His current machine already runs Karen** — the upgrade is about capacity, not capability
2. **€529 gets him to 64GB** — enough for 30B models, which is the practical ceiling for interactive use
3. **eGPU path gives him GPU acceleration later** — without committing to a €1,500 build now
4. **Cloud (kimi k2p5) fills the gap** for models >30B until local hardware catches up
5. **Budget discipline matters** — he's on disability, paying for CCT, planning for Trinity

The smart play: **Spend €529 now for 64GB RAM + Zen 4 CPU, add eGPU in 2027 when he has income and coursework needs it.**

---

## Sources

- sanj.dev/post/1000-dollar-local-llm-rig-70b
- toolhalla.ai/blog/home-ai-server-build-guide-2026
- vminstall.com/beelink-vs-gmktec-vs-mac-mini
- compute-market.com/blog/best-mac-mini-alternatives-for-ai-2026
- Amazon.ie (Beelink SER8 pricing)
- minisforum.de (UM790 Pro barebone pricing)
- eBay.ie (RTX 3090 used pricing)
