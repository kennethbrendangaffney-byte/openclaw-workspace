#!/usr/bin/env python3
"""
Voice Bridge Helper - Send messages to Discord via OpenClaw
"""
import sys
import os

# Add OpenClaw to path
sys.path.insert(0, '/usr/lib/node_modules/openclaw')

def send_to_discord(text):
    """Send a message to the Discord channel using OpenClaw CLI"""
    import subprocess
    
    message = f"🎤 Ken (Voice): {text}"
    
    # Use subprocess to call openclaw
    result = subprocess.run(
        ['openclaw', 'message', 'send', 
         '--channel', 'discord',
         '--target', 'channel:1498801547214065876',
         '--message', message],
        capture_output=True,
        text=True,
        timeout=30,
        cwd='/home/karen/.openclaw/workspace'
    )
    
    print(f"Return code: {result.returncode}")
    print(f"Stdout: {result.stdout}")
    print(f"Stderr: {result.stderr}")
    
    return result.returncode == 0

if __name__ == '__main__':
    if len(sys.argv) > 1:
        text = ' '.join(sys.argv[1:])
        success = send_to_discord(text)
        print(f"Success: {success}")
    else:
        print("Usage: voice-bridge-helper.py <message>")
