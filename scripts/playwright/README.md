# Screenshot automation

Generates the case-study screenshots under `public/work/<slug>/` by driving
the three external project repos (Q, Aegis, Nexo Dental) with Playwright.
Automation, auth state, and scratch output all live in this repo — the
external repos are never written to.

## Commands

```bash
pnpm screenshots:q            # capture all Q routes
pnpm screenshots:nexo         # capture all Nexo Dental routes
pnpm screenshots:aegis        # capture all Aegis routes
pnpm screenshots:all          # run all three, sequentially

pnpm screenshots:auth:nexo    # (re)create Nexo's persisted login session
pnpm screenshots:auth:aegis   # (re)create Aegis's persisted login session

pnpm screenshots:promote:q      # copy the latest run's Q deliverables into public/work/q/
pnpm screenshots:promote:nexo
pnpm screenshots:promote:aegis
```

A capture run never writes into `public/work/`. It writes PNG masters and
WebP deliverables to `scripts/playwright/scratch/<run-id>/<project>/` and
prints a summary table (dimensions, file size, target/ceiling status) so you
can review before publishing. Run the matching `screenshots:promote:*` once
you're happy with the output — it copies the most recent run's deliverables
into `public/work/<slug>/`, atomically (a crash mid-copy can't leave a
half-written file at the final path).

## One-time setup

- **Q**: no setup. `screenshots:q` starts `q_frontend`'s Vite dev server in
  MSW mocks mode and needs no backend or credentials.
- **Nexo Dental**: no setup beyond `screenshots:auth:nexo` once, to create a
  persisted login session (fixture credentials `admin@demo.com`/`demo123`,
  not real secrets). `screenshots:nexo` starts `odonto_front`'s Vite dev
  server in MSW mocks mode — no backend needed.
- **Aegis**: needs real infrastructure, since Aegis has no mocks-only mode.
  1. Copy `.env.example` to `.env.local` and set `SCREENSHOT_EMAIL` /
     `SCREENSHOT_PASSWORD` to a real local Aegis admin account.
  2. One-time only, from `aegis-project/`, seed the demo data and bootstrap
     that admin account (this can take several minutes at `--scale visual`):
     ```bash
     ./setup-db.sh --scale visual --with-admin admin@example.com --password-file <path>
     ```
     `screenshots:aegis` intentionally does **not** run this for you — it
     mutates a stateful Postgres volume, and reseeding on every capture run
     would be slow and destructive. It only runs `docker compose up -d`
     (safe to repeat) and starts the API + SPA.
  3. `pnpm screenshots:auth:aegis` once, to create Aegis's persisted login
     session.
  4. `pnpm screenshots:aegis`.

  If Aegis's containers are up but the demo data was never seeded, captures
  that need populated data (e.g. the overview's risk constellation) will
  time out waiting for their readiness selector and leave a diagnostic
  screenshot in `scratch/<run>/aegis/diagnostics/` showing the stuck
  loading state — that's the tool correctly refusing to publish an empty
  dashboard, not a bug. Run step 2 above and retry.

## Repository paths

Resolved by `scripts/playwright/engine/repo-paths.ts`: an env var
(`SCREENSHOTS_AEGIS_PATH`, `SCREENSHOTS_Q_PATH`, `SCREENSHOTS_NEXO_PATH`,
settable in `.env.local`) takes priority; otherwise it assumes the three
repos are siblings of this one (`../aegis-project`, `../q`, `../nexo`).

## Adding or changing a capture

Each project's routes, auth, and server startup live in
`scripts/playwright/projects/{q,aegis,nexo}.config.ts` as data — add a new
entry to a project's `captures` array with a route and a `readySelector`
(an existing or newly-added `data-testid` in that external repo; every
capture must declare one — no arbitrary timeouts). The shared engine in
`scripts/playwright/engine/` (server lifecycle, readiness waits, screenshot
capture, ffmpeg conversion, diagnostics) is project-agnostic and shouldn't
need changes for a new route or even a new project.
