#!/bin/sh

# Default PORT to 8080 if not set
PORT="${PORT:-8080}"

echo "Starting serve on port $PORT..."

# Use exec to replace the shell with the serve process
# This ensures signals (like SIGTERM) are received by the serve process
exec serve -s dist -l "$PORT"
