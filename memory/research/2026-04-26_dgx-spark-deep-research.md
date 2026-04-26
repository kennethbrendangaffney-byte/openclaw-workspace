# DGX Spark Deep Research — 24/7 Personal Assistant / Workhorse Use Case

**Research Date:** 2026-04-26
**Purpose:** Evaluate NVIDIA DGX Spark (and ASUS Ascent GX10) as Ken's primary AI workstation for 24/7 multi-agent local inference, replacing the previously planned €2,395 desktop build.

---

## Executive Summary

The DGX Spark is **not a GPU replacement** — it's a **capacity play**. It won't generate tokens faster than an RTX 4070 Ti Super on small models, but it can hold 120B+ parameter models entirely in memory while running multiple services simultaneously. For Ken's "6 agents 24/7" vision, this is the critical advantage.

**Verdict:** Technically viable for the use case. Two concerns: (1) fan noise under sustained load for bedroom 24/7 operation, (2) browser automation toolchain verification needed on DGX OS. The January/February 2026 software updates significantly improved the platform from its rocky October 2025 launch.

---

## Hardware Specifications

| Component | DGX Spark (Founders Edition) | ASUS Ascent GX10 |
|-----------|-------------------------------|------------------|
| **Chip** | NVIDIA GB10 Grace Blackwell Superchip | Same GB10 |
| **CPU** | 20-core ARM (10× Cortex-X925 P-cores + 10× Cortex-A725 E-cores) | Same |
| **CPU Clock** | P-cores: 4.075GHz all-core / 4.175GHz turbo; E-cores: 2.8GHz | Same |
| **GPU** | Blackwell with 5th-gen Tensor Cores, 6,144 CUDA cores | Same |
| **Memory** | 128GB LPDDR5x unified (shared CPU+GPU) | Same |
| **Memory Bandwidth** | 273 GB/s | Same |
| **AI Performance** | 1 PFLOP FP4 | Same |
| **Storage** | 1TB or 4TB NVMe M.2 (SED encryption) | 1TB NVMe |
| **Networking** | Dual QSFP (200Gbps) via ConnectX-7 NIC, 10GbE RJ-45, WiFi, Bluetooth | Same |
| **Display** | 1× HDMI 2.1a, 2× DP Alt-mode (USB-C), 4K@120Hz | Same |
| **USB** | 4× USB-C (one power delivery up to 240W) | Same |
| **Size** | 15×15×5 cm, 1.2 kg (~Mac Mini size) | Same form factor |
| **Power** | 240W max | Same |
| **Price** | ~$4,699 (~€4,300) | ~$3,570 sale / $4,054 MSRP (~€3,280) |

**Critical note:** The memory is **unified** — CPU and GPU share the same 128GB pool. This is different from discrete GPUs where VRAM is separate from system RAM. No PCIe bottleneck for CPU→GPU transfers.

---

## DGX OS Software Stack

DGX OS is **Ubuntu 24.04 server + desktop packages**, not a custom proprietary OS.

- **Kernel:** Linux 6.11 with NVIDIA patches
- **Desktop:** Ubuntu Wayland GUI with NVIDIA branding
- **Browser:** Preinstalled browser ( Chromium/Firefox — needs verification)
- **CUDA:** CUDA 13.0
- **AI Libraries:** NCCL, cuDNN, TensorRT-LLM, TensorRT, all math libraries
- **Development:** build-essentials, gdb, vim, Python, JupyterLab
- **GPU Tools:** Nsight Systems, Nsight Compute, Nsight Graphics
- **Containers:** Docker + NVIDIA Container Runtime
- **Kubernetes:** Single/stacked device support
- **Data Science:** cuDF, cuML, cuGraph, XGBoost, Spark RAPIDS
- **Frameworks:** All Blackwell-optimized frameworks
- **System:** nvidia-smi, telemetry, remote serial console
- **Security:** Secure Boot, TPM (off by default), signed firmware updates

