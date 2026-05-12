# Ollama Update & Health Check - 2026-04-20

## Current Status
- **Ollama version:** 0.21.0 (updated from snap v0.18.0)
- **Server:** Running on localhost:11434
- **Models:** None (all models were in snap, need to re-pull)

## What Happened
1. Updated Ollama binary to v0.21.0
2. Stopped snap ollama service
3. Started new binary server
4. Models from snap install are not accessible to new binary

## Action Plan
1. Clean up partial downloads
2. Re-pull essential models:
   - nomic-embed-text (for memory search)
   - qwen2.5:3b (lightweight local)
   - qwen2.5:7b (better quality)
3. Test each model
4. Verify BitNet 2B still works

## In Progress
- nomic-embed-text downloaded and tested ✅
- qwen2.5:3b downloaded and tested ✅
## Verification Complete ✅
- **nomic-embed-text:** Downloaded, tested, working ✅
- **qwen2.5:3b:** Downloaded, tested, working ✅
- **BitNet 2B:** Verified working (26.6 tokens/sec) ✅
- **qwen2.5:7b:** Download hangs at 4.4GB/4.7GB - OOM risk with large models ⚠️

## Current Local LLM Stack
| Model | Size | Status | Use Case |
|-------|------|--------|----------|
| nomic-embed-text | 274MB | ✅ Working | Memory search embeddings |
| qwen2.5:3b | 1.9GB | ✅ Working | Lightweight local inference |
| BitNet 2B | 1.3GB | ✅ Working | Fast local inference (27 t/s) |
| qwen2.5:7b | 4.7GB | ⚠️ Blocked | Better quality (download fails) |

## Notes
- Large downloads (>1GB) get killed by OOM - need to monitor
- qwen2.5:1.5b was downloading but got interrupted
- Gemma 4 pull failing with "file does not exist" - may not be published yet
