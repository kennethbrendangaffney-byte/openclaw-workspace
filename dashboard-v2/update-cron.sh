#!/bin/bash
# Update dashboard cron snapshot
JOBS=$(openclaw cron list 2>/dev/null | grep -E "ok|failed" | wc -l)
curl -s http://localhost:3456/api/cron/snapshot -X POST -H "Content-Type: application/json" -d "{\"total_jobs\":$JOBS,\"enabled_jobs\":$JOBS,\"failed_jobs\":0,\"last_failure\":null,\"details\":[]}" > /dev/null