**For Ken specifically:** xdotool, Xvfb, and Chromium are available via `apt` on ARM64 Ubuntu. The OpenClaw Issue #18123 specifically cites **snap-packaged Chromium** failing — DGX OS uses apt packages, not snap.

---

## Local LLM Performance — Real Benchmarks

### llama.cpp (Official ggml-org Benchmarks)

| Model | Size | Params | Quantization | Prefill (tok/s) | Generation (tok/s) |
|-------|------|--------|-------------|-----------------|-------------------|
| GPT-OSS 20B | 11.27 GiB | 20.9B | MXFP4 MoE | ~4,500 | **83** |
| GPT-OSS 120B | 59.02 GiB | 116.8B | MXFP4 MoE | ~2,400 | **59** |
| Qwen3-Coder-30B-A3B | 30.25 GiB | 30.5B | Q8_0 | ~2,990 | **61** |
| Qwen2.5-Coder-7B | 7.54 GiB | 7.6B | Q8_0 | ~2,250 | **29** |
| Gemma3 4B | 2.35 GiB | 3.9B | Q4_0 | ~5,950 | **81** |

### Ollama (Official Ollama Blog)

| Model | Size | Quantization | Prefill (tok/s) | Decode (tok/s) |
|-------|------|-------------|-----------------|-----------------|
| GPT-OSS 20B | MXFP4 | 3,224 | **58** |
| GPT-OSS 120B | MXFP4 | 1,169 | **41** |
| Gemma3 12B | q4_K_M | 1,894 | 24 |
| Gemma3 12B | q8_0 | 1,406 | 15 |
| Gemma3 27B | q4_K_M | 834 | 11 |
| Gemma3 27B | q8_0 | 585 | 7 |
| Llama3.1 8B | q4_K_M | 7,614 | **38** |
| Llama3.1 8B | q8_0 | 6,110 | 25 |
| Llama3.1 70B | q4_K_M | 1,911 | **4.4** |
| DeepSeek-R1 14B | q4_K_M | 5,919 | 20 |
| Qwen3 32B | q4_K_M | 705 | 9.4 |
| Qwen3 32B | q8_0 | 487 | 6.2 |

### Key Performance Insights

1. **Generation is bandwidth-limited, not compute-limited.** The 273 GB/s LPDDR5x memory bandwidth caps token generation speed. This is physics — software can't fix it.
2. **Prefill is fast.** Large prompt processing (summarization, RAG retrieval) is extremely fast because it uses tensor cores in parallel.
3. **MoE models run faster than dense models of similar size.** GPT-OSS 120B (MoE) at 59 tok/s vs Llama3.1 70B (dense) at 4.4 tok/s — MoE is far more efficient on this hardware.
4. **Context window size matters.** Qwen3-Coder-30B at 32K context drops to ~15-17 tok/s, at 16K context stabilizes at ~20-25 tok/s.
5. **January 2026 update improved up to 2.5x on key workloads** (Qwen-235B with TensorRT-LLM + NVFP4 + Eagle3 speculative decoding). Qwen3-30B and Stable Diffusion 3.5 saw ~1.4x gains.

---

## 24/7 Multi-Agent Capacity Analysis

### Memory Budget (128GB Unified)

Mirek's builder review showed this real-world stack fitting comfortably:

```
128 GB total
├── GPT-OSS 120B (MXFP4)          ~65 GB
├── Whisper Large v3               ~3 GB
├── Coqui XTTS v2                  ~2 GB
├── OpenSearch / vector index      ~6 GB
├── PostgreSQL                     ~2 GB
├── Backend API                    ~2 GB
├── OS + system overhead          ~10 GB
└── Free headroom                 ~38 GB
```

### Ken's Projected 6-Agent Stack

