# Ken's €2,000 AI Workstation Build — Amazon.de Cart

## Complete Parts List with Explanations

---

### **CPU: AMD Ryzen 7 7700X**
**Price:** ~€220  
**Amazon.de:** https://www.amazon.de/dp/B0BBHHT8LY

**Why I chose it:**
- 8 cores / 16 threads — plenty for AI inference and multitasking
- 5.4 GHz boost — fast single-threaded performance
- AM5 socket — upgradeable to Ryzen 9000 series later
- No integrated graphics (you have a dedicated GPU anyway)
- **€220 is excellent value** — was €350+ at launch

**Positives:**
- ✅ Fast enough for any AI workload you'll do
- ✅ AM5 socket supported until at least 2027
- ✅ Runs cool with a good air cooler
- ✅ PCIe 5.0 support

**Negatives:**
- ❌ No stock cooler included (need to buy separate)
- ❌ 7800X3D is better for gaming (but costs €100 more)
- ❌ 8 cores might feel limited in 2029 if doing heavy compilation

---

### **Motherboard: MSI MAG B650 Tomahawk WiFi**
**Price:** ~€163-217  
**Amazon.de:** https://www.amazon.de/dp/B0BDS873GF

**Why I chose it:**
- **Best B650 motherboard** according to every reviewer
- Built-in WiFi 6E + Bluetooth (no extra card needed)
- 4 DDR5 slots (can upgrade to 128GB later)
- 3 M.2 SSD slots (room for expansion)
- Excellent VRMs (power delivery) — handles any Ryzen 7000/9000 CPU
- USB-C front panel header

**Positives:**
- ✅ WiFi included — no extra €30 card
- ✅ Future-proof: works with Ryzen 9000 series
- ✅ 3 M.2 slots = add storage without replacing anything
- ✅ BIOS flashback button (recover from bad BIOS update without CPU)
- ✅ Strong build quality, not "budget" feeling

