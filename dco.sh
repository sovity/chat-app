#!/usr/bin/env bash

set -eo pipefail
set -x

# Short hand for this split up docker compose
docker compose \
  -f e2e-tests/docker-compose/edc-services.yaml \
  -f e2e-tests/docker-compose/chat-app-services.yaml \
  $@

