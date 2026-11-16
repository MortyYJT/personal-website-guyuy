#!/usr/bin/env bash
# Installed root-owned as /usr/local/sbin/mortyyjt-likes-deploy.
# The deploy key's forced command passes SSH_ORIGINAL_COMMAND as ONE argument.
set -euo pipefail
if [[ $# != 1 || ! $1 =~ ^deploy-likes\ ([a-f0-9]{40})$ ]]; then
  echo 'Only deploy-likes <commit-sha> is allowed' >&2
  exit 64
fi
revision=${BASH_REMATCH[1]}
cd /etc/mortyyjt-likes
exec 9>/run/lock/mortyyjt-likes-deploy.lock
flock -n 9 || { echo 'Deployment already running' >&2; exit 75; }
# Accept a built image on stdin; the key cannot open a shell, alter Compose,
# choose host mounts or overwrite the static site's upload directory.
timeout 180 bash -o pipefail -c 'gzip -dc | docker image load'
docker image inspect "mortyyjt-likes:$revision" >/dev/null
previous=$(cat .env 2>/dev/null || true)
printf 'LIKES_VERSION=%s\n' "$revision" > .env
if ! docker compose -f compose.yaml up -d --wait --wait-timeout 60 --no-build; then
  if [[ -n $previous ]]; then
    printf '%s\n' "$previous" > .env
    docker compose -f compose.yaml up -d --wait --wait-timeout 60 --no-build
  fi
  exit 1
fi