| Agent | Model | Size | Memory |
|-------|-------|------|--------|
| Executive / Reasoning | GPT-OSS 120B or Qwen3.6-27B | Q4_K_M | ~65 GB |
| Scheduler | Qwen3.5-14B or Llama3.1-8B | Q4 | ~8-9 GB |
| Finance | Qwen3.5-7B | Q4 | ~4.5 GB |
| Health | Qwen3.5-7B | Q4 | ~4.5 GB |
| Projects | Qwen3.5-14B | Q4 | ~8-9 GB |
| Inbox / Communications | Qwen3.5-7B | Q4 | ~4.5 GB |
| **Subtotal models** | | | **~95-97 GB** |
| Vector DB + embeddings | | | ~5-10 GB |
| PostgreSQL / state DB | | | ~2-3 GB |
| APIs / web server | | | ~2-3 GB |
| OS overhead | | | ~10 GB |
| **Total** | | | **~115-123 GB** |
| **Headroom** | | | **~5-13 GB** |

**Verdict:** Tight but feasible. The Executive agent would need to unload/reload when not actively reasoning, or use a smaller model (70B class at ~40GB) to free up space for concurrent specialist agents.

**Better approach:** Time-slice the large model. Load GPT-OSS 120B only when the Executive agent is triggered. Keep 4-5 smaller specialist models resident continuously (total ~30-40GB), leaving 80GB+ for the big model when needed.

---

## Thermal, Power, and Noise — 24/7 Concerns

### Power Draw

| State | GPU Power | Notes |
|-------|-----------|-------|
| Idle | ~13W | nvidia-smi reading |
| Inference (prefill) | ~69-76W | StorageReview thermal test |
| Max rated | 240W | Includes CPU + system |
| ConnectX-7 active | +18W | February update allows hot-plug disable |
| ConnectX-7 inactive | saves 18W | Hot-plug support added Feb 2026 |

### Thermals (StorageReview multi-OEM test, Jan 2026)

Tested under sustained vLLM serving of GPT-OSS 120B:

| OEM | CPU Peak | GPU Peak | NVMe Peak | Notes |
|-----|----------|----------|-----------|-------|
| **Acer** | 74.6°C | 68°C | 51.8°C | Best cooling, 10-15°C cooler |
| **ASUS** | ~84°C | ~80°C | ~60°C | Middle ground |
| **Founders Edition** | 87-88°C | 80-82°C | 58-63°C | Reference design |
| **Dell** | 87-88°C | 80-82°C | 58-63°C | Matches reference |
| **Gigabyte** | 87-88°C | 80-82°C | ~62°C | Highest GPU power draw |

### Noise

- **Under load:** Fan "screams" (direct quote from multiple reviews). Not discrete.
- **January/February updates:** Improved thermal management, but the 150mm compact chassis is thermally aggressive by design.
- **User workaround:** Some owners keep a small USB fan pointed at the unit.
- **ASUS GX10 advantage:** Dual-fan cooling design may run quieter/cooler than Founders Edition single-fan.

### 24/7 Suitability

| Concern | Assessment |
|---------|------------|
| **Power cost** | At 100W average, ~2.4 kWh/day = ~€0.50/day in Ireland. Manageable. |
| **Thermal throttling** | October 2025 units had issues. January 2026 update largely resolved. |
| **Noise** | **Problematic for bedroom.** Fan is audible and aggressive under sustained load. |
| **Reliability** | No data on 6+ month 24/7 operation yet. Platform is ~6 months old. |
| **Sleep/wake** | Suspend/resume supported but basic. For 24/7 agents, keep awake. |

---

## Browser Automation on DGX OS / ARM64

### Current Status

| Component | ARM64 Availability | Risk Level |
|-----------|-------------------|------------|
| **Xvfb** | `apt install xvfb` — available on all Ubuntu architectures | **Low** |
| **xdotool** | `apt install xdotool` — available on all Ubuntu architectures | **Low** |
| **Chromium** | `apt install chromium-browser` — ARM64 .deb exists | **Low-Medium** |
| **Google Chrome** | Official .deb is **amd64 only**. No ARM64 build from Google. | **Medium** |
| **Firefox** | `apt install firefox` — available on ARM64 | **Low** |

