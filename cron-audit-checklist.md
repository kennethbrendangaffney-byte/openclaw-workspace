# Cron Job Audit Checklist for Karen
**Created:** May 10, 2026
**Purpose:** Fix broken delivery routes and document all cron jobs

---

## Step 1: List All Cron Jobs

```bash
openclaw cron list
```

**Expected:** 17 jobs total (per May 9 baseline)

---

## Step 2: Identify Broken Delivery Routes

**Known broken jobs (from May 9 report):**
- 3 research cron jobs route to `"last"` instead of Discord channel ID
- Need to check each job's `delivery.to` field

**What to look for:**
```json
{
  "delivery": {
    "mode": "announce",
    "to": "last"  // <-- BROKEN: should be channel ID like "1498801547214065876"
  }
}
```

**Fix for each broken job:**
```bash
openclaw cron update {jobId} --delivery.to="1498801547214065876"
```

---

## Step 3: Remove Placeholder Jobs

**Known placeholders (from May 9 report):**
- 2 disabled jobs with Feb 31 dates (invalid, should never run)

**Action:**
```bash
openclaw cron remove {jobId1}
openclaw cron remove {jobId2}
```

---

## Step 4: Document Each Job

For each remaining cron job, document:

| Job Name | Schedule | Purpose | Target Channel | Status |
|----------|----------|---------|----------------|--------|
| | | | | |

**Add to this file as you audit.**

---

## Step 5: Test Fixed Jobs

After fixing delivery routes:
1. Trigger each fixed job manually: `openclaw cron run {jobId}`
2. Verify output arrives in correct Discord channel
3. Check for timeout issues (github-backup had 300s timeout)

---

## Step 6: Fix Git Backup Timeout

**Issue:** `github-backup` timed out, leaving unpushed commits

**Options:**
- Increase timeout: `openclaw cron update {jobId} --timeout=600`
- Or reduce scope (exclude large files)
- Or add retry logic

---

## Current Audit Status

| Task | Status | Notes |
|------|--------|-------|
| List all jobs | ⬜ Pending | |
| Fix 3 broken routes | ⬜ Pending | Known issue from May 9 |
| Remove 2 placeholders | ⬜ Pending | Feb 31 dates |
| Document all jobs | ⬜ Pending | |
| Test fixed jobs | ⬜ Pending | |
| Fix git backup timeout | ⬜ Pending | |

---

*Karen: please fill in the table above as you complete each step.*
