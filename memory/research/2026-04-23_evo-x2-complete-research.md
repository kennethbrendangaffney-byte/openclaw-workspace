# GMKtec EVO-X2 — Complete Research Summary

**Date researched:** 2026-04-23
**Purpose:** Ken's local AI/education infrastructure investment

---

## What Is It?

The GMKtec EVO-X2 is a **mini PC** powered by AMD's flagship **Ryzen AI Max+ 395** (codename "Strix Halo") — the most powerful x86 APU on the market as of early 2025. It's designed specifically for AI workloads with massive unified memory.

---

## Core Specifications

| Component | Spec |
|-----------|------|
| **CPU** | AMD Ryzen AI Max+ 395 — 16 cores / 32 threads, up to 5.1 GHz, Zen 5 architecture |
| **GPU (iGPU)** | Radeon 8060S — 40 Compute Units, RDNA 3+ architecture |
| **NPU** | XDNA 2 AI Engine — 50 TOPS (alone), 126 TOPS total system |
| **Memory** | 64GB or **128GB LPDDR5X** @ 8000MHz (shared UMA pool for CPU/GPU/NPU) |
| **Storage** | 1TB or **2TB PCIe 4.0 SSD** |
| **Memory Bandwidth** | 256 GB/s |
| **Display** | Quad screen, up to 8K |
| **Connectivity** | WiFi 7, USB4, SD Card Reader 4.0 |
| **Form Factor** | Mini PC (compact, ~liter-sized) |

**Key point:** 128GB unified memory means the GPU can access up to ~112GB for AI model loading. That's enough to run 70B parameter models locally without quantization.

---

## Why This Chip Matters for AI