### The OpenClaw Issue #18123 Context

- **Bug:** Browser automation fails on ARM64 Ubuntu with **snap-packaged Chromium** — timeout after 15,000ms
- **Root cause:** Snap confinement + ARM64 specific issue
- **DGX OS mitigation:** DGX OS is based on Ubuntu server + desktop packages. It uses **apt packages**, not snap. So this specific bug likely **does not apply**.
- **Verification needed:** Confirm Chromium on DGX OS is apt-installed, and test `--ozone-platform=x11` with Xvfb.

### OpenClaw Issue #23987

- **Bug:** Installation fails on Linux ARM64 (aarch64) with Node v22 — `@discordjs/opus` native compilation error, ARM NEON intrinsics crash
- **Impact:** Could block `npm install` of OpenClaw on ARM64
- **Mitigation:** Use official Docker image `ghcr.io/openclaw/openclaw:main-arm64` instead of npm install. Raspberry Pi 5 confirmed working with this image.

### DGX OS Desktop Environment

- Ubuntu Wayland GUI with NVIDIA branding
- Desktop and application acceleration via OpenGL/Vulkan
- Video acceleration (nvenc/nvdec) for browsers and media players
- DRM content: browser playback in fallback resolutions (enhanced copy protection planned post-launch)
- **DisplayPort over USB4:** Enabled post-launch (important for multi-monitor)

**Assessment:** Browser automation toolchain (Xvfb + xdotool + Chromium) should work on DGX OS. The snap-specific bug should not apply. But this needs **hands-on verification** before committing.

---

## Networking: Dual-Unit Scaling

The ConnectX-7 NIC is a **~$1,500-2,000 component** included in the base price.

- Two DGX Sparks connected via QSFP = **256GB unified memory pool** over 200 Gbps RDMA
- Can run **Llama 3.1 405B** locally across two units
- Distributed fine-tuning of 70B models with FSDP + LoRA
- RDMA + GPUDirect = data moves directly from storage/network into GPU memory with minimal CPU involvement

**For Ken:** Not immediately relevant (single unit), but preserves upgrade path if needs grow beyond 128GB.

---

## Comparison: DGX Spark vs Planned €2,395 Desktop Build

| Metric | DGX Spark / GX10 | €2,395 Desktop (RTX 4070 Ti S) |
|--------|-----------------|--------------------------------|
| **Total Memory** | 128GB unified | 128GB DDR5 + 16GB GDDR6X |
| **Model Capacity** | 200B param at Q4 | ~70B param at Q4 (KTransformers hybrid) |
| **Concurrent Models** | 5-6 models resident | 1-2 large models + swap |
| **Token Speed (8B)** | ~38 tok/s | ~80-120 tok/s |
| **Token Speed (120B)** | ~41-59 tok/s | Cannot fit in 16GB VRAM |
| **Memory Bandwidth** | 273 GB/s unified | 672 GB/s GPU + ~90 GB/s CPU |
| **AI Ecosystem** | Native CUDA, pre-installed | Install manually |
| **Gaming** | No dGPU, poor gaming | Excellent gaming |
| **Upgrades** | Soldered, zero upgrade path | CPU, GPU, RAM, storage all upgradable |
| **Platform** | ARM64 (some compatibility issues) | x86-64 (universal compatibility) |
| **Browser Automation** | Needs verification | Proven working |
| **OpenClaw** | Docker image works, npm install risky | Native npm install works |
| **Noise** | Fan screams under load | Standard desktop case, manageable |
| **Form Factor** | 1.2kg desk appliance | Full ATX tower |
| **Price** | €3,280-4,300 | €2,395 |
| **Future GPU Upgrade** | Impossible | RTX 5070/6070 in 2028-2029 |

---

## Software Update History (Critical for Reliability)

