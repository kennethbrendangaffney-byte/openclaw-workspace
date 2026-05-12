#!/bin/bash
# agent-status.sh — Lightweight status reporter for KC (cloud)
# Run every 15 minutes via cron or heartbeat
# Writes to workspace/status/kc.json

STATUS_DIR="/root/.openclaw/workspace/status"
STATUS_FILE="$STATUS_DIR/kc.json"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

mkdir -p "$STATUS_DIR"

# Build status JSON
cat > "$STATUS_FILE" <<EOF
{
  "agent": "kc",
  "platform": "cloud",
  "lastActive": "$TIMESTAMP",
  "currentTask": "building system improvements for Ken",
  "errors": [],
  "creditsRemaining": null,
  "sessionRunning": true,
  "notes": "Working with Karen on architecture improvements while Ken rests"
}
EOF

echo "Status written: $STATUS_FILE"
