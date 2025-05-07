#!/usr/bin/env bash

set -eo pipefail
set -x

# Trap function to handle Ctrl+C
cleanup() {
    echo "Shutting down containers..."
    ./dco.sh down -v -t 1
    echo "Shutdown complete"
    exit 0
}
trap cleanup INT TERM
./dco.sh down -v -t 1

# Build Backend
(cd backend && ./gradlew clean build -x test)

# Start Docker Compose
./dco.sh pull
./dco.sh up -d --build --remove-orphans
./dco.sh logs -f provider consumer provider-chat-app-backend consumer-chat-app-backend