**Negatives:**
- ❌ No PCIe 5.0 for GPU (doesn't matter — no GPU uses it yet)
- ❌ B650 (not X670) = fewer PCIe lanes for extreme expansion
- ❌ Price fluctuates — sometimes €163, sometimes €217

---

### **RAM: 64GB DDR5-5600 (2×32GB)**
**Price:** ~€260  
**Amazon.de search:** "DDR5 32GB 5600" ×2

**Why I chose 64GB:**
- 32GB is standard for gaming, **64GB is the floor for AI work**
- 2×32GB leaves 2 slots free for future 128GB upgrade
- DDR5-5600 is the sweet spot for AMD (faster than 5200, not much pricier)

**Brand suggestions:** Kingston Fury Beast, Corsair Vengeance, G.Skill Flare X5

**Positives:**
- ✅ 64GB = run 70B models with small CPU offload
- ✅ 2 sticks = dual-channel (full bandwidth)
- ✅ 2 free slots = upgrade path to 128GB when prices drop
- ✅ 5600 MHz is AMD's sweet spot

**Negatives:**
- ❌ €260 is expensive (thanks DDR5 shortage)
- ❌ Not 128GB (but we discussed why that's €1,700)
- ❌ Some kits need XMP/EXPO enabled in BIOS (one-click, but extra step)

---

### **GPU: NVIDIA GeForce RTX 4070 Ti Super 16GB**
**Price:** ~€880-950 (MSRP), **but currently scarce**  
**Amazon.de:** https://www.amazon.de/dp/B0CQMRVZ3M (often "nicht verfügbar")

**Why I chose it:**
- **16GB VRAM** = sweet spot for local AI (fits 30B models, 70B with small offload)
- CUDA = works with everything (Ollama, llama.cpp, PyTorch, TensorFlow)
- 285W TDP = manageable heat/noise
- Much faster than any mini PC or integrated graphics

**⚠️ AVAILABILITY WARNING:**
- MSI Ventus 3X currently "not available" on Amazon.de
- GIGABYTE Gaming OC showing at €1,389 on Geizhals — **scalper pricing**
- **Your options:**
  1. Wait for Amazon.de restock (check daily)
  2. Buy from Caseking.de or Mindfactory.de (German retailers, ship to Ireland)
  3. Consider used RTX 3090 24GB (€650-800 on eBay UK)

**Positives:**
- ✅ 16GB VRAM runs most models you need
- ✅ CUDA ecosystem = everything just works
- ✅ New card = full warranty, no mining wear
- ✅ DLSS 3.5 = bonus for any gaming you do

**Negatives:**
- ❌ Currently hard to find at MSRP
- ❌ 16GB might feel small by 2029 (but GPU is swappable)
- ❌ €300 more than used RTX 3090 (but 3090 has used risk)

---

### **SSD: 2TB NVMe PCIe 4.0**
**Price:** ~€130  
**Amazon.de:** Samsung 990 EVO Plus, Crucial P5 Plus, WD Black SN850X

**Why I chose 2TB:**
- AI models are HUGE (Llama 3 70B Q4 = ~40GB)
- You'll want multiple models, datasets, projects
- 1TB fills up fast with this stuff
- 2TB is only €40-50 more than 1TB

**Positives:**
- ✅ 7,000+ MB/s read = instant model loading
- ✅ 2TB = room for OS, models, projects, games
- ✅ NVMe = tiny, no cables
- ✅ Add a second later via the other M.2 slot

**Negatives:**
- ❌ 2TB still not "infinite" — you'll manage storage eventually
- ❌ Some cheap NVMe drives slow down when full (buy Samsung/Crucial/WD)
- ❌ No data recovery if it fails (back up important stuff)

---

### **PSU: Corsair RM850e 850W 80+ Gold**
**Price:** ~€90  
**Amazon.de:** https://www.amazon.de/dp/B0BPLQ3L5F

**Why I chose 850W:**
- RTX 4070 Ti Super = 285W, Ryzen 7 7700X = 105W
- Total system ~450W under load
- 850W = 50% headroom (PSUs are most efficient at 50-70% load)
- Room for future GPU upgrade (RTX 5090 = ~450W)

**Positives:**
- ✅ 80+ Gold = efficient, low electricity cost
- ✅ Fully modular = only use cables you need (clean build)
- ✅ Corsair reliability + 10-year warranty
- ✅ Quiet fan (stops at low loads)
- ✅ 850W handles any single GPU upgrade

**Negatives:**
- ❌ Not the cheapest PSU (but PSU is NOT where you save money)
- ❌ 850W overkill for current build (but future-proof)
- ❌ Cable management takes time with modular PSU

---

### **Case: Fractal Design Pop Air**
**Price:** ~€85  
**Amazon.de:** https://www.amazon.de/dp/B09WCH7C83

**Why I chose it:**
- Excellent airflow (mesh front panel) — keeps GPU cool
- Clean, minimal aesthetic (no RGB unless you want it)
- Easy to build in (removable panels, good cable routing)
- 2× 140mm fans included
- Room for big air cooler + long GPU

**Positives:**
- ✅ Great airflow = cooler components = longer life
- ✅ Clean look — not "gamer" unless you want it
- ✅ Easy to work in (first-timer friendly)
- ✅ Dust filters (less cleaning needed)

**Negatives:**
- ❌ Not the absolute cheapest case
- ❌ No USB-C on front panel (motherboard has it though)
- ❌ Size — it's a mid-tower, not small

---

### **CPU Cooler: DeepCool AK620**
**Price:** ~€55  
**Amazon.de:** https://www.amazon.de/dp/B09Y8W4T6G

**Why I chose it:**
- Ryzen 7 7700X doesn't include a cooler
- AK620 = best air cooler under €60
- Dual-tower design = handles 7700X easily
- Quiet fans
- No liquid = no pump failure risk

**Positives:**
- ✅ Cheaper than AIO liquid coolers
- ✅ No maintenance, no leak risk
- ✅ Very quiet under normal load
- ✅ Dual fan = better cooling than single-tower

**Negatives:**
- ❌ Big — check RAM clearance (Pop Air fits it)
- ❌ Blocky look (not the prettiest, but functional)
- ❌ No RGB (unless you buy the AK620 Digital)

---

## 💰 Total Price Breakdown

| Component | Est. Price |
|-----------|:----------:|
| Ryzen 7 7700X | €220 |
| MSI B650 Tomahawk WiFi | €190 |
| 64GB DDR5-5600 (2×32GB) | €260 |
| RTX 4070 Ti Super 16GB | €900 |
| 2TB NVMe SSD | €130 |
| Corsair RM850e 850W | €90 |
| Fractal Pop Air Case | €85 |
| DeepCool AK620 Cooler | €55 |
| **Total** | **~€1,930** |

**Variance:** ±€100 depending on GPU stock and RAM pricing

---

## 🎯 Why This Specific Build

### The Philosophy

**Every choice prioritizes:**
1. **VRAM for AI** — RTX 4070 Ti Super 16GB is the best inference/€ ratio
2. **Upgrade path** — AM5 socket, 4 RAM slots, 850W PSU, 3 M.2 slots
3. **Reliability** — quality PSU, good airflow, proven motherboard
4. **Budget discipline** — €1,930 leaves €70 for cables/thermal paste

### Why AMD over Intel?
- AM5 socket supported longer (Intel changes sockets every 2 generations)
- Better power efficiency
- 7700X is cheaper than equivalent i7 with same performance
- Linux compatibility excellent

### Why not cheaper parts?
- PSU: cheap units can fry your whole build (€90 vs €50 = insurance)
- Motherboard: cheap boards have weak VRMs, limit future CPU upgrades
- Case: airflow matters for GPU longevity

### What you'd gain spending more:
- **+€100:** Ryzen 7 7800X3D (better gaming, same AI)
- **+€300:** 128GB RAM (unnecessary now, upgrade later)
- **+€1,500:** RTX 4090 (24GB VRAM, but way over budget)

### What you'd lose spending less:
- **-€50 cheaper PSU:** Less reliable, possibly fry components
- **-€40 cheaper motherboard:** No WiFi, fewer upgrade slots
- **-€30 cheaper case:** Worse airflow, harder to build in

---

## ⚠️ Important Notes

### Buying Strategy
1. **GPU first** — hardest to find at good price. Set up stock alerts
2. **Buy everything else** — CPU, motherboard, RAM, PSU are always in stock
3. **Check Mindfactory.de / Caseking.de** — sometimes cheaper than Amazon.de

### What This Build Can't Do
- Train large models from scratch (needs more VRAM + enterprise GPU)
- Run two 70B models simultaneously (need 128GB RAM)
- Match cloud API speed for huge models (nothing local does)

### What It CAN Do
- Run 7B-30B models entirely on GPU at 40-80+ tok/s
- Run 70B models with small CPU offload at 3-5 tok/s
- Handle CCT diploma coursework easily
- Run Karen + multiple models + browser simultaneously
- Upgrade GPU in 2-3 years without replacing anything else

---

## 🔗 Quick Links (Amazon.de)

| Part | Search Term |
|------|-------------|
| CPU | "AMD Ryzen 7 7700X" |
| Motherboard | "MSI MAG B650 Tomahawk WiFi" |
| RAM | "Kingston Fury Beast DDR5 5600 32GB" ×2 |
| GPU | "RTX 4070 Ti Super 16GB" (stock watch) |
| SSD | "Samsung 990 EVO Plus 2TB" |
| PSU | "Corsair RM850e" |
| Case | "Fractal Design Pop Air" |
| Cooler | "DeepCool AK620" |

---

*Build drafted: 2026-04-25*  
*Prices: April 2026, subject to change*
