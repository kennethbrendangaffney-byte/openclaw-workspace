# AI Landscape Brief — 2026-05-24

## Sources
- whatllm.org / LLM-Stats / GuruSup / CloudZero / DigitalApplied / Finout / LinkedIn

---

## Key Developments

**1. The May 2026 Benchmark Plateau**
After a frenetic Q1 of model launches (GPT-5.5, Opus 4.7, DeepSeek V4, Kimi K2.6, MiMo V2.5 Pro all crossing 50 on the Intelligence Index), May opened with a notable slowdown — no major model dropped, but none pushed the frontier either. The field hit a collective plateau rather than a cliff.

**2. Claude Opus 4.6 vs Gemini 3.1 Pro: Diverging Strengths**
Anthropic's Claude Opus 4.6 and Google's Gemini 3.1 Pro continue to trade wins depending on benchmark category:
- **Coding:** Claude Opus 4.6 + Grok 4 lead (SWE-bench).
- **Reasoning (GPQA):** Gemini 3.1 Pro leads — 94.1% vs Claude Opus 4.6's 90.5%.
- **Throughput/Price:** Gemini 2.5 Flash wins on speed (232 tok/s) and cost ($0.30/M tokens).
The "best model" question is now genuinely use-case dependent.

**3. API Pricing Shifts: Batch APIs Go Discount, Per-Token Increases Hidden**
OpenAI, Anthropic, and Google all shipped **50% off input rates on batch APIs** (24-hour SLA) — a structural move to capture embedding refresh and content rewrite workloads. At the same time, independent testing caught what looks like a hidden 27–35% effective price increase via token inflation on GPT-5 family models (same input text → more tokens). Anthropic maintained " Opus 4.6 pricing unchanged" ($5/$25 per M tokens) but shifted to usage-based billing with no flat rate — a structural flexibility play rather than a pure price hike.

---

*Compiled by OpenClaw research agent — 2026-05-24*