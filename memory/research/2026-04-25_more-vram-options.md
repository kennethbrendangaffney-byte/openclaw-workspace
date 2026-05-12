# More VRAM Options — Impact on Price & Setup

## Consumer GPUs by VRAM Tier (New)

| GPU | VRAM | Price | TDP | Setup Changes |
|-----|:----:|:-----:|:---:|:-------------|
| **RTX 4070 Ti Super** | 16GB | €900 | 285W | None (our base build) |
| **RTX 4080 Super** | 16GB | €1,200 | 320W | Slightly bigger PSU |
| **RTX 4090** | **24GB** | €1,800-2,500 | 450W | **PSU, case, cooling** |
| **RTX 5090** | **32GB** | €2,500+ | 575W | **Major overhaul** |

**The problem:** There's nothing between 16GB and 24GB. The next step up is a massive price jump.

---

## Option 1: RTX 4090 (24GB)

### Price Impact

| Component | 4070 Ti S Build | 4090 Build |
|-----------|:---------------:|:----------:|
| GPU | €900 | €1,800-2,500 |
| PSU (850W) | €90 | ❌ Underpowered |
| PSU (1000W+) | — | €140 |
| Case (Pop Air) | €85 | ✅ Fine |
| **Total change** | — | **+€900-1,600** |
| **New total** | €2,370 | **€3,270-3,970** |

### Setup Changes Required

| Aspect | 4070 Ti S (285W) | 4090 (450W) |
|--------|:----------------:|:-----------:|
| **PSU** | 850W sufficient | **1000W minimum** |
| **Power cables** | 2× 8-pin | **3× 8-pin or 12VHPWR** |
| **Case airflow** | Standard sufficient | **Needs excellent airflow** |
| **Case size** | Fits in mid-tower | **Much bigger card** |
| **Room temperature** | Manageable | **Heats up room significantly** |
| **Electricity bill** | Normal | **+€100-150/year** |

**Power draw example:**
- 4070 Ti S system: ~450W under full load
- 4090 system: ~650W under full load
- At Irish electricity rates (~€0.40/kWh): **4090 costs ~€200/year more to run**

---

## Option 2: RTX 5080 / 5090 (16GB / 32GB)

**RTX 5080:** 16GB — same VRAM as 4070 Ti S, faster but not transformative for AI. €1,200+. Skip it.

**RTX 5090:** 32GB — game changer, but:
- Price: €2,500+ (if you can find stock)
- TDP: 575W
- Needs 1200W PSU
- Sold out almost everywhere
- **Total build cost: €4,500+**

---

## Option 3: Dual GPU (2× 4070 Ti S = 32GB total)

| Aspect | Single GPU | Dual GPU |
|--------|:----------:|:--------:|
| VRAM total | 16GB | **32GB** (not combined!) |
| Motherboard | Standard B650 | **Needs 2× PCIe slots** |
| PSU | 850W | **1200W+** |
| Cooling | Standard | **Much more complex** |
| Software | Easy | **llama.cpp --tensor-split required** |
| Scaling | 100% | ~70-80% (not 2× speed) |
| **Cost** | €900 | €1,800 |

**Important:** Dual 4070 Ti S doesn't give you 32GB usable VRAM for one model. The model splits across both GPUs. Works well, but:
- More complex setup
- More heat
- More power
- Not all software supports it well

---

## What More VRAM Actually Gets You

| Model Size | 16GB VRAM | 24GB VRAM | 32GB VRAM |
|------------|:---------:|:---------:|:---------:|
| 7B | ✅ GPU | ✅ GPU | ✅ GPU |
| 14B | ✅ GPU | ✅ GPU | ✅ GPU |
| 30B | ✅ GPU | ✅ GPU | ✅ GPU |
| 70B | ~20GB offload | ~16GB offload | ✅ **GPU** |
| 110B | Not feasible | ~40GB offload | ~20GB offload |

**With 24GB (RTX 4090):**
- 70B model fits mostly on GPU = **8-12 tok/s** (vs 3-5 tok/s on 16GB)
- Less CPU bottleneck
- Better for long context (more KV cache fits in VRAM)

**With 32GB (RTX 5090):**
- 70B entirely on GPU = **10-15 tok/s**
- Can run 30B + 13B simultaneously
- Future-proof for next 2-3 years

---

## The Setup Changes in Detail

### PSU Upgrade
| Build | GPU | PSU Needed | Cost |
|-------|-----|:----------:|:----:|
| Base | 4070 Ti S | 850W | €90 |
| 4090 | 4090 | 1000W | €140 |
| 5090 | 5090 | 1200W | €200 |

### Case/Cooling
- 4090 cards are **3-4 slots thick** (vs 2.5 for 4070 Ti S)
- Need case with **vertical clearance** (Pop Air fits, but tight)
- Need **extra case fans** for airflow (+€20-40)
- Room gets noticeably warmer

### Motherboard
- B650 Tomahawk: **Fine for single 4090**
- For dual GPU: needs **X670 chipset** (more PCIe lanes)
- For 5090: may need **PCIe 5.0 support** (future boards)

---

## Summary Matrix

| Path | VRAM | Total Cost | Setup Complexity | Worth It? |
|------|:----:|:----------:|:----------------:|:---------:|
| **Base build (4070 Ti S)** | 16GB | €2,370 | Easy | ✅ Yes |
| **+RTX 4090** | 24GB | €3,270-3,970 | Moderate | ⚠️ If budget allows |
| **+RTX 5090** | 32GB | €4,500+ | Complex | ❌ Overkill |
| **+Dual 4070 Ti S** | 32GB (split) | €3,500+ | Complex | ❌ Not worth it |

---

## My Recommendation

**For YOUR timeline and budget:**

1. **Stick with RTX 4070 Ti Super now** — 16GB handles your CCT/TAP needs
2. **Save the €900-1,500** you'd spend on more VRAM
3. **In 2028-2029** (Trinity Year 2-3), buy whatever GPU is current:
   - By then, €1,500 will buy a card with 32GB+ VRAM
   - Your motherboard/PSU/case/RAM all still work
   - Just swap the GPU

**The 4090's 8GB extra VRAM costs €900-1,600 more.** That's nearly another entire build. And by 2029, a new mid-range card will likely have 24GB anyway.

Your call, but the base build is the smart money. 🦞

---

*Written: 2026-04-25*