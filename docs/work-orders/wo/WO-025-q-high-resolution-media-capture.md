# WO-025 — Q High-Resolution Media Capture

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-025 row is
`READY`.

## Result to Produce

A large, high-resolution, fixture-driven capture set that shows Q's interface at
enough fidelity to survive being cropped, zoomed, and animated later — plus an
archived master set outside the repository so no future visual batch ever needs
to recapture.

This is the batch's flagship deliverable. Q has the most polished interface in
the portfolio, and the capture set is sized to exploit that rather than to
minimize bytes. Every ceiling below is a ceiling, not a target.

## Prerequisites

- WO-024 `DONE`

## Read-Only Inputs

```text
/home/gui/projects/q/dev.sh
/home/gui/projects/q/q_frontend
/home/gui/projects/q/q_frontend/src/mocks/
docs/q-case-study-evidence.md
```

## Files to Create or Modify

```text
public/work/q/<subject>.webp        (one per accepted subject)
docs/q-case-study-media.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify a Q source repository. Do not commit masters to the portfolio.

## Capture Environment

Capture from the mock stack only:

```bash
cd /home/gui/projects/q && ./dev.sh --mocks
```

That path runs the SPA on Vite with `VITE_ENABLE_MSW=true` and starts **no**
backend, Postgres, Redis, Dramatiq worker, or MetaTrader 5 connection. Confirm
before capturing that the process tree contains no backend or container process
and that no request escapes to a broker or market-data vendor.

Never capture from `./dev.sh` (default) or `./dev.sh --web`. Both start the real
backend. If a subject cannot be reached in mock mode, it is not captured; record
it as blocked and report which fixture is missing.

Drive the browser with the repository's Playwright tooling. Every capture is
scripted so it can be reproduced exactly.

## Resolution and Format Contract

This contract deliberately exceeds WO-019's, because the output feeds an
animation layer.

| Property | Value |
| --- | --- |
| Capture viewport | 1600×900 CSS pixels |
| Device scale factor | `2` (raw capture 3200×1800) |
| Master (archived) | 3200×1800 lossless PNG |
| Deliverable | 2560×1440 WebP, quality ≥ 88 |
| Per-file ceiling | 500 KiB |
| Per-file target | ≤ 250 KiB |
| Total `public/work/q/` ceiling | 5 MiB |

Additional rules:

- Deliverables are exactly 2560×1440. A subject that cannot fill that frame is
  recaptured, never upscaled.
- **Do not crop the deliverables.** The later animation batch does the cropping,
  and it needs the full frame plus resolution headroom to crop into.
- Masters live under a `mktemp -d` archive outside every repository. Record the
  archive path and every master's SHA-256 in the manifest so the set can be
  located or regenerated. Masters must not enter Git.
- Existing `<picture>` markup in `case-study-media.tsx` already declares
  `image/webp` and is documented as the seam for a second source. Adding AVIF is
  **out of scope** for this order; record in the manifest whether AVIF would
  meaningfully beat these WebP sizes, as input to a later decision.

## Required Subjects

Capture these twelve. Each shows a distinct capability; none is a duplicate
angle on the same screen.

| # | Subject | File | Must show |
| --- | --- | --- | --- |
| 1 | Launcher workspace | `launcher.webp` | Draggable dashboard, watchlist panels, system health, recent history |
| 2 | Workspace dock | `dock.webp` | Glassmorphic dock with a live job progress badge |
| 3 | Market data charting | `market-data.webp` | Candlestick chart with indicators and volume |
| 4 | Backtest configuration | `backtest-studio.webp` | StrategyStudio tabbed Entry / Exit & Targets editor |
| 5 | Backtest results | `backtest-results.webp` | Equity curve and drawdown, with trades or monthly stats |
| 6 | Optimization | `optimize-pareto.webp` | Optuna Pareto front or trial scatter |
| 7 | Walk-forward validation | `walkforward.webp` | IS/OOS window comparison and stitched OOS equity |
| 8 | Strategy discovery | `discover-leaderboard.webp` | OOS-ranked candidate leaderboard |
| 9 | Research / feature store | `research-features.webp` | Feature Store or Feature Scoring panel |
| 10 | Paper execution | `execution.webp` | Accounts, deployments, positions, and the locked live-trading state |
| 11 | System diagnostics | `system.webp` | Health, sync telemetry, connection heartbeats |
| 12 | Native desktop shell | `desktop-shell.webp` | Q running as a Tauri window, proving it is a desktop application |

Up to **four** additional subjects may be captured if a compelling one is found
in mock mode — a total ceiling of sixteen files. Record any addition with its
justification. Do not exceed sixteen and do not exceed the 5 MiB total.

### Subject 12 is conditional

Subject 12 requires a Tauri build (`VITE_ENABLE_MSW=true pnpm tauri:dev` from
`q_frontend`), which needs system WebKitGTK libraries that may not be present.
It must run with MSW enabled and must not connect to a broker or backend.

If the Tauri build cannot be produced in this environment, **do not block the
batch**. Capture the other eleven, record subject 12 as `DEFERRED` with the exact
build error, and report it so WO-026 writes the desktop-application claim
without a supporting image. A cosmetic capture is not worth stalling the chapter.

## Safety Contract

Applied to every pixel, per the WO-024 boundaries:

- Capture from MSW fixtures. This is mostly a practical choice — fixtures are
  deterministic, reproducible, and always populated, so the captures look their
  best and can be regenerated identically.
- No broker name, account number, balance, MT5 server or login, credential, API
  key, or private deployment identifier may be legible.
- Strategy names, parameters, features, and market data carry **no restriction**
  (locked owner fact 7). Capture the interface as it is.
- Browser chrome, local URLs, devtools, notifications, cursors over content,
  loading skeletons, empty states, and error banners must not appear.
- The performance HUD (`VITE_PERF_HUD`) must be off.
- Preserve the real Q interface. Do not restyle, recolor, relabel, or
  reconstruct it.

Record each asset's fixture source in the manifest so provenance is traceable
later. No per-image disclaimer is required on the page.

## Procedure

1. Confirm WO-024's accepted evidence and disclosure boundaries.
2. Record `git status --short --branch` for both Q repositories.
3. Start the mock stack and confirm no backend, container, worker, or broker
   process is running.
4. Write a scripted capture routine: fixed viewport, `deviceScaleFactor: 2`,
   fixed navigation per subject, an explicit settle wait, and animation
   quiescence before shutter. Charts must be fully rendered — no partial paths,
   no entry transitions mid-flight.
5. Before each shutter, inspect the live DOM and visible state against the
   safety contract. Reject anything unsafe or ambiguous rather than editing it
   afterwards.
6. Capture all masters to the external archive first. Inspect every master at
   original resolution before deriving anything from it.
7. Derive the 2560×1440 WebP deliverables, then re-inspect each deliverable at
   original resolution: text legible, chart lines unbroken, no resampling
   artifacts in dense chart regions.
8. Copy only accepted deliverables into `public/work/q/`.
9. Create `docs/q-case-study-media.md` recording, per asset: subject, route and
   navigation steps, capture command, master path and SHA-256, deliverable
   dimensions, byte size and SHA-256, fixture provenance (the exact
   `src/mocks/` file), and a one-sentence approved use.
10. Verify no broker, account, credential, host, or identifier string appears in
    OCR-readable pixels or in the manifest.
11. Stop all local processes. Confirm both Q repositories retain their original
    status. Record the archive path; do not delete the masters.

## Automated Checks

```bash
find public/work/q -maxdepth 1 -type f -printf "%f %s bytes\n" | sort
du -sh public/work/q
identify -format "%f %wx%h\n" public/work/q/*.webp
sha256sum public/work/q/*
git diff --check
pnpm run lint
pnpm run typecheck
pnpm run build
```

Also verify: every deliverable is exactly 2560×1440; no file exceeds 500 KiB;
the directory total is under 5 MiB; the file count is between eleven and sixteen;
and every file in the directory appears in the manifest and vice versa.

## Acceptance Checklist

- [ ] Every capture came from the MSW mock stack with no backend running.
- [ ] Eleven required subjects captured; subject 12 captured or recorded
      `DEFERRED` with its exact build error.
- [ ] Every deliverable is 2560×1440 WebP within its byte ceiling, uncropped.
- [ ] Masters archived outside the repository, hashed, and not committed.
- [ ] Every asset was visually inspected at original resolution.
- [ ] Fixture provenance is recorded per asset against `src/mocks/`.
- [ ] No broker, account, credential, host, or identifier is legible anywhere.
- [ ] Directory total, file count, and per-file ceilings all pass.
- [ ] Q source repositories are unchanged.
- [ ] Portfolio validation commands pass.

## Handoff

Include the per-file dimension/size/hash table, the master archive path with its
hash table, the fixture-provenance mapping, rejected captures and why, subject
12's outcome, the AVIF observation, OCR scan result, source-repository status
before and after, and the exact set of assets available to WO-026.
