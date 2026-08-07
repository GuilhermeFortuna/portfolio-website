# Portfolio Website — DEPLOY Work Order Status

**Last updated:** 2026-08-07

**Line index:** `[README.md](README.md)`

## State Definitions


| State          | Meaning                                                                        |
| -------------- | ------------------------------------------------------------------------------ |
| `BLOCKED`      | Do not dispatch; a prerequisite, owner input, or release decision is missing.  |
| `READY`        | Prerequisites and inputs are present; the order may be assigned.               |
| `IMPLEMENTING` | One named worker owns the order on a named branch/worktree.                    |
| `REVIEW`       | Implementation is handed off; acceptance has not been independently confirmed. |
| `DONE`         | Required evidence and acceptance checks were confirmed.                        |
| `CANCELLED`    | The owner removed the order from scope and recorded why.                       |




## Line Gate

The staging line remains open for preview deploys. Production is open under the
owner waiver recorded in the Gate Log (2026-08-07): DEPLOY-03 need not be
`DONE` and VIZ-006 need not record `GO` before DEPLOY-04 proceeds.

Canonical production domain: `https://guilhermefortuna.dev`.



## Current State


| DEPLOY                                                           | State     | Prerequisites                                                                                                  | Owner       | Branch/commit                                        | Evidence or blocker                                                                                                                 |
| ---------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [DEPLOY-01](DEPLOY-01-next-static-export-compatibility.md)       | `DONE`    | Current repository inspected; overlapping VIZ orders are not `IMPLEMENTING`                                    | Cursor Auto | `deploy/01-static-export-compatibility` @ `7fd6f3a6` | Owner accepted; static export contract verified.                                                                                    |
| [DEPLOY-02](DEPLOY-02-firebase-staging-repository-workflow.md)   | `DONE`    | DEPLOY-01 `DONE`                                                                                               | Cursor Auto | `deploy/02-firebase-staging-repository-workflow`     | Handoff in Gate Log. Awaiting independent acceptance. Do not self-mark `DONE`. Production deployment remains absent.                |
| [DEPLOY-03](DEPLOY-03-oidc-infrastructure-staging-validation.md) | `REVIEW` | DEPLOY-02 `DONE`; owner supplies Firebase project/site identifiers and authorizes Google/GitHub administration | Cursor Auto | `deploy/03-oidc-infrastructure-staging-validation` @ `eeb90bfe` | Handoff in Gate Log. Staging preview active. Do not self-mark `DONE`. Production remains absent. |
| [DEPLOY-04](DEPLOY-04-production-release-enablement.md)          | `IMPLEMENTING` | Owner waived DEPLOY-03 `DONE` / VIZ-006 `GO`; explicit production approval for `guilhermefortuna.dev` | Cursor Auto | `deploy/04-production-ladder` → `development` (PR #4) | Climbing ladder: feature → development → staging → main. Direct-to-main PR #2 closed. Final release SHA recorded after merge to `main`. |




## Dispatch Record


| Date       | Work Order | Owner       | Branch/worktree                                  | Scope note                                                                                                               |
| ---------- | ---------- | ----------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 2026-08-05 | DEPLOY-01  | Cursor Auto | `deploy/01-static-export-compatibility`          | Static export compatibility: gated `NEXT_OUTPUT=export`, split root layouts, remove middleware/request-time locale APIs. |
| 2026-08-05 | DEPLOY-02  | Cursor Auto | `deploy/02-firebase-staging-repository-workflow` | Firebase Hosting config + manual OIDC staging preview deploy/destroy; no production workflow.                            |
| 2026-08-05 | DEPLOY-03  | Cursor Auto | `deploy/03-oidc-infrastructure-staging-validation` | OIDC/WIF + GitHub staging env + hosted staging channel validation; production remains forbidden.                       |
| 2026-08-07 | DEPLOY-04  | Cursor Auto | `deploy/04-production-ladder`                         | Production workflow via promotion ladder (development → staging → main). GitHub `production` env + domain `guilhermefortuna.dev`. Owner waived DEPLOY-03/VIZ-006 gates. |




## Gate Log


| Date       | Gate                             | Verdict                            | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Next action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | -------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-08-07 | DEPLOY-04 owner production approval | `APPROVED` | Owner waived DEPLOY-03 `DONE` and VIZ-006 `GO` prerequisites. Approved for production: domain `https://guilhermefortuna.dev` (apex canonical; `www` redirects to apex). DNS at Porkbun. Base tip at dispatch: `staging` @ `999f2709af17958080e403ec82de620086122bdc`. Final deployed SHA to be recorded after merge to `main`. Approver: Guilherme Fortuna. Date: 2026-08-07. | Complete DEPLOY-04 implementation; record exact merge SHA on `main` once deployed. |
| 2026-08-05 | DEPLOY-03 implementation handoff | `REVIEW`                           | Branch `deploy/03-oidc-infrastructure-staging-validation` @ `eeb90bfe` (also on `staging`). Project `portfolio-website-391bf`, site `portfolio-website-391bf`, billing `main` (`015154-CE69CB-912505`). WIF pool `github` / provider `portfolio-website`; SA `firebase-hosting-deployer@…` with only `firebasehosting.admin` + `serviceusage.apiKeysViewer` + scoped `workloadIdentityUser`. GitHub repo vars + env `staging` (`SITE_URL=https://portfolio-website-391bf.web.app`, branch policy `staging`). Budget R$10/mo alert. `.firebaserc` committed. Workflow on `main` + deployable tip on `staging`. **Runs:** deploy `31055394290` → destroy `31056750582` → redeploy `31056802902`. **Active preview:** `https://portfolio-website-391bf--staging-o2lwnops.web.app` expires `2026-08-06T23:35:50Z`; live has no release. Evidence: [`docs/deployment/staging-validation.md`](../../deployment/staging-validation.md). **Production deployment remains absent; DEPLOY-04 stays `BLOCKED`.** | Independent reviewer confirms acceptance checklist; then mark `DONE`. |
| 2026-08-05 | DEPLOY-02 implementation handoff | `REVIEW`                           | Branch `deploy/02-firebase-staging-repository-workflow`. Baseline `4465540a` (`firebase-tools@^15.25.1` + lock/allowBuilds); this order pinned `firebase-tools@15.25.1`, added `firebase` script, lockfile specifier-only reconcile. Created `firebase.json` (`public: out`, `trailingSlash: true`, `/en`→`/` and `/en/:rest*`→`/:rest*` 301s, immutable `/_next/static/**` only, no rewrites, no `.firebaserc`). CI PR targets `development`/`staging`/`main`; push CI remains `development` only. Added manual `deploy-staging.yml` (`workflow_dispatch` deploy/destroy, branch guard `staging`, OIDC after gates, channel `staging` only, concurrency `firebase-staging`, env `staging`). Docs: `docs/deployment/firebase-hosting.md`. **Automated:** frozen install; CLI `15.25.1`; lint/typecheck; tests 202; staging export; emulator assert; `actionlint` 1.7.7 binary (Docker unavailable); security `rg` doc-only matches; `git diff --check`. **Emulator:** `/`, EN/PT case studies 200; `/en` and `/en/work/aegis` 301; unknown 404≠homepage. Staging `out/` has `noindex`/`nofollow`, `example.invalid` canonicals, no localhost. **Production deployment remains absent.** | Independent reviewer confirms acceptance checklist; then mark `DONE` and unblock DEPLOY-03 inputs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-08-05 | DEPLOY-01 implementation handoff | `REVIEW`                           | Implementation commit `7fd6f3a6` (`7fd6f3a696fa4b6e9f07f60a57161d3dce0413c2`) on `deploy/01-static-export-compatibility`. Gated `NEXT_OUTPUT=export` + `trailingSlash` only on export builds. Split root layouts `(en)` / `[lang]` via `RootDocument` (MotionRuntime → WebGLManager → LanguageProvider). Deleted `src/middleware.ts` and root `src/app/layout.tsx`; removed `localeHeader` and `NEXT_LOCALE` cookie. Staging `noindex,nofollow` + HTTPS `SITE_URL` required when `DEPLOY_ENV=staging                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | production`.` force-static`on robots/sitemap/icon/OG;`experimental.globalNotFound`+ segment not-found pages. **Moved files:**`page.tsx`and`work/{aegis,q,gosigapp,nexo-dental}/page.tsx`→`src/app/(en)/...`;` icon.tsx`/`opengraph-image.tsx`→`(en)/`. Firebase` package.json`/`pnpm-lock.yaml`untouched. **Normal build routes:**`/`,` /work/{aegis,q,gosigapp,nexo-dental}`,` /pt-BR`,` /pt-BR/work/{aegis,q}`, robots, sitemap, icon, OG,` _not-found`(all static/SSG). **Export checks:**`out/index.html`,` out/404.html`, all EN work routes,` out/pt-BR/index.html`;` lang="pt-BR"`and`noindex`present; no`localhost:3000`/`x-locale`/`NEXT_LOCALE`in`out/`. **Automated:**` pnpm test`(202), lint, typecheck, both builds,`git diff --check `pass. **`next start`smoke (port 4011):**`/`,` /work/aegis`,` /pt-BR`,` /pt-BR/work/q`→ 200 with correct`lang`; PT SSR contains Desenvolvedor/Trabalho/Contato/Processo/Sobre. **Static` out/`smoke:** same routes 200; no-JS PT document has`lang="pt-BR"`. |
| 2026-08-05 | DEPLOY line created              | `STAGING OPEN / PRODUCTION CLOSED` | Repository inspection confirmed Next.js 16, normal `next build`/`next start` review requirements, request-time locale middleware/headers, CI on `development`, existing `staging`/`main` branches, and Firebase CLI dependency commit `4465540a`. The source strategy's Vite `dist/` and SPA rewrite assumptions do not match the repository.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Dispatch DEPLOY-01 only after checking for an overlapping active VIZ worker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |




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