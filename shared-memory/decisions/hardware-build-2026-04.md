# Desktop Build Spec — April 2026

**Status:** LOCKED IN ✅  
**Date decided:** 2026-04-25  
**Budget:** ~€2,395

## The Spec

| Component | Model | Price |
|-----------|-------|-------|
| CPU | AMD Ryzen 7 7700X | €220 |
| Motherboard | MSI MAG B650 Tomahawk WiFi | €190 |
| RAM | 128GB DDR5-5600 (4×32GB) | €700 |
| GPU | RTX 4070 Ti Super 16GB | €900 |
| SSD | 2TB NVMe | €130 |
| PSU | Corsair RM850e 850W | €90 |
| Case | Fractal Design Pop Air | €85 |
| Cooler | DeepCool AK620 | €55 |
| **Total** | | **~€2,395** |

## What We Rejected

- EVO-X2 (€3,299) — thermal issues (98.3°C), fan noise, BIOS limits
- SAPPHIRE EDGE AI (€2,459) — no CUDA, NPU marketing trap
- Used RTX 3090 — 6 years old, no warranty
- DDR4/AM4 platform — dead end

## Why 128GB RAM?

Ken's call: "Extra €350, 100% worth it." Future-proofs for:
- Large model hosting (70B+ with offloading)
- Dataset processing for training
- Running multiple services simultaneously

## Next Steps

1. Ken to purchase parts when funds available
2. Karen to assist with build/assembly
3. Migrate Karen from Beelink EQ to new rig
4. Ken's Windows Beelink stays for college coursework

## Research Needed

- Local LLM training pipelines (LoRA/QLoRA) — what frameworks work on this hardware?
- Ubuntu setup optimization for ML workloads
- Voice assistant stack (Piper TTS, Whisper STT)

---
*Source: Karen's MEMORY.md, 2026-04-25*
