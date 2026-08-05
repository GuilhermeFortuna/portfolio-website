# Portfolio Website — Deployment Work Orders

## Purpose

The `DEPLOY` line creates a temporary Firebase Hosting staging environment now
and leaves production deployment disabled until the portfolio has a recorded
release approval. These are execution contracts for worker agents, not a signal
that the current portfolio is approved to ship.

The source strategy assumed React/Vite and a `dist/` SPA. The repository is
Next.js 16 App Router and currently uses request-time locale behavior. Repository
truth overrides those assumptions: staging must deploy a Next static export from
`out/`, and Firebase must serve the generated route files rather than rewrite
every request to the homepage.

## Authority and Mandatory Reading

Before starting a `DEPLOY` order, read:

1. [`DEPLOY-STATUS.md`](DEPLOY-STATUS.md)
2. The assigned `DEPLOY` order
3. [`../viz/VIZ-STATUS.md`](../viz/VIZ-STATUS.md)
4. [`../viz/README.md`](../viz/README.md), especially VIZ file ownership
5. [`../wo/WO-STATUS.md`](../wo/WO-STATUS.md)
6. `.github/workflows/ci.yml`, `package.json`, `next.config.ts`, and the current
   i18n/runtime files named by the assigned order

External technical references:

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Firebase Hosting configuration](https://firebase.google.com/docs/hosting/full-config)
- [Firebase preview channels](https://firebase.google.com/docs/hosting/test-preview-deploy)
- [Firebase Hosting IAM roles](https://firebase.google.com/docs/projects/iam/roles-predefined-product)
- [Google GitHub Actions authentication](https://github.com/google-github-actions/auth)

The downloaded deployment strategy is planning input only. Do not copy its
Vite variables, `dist/` output, SPA rewrite, Node version, or example scripts
without checking this repository.

## Fixed Decisions

- Platform: Firebase Hosting, using one Firebase project.
- Development: CI only; never deploy `development`.
- Staging: Firebase preview channel ID `staging`, manually dispatched from the
  `staging` branch, default expiration `24h`, with explicit deploy and destroy
  operations.
- Production: no workflow, trigger, live-channel command, or production
  environment is created by DEPLOY-01 through DEPLOY-03.
- Authentication: GitHub OIDC → Google Workload Identity Federation → dedicated
  service account. No `FIREBASE_TOKEN` and no service-account JSON key.
- Build: preserve the normal server build for VIZ review; enable static export
  only when `NEXT_OUTPUT=export` is set by the staging workflow.
- Static output: `out/`, with one generated document per route. A catch-all
  rewrite to `/index.html` is forbidden.
- Locale behavior: explicit `/` and `/pt-BR` URLs remain; request-time cookie and
  `Accept-Language` redirects are removed because static Hosting cannot execute
  them. `/en` URLs are canonicalized by Firebase redirects.
- Staging metadata: canonical URLs point at the eventual production origin and
  preview documents carry `noindex, nofollow`.
- Production approval: DEPLOY-04 stays `BLOCKED` after its technical
  prerequisites pass. Only an explicit owner release record for a named commit
  may move it to `READY`.

## Dependency Order

```text
DEPLOY-01 Next Static Export Compatibility
  └─ DEPLOY-02 Firebase Staging Repository Workflow
       └─ DEPLOY-03 OIDC Infrastructure and Hosted Staging Validation
            └─ DEPLOY-04 Production Release Enablement
                 BLOCKED additionally by VIZ-006 GO + explicit owner approval
```

## Work Order Index

| ID | Work Order | Initial state | Primary output |
| --- | --- | --- | --- |
| DEPLOY-01 | [Next Static Export Compatibility](DEPLOY-01-next-static-export-compatibility.md) | `READY` | Static-compatible route/runtime contract while preserving normal `next start` builds |
| DEPLOY-02 | [Firebase Staging Repository Workflow](DEPLOY-02-firebase-staging-repository-workflow.md) | `BLOCKED` | Firebase config and manual staging deploy/destroy workflow; no production workflow |
| DEPLOY-03 | [OIDC Infrastructure and Hosted Staging Validation](DEPLOY-03-oidc-infrastructure-staging-validation.md) | `BLOCKED` | Keyless Google/GitHub setup and validated temporary staging URL |
| DEPLOY-04 | [Production Release Enablement](DEPLOY-04-production-release-enablement.md) | `BLOCKED` | Future live-channel workflow, enabled only after release approval |

## Required Agent Workflow

1. Run `git status --short --branch` and record all pre-existing changes.
2. Confirm the assigned order is `READY` in `DEPLOY-STATUS.md`.
3. Confirm no active worker owns an overlapping file. DEPLOY-01 overlaps the
   VIZ-owned layout/i18n surface and must stop if a VIZ implementation is
   actively editing it.
4. Change only the files listed by the order. `DEPLOY-STATUS.md` is exempt and
   may be updated only through its status procedure.
5. Follow the numbered procedure in order; do not replace values or behaviors
   with an agent preference.
6. Run every automated and manual check. A skipped required browser, cloud, or
   security check is a blocker, not a pass.
7. Move completed implementation to `REVIEW`. Only an independent reviewer or
   explicit owner acceptance may mark it `DONE`.
8. Stage explicit paths only. Never use `git add .` in this dirty worktree.

## Standard Handoff

```text
Work Order: DEPLOY-XX
Status: complete | partial | blocked

Implemented:
- ...

Files changed:
- ...

External state changed:
- none | exact Google/GitHub/Firebase changes

Validation:
- command/check — pass/fail with evidence

Acceptance criteria not met:
- none | exact unmet item

Notes for the next agent:
- branch, commit, preview URL/expiration when applicable, and exact blocker
```

## Line Completion Rule

Staging readiness is complete when DEPLOY-03 is `DONE` and a temporary preview
can be deployed, inspected, destroyed, and redeployed without a long-lived
credential. That does not complete the production order and does not authorize a
release.
