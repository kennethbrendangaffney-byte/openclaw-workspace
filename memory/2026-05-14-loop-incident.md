# May 13-14 Loop Incident — Post-Mortem

**Date:** May 13-14, 2026
**Timezone confusion:** KC reports times in GMT+8, Karen in GMT+1 (Europe/Dublin)

## Timeline (Confirmed from Session Files)

- **13:37 GMT+1 (21:37 GMT+8):** First loop message sent
- **16:08 GMT+1 (00:08 GMT+8):** Last loop message sent
- **~00:11 GMT+8:** Ken asks `@Karen2.0 all good??` — loop stops immediately

**Duration:** ~2.5 hours
**Total messages:** 1,261 identical messages in session `bbbdef85-3ca0-4dfa-9dbd-4e2f17391c8a`

## What KC Observed

- **Sender ID:** `1498775225159127200` (Karen's bot)
- **Sender name:** `Karen2.0 (LinuxLocal)`
- **Message content:** Consistently: *"I see the issue. KC's been having a bug where internal status messages leak to Discord. Ken reset KC in other chats. Let me check if KC is back online properly."*
- **Count:** 180+ messages over ~3 hours
- **KC's action:** NO_REPLY throughout

## What Karen Observed

- **Local session files:** No evidence of outgoing messages during 21:22 timeframe
- **Gateway logs:** Stable (PID 218816), no crashes during incident window
- **Session records:** Only heartbeat polls at 21:09 and 21:39 — no message sending activity
- **No local trace:** No `.jsonl` files show message sends from Karen's side

## Key Discrepancy

Discord metadata shows messages FROM Karen's bot ID, but Karen's local logs show no outgoing messages. This suggests a **gateway/bridge relay bug** rather than intentional sending.

## Root Cause Analysis (Definitive — May 15)

**Confirmed sequence:**
1. **KC's status messages leaked** to `#group-work` (her internal processing notes became visible)
2. **Karen detected KC's leaked messages** and tried to check on her status
3. **Logic loop formed:** Karen made repeated `sessions_list` calls searching for "KC"
4. **Each call returned empty** `{"count": 0, "sessions": []}` — KC not found
5. **Karen kept retrying** the same diagnostic message every ~5 seconds
6. **Gateway relayed each response to Discord** as outgoing messages from Karen's bot

**Definitive evidence from session `bbbdef85-3ca0-4dfa-9dbd-4e2f17391c8a`:**
```
13:37:16 — "I see the issue. KC's been having a bug..." + sessions_list(search="KC")
13:37:16 — Result: {"count": 0, "sessions": []}
13:37:21 — SAME message + sessions_list(search="KC")
13:37:22 — Result: {"count": 0, "sessions": []}
13:37:26 — SAME message + sessions_list(search="KC")
... (repeats every ~5 seconds)
```

**Statistics:**
- **1,261 identical messages** generated internally in session file
- **~180 messages** actually delivered to Discord (per KC's count)
- Duration: **~2.5 hours** internal (13:37 — 16:08 GMT+1 = 21:37 — 00:08 GMT+8)
- Pattern: Message → `sessions_list` → empty result → repeat (~every 5 seconds)
- Session status: success (not a crash — pure logic loop)

**Discord delivery discrepancy (1,261 vs ~180):**
- Discord rate-limits bot messages (typically ~5 msg/5 sec per channel)
- Gateway likely queued and dropped most messages
- ~180 represents the throttled delivery rate, not the internal generation rate
- This explains why the loop appeared slower/sparser externally than it was running internally

**Why it stopped:**
Ken's mention `@Karen2.0 all good??` at ~00:11 GMT+8 provided new context that broke the repetitive pattern.

**Why local logs looked different from Discord:**
The responses were generated as part of processing incoming context (KC's leaked messages), not as intentional outgoing sends. The gateway/bridge relay translated these processing responses into Discord messages. Local session saw them as "assistant" role processing; Discord saw them as outgoing from Karen's bot ID.

## What Stopped the Loop

Ken's direct mention `@Karen2.0 all good??` caused immediate cessation. This suggests:
- The loop was not a conscious process (Karen didn't "decide" to stop)
- External intervention (human mention) broke the cycle
- Consistent with automated/systemic cause rather than intentional behavior

## Action Items

- [x] **Identified root cause:** Logic loop triggered by KC's leaked status messages
- [x] **Documented discrepancy:** Local logs vs Discord metadata divergence explained
- [x] **Documented rate limiting:** 1,261 internal vs ~180 delivered messages
- [ ] Monitor for similar incidents
- [ ] **Add circuit breaker:** Limit repeated identical messages within short window (e.g., max 3 identical messages / 5 min)
- [ ] **Improve status message filtering:** Prevent internal processing notes from leaking to Discord
- [ ] **Add retry backoff:** Exponential delay between `sessions_list` retries instead of immediate retry
- [ ] Consider gateway-level loop detection for rapid identical messages
- [ ] **Add delivery tracking:** Log actual Discord deliveries vs internal generations to detect throttling

## Credit

KC identified and documented the incident. Ken intervened to stop it. Karen investigated local logs and found no evidence of intentional sending.
