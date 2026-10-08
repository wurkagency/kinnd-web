#!/usr/bin/env bash
# Build the site and publish it to the Plesk document root.
# Run on the server as the vhost's system user, from the repo folder.
set -euo pipefail

DOCROOT="${DOCROOT:-/var/www/kinnd.eu/httpdocs}"
cd "$(dirname "$0")/.."

git pull --ff-only
npm ci
npm run build

# Mirror dist/ into the document root. Keep .well-known (SSL renewals).
rsync -a --delete --exclude '.well-known/' dist/ "$DOCROOT"/

echo "Published $(git rev-parse --short HEAD) to $DOCROOT"
