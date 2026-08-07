# DEPLOY-04 — Production Release Enablement

## Status

See [`DEPLOY-STATUS.md`](DEPLOY-STATUS.md). This order is intentionally
`BLOCKED`. Technical completion of DEPLOY-03 or VIZ-006 does not automatically
dispatch it.

## Result to Produce

After explicit portfolio release approval, enable automatic Firebase Hosting
live-channel deployment from `main`, verify the approved commit in production,
and prove rollback. Until the status board contains the owner approval record,
this document is a future contract only and authorizes no repository or cloud
mutation.

## Hard Prerequisites

All items are required:

1. DEPLOY-03 is `DONE` with a currently valid keyless staging workflow.
2. VIZ-006 records `GO` for a frozen commit.
3. Active WO/VIZ status boards contain no unresolved release blocker, or each
   exception has an explicit owner waiver.
4. The staging preview for the intended release commit has passed the DEPLOY-03
   hosted matrix.
5. The owner records in `DEPLOY-STATUS.md`: “Approved for production,” exact
   commit SHA, production canonical domain, approver, and date.
6. `main` protection and the production GitHub environment can be configured by
   an authorized repository administrator.

If the intended SHA changes after approval, stop and request approval for the
new SHA.

## Files to Create or Modify

```text
.github/workflows/ci.yml
.github/workflows/deploy-production.yml              # create only after dispatch
docs/deployment/firebase-hosting.md
docs/deployment/production-validation.md             # create
docs/work-orders/deploy/DEPLOY-STATUS.md              # status procedure only
```

## Procedure After Dispatch

1. Freeze and record the approved SHA. Confirm it is the commit tested on
   staging or document the exact merge-only difference before continuing.
2. Make `ci.yml` reusable through `workflow_call` without removing its existing
   development push and PR behavior.
3. Create `deploy-production.yml` triggered only by `push` to `main`. Do not add
   `workflow_dispatch` in the initial release path.
4. Call the shared CI workflow first. The deploy job must `need` successful CI,
   use concurrency group `firebase-production` with no active-deploy
   cancellation, and run in GitHub environment `production`.
5. Build the static artifact with `NEXT_OUTPUT=export`,
   `DEPLOY_ENV=production`, and production `SITE_URL`. Assert the same route
   inventory as staging and prove production output is indexable before OIDC
   authentication.
6. Authenticate through the existing WIF provider/service account only after the
   build gate, then run project-local `firebase deploy --only hosting` with the
   explicit project ID and non-interactive mode.
7. Publish approved SHA, live URL, release/version, and rollback link/instructions
   to the workflow summary.
8. Configure the `production` GitHub environment for `main` only. PR review is
   the approval gate; do not add an environment reviewer that contradicts the
   requested automatic post-merge deployment unless the owner changes this
   decision.
9. Protect `main`: pull requests required, CI required, direct/force pushes
   prohibited, and approval required. Changes should arrive from `staging`.
10. Validate the live Firebase URL before attaching a custom domain. After DNS
    and certificate activation, repeat the complete production matrix on the
    canonical domain.
11. Execute a controlled Firebase Console rollback to the last known-good
    release, verify it, restore the approved release, and record both version
    IDs/timestamps. Follow with a Git revert if rollback represented a real code
    defect.
12. Write `production-validation.md`, move the order to `REVIEW`, and obtain
    independent acceptance before `DONE`.

## Forbidden Decisions

- Do nothing in this order while its status is `BLOCKED`.
- Do not deploy a different SHA from the owner-approved release.
- Do not bypass shared CI, deploy from `development`/`staging`, allow direct
  main pushes, or authenticate before output validation.
- Do not add a Firebase token/key, broaden IAM, or create a second deployer.
- Do not use `hosting:clone` for the first production release; exact-artifact
  promotion is a separate later improvement.
- Do not claim production readiness from automated checks alone; VIZ-006 `GO`
  and hosted acceptance are independent gates.

## Automated Checks

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
rm -rf out && NEXT_OUTPUT=export DEPLOY_ENV=production SITE_URL="$SITE_URL" pnpm build
test -f out/index.html && test -f out/404.html
! rg -n 'noindex|localhost:3000' out/index.html out/robots.txt out/sitemap.xml
docker run --rm -v "$PWD:/repo" -w /repo rhysd/actionlint:1.7.7
git diff --check
```

## Acceptance Checklist

- [ ] Owner approval names the exact deployed SHA and domain.
- [ ] `main` deploys only after the shared CI and static-output gates pass.
- [ ] Production output is indexable and contains correct canonical/alternate
      metadata with no localhost or staging origin.
- [ ] GitHub production environment and branch protection enforce `main`-only
      reviewed promotion.
- [ ] Live Firebase URL and custom domain pass the full hosted route/browser/
      accessibility/performance matrix for the approved commit.
- [ ] No long-lived credential or broadened IAM role exists.
- [ ] Rollback and restoration are successfully demonstrated and recorded.
- [ ] Production validation report and independent acceptance are complete.

## Handoff

Use the standard handoff. Lead with the deployed SHA/domain and `GO`/`NO-GO`,
then include CI/deploy run URLs, release/version IDs, hosted evidence, branch and
environment protections, rollback/restoration evidence, and every remaining
finding.
