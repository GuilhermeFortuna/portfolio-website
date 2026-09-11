#!/usr/bin/env bash
# Unified CI script for local verification and remote CI pipeline.
# Replicates the quality gates executed in .github/workflows/ci.yml:
#   1. Install dependencies (frozen lockfile)
#   2. Lint
#   3. Typecheck
#   4. Test
#   5. Build
#
# Usage:
#   ./ci.sh                   # Run full CI suite
#   ./ci.sh --skip-install    # Skip pnpm install (faster local runs)
#   ./ci.sh --skip-build      # Skip static production build
#   ./ci.sh --help            # Display usage instructions

set -euo pipefail

# Navigate to repository root regardless of where script is invoked from
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

# Configuration options
RUN_INSTALL=true
RUN_BUILD=true

# Parse command line options
for arg in "$@"; do
  case "$arg" in
    --) ;;
    --skip-install|--no-install)
      RUN_INSTALL=false
      ;;
    --install)
      RUN_INSTALL=true
      ;;
    --skip-build|--no-build)
      RUN_BUILD=false
      ;;
    -h|--help)
      echo "Usage: ./ci.sh [options]"
      echo ""
      echo "Runs the unified CI quality checks locally and in GitHub Actions."
      echo ""
      echo "Options:"
      echo "  --skip-install, --no-install  Skip 'pnpm install --frozen-lockfile'"
      echo "  --skip-build, --no-build      Skip 'pnpm build'"
      echo "  --install                     Explicitly run install step (default)"
      echo "  -h, --help                    Show this help message"
      exit 0
      ;;
    *)
      echo "Error: Unknown option '$arg'" >&2
      echo "Run './ci.sh --help' for usage." >&2
      exit 1
      ;;
  esac
done

# Check prerequisites
if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: 'pnpm' is required but not installed or not in PATH." >&2
  echo "See https://pnpm.io/installation for installation instructions." >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Error: 'node' is required but not installed or not in PATH." >&2
  exit 1
fi

# Color formatting if terminal supports it and NO_COLOR is not set
if [[ -t 1 && -z "${NO_COLOR:-}" ]] || [[ -n "${GITHUB_ACTIONS:-}" ]]; then
  BOLD="\033[1m"
  GREEN="\033[32m"
  RED="\033[31m"
  BLUE="\033[34m"
  CYAN="\033[36m"
  RESET="\033[0m"
else
  BOLD=""
  GREEN=""
  RED=""
  BLUE=""
  CYAN=""
  RESET=""
fi

# State tracking for reporting
TOTAL_START=$SECONDS
CURRENT_GROUP=""
STEP_START=0

# Trap handler ensuring clean exit and closing any open GitHub Actions log groups
on_exit() {
  local exit_code=$?
  if [[ -n "$CURRENT_GROUP" && -n "${GITHUB_ACTIONS:-}" ]]; then
    echo "::endgroup::"
  fi
  if [[ $exit_code -ne 0 ]]; then
    local elapsed=$(( SECONDS - STEP_START ))
    echo "" >&2
    printf "${RED}${BOLD}❌ CI flow failed at step: %s (after %ds, exit code %d)${RESET}\n" "${CURRENT_GROUP:-unknown}" "$elapsed" "$exit_code" >&2
  fi
}
trap on_exit EXIT

# Step execution helper
run_step() {
  local title="$1"
  shift

  CURRENT_GROUP="$title"
  STEP_START=$SECONDS

  if [[ -n "${GITHUB_ACTIONS:-}" ]]; then
    echo "::group::$title"
  else
    printf "\n${BOLD}${BLUE}==> %s${RESET}\n" "$title"
  fi

  "$@"

  local elapsed=$(( SECONDS - STEP_START ))

  if [[ -n "${GITHUB_ACTIONS:-}" ]]; then
    echo "::endgroup::"
  fi

  printf "${GREEN}✓ %s completed in %ds${RESET}\n" "$title" "$elapsed"
  CURRENT_GROUP=""
}

# Plan total steps
TOTAL_STEPS=5
if [[ "$RUN_INSTALL" != true ]]; then
  TOTAL_STEPS=$(( TOTAL_STEPS - 1 ))
fi
if [[ "$RUN_BUILD" != true ]]; then
  TOTAL_STEPS=$(( TOTAL_STEPS - 1 ))
fi

STEP_NUM=1

printf "${BOLD}${CYAN}Starting CI quality checks (steps: %d)...${RESET}\n" "$TOTAL_STEPS"

# Step 1: Install dependencies
if [[ "$RUN_INSTALL" == true ]]; then
  run_step "[$STEP_NUM/$TOTAL_STEPS] Install dependencies (pnpm install --frozen-lockfile)" \
    pnpm install --frozen-lockfile
  STEP_NUM=$(( STEP_NUM + 1 ))
fi

# Step 2: Lint
run_step "[$STEP_NUM/$TOTAL_STEPS] Lint (pnpm lint)" \
  pnpm lint
STEP_NUM=$(( STEP_NUM + 1 ))

# Step 3: Typecheck
run_step "[$STEP_NUM/$TOTAL_STEPS] Typecheck (pnpm typecheck)" \
  pnpm typecheck
STEP_NUM=$(( STEP_NUM + 1 ))

# Step 4: Test
run_step "[$STEP_NUM/$TOTAL_STEPS] Test (pnpm test)" \
  pnpm test
STEP_NUM=$(( STEP_NUM + 1 ))

# Step 5: Build
if [[ "$RUN_BUILD" == true ]]; then
  run_step "[$STEP_NUM/$TOTAL_STEPS] Build (pnpm build)" \
    pnpm build
fi

TOTAL_ELAPSED=$(( SECONDS - TOTAL_START ))

echo ""
printf "${GREEN}${BOLD}✓ All CI quality checks passed in %ds.${RESET}\n" "$TOTAL_ELAPSED"
