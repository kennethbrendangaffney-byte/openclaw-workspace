#!/bin/bash
# Start Karen's wake word listener in the background

LOG_FILE="/tmp/karen-wake-word.log"
PID_FILE="/tmp/karen-wake-word.pid"

case "$1" in
    start)
        if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
            echo "Karen wake word listener is already running (pid: $(cat $PID_FILE))"
            exit 0
        fi
        
        echo "Starting Karen wake word listener..."
        cd ~/.openclaw/workspace
        nohup python3 -u wake-word-opensource.py > "$LOG_FILE" 2>&1 &
        echo $! > "$PID_FILE"
        echo "Started (pid: $!). Log: $LOG_FILE"
        sleep 2
        echo "Status:"
        tail -5 "$LOG_FILE"
        ;;
    
    stop)
        if [ -f "$PID_FILE" ]; then
            PID=$(cat "$PID_FILE")
            if kill -0 "$PID" 2>/dev/null; then
                echo "Stopping Karen wake word listener (pid: $PID)..."
                kill "$PID"
                rm -f "$PID_FILE"
                echo "Stopped."
            else
                echo "Karen wake word listener is not running."
                rm -f "$PID_FILE"
            fi
        else
            echo "Karen wake word listener is not running."
        fi
        ;;
    
    status)
        if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
            echo "Karen wake word listener is running (pid: $(cat $PID_FILE))"
            echo "Recent log:"
            tail -10 "$LOG_FILE"
        else
            echo "Karen wake word listener is not running."
        fi
        ;;
    
    log)
        if [ -f "$LOG_FILE" ]; then
            tail -f "$LOG_FILE"
        else
            echo "No log file found."
        fi
        ;;
    
    *)
        echo "Usage: $0 {start|stop|status|log}"
        echo ""
        echo "  start  - Start the wake word listener"
        echo "  stop   - Stop the wake word listener"
        echo "  status - Check if running and show recent log"
        echo "  log    - Follow the log file"
        exit 1
        ;;
esac
