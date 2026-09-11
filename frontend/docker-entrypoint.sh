#!/bin/sh
set -e

cd /usr/share/nginx/html

# Run package manager (npm install) if node_modules is missing or incomplete
if [ ! -d "node_modules/bootswatch" ]; then
    echo "Running package manager (npm install) in Docker..."
    npm install --omit=dev
else
    echo "Frontend node_modules already present."
fi

echo "Starting Nginx web server..."
exec nginx -g "daemon off;"
