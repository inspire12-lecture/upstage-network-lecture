#!/bin/bash

set -e

echo "Stopping existing processes..."
if [ -f app.pid ]; then
  PID=$(cat app.pid)
  if ps -p $PID > /dev/null; then
    echo "Stopping process $PID"
    kill $PID
  fi
  rm -f app.pid
else
  echo "No PID file found"
fi
