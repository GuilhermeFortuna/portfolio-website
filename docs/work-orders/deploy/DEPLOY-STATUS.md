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
| [DEPLOY-01](DEPLOY-01-next-static-export-compatibility.md) | `REVIEW` | Current repository inspected; overlapping VIZ orders are not `IMPLEMENTING` | Cursor Auto | `deploy/01-static-export-compatibility` @ `7fd6f3a6` | Handoff in Gate Log. Awaiting independent acceptance. Do not self-mark `DONE`. |
| [DEPLOY-02](DEPLOY-02-firebase-staging-repository-workflow.md) | `BLOCKED` | DEPLOY-01 `DONE` | Unassigned | — | Awaiting a verified static `out/` build contract. Commit `4465540a` added `firebase-tools` and its pnpm lock/allow-build changes; this order validates and reconciles that baseline instead of reinstalling blindly. |
| [DEPLOY-03](DEPLOY-03-oidc-infrastructure-staging-validation.md) | `BLOCKED` | DEPLOY-02 `DONE`; owner supplies Firebase project/site identifiers and authorizes Google/GitHub administration | Unassigned | — | No project ID, Hosting site ID, WIF provider, service-account email, or repository environment variables have been confirmed. |
| [DEPLOY-04](DEPLOY-04-production-release-enablement.md) | `BLOCKED` | DEPLOY-03 `DONE`; VIZ-006 `GO`; release blockers closed/waived; explicit owner approval for named commit | Unassigned | — | Production is intentionally disabled. Current VIZ status has VIZ-003/VIZ-005 in `REVIEW`, VIZ-004 `BLOCKED`, and VIZ-006 `BLOCKED`. |

## Dispatch Record

| Date | Work Order | Owner | Branch/worktree | Scope note |
| --- | --- | --- | --- | --- |
| 2026-08-05 | DEPLOY-01 | Cursor Auto | `deploy/01-static-export-compatibility` | Static export compatibility: gated `NEXT_OUTPUT=export`, split root layouts, remove middleware/request-time locale APIs. |

## Gate Log

| Date | Gate | Verdict | Evidence | Next action |
| --- | --- | --- | --- | --- |
| 2026-08-05 | DEPLOY-01 implementation handoff | `REVIEW` | Implementation commit `7fd6f3a6` (`7fd6f3a696fa4b6e9f07f60a57161d3dce0413c2`) on `deploy/01-static-export-compatibility`. Gated `NEXT_OUTPUT=export` + `trailingSlash` only on export builds. Split root layouts `(en)` / `[lang]` via `RootDocument` (MotionRuntime → WebGLManager → LanguageProvider). Deleted `src/middleware.ts` and root `src/app/layout.tsx`; removed `localeHeader` and `NEXT_LOCALE` cookie. Staging `noindex,nofollow` + HTTPS `SITE_URL` required when `DEPLOY_ENV=staging|production`. `force-static` on robots/sitemap/icon/OG; `experimental.globalNotFound` + segment not-found pages. **Moved files:** `page.tsx` and `work/{aegis,q,gosigapp,nexo-dental}/page.tsx` → `src/app/(en)/...`; `icon.tsx`/`opengraph-image.tsx` → `(en)/`. Firebase `package.json`/`pnpm-lock.yaml` untouched. **Normal build routes:** `/`, `/work/{aegis,q,gosigapp,nexo-dental}`, `/pt-BR`, `/pt-BR/work/{aegis,q}`, robots, sitemap, icon, OG, `_not-found` (all static/SSG). **Export checks:** `out/index.html`, `out/404.html`, all EN work routes, `out/pt-BR/index.html`; `lang="pt-BR"` and `noindex` present; no `localhost:3000`/`x-locale`/`NEXT_LOCALE` in `out/`. **Automated:** `pnpm test` (202), lint, typecheck, both builds, `git diff --check` pass. **`next start` smoke (port 4011):** `/`, `/work/aegis`, `/pt-BR`, `/pt-BR/work/q` → 200 with correct `lang`; PT SSR contains Desenvolvedor/Trabalho/Contato/Processo/Sobre. **Static `out/` smoke:** same routes 200; no-JS PT document has `lang="pt-BR"`. | Independent reviewer confirms acceptance checklist; then mark `DONE` and unblock DEPLOY-02. |
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
