#!/usr/bin/env bash
# Backward-compatibility wrapper delegating to root ./ci.sh
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec "$root/ci.sh" "$@"