### October 2025 Launch Issues
- Power draw capped at ~100W instead of 240W
- Thermal throttling within 20 minutes
- Fan noise complaints
- Spontaneous reboots during long runs
- John Carmack publicly called it "half-baked"

### January 2026 Update (CES)
- Up to 2.5x performance improvement on key workloads
- 30+ playbooks released (ComfyUI, Nemotron, dual-Spark, RAG + Web Search)
- Brev hybrid routing (local Spark + cloud frontier models)
- NVIDIA AI Enterprise support
- TensorRT-LLM + NVFP4 + Eagle3 speculative decoding

### February 2026 Update
- Hot-plug for ConnectX-7 (saves 18W when inactive)
- Better multi-monitor support
- Bluetooth audio works
- WiFi/Bluetooth disable at UEFI level (enterprise security)

**Status:** The platform has matured significantly. Early buyers were beta testers; current firmware is much more stable.

---

## Key Risks for Ken's Use Case

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Fan noise for bedroom 24/7** | High | ASUS GX10 has dual-fan design; place in closet/other room; use USB fan |
| **Browser automation unverified** | Medium | Test Chromium + Xvfb + xdotool on DGX OS before purchase |
| **OpenClaw npm install on ARM64** | Medium | Use official Docker `main-arm64` image instead |
| **No upgrade path** | Medium | 128GB may be enough for 4-5 years; dual-unit path exists |
| **Thermal throttling history** | Medium | January update largely fixed; Acer/ASUS run cooler |
| **ARM64 software compatibility** | Low-Medium | Ubuntu 24.04 ARM64 has broad support; niche tools may need compilation |
| **No gaming capability** | Low | Ken doesn't game; secondary x86 machine can handle occasional gaming |
| **Price premium €885-1,900** | Low | If the use case justifies it, the premium is acceptable |

---

## Real-World User Experiences

### Mirek (Builder Review, March 2026)
> "What changes when local inference stops being the bottleneck... I wanted a separate inference machine. Something that sits next to the main workstation and handles the model workloads cleanly. Your laptop stays your laptop. The inference box does inference."

Loaded full stack: GPT-OSS 120B + Whisper Large + XTTS + OpenSearch + PostgreSQL + API. Everything ran simultaneously. "The 120B model takes a little over half the total pool. The rest of the system still fits comfortably."

### Paolo ("I Was Ready to Return It", Feb 2026)
> "Three weeks after unboxing, I genuinely considered returning it. A 30B model thermal throttled within 20 minutes. The fan screamed."

Then the January update dropped. "The 30+ playbooks turned the Spark from 'I guess I can run Ollama' into a legitimate AI development platform."

Still honest about limitations: "Memory bandwidth is still 273 GB/s. This is a physics problem, not a software problem. Token generation tops out around 35-40 tokens per second."

### AI Merge (Unboxing, 2025)
> "DGX Spark is not a simple GPU; it's an AI development platform. It replicates the NVIDIA DGX into a powerful desk-side mini PC."

Highlighted the ConnectX-7 as a $1,700-2,000 component included in the price.

### Sparktastic (Inference Engine Comparison, Nov 2025)
> "If you're the only user, llama.cpp will give you the best single-user performance without the overhead. Use vLLM only when llama.cpp doesn't support a new architecture yet."

Chose llama.cpp over Ollama (3-4 tok/s slower), vLLM (overkill for single user), TensorRT (hours to compile, limited model support).

---

## Sourcing and Pricing

| Variant | Price (USD) | Price (EUR est.) | Notes |
|---------|-------------|------------------|-------|
| DGX Spark 1TB Founders Edition | $4,699 | ~€4,300 | NVIDIA direct |
| DGX Spark 4TB Founders Edition | ~$5,200 | ~€4,750 | More storage |
| ASUS Ascent GX10 1TB | $3,570 (sale) / $4,054 MSRP | ~€3,280 | Identical chip, dual-fan, potentially better thermals |
| Lenovo ThinkStation PGX | Similar range | Similar | Enterprise support, same GB10 |

