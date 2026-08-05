# Firebase Hosting (staging)

**Production deployment is disabled and absent.** This repository has no
`deploy-production.yml`, no live-channel deploy command, and no production
GitHub environment. Only a manually dispatched, expiring Firebase Hosting
preview channel named `staging` is supported.

## Prerequisites (DEPLOY-03)

Cloud authentication and repository variables are provisioned in DEPLOY-03.
Until those exist, the staging workflow cannot mutate Firebase; repository
validation uses `--project` and GitHub `vars` without requiring a local
`.firebaserc`.

### Repository variables

| Variable | Purpose |
| --- | --- |
| `GCP_PROJECT_ID` | Firebase / GCP project ID (passed as `--project`) |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Workload Identity Federation provider resource name |
| `GCP_DEPLOY_SERVICE_ACCOUNT` | Deployer service account email |

### GitHub environment `staging`

| Name | Scope | Purpose |
| --- | --- | --- |
| `SITE_URL` | Environment variable (`vars.SITE_URL`) | HTTPS production-origin URL used for staging export canonicals |

Do not store long-lived `FIREBASE_TOKEN` values, service-account JSON keys, or
other static cloud credentials in GitHub secrets.

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

Pushes and pull requests never deploy. CI on `development` / PR targets does
not call Firebase. Do not run this workflow from `development` or `main`.

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

## Local Hosting emulator

Build a staging static export, then serve `out/` with the Hosting emulator:

```bash
rm -rf out
NEXT_OUTPUT=export DEPLOY_ENV=staging SITE_URL=https://example.invalid pnpm build
pnpm exec firebase emulators:exec --project demo-portfolio --only hosting \
  'test -f out/index.html && test -f out/404.html'
```

Interactive local serve (after the export build). Pass an explicit `--project`
because this repository does not commit `.firebaserc` until DEPLOY-03:

```bash
pnpm exec firebase emulators:start --project demo-portfolio --only hosting
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
- No `.firebaserc` is committed until DEPLOY-03 confirms the real project ID.
  Workflows always pass an explicit `--project`.
