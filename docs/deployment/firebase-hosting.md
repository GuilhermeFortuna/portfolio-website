# Firebase Hosting

Staging uses a manually dispatched, expiring preview channel named `staging`.
Production deploys the Hosting **live** channel from `main` via
[`.github/workflows/deploy-production.yml`](../../.github/workflows/deploy-production.yml).

## Project identifiers

| Identifier | Value |
| --- | --- |
| GCP / Firebase project ID | `portfolio-website-391bf` |
| Hosting site ID | `portfolio-website-391bf` |
| Default Hosting URL | `https://portfolio-website-391bf.web.app` |
| Canonical production domain | `https://guilhermefortuna.dev` |
| Billing account | `015154-CE69CB-912505` (`main`) |
| Workload Identity provider | `projects/905102385356/locations/global/workloadIdentityPools/github/providers/portfolio-website` |
| Deployer service account | `firebase-hosting-deployer@portfolio-website-391bf.iam.gserviceaccount.com` |

Cloud authentication (OIDC → WIF → deployer SA), repository variables, GitHub
environments `staging` and `production`, and a monthly budget alert on billing
account `main` are provisioned. Workflows always pass an explicit `--project`
even though [`.firebaserc`](../../.firebaserc) records the default project ID.

### Repository variables

| Variable | Purpose |
| --- | --- |
| `GCP_PROJECT_ID` | Firebase / GCP project ID (passed as `--project`) |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Workload Identity Federation provider resource name |
| `GCP_DEPLOY_SERVICE_ACCOUNT` | Deployer service account email |

### GitHub environment `staging`

| Name | Scope | Purpose |
| --- | --- | --- |
| `SITE_URL` | Environment variable (`vars.SITE_URL`) | HTTPS canonical origin embedded in staging exports (`https://guilhermefortuna.dev`) |

Deployment branch policy for `staging` allows only the `staging` branch when
the GitHub plan supports environment branch policies. Do not store long-lived
`FIREBASE_TOKEN` values, service-account JSON keys, or other static cloud
credentials in GitHub secrets.

### GitHub environment `production`

| Name | Scope | Purpose |
| --- | --- | --- |
| `SITE_URL` | Environment variable (`vars.SITE_URL`) | Canonical production origin (`https://guilhermefortuna.dev`) |

The deploy workflow triggers only on `push` to `main` and uses environment
`production`. Extra environment reviewers are intentionally not configured so
reviewed merges to `main` deploy automatically.

**Plan limitation (private repo without GitHub Pro):** classic branch
protection, repository rulesets, and environment deployment-branch policies
could not be enabled via API (`403` / `422`). Until the repository is public
or on Pro, enforce promotion discipline by process: change `main` only through
PRs from `staging`, and rely on the workflow `push`/`ref` guards.

### Budget alert

Monthly budget `portfolio-website-391bf-monthly`: **R$10** on project
`portfolio-website-391bf`, thresholds **50% / 90% / 100%**, notify
`guilhermefortuna1000@gmail.com`. Budgets alert; they are not hard spend caps.

## Production deploy (`main`)

The workflow file is
[`.github/workflows/deploy-production.yml`](../../.github/workflows/deploy-production.yml).

1. Merge a reviewed PR into `main` (prefer promoting from `staging`).
2. Actions runs **Deploy Production**: shared CI (`workflow_call`) must pass,
   then the deploy job builds a production static export
   (`NEXT_OUTPUT=export`, `DEPLOY_ENV=production`, `SITE_URL` from the
   `production` environment), asserts indexable output (no `noindex`, no
   `localhost:3000`), authenticates with OIDC, and runs
   `firebase deploy --only hosting` to the live channel.
3. The job summary prints the commit SHA, Firebase Hosting URL, canonical
   `SITE_URL`, and Console rollback link.

There is no `workflow_dispatch` on the initial production path.

## Manual staging deploy / destroy

The workflow file is [`.github/workflows/deploy-staging.yml`](../../.github/workflows/deploy-staging.yml).

1. Merge the workflow to the repository default branch so it appears under
   Actions.
2. Open **Actions → Deploy Staging → Run workflow**.
3. In the branch selector, choose **`staging`** (required). The job is guarded
   with `github.ref == 'refs/heads/staging'` and will skip on any other ref.
4. Choose `action`:
   - `deploy` (default): lint, typecheck, test, static export, assert `out/`,
     then OIDC auth, then deploy preview channel `staging`.
   - `destroy`: skip build gates; OIDC auth; delete only the `staging` preview
     channel.
5. For deploy, choose `expires`: `12h`, `24h` (default), `3d`, or `7d`.

Pushes and pull requests never deploy staging. CI on `development` / PR targets
does not call Firebase. Do not run this workflow from `development` or `main`.

### Preview publicity

Firebase Hosting preview channel URLs are publicly reachable while the channel
exists. Staging builds set `noindex,nofollow` and point canonicals at the
production origin (`SITE_URL`), but the preview URL itself is not access-gated.

### Expected job summary

A successful **deploy** summary includes:

- Action: `deploy`
- Commit SHA
- Expiration duration
- Preview URL

A successful **destroy** summary includes:

- Action: `destroy`
- Commit SHA
- Channel: `staging`
- Preview URL marked deleted

## Custom domain (Porkbun)

Canonical host: `guilhermefortuna.dev` (apex). `www.guilhermefortuna.dev`
redirects to the apex.

1. Deploy live Hosting successfully on `*.web.app` first.
2. In Firebase Console → Hosting → **Add custom domain**, add
   `guilhermefortuna.dev` and `www` (redirect).
3. At [Porkbun](https://porkbun.com) → Domain Management →
   `guilhermefortuna.dev` → **DNS**, add the A / AAAA / TXT (and www) records
   Firebase shows. Remove conflicting parking defaults.
4. Wait for Firebase to show Connected + HTTPS provisioned, then validate the
   canonical domain matrix (see
   [`production-validation.md`](production-validation.md)).

## Local Hosting emulator

Build a staging static export, then serve `out/` with the Hosting emulator:

```bash
rm -rf out
NEXT_OUTPUT=export DEPLOY_ENV=staging SITE_URL=https://guilhermefortuna.dev pnpm build
pnpm exec firebase emulators:exec --project portfolio-website-391bf --only hosting \
  'test -f out/index.html && test -f out/404.html'
```

Interactive local serve (after the export build):

```bash
pnpm exec firebase emulators:start --project portfolio-website-391bf --only hosting
```

Useful checks: `/`, English case studies, `/pt-BR`, Portuguese case studies,
`/en` and `/en/work/aegis` (permanent redirects), and an unknown path (generated
`404.html`, not the homepage).

Firebase CLI (exact pin):

```bash
pnpm install --frozen-lockfile
pnpm exec firebase --version
```

## Configuration notes

- Hosting public directory is `out/` (Next static export). There is no SPA
  rewrite to `/index.html`.
- `/en` → `/` and `/en/:rest*` → `/:rest*` are permanent redirects in
  [`firebase.json`](../../firebase.json). The destination keeps the trailing
  `*` so the Hosting emulator and live Hosting both preserve the captured path.
- Immutable caching applies only to `/_next/static/**`.
- [`.firebaserc`](../../.firebaserc) defaults to `portfolio-website-391bf`.
  Workflows always pass an explicit `--project`.