**AMD's own benchmarks (June 2025):**
- Ryzen AI Max+ 395 with 128GB unified memory
- Up to **112GB allocatable for AI workloads**
- 2.2× RTX 4090 efficiency on AI tasks (AMD's claim)
- 36 tokens/sec on Llama 3.1 8B (from WareDB specs)
- Can run **Llama 3.1 70B** locally (unified memory advantage)

**Real-world use cases:**
- Local LLM inference (Ollama, llama.cpp)
- AI training and fine-tuning
- Stable Diffusion / image generation
- Running multiple AI models simultaneously
- Homelab / local AI development

---

## Pricing (Current as of April 2026)

| Configuration | Price | Notes |
|---------------|-------|-------|
| **64GB RAM / 1TB SSD** | ~€2,039 (Amazon.ie) | Import charges included |
| **64GB RAM / 1TB SSD** | ~€1,400–1,600 (US, base config) | Cheaper config available |
| **128GB RAM / 2TB SSD** | **~€2,849–3,299** (EU/Ireland) | Premium config |

**Sources:**
- **GGMachines (Dublin):** https://www.ggmachines.ie/product-page/mini-pc-gmktec-evo-x2-amd-ryzen-ai-max-395-128gb-ram-2tb-ssd-win-11-pro
- **Geizhals EU:** €2,849 starting price (2026)
- **Amazon.ie:** €2,039 for 96GB/1TB config (import charges included)
- **GMKtec UK:** Price increase coming soon (their warning)

**Ken's target:** 128GB/2TB at ~€3,299 — available from GGMachines in Dublin with physical store/return window.

---

## Linux Compatibility — The Full Picture

### ✅ What Works

**ROCm officially supports Strix Halo:**
- ROCm 7.9+ supports Ryzen AI Max+ 395
- Ubuntu 24.04.3+ confirmed working by multiple users
- AMD actively develops Linux drivers first, Windows second

**Real user experiences (Ubuntu 24.04/25.10):**
- User `bdurham.dev`: Successfully running Ollama + Open-WebUI on Ubuntu 25.10
- User `betelgeuse.work`: Detailed Ubuntu installation guide, recommends Linux for AI
- Ubuntu memory management superior for AI inference vs Windows

### ⚠️ Known Issues

| Issue | Details | Severity |
|-------|---------|----------|
| **Kernel panic** | Ubuntu kernel 6.14.0-1018-oem — regression on GMKtec hardware | **High** — fixed in newer kernels |
| **Secure Boot** | Must disable in BIOS for Ubuntu driver updates | **Medium** — standard practice |
| **Fan/thermal management** | GMKtec custom Embedded Controller — may need custom scripts | **Medium** — manageable |
| **Keyboard at boot** | Bluetooth keyboards don't work in BIOS; use USB receiver or wired | **Low** — easily worked around |

**BIOS requirements for Ubuntu:**
- Disable Secure Boot (prevents driver update boot failures)
- Set boot order: Network/USB → NVMe
- Keyboard: USB receiver-based or wired for initial setup

### 🔧 Installation Notes

From user `bdurham.dev` (Ollama + Open-WebUI setup):
```bash
# Basic Ubuntu setup
sudo apt update && sudo apt upgrade
sudo apt install curl build-essential

# ROCm (AMD GPU compute)
wget https://repo.radeon.com/amdgpu-install/7.1/ubuntu/noble/amdgpu-install_7.1.70100-1_all.deb
sudo apt install ./amdgpu-install_7.1.70100-1_all.deb
sudo apt update
sudo apt install rocm
sudo usermod -a -G render,video $LOGNAME

# Ollama
curl -fsSL https://ollama.com/install.sh | sh
sudo systemctl enable ollama --now

# Open-WebUI (optional front-end)
pip install open-webui
```

---

## Memory Management: Ubuntu vs Windows

**Critical for AI workloads:**

| Aspect | Ubuntu | Windows |
|--------|--------|---------|
| **Idle RAM usage** | ~600-900 MB | ~4-6 GB |
| **GPU memory** | Direct kernel module management | WDDM virtualized (overhead) |
| **Cache behavior** | Immediately yields under pressure | Holds cache as "standby" |
| **Docker/Containers** | Native, direct GPU allocation | Hyper-V/WSL2 layer |
| **AI inference stability** | More stable for continuous operation | Prone to memory errors under rapid load/unload |

**Conclusion:** Linux is objectively better for this machine's purpose. Ken's Linux-first approach is correct.

---

## Ken-Specific Considerations

### ✅ Strengths
- **128GB unified memory** — run 70B models locally (future-proof for diploma)
- **ROCm support** — AMD's open GPU compute stack, Linux-first
- **Mini PC form factor** — compact, low power vs full desktop
- **GGMachines in Dublin** — physical store, can see before buying, return window
- **5-year investment** — specs will remain relevant until dedicated AI home PCs mainstream

### ⚠️ Risks
- **Price** — €3,299 is significant on disability budget (needs financial catch-up)
- **Fan/thermal scripts** — may need community tweaking for optimal Linux operation
- **Kernel regressions** — stay on LTS kernels (6.8 or 6.11) rather than bleeding edge
- **Not immediate need** — current Beelink + cloud (kimi) is functional for now

### 🎯 Recommended Config
- **128GB LPDDR5X / 2TB SSD** — the config Ken identified
- Ubuntu 24.04 LTS or 26.04 LTS (when released) — avoid interim releases for stability
- ROCm latest stable — not bleeding edge
- Ollama + Open-WebUI — matches current workflow

---

## Community Resources

| Resource | URL | What It's For |
|----------|-----|---------------|
| Ubuntu install guide | https://betelgeuse.work/ubuntu-gmktec-evo-x2/ | Step-by-step BIOS, PXE boot, memory management |
| Ollama setup on EVO-X2 | https://docs.bdurham.dev/r-and-d/gmktec-evo-x-2-ai-mini-pc-++-ubuntu-25.10 | ROCm, Ollama, Open-WebUI commands |
| Tom's Hardware review | https://www.tomshardware.com/desktops/mini-pcs/gmktec-evo-x2-ai-mini-pc-review | Hardware review, gaming performance |
| NotebookCheck specs | https://www.notebookcheck.net/AMD-Ryzen-AI-Max-395-Processor-Benchmarks-and-Specs.942323.0.html | Detailed CPU/GPU benchmarks |
| AMD official blog | https://www.amd.com/en/blogs/2025/amd-ryzen-ai-max-395-processor-breakthrough-ai-.html | AMD's own performance claims |
| AMD AI performance article | https://www.amd.com/en/developer/resources/technical-articles/2025/amd-ryzen-ai-max-395--a-leap-forward-in-generative-ai-performanc.html | Generative AI benchmarks |
| GGMachines Dublin | https://www.ggmachines.ie/product-page/mini-pc-gmktec-evo-x2-amd-ryzen-ai-max-395-128gb-ram-2tb-ssd-win-11-pro | Local purchase option |
| Proxmox GPU sharing | https://forum.proxmox.com/threads/any-success-with-gmktec-evo-x2-lxc-gpu-sharing.168381/ | Virtualization use cases |
| ROCM Thunderbolt plugin | https://github.com/Geramy/OdinLink-Five/issues/6 | Multi-GPU networking |

---

## Bottom Line

The EVO-X2 is **the right machine for Ken's goals** — but timing matters.

**Buy when:**
- [ ] Level 6 results confirmed
- [ ] CCT place formally accepted
- [ ] Financial catch-up complete (disability + part-time income stable)
- [ ] Can visit GGMachines in Dublin for physical inspection

**Don't rush:** Current setup (Beelink + cloud kimi) handles immediate needs. The EVO-X2 is a 4-5 year investment for the diploma and beyond.

---

*Research compiled by Karen on 2026-04-23*
*Sources: Tom's Hardware, NotebookCheck, AMD official, user guides, retailer listings*
