#!/bin/bash
# agent-status.sh — Lightweight status reporter for Karen (local)
# Adapt for Karen's local system — run every 15 minutes via cron or heartbeat
# Writes to ~/.openclaw/workspace/status/karen.json

STATUS_DIR="$HOME/.openclaw/workspace/status"
STATUS_FILE="$STATUS_DIR/karen.json"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

mkdir -p "$STATUS_DIR"

# Gather local system metrics (if available)
UPTIME=$(uptime -p 2>/dev/null || echo "unknown")
LOAD=$(cat /proc/loadavg 2>/dev/null | awk '{print $1" "$2" "$3}' || echo "unknown")
RAM=$(free -h 2>/dev/null | awk '/^Mem:/ {print $3"/"$2}' || echo "unknown")
DISK=$(df -h / 2>/dev/null | awk 'NR==2 {print $3"/"$2" ("$5")"}' || echo "unknown")
OLLAMA_STATUS=$(pgrep -x ollama > /dev/null 2>&1 && echo "running" || echo "stopped")
GATEWAY_STATUS=$(pgrep -f openclaw-gateway > /dev/null 2>&1 && echo "running" || echo "stopped")

# Build status JSON
cat > "$STATUS_FILE" <<EOF
{
  "agent": "karen",
  "platform": "local",
  "lastActive": "$TIMESTAMP",
  "currentTask": "local system maintenance",
  "errors": [],
  "system": {
    "uptime": "$UPTIME",
    "load": "$LOAD",
    "ram": "$RAM",
    "disk": "$DISK",
    "ollama": "$OLLAMA_STATUS",
    "gateway": "$GATEWAY_STATUS"
  },
  "notes": "Local agent on Beelink EQ mini PC"
}
EOF

echo "Status written: $STATUS_FILE"
