# Portfolio Website — DEPLOY Work Order Status

**Last updated:** 2026-08-05

**Line index:** [`README.md`](README.md)

## State Definitions

| State | Meaning |
| --- | --- |
| `BLOCKED` | Do not dispatch; a prerequisite, owner input, or release decision is missing. |
| `READY` | Prerequisites and inputs are present; the order may be assigned. |
| `IMPLEMENTING` | One named worker owns the order on a named branch/worktree. |
| `REVIEW` | Implementation is handed off; acceptance has not been independently confirmed. |
| `DONE` | Required evidence and acceptance checks were confirmed. |
| `CANCELLED` | The owner removed the order from scope and recorded why. |

## Line Gate

The staging line is open. DEPLOY-01 may be dispatched after the coordinator
confirms no active VIZ worker is editing its overlapping layout/i18n files.

Production is closed. DEPLOY-01 through DEPLOY-03 must not create
`.github/workflows/deploy-production.yml`, call `firebase deploy --only hosting`,
clone anything to `live`, configure a production GitHub environment, or attach a
custom production domain.

DEPLOY-04 does not become ready automatically. It requires all of:

1. DEPLOY-03 `DONE`;
2. [`../viz/VIZ-006-release-review.md`](../viz/VIZ-006-release-review.md) records
   `GO` for a frozen commit;
3. every release-blocking finding in the active WO/VIZ status boards is closed
   or explicitly waived by the owner;
4. the owner records explicit production approval here with the exact commit to
   release.

## Current State

| DEPLOY | State | Prerequisites | Owner | Branch/commit | Evidence or blocker |
| --- | --- | --- | --- | --- | --- |
| [DEPLOY-01](DEPLOY-01-next-static-export-compatibility.md) | `READY` | Current repository inspected; overlapping VIZ orders are not `IMPLEMENTING` | Unassigned | — | Next 16 static-export incompatibilities are identified; dispatch must preserve the committed Firebase dependency baseline and coordinate VIZ-owned files. |
| [DEPLOY-02](DEPLOY-02-firebase-staging-repository-workflow.md) | `BLOCKED` | DEPLOY-01 `DONE` | Unassigned | — | Awaiting a verified static `out/` build contract. Commit `4465540a` added `firebase-tools` and its pnpm lock/allow-build changes; this order validates and reconciles that baseline instead of reinstalling blindly. |
| [DEPLOY-03](DEPLOY-03-oidc-infrastructure-staging-validation.md) | `BLOCKED` | DEPLOY-02 `DONE`; owner supplies Firebase project/site identifiers and authorizes Google/GitHub administration | Unassigned | — | No project ID, Hosting site ID, WIF provider, service-account email, or repository environment variables have been confirmed. |
| [DEPLOY-04](DEPLOY-04-production-release-enablement.md) | `BLOCKED` | DEPLOY-03 `DONE`; VIZ-006 `GO`; release blockers closed/waived; explicit owner approval for named commit | Unassigned | — | Production is intentionally disabled. Current VIZ status has VIZ-003/VIZ-005 in `REVIEW`, VIZ-004 `BLOCKED`, and VIZ-006 `BLOCKED`. |

## Dispatch Record

| Date | Work Order | Owner | Branch/worktree | Scope note |
| --- | --- | --- | --- | --- |
| — | — | — | — | No DEPLOY order dispatched yet. |

## Gate Log

| Date | Gate | Verdict | Evidence | Next action |
| --- | --- | --- | --- | --- |
| 2026-08-05 | DEPLOY line created | `STAGING OPEN / PRODUCTION CLOSED` | Repository inspection confirmed Next.js 16, normal `next build`/`next start` review requirements, request-time locale middleware/headers, CI on `development`, existing `staging`/`main` branches, and Firebase CLI dependency commit `4465540a`. The source strategy's Vite `dist/` and SPA rewrite assumptions do not match the repository. | Dispatch DEPLOY-01 only after checking for an overlapping active VIZ worker. |

## Status Update Procedure

### Dispatch

1. Confirm every prerequisite from the Current State row.
2. Confirm the intended worker has an isolated branch/worktree and no file-owner
   collision.
3. Change only that row from `READY` to `IMPLEMENTING`.
4. Add a Dispatch Record row with owner, branch/worktree, and exact scope.

### Handoff

1. Record commit, commands, generated-output checks, browser/cloud evidence, and
   any external-state changes.
2. Change `IMPLEMENTING` to `REVIEW`; do not self-approve `DONE`.

### Acceptance

1. Independently confirm every acceptance checkbox.
2. Change `REVIEW` to `DONE` and add a Gate Log row.
3. Re-evaluate direct dependents. DEPLOY-04 remains `BLOCKED` unless the owner
   approval condition is independently satisfied.

### Blocker

Record the exact missing file, identifier, permission, failed command, or owner
decision. Do not use “waiting” or “cloud setup incomplete” without the concrete
missing input.
