# Session Archive Report — 2026-05-01

## Today's Archive

| Metric | Value |
|--------|-------|
| **Archive** | `memory/archive/2026-05-01.tar.gz` |
| **Size** | 7.1 MB |
| **Files archived** | 57 |
| **Sessions captured** | ~11 unique sessions + checkpoints |
| **Lock files skipped** | 1 (active session lock) |

### Sessions Archived (May 1st)
- `08c80f43` — 06:31 (~108K)
- `18b76ace` — 07:37-07:56 (~1.4M with checkpoints)
- `3e80eeb3` — 07:02 (~292K)
- `a829c4d6` — 07:12 (~1.6M)
- `b6a06bd6` — 06:45 (~157K)
- `f7fb4e92` — 07:19-08:40 (~18M with 9 checkpoints — largest session)
- `d621a602` — 08:40 (~2.2M)
- `9bf02d5b` — 13:02 (~367K)
- `d0205bfb` — 11:09 (~486K)
- `898e2698` — 17:01 (~559K)
- `b232d506` — 22:00 (~103K)
- `ed85320a` — 23:00 (~84K)
- `0d62605e` — 23:10 (~4.2M)
- `1209af3a` — 23:30 (active — lock file skipped)

## Rolling Archive Status

| Date | Size | Notes |
|------|------|-------|
| 2026-04-19 | 328K | |
| 2026-04-24 | 62.7M | Heavy session day |
| 2026-04-27 | 51.5M | Heavy session day |
| 2026-04-29 | 3.2M | |
| 2026-05-01 | 7.1M | **Today** |

- **Total archive size:** 125 MB
- **Archive count:** 5 days
- **Date range:** Apr 19 → May 1
- **30-day window:** ✅ All within retention (nothing older than Apr 1)

## Source Storage

| Location | Size |
|----------|------|
| `~/.openclaw/agents/main/sessions/` | **705 MB** |
| `memory/archive/` | 125 MB (compressed) |

## Notes
- Active session `1209af3a` (current cron job) has a `.jsonl.lock` file — skipped to avoid corruption
- Compression ratio: ~57 files → 7.1MB (efficient — mostly text/JSONL)
- No cleanup needed yet; all archives within 30-day window
- Next cleanup check: Jun 1, 2026
