# DEPLOY-02 — Firebase Staging Repository Workflow

## Status

See [`DEPLOY-STATUS.md`](DEPLOY-STATUS.md). Dispatch only after DEPLOY-01 is
`DONE` and DEPLOY-02 is moved to `READY`.

## Result to Produce

Repository configuration for a manually deployed, expiring Firebase Hosting
preview channel named `staging`, authenticated through GitHub OIDC. The order
must provide deploy and destroy operations and must leave production deployment
absent and impossible to trigger.

## Prerequisites

- DEPLOY-01 `DONE`, including a verified `out/` static export.
- Start from commit `4465540a`, which added `firebase-tools@^15.25.1`, its
  lockfile resolution, and pnpm allow-build entries. Validate that committed
  baseline before changing the range to an exact pin; do not reinstall blindly
  or rewrite unrelated lockfile entries.
- The actual Firebase project ID is not required for repository-only validation;
  commands must use GitHub variables and explicit `--project` arguments.

## Files to Create or Modify

```text
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
firebase.json                                      # create
.github/workflows/ci.yml
.github/workflows/deploy-staging.yml               # create
docs/deployment/firebase-hosting.md                # create
```

Do not create `.firebaserc` with a placeholder. DEPLOY-03 may add it only after
the real project ID is confirmed, and workflows must remain independent of it.

## Procedure

1. Inspect commit `4465540a`, then pin `firebase-tools` to the exact version
   already resolved and validated by the lockfile; keep it in `devDependencies`. Retain only transitive pnpm
   `allowBuilds` entries required by a clean frozen install. Add
   `"firebase": "firebase"` to scripts without changing existing test/build
   commands.
2. Add `firebase.json` with `hosting.public: "out"`, standard hidden-file and
   dependency ignores, and `trailingSlash: true`. Do not define any rewrite.
3. Add ordered permanent redirects:
   `/en` → `/` and `/en/:rest*` → `/:rest`, preserving the captured remainder.
   Confirm the exact glob/capture syntax with the current Firebase Hosting
   documentation and emulator rather than inventing it.
4. Add long-lived immutable caching only for fingerprinted
   `/_next/static/**` assets. Do not set immutable caching on HTML, sitemap,
   robots, or `404.html`.
5. Expand `ci.yml` pull-request targets to `development`, `staging`, and `main`,
   while retaining push CI only for `development`. Preserve Node 22, pnpm
   11.17.0, frozen install, lint, typecheck, test, and normal build.
6. Create `deploy-staging.yml` with `workflow_dispatch` inputs:
   `action` (`deploy` default, `destroy`) and `expires` (`12h`, `24h` default,
   `3d`, `7d`). Set permissions to only `contents: read` and `id-token: write`.
7. Guard the job with `github.ref == 'refs/heads/staging'`. The workflow must be
   merged to the default branch so it appears in Actions, and the operator must
   select `staging` in the Run workflow branch selector. Checkout the triggering
   commit; do not silently replace it with another ref.
8. Use Node 22 and pnpm 11.17.0. Run a frozen install for both operations.
9. For `deploy`, run lint, typecheck, and tests once, then run the static build
   with `NEXT_OUTPUT=export`, `DEPLOY_ENV=staging`, and
   `SITE_URL=${{ vars.SITE_URL }}`. Assert the expected `out/` files before
   authenticating.
10. Authenticate after build checks with `google-github-actions/auth@v3` using
    `vars.GCP_PROJECT_ID`, `vars.GCP_WORKLOAD_IDENTITY_PROVIDER`, and
    `vars.GCP_DEPLOY_SERVICE_ACCOUNT`. Do not request or print an access token.
11. Deploy with project-local CLI to channel `staging`, the selected expiration,
    explicit project ID, and non-interactive mode. Capture the preview URL and
    append action, commit SHA, expiration, and URL to `$GITHUB_STEP_SUMMARY`.
12. For `destroy`, skip lint/test/build and delete only the `staging` preview
    channel with explicit project ID, non-interactive mode, and `--force`.
13. Add concurrency group `firebase-staging` with
    `cancel-in-progress: false`, a 25-minute timeout, and GitHub environment
    `staging`.
14. Document repository variables, environment variable `SITE_URL`, manual
    branch selection, deploy/destroy usage, preview publicity, expected summary,
    and local emulator commands. State prominently that production is disabled.

## Forbidden Decisions

- Do not create `deploy-production.yml`, use a `push` deployment trigger, call
  the live channel, use `hosting:clone`, or configure a production environment.
- Do not deploy `development` or automatically deploy pushes/PRs to `staging`.
- Do not use `FIREBASE_TOKEN`, `firebase login:ci`, credentials JSON, GitHub
  credential secrets, or a globally installed Firebase CLI.
- Do not use `dist/`, add a `** → /index.html` rewrite, or rebuild with Vite.
- Do not authenticate before tests/build/output assertions pass on deploy.
- Do not let a destroy operation delete the live channel, Hosting site, Firebase
  project, or any channel other than the literal `staging` ID.

## Automated Checks

```bash
pnpm install --frozen-lockfile
pnpm exec firebase --version
pnpm lint
pnpm typecheck
pnpm test
rm -rf out && NEXT_OUTPUT=export DEPLOY_ENV=staging SITE_URL=https://example.invalid pnpm build
pnpm exec firebase emulators:exec --only hosting \
  'test -f out/index.html && test -f out/404.html'
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:1.7.7
rg -n "FIREBASE_TOKEN|credentials_json|service.account.*json|firebase deploy.*hosting|hosting:clone|deploy-production" \
  .github firebase.json docs/deployment package.json
git diff --check
```

The security scan is a review command: matches inside documentation that forbid
unsafe strings must be classified manually; any executable workflow match for a
static credential or live deployment fails the order. If Docker is unavailable,
record that exact environment blocker and run an equivalent pinned `actionlint`
binary before acceptance.

## Manual Checks

- Use the Firebase emulator to request `/`, every English case study,
  `/pt-BR`, supported Portuguese case studies, `/en`, `/en/work/aegis`, and an
  unknown route.
- Verify nested routes return their own headings/content, `/en` rules return
  permanent redirects, and the unknown route returns the generated 404 rather
  than the homepage.
- Inspect staging output for `noindex`, production-origin canonicals, and absence
  of localhost URLs.
- Inspect the Actions event graph and prove no event can deploy production or
  deploy staging from `development`/`main`.

## Acceptance Checklist

- [ ] Firebase CLI is exact-pinned locally and frozen install passes.
- [ ] Firebase publishes `out/` with no catch-all rewrite.
- [ ] `/en` canonical redirects and 404 behavior pass in the emulator.
- [ ] CI covers PR promotion without adding a development deployment.
- [ ] Staging is manual, branch-guarded, serialized, expiring, and destroyable.
- [ ] Deploy gates run before OIDC authentication and Firebase mutation.
- [ ] Workflow summary includes commit, expiration, operation, and preview URL.
- [ ] No production workflow, trigger, environment, command, or live-channel
      operation exists.
- [ ] No long-lived cloud credential is introduced.
- [ ] Documentation and every automated/manual check pass.

## Handoff

Use the standard handoff. Separate the committed `4465540a` dependency baseline
from the order's reconciliation, include emulator response evidence, attach
`actionlint` output, and explicitly state “production deployment remains
absent” or identify the acceptance failure.
