#!/usr/bin/env bash
# Local mirror of .github/workflows/ci.yml quality checks.
# Usage:
#   pnpm ci:local              # lint → typecheck → test → build
#   pnpm ci:local -- --install # also run pnpm install --frozen-lockfile first
#
# Note: do not name the package script "ci" — pnpm reserves `pnpm ci` for
# a clean frozen install (similar to npm ci).
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

run_install=false
for arg in "$@"; do
  case "$arg" in
    --) ;;
    --install) run_install=true ;;
    -h | --help)
      echo "Usage: pnpm ci:local [--install]"
      echo "  Runs the same quality gates as GitHub Actions CI."
      echo "  --install  Also run pnpm install --frozen-lockfile (matches CI)"
      exit 0
      ;;
    *)
      echo "Unknown option: $arg" >&2
      echo "Usage: pnpm ci:local [--install]" >&2
      exit 1
      ;;
  esac
done

step() {
  echo ""
  echo "==> $*"
}

if [[ "$run_install" == true ]]; then
  step "Install dependencies (frozen lockfile)"
  pnpm install --frozen-lockfile
fi

step "Lint"
pnpm lint

step "Typecheck"
pnpm typecheck

step "Test"
pnpm test

step "Build"
pnpm build

echo ""
echo "CI checks passed."
