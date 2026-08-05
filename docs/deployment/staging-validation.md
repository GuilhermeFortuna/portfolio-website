# Staging validation report (DEPLOY-03)

**Date:** 2026-08-05  
**Source SHA:** `eeb90bfe3656ac62692fea3a5f64af71dfaaa79a`  
**Branch:** `staging`  
**Production:** disabled (no live release; live channel has no version)

Owner waived further destroy/redeploy cycles beyond the three successful
Actions runs already recorded. The lifecycle (deploy → destroy → redeploy)
was completed by those runs.

## How to open staging

Active preview channel ID is always `staging`. Current URL:

**https://portfolio-website-391bf--staging-o2lwnops.web.app**

Expires: **2026-08-06T23:35:50Z** (24h from final deploy).

The URL is public while the channel exists (`noindex,nofollow`; canonicals
point at `https://portfolio-website-391bf.web.app`). It is not a private
environment.

To refresh later: Actions → **Deploy Staging** → branch **`staging`** →
`action=deploy`, `expires=24h`. The job summary prints the preview URL.

## Workflow runs

| Run | Role | URL | Result |
| --- | --- | --- | --- |
| 31055394290 | Initial deploy (24h) | https://github.com/GuilhermeFortuna/portfolio-website/actions/runs/31055394290 | success |
| 31056750582 | Destroy | https://github.com/GuilhermeFortuna/portfolio-website/actions/runs/31056750582 | success (`Staging preview (destroy)`) |
| 31056802902 | Redeploy (24h) | https://github.com/GuilhermeFortuna/portfolio-website/actions/runs/31056802902 | success |

Final Firebase version: `projects/portfolio-website-391bf/sites/portfolio-website-391bf/versions/9495efc4a6503c56`  
Channel ID remained stable `staging` (Firebase suffix in the hostname can
change when the channel is recreated; it is still the same channel ID).

Live channel `https://portfolio-website-391bf.web.app` still has **no release**.

## External resources (created/reused)

| Resource | Value |
| --- | --- |
| GCP / Firebase project | `portfolio-website-391bf` (`905102385356`) |
| Hosting site | `portfolio-website-391bf` |
| Billing account | `015154-CE69CB-912505` (`main`) |
| Service account | `firebase-hosting-deployer@portfolio-website-391bf.iam.gserviceaccount.com` |
| Project roles on SA | `roles/firebasehosting.admin`, `roles/serviceusage.apiKeysViewer` only |
| WIF pool / provider | `github` / `portfolio-website` |
| Provider resource | `projects/905102385356/locations/global/workloadIdentityPools/github/providers/portfolio-website` |
| Admission condition | repo `GuilhermeFortuna/portfolio-website` and ref `refs/heads/staging` or `refs/heads/main` |
| SA impersonation | `roles/iam.workloadIdentityUser` for principal set `attribute.repository/GuilhermeFortuna/portfolio-website` |
| Budget | `portfolio-website-391bf-monthly`, R$10/month, thresholds 50%/90%/100%, notify `guilhermefortuna1000@gmail.com` (alert only, not a hard cap) |
| Notification channel | `projects/portfolio-website-391bf/notificationChannels/4442563265244454272` |

No service-account keys. No `FIREBASE_TOKEN`.

## GitHub configuration

| Item | Value |
| --- | --- |
| Repo vars | `GCP_PROJECT_ID`, `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_DEPLOY_SERVICE_ACCOUNT` |
| Environment | `staging` only (no `production`) |
| Env var | `SITE_URL=https://portfolio-website-391bf.web.app` |
| Branch policy | `staging` only |
| Workflow on default branch | `.github/workflows/deploy-staging.yml` on `main` (dispatch UI) |
| Deployable tip | `staging` @ `eeb90bfe` |

Ref guard: workflow job `if: github.ref == 'refs/heads/staging'`. WIF provider
also requires staging/main refs.

## Hosted validation matrix (initial preview)

Validated against first preview
`https://portfolio-website-391bf--staging-xnvogbes.web.app` (later destroyed;
content SHA unchanged for redeploy).

### Routes

| Path | Status |
| --- | --- |
| `/` | 200 |
| `/work/aegis/` | 200 |
| `/work/q/` | 200 |
| `/work/gosigapp/` | 200 |
| `/work/nexo-dental/` | 200 |
| `/pt-BR/` | 200 |
| `/pt-BR/work/aegis/` | 200 |
| `/pt-BR/work/q/` | 200 |
| `/en` | 301 |
| `/en/work/aegis` | 301 |
| nonexistent | 404 |

### Metadata

- `robots`: `noindex, nofollow`
- Canonical / alternates: HTTPS `https://portfolio-website-391bf.web.app…`
- No localhost or preview hostname as canonical
- `/pt-BR/`: `lang="pt-BR"`
- `/robots.txt` and `/sitemap.xml`: 200, production-origin URLs

### Browsers / modes

| Engine | Viewports | Result |
| --- | --- | --- |
| Chromium (system Chrome channel) | 1440×900, 375×780 | Routes 200; reduced motion; 200% zoom; no-JS PT semantic content OK |
| Firefox (Playwright) | 1440×900, 375×780 | Same |
| WebKit | host blocked (missing ICU deps); **Docker** `mcr.microsoft.com/playwright:v1.62.1-noble` | desktop + mobile OK |

Note: Chromium/Firefox reported `requestfailed` for `entry-intro.mp4` during
navigation (`ERR_ABORTED` / cache parse). Direct `curl` of the MP4 returned
**200** `video/mp4` (~1.9 MB). Treated as navigation abort noise, not a broken
asset.

### Runtime / security

- No credentials in repo variables (identifiers only)
- Live channel untouched (no release)
- Production workflow / environment absent

## Outstanding portfolio release blockers (unchanged)

DEPLOY-04 remains **BLOCKED** until DEPLOY-03 `DONE`, VIZ-006 `GO`, release
blockers closed/waived, and explicit owner production approval for a named
commit. Current VIZ board still has VIZ-003/VIZ-005 in `REVIEW`, VIZ-004 and
VIZ-006 `BLOCKED`.