**Best value for Ken:** ASUS Ascent GX10 at ~$3,570. Same hardware, $1,100 cheaper, dual-fan cooling may address the noise/thermal concern.

---

## Final Assessment

### What the DGX Spark Excels At
1. **Model capacity** — 120B-200B models resident in memory, no quantization compromise
2. **Multi-model concurrency** — 5-6 agents running simultaneously within 128GB
3. **AI software ecosystem** — Pre-installed CUDA stack, Ollama/llama.cpp/vLLM all work
4. **Privacy** — Full local inference, zero cloud dependency for reasoning
5. **Networking** — ConnectX-7 enables RDMA, dual-unit scaling to 256GB
6. **Power efficiency** — 1 PFLOP at 240W is efficient compared to multi-GPU workstations

### What It Struggles With
1. **Token generation speed** — Bandwidth-limited to ~35-60 tok/s on large models
2. **Noise** — Fan is audible under sustained load
3. **ARM64 compatibility edge cases** — Some Node.js native modules, browser automation nuances
4. **No upgrades** — Soldered everything
5. **Gaming** — Not a gaming machine
6. **Price** — €885-1,900 premium over capable desktop build

### 24/7 Personal Assistant Verdict

**The DGX Spark/GX10 CAN run a 24/7 multi-agent system.** The memory capacity is the enabler — 128GB unified lets you keep multiple models resident without the swap dance. The software stack is mature enough (post-January update). Ollama and llama.cpp are confirmed working.

**The caveats:**
- Verify browser automation on DGX OS before committing (Chromium + Xvfb + xdotool)
- Plan for fan noise (ASUS GX10 dual-fan helps; placement matters)
- Use Docker-based OpenClaw, not npm install
- Accept that token speed is "good enough" but not blazing
- The €2,395 desktop still wins on flexibility, speed per dollar, and upgrade path

**Ken's decision comes down to:** Is guaranteed 128GB unified memory worth €885-1,900 more than a 128GB+16GB desktop with faster token generation but smaller per-model capacity?

For the "6 agents 24/7" vision: **Yes, the unified memory is worth it.** The desktop build cannot simultaneously host a 120B reasoning model + 5 specialist models. The Spark can.

---

## Sources

1. Tom's Hardware — DGX Spark Review (full 4-page review)
2. Mirek Fokt — "NVIDIA DGX Spark on My Desk: A Builder's Review" (Medium, Mar 2026)
3. Paolo — "I Was Ready to Return My DGX Spark. Then NVIDIA's January Update Changed Everything" (Medium, Feb 2026)
4. AI Merge / The AI Merge — "Unboxing my NVIDIA DGX Spark: First Impressions" (Substack, 2025)
5. Sparktastic — "Choosing an Inference Engine on DGX Spark" (Medium, Nov 2025)
6. ggml-org/llama.cpp — Official DGX Spark benchmarks (`benches/dgx-spark/dgx-spark.md`)
7. Ollama Blog — "NVIDIA DGX Spark performance" (Oct 2025)
8. StorageReview — "NVIDIA DGX Spark Thermal Test: How OEM Cooling Designs Stack Up" (Jan 2026)
9. NVIDIA Docs — DGX Spark Porting Guide, Software Requirements, Hardware Overview
10. NVIDIA DGX Spark Playbooks — GitHub (30+ official playbooks)
11. Frank's World — "Exploring Local LLM Performance: A Deep Dive with NVIDIA DGX Spark" (Apr 2026)
12. OpenClaw GitHub Issues — #18123 (ARM64 browser automation), #23987 (ARM64 Node.js opus)
13. Peter Girnus — "Install Chromium on Ubuntu Linux (ARM64)"

---

*Research compiled by Karen for Ken Gaffney, 2026-04-26*
*Next step: Verify browser automation toolchain on a DGX OS system, or find a user who has tested it*
