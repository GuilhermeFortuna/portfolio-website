# DEPLOY-03 — OIDC Infrastructure and Hosted Staging Validation

## Status

See [`DEPLOY-STATUS.md`](DEPLOY-STATUS.md). This order remains `BLOCKED` until
DEPLOY-02 is `DONE`, the owner supplies the identifiers below, and the assigned
administrator is explicitly authorized to change Google Cloud and GitHub
repository settings.

## Result to Produce

A keyless GitHub Actions identity with least-privilege Firebase Hosting access,
plus hosted evidence that the manual `staging` channel can be deployed,
inspected, destroyed, and redeployed with a selectable expiration. Completion
proves staging operations only; it does not authorize production.

## Required Owner Inputs

Record these exact values in the dispatch row or private operator notes before
running any mutation. Identifiers may be public, but do not invent them.

```text
GCP project ID
Firebase Hosting site ID (confirm whether it equals the project ID)
GitHub repository: GuilhermeFortuna/portfolio-website (owner confirms)
Production canonical SITE_URL to embed in staging metadata
Authorized Google Cloud administrator account
Authorized GitHub repository administrator account
```

## Files to Create or Modify

```text
.firebaserc                                             # optional, real project ID only
docs/deployment/firebase-hosting.md
docs/deployment/staging-validation.md                  # create evidence report
docs/work-orders/deploy/DEPLOY-STATUS.md                # status procedure only
```

Google Cloud IAM, Workload Identity, GitHub environment/variables, budget
alerts, and Firebase Hosting channel state are external changes and must be
listed individually in the handoff.

## Fixed Infrastructure Values

```text
Service account name: firebase-hosting-deployer
Workload Identity pool ID: github
Provider ID: portfolio-website
Preview channel ID: staging
Allowed repository: GuilhermeFortuna/portfolio-website
Allowed refs: refs/heads/staging and refs/heads/main
Service-account project roles:
  roles/firebasehosting.admin
  roles/serviceusage.apiKeysViewer
Impersonation role on service account:
  roles/iam.workloadIdentityUser
```

The provider includes `main` now only so DEPLOY-04 will not require replacing
the trust provider. No current workflow may use that ref to deploy.

## Procedure

1. Verify `gcloud auth list`, active account, target project, Firebase project
   registration, Hosting site, and GitHub repository before any mutation. Stop
   on a mismatch.
2. Enable only the APIs required by the contract:
   `iamcredentials.googleapis.com`, `sts.googleapis.com`,
   `firebase.googleapis.com`, `firebasehosting.googleapis.com`, and
   `serviceusage.googleapis.com`.
3. Create or reuse the exact service account after inspecting whether it already
   exists. Do not recreate, rename, or broaden an existing identity silently.
4. Grant the service account only `roles/firebasehosting.admin` and
   `roles/serviceusage.apiKeysViewer` at the project. Inspect the full project
   policy and prove the account has no Owner, Editor, Firebase Admin, or unrelated
   role.
5. Create or reuse pool `github` and provider `portfolio-website`. Map repository,
   repository owner, ref, actor, and subject claims. The provider admission
   condition must require the exact repository and either the staging or main
   branch ref; do not use owner-only or organization-wide admission.
6. Bind `roles/iam.workloadIdentityUser` on the service account to the
   repository-scoped principal set. Do not grant token creator unless a
   reproduced tool requirement proves it necessary and the owner approves the
   expanded role.
7. Record the provider resource name and service-account email. Add repository
   variables `GCP_PROJECT_ID`, `GCP_WORKLOAD_IDENTITY_PROVIDER`, and
   `GCP_DEPLOY_SERVICE_ACCOUNT`.
8. Create only the GitHub environment `staging`. Add environment variable
   `SITE_URL` with the confirmed production canonical origin. Configure its
   deployment branch policy for `staging`; do not create `production`.
9. Configure a Google Cloud billing budget and alert recipients. Record amount,
   thresholds, recipients/notification channel, and the fact that a budget is
   an alert rather than a hard cap.
10. If used, create `.firebaserc` with the real project ID and confirm it matches
    the workflow variable. Never rely on it in workflow commands.
11. Merge the workflow file to the default branch and `staging`, then manually
    run `deploy` from the `staging` ref with `24h`. Record workflow run URL,
    source SHA, preview URL, expiration, Firebase release/version, and action
    summary.
12. Validate the hosted preview across routes, metadata, browser modes, and
    security checks below. Preview URLs are public; do not test with private
    data or unpublished evidence assets.
13. Run `destroy`. Confirm the exact `staging` preview URL is deactivated and the
    live channel/site remains untouched.
14. Run `deploy` once more from the same staging SHA with `24h`, record the final
    active URL/expiration, and confirm the workflow updated the stable channel ID
    rather than creating a per-commit channel.
15. Write `staging-validation.md` with the complete evidence and outstanding
    portfolio release blockers. Move DEPLOY-03 to `REVIEW`; do not alter
    DEPLOY-04.

## Hosted Validation Matrix

Test at minimum:

- Routes: `/`, all four English case studies, `/pt-BR`, every generated
  Portuguese case study, `/en`, `/en/work/aegis`, and a nonexistent route.
- Browsers/viewports: Chromium and Firefox at 1440×900 and 375×780; WebKit at
  the same viewports using the repository's established compatible container if
  host libraries cannot launch it.
- Modes: normal motion, reduced motion, JavaScript disabled for semantic/static
  content, refresh/direct navigation, and 200% zoom.
- Metadata: HTTPS production canonical, alternates, sitemap, robots,
  `noindex,nofollow`, correct `<html lang>`, and no localhost/staging URL
  accidentally made canonical.
- Runtime: no hydration error, uncaught exception, failed same-origin asset,
  mixed content, horizontal overflow, or unexpected Firebase reserved-path
  request.
- Security: no credential in repository, workflow logs/artifacts, generated
  output, or GitHub variables; WIF rejects a ref outside staging/main.

This order records functionality and regressions. It does not approve the
portfolio's visual composition; VIZ-006 owns that decision.

## Forbidden Decisions

- Do not proceed without explicit authority for external Google/GitHub changes.
- Do not create/download a service-account key or configure `FIREBASE_TOKEN`.
- Do not grant Owner, Editor, Firebase Admin, or organization-wide repository
  access.
- Do not create a production environment, production deployment workflow,
  custom production domain, live-channel release, or `hosting:clone` operation.
- Do not treat a hard-to-guess preview URL as private.
- Do not mark WebKit or another required browser pass when it was not run; use
  the documented container or record the blocker.

## Acceptance Checklist

- [ ] Every required owner input and administrator authority is recorded.
- [ ] OIDC/WIF is restricted to the exact repository and staging/main refs.
- [ ] Service account has only the two required project roles and scoped
      impersonation binding; no key exists.
- [ ] GitHub contains only staging deployment configuration and identifier
      variables, not credentials.
- [ ] Billing budget alerts are active and documented.
- [ ] Manual 24h staging deployment succeeds from the exact staging SHA.
- [ ] Route, locale, metadata, browser, motion, no-JS, zoom, and runtime matrix is
      recorded with reproducible evidence.
- [ ] Destroy deactivates staging without touching live.
- [ ] Final redeploy leaves the stable `staging` channel active for 24h and its
      URL/expiration are recorded.
- [ ] Production remains disabled and DEPLOY-04 remains `BLOCKED`.

## Handoff

Use the standard handoff and link the validation report. List every external
resource created/reused, every IAM binding, GitHub variable/environment, budget
alert, workflow run, Firebase release, preview URL and expiration. Do not include
tokens, credentials, or sensitive console output.
