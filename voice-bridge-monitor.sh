#!/bin/bash
# Voice Bridge Monitor - Watches for voice messages and sends to Discord

BRIDGE_FILE="/home/karen/.openclaw/workspace/voice-bridge-inbox.txt"
LOG_FILE="/tmp/voice-bridge-monitor.log"

while true; do
    if [ -s "$BRIDGE_FILE" ]; then
        echo "[$(date)] Found messages in bridge inbox" >> "$LOG_FILE"
        
        # Read and send each line
        while IFS= read -r line; do
            if [ -n "$line" ]; then
                # Extract the message text (after the timestamp)
                message=$(echo "$line" | sed 's/^\[[^]]*\] //')
                
                # Send to Discord using openclaw
                echo "[$(date)] Sending: $message" >> "$LOG_FILE"
                
                # Use curl to post to webhook or use openclaw CLI
                # For now, just log it - we'll implement Discord sending
                echo "[$(date)] Would send to Discord: $message" >> "$LOG_FILE"
            fi
        done < "$BRIDGE_FILE"
        
        # Clear the file
        > "$BRIDGE_FILE"
        echo "[$(date)] Cleared bridge inbox" >> "$LOG_FILE"
    fi
    
    # Check every 5 seconds
    sleep 5
done
