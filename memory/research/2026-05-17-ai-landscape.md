# AI Landscape Brief — 2026-05-17

## Model Releases

- **GPT-5.5 Instant launched (May 5):** OpenAI released GPT-5.5 Instant as the new default ChatGPT model, marking a mid-cycle refresh with faster inference. Open-source models are also hitting frontier-level performance on coding benchmarks at a fraction of the cost, widening the value gap on closed models.
- **SubQ 1M-Preview debuts:** Subquadratic released a model with a 1-million token context window, pushing context length competition further. The focus now is shifting from raw benchmark scores to architecture-level efficiency gains.

## Benchmarks

- **Gemini 3 Pro Preview tops leaderboard at 91%:** Google's Gemini 3 Pro Preview scored 91.0% on the LLM leaderboard, ahead of GPT-5.2 xhigh (84.0%) and GPT-5.2 high (67.0%). On SWE-bench Verified, Claude Sonnet 4.6 leads at 82.1% vs Gemini 3's 63.8%.
- **All frontier models scored 0% on ProgramBench:** A new stress test for complex software rebuilding broke every model — GPT, Claude, and Gemini all scored zero, flagging a clear ceiling in multi-step engineering tasks.

## API & Pricing

- **Claude Opus 4.7 now $5/$25 per 1M tokens:** Anthropic's flagship sits at the premium end (vs GPT-5.4 at $2.50/$15). Reports confirm Anthropic raised effective costs in May despite no visible pricing page changes — costs went up ~27% through billing changes.
- **Google Gemini Flash remains cheapest at $0.15/M input:** Google's flash tier continues to offer the lowest cost entry point, making it dominant for high-volume, latency-tolerant workloads.