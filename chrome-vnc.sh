#!/bin/bash
# Chrome launcher for virtual display (DISPLAY :99)
# Forces X11 ozone platform for Xvfb compatibility

export DISPLAY=:99
export XAUTHORITY=/tmp/.Xauthority-99

/opt/google/chrome/google-chrome \
  --no-sandbox \
  --disable-gpu \
  --ozone-platform=x11 \
  --disable-software-rasterizer \
  --disable-dev-shm-usage \
  --window-size=1200,800 \
  "$@"
