# Quant (Q) — Case-Study Media Manifest

**Work Order:** WO-025. **State on handoff:** `REVIEW`.
**Evidence boundary:** [`q-case-study-evidence.md`](./q-case-study-evidence.md).
**Final assets:** `public/work/q/` (eleven files; subject 12 deferred).

Eleven of twelve required subjects were captured. Subject 12 (native desktop
shell) could not be produced in this environment — see [Subject 12](#subject-12-native-desktop-shell)
below — and is recorded `DEFERRED`, not blocking, per the work order.

Capture used **both** environments the revised work order permits,
`./dev.sh --mocks` (MSW fixtures) and `./dev.sh --web` (real backend +
Postgres + Redis + Dramatiq worker, with a live remote MT5 gateway on this
host), choosing per subject on rendered image quality rather than defaulting
to one source. See [Fixture audit](#fixture-audit-all-twelve-subjects) for
every subject's decision and reason.

Masters archived at `/tmp/wo025-q-media-Hx7WE3/masters/` (outside every
repository, created with `mktemp -d`), each hashed below. Deliverables
derived at `/tmp/wo025-q-media-Hx7WE3/deliverables/` before being copied into
`public/work/q/`. Neither Q source repository was modified — the capture
script lived entirely in the portfolio session's scratchpad and resolved
`q_frontend`'s own installed Playwright (`^1.51.0`) via `NODE_PATH`, never
writing into either repo.

## Capture environment

Two frontends ran concurrently against the already-live backend/infra:

- **Mocks:** `VITE_ENABLE_MSW=true PORT=1421 pnpm run dev -- --port 1421` from
  `q_frontend` — no backend, exactly what `dev.sh --mocks` would start.
- **Web:** the owner's own `./dev.sh` session (backend on `:8000`, Dramatiq
  worker, dockerized Postgres/Redis, and — specific to this host — a live
  Wine/MT5 remote gateway), with the frontend on port `1420` and later `1422`
  after a port handover (see [Session note](#session-note-mid-run-environment-reset)).

One backend bug surfaced and was fixed by the owner during capture:
`GET /api/v1/system/health` checked `mt5_connected()` (the native-Windows MT5
client's flag, always `false` on this Linux host) instead of the
gateway-aware `active_provider()` path, so it misreported `degraded`/`offline`
even while the remote gateway was healthy. The owner corrected
`q_backend/src/q_backend/api/routers/system.py` to check
`mds.acquisition_available()` instead. This is the owner's own uncommitted
work in progress, not part of this work order's scope, and is unchanged by
this capture.

### Session note: mid-run environment reset

Partway through capture the host environment restarted (the sandbox process
tree, browser extension, and every `/tmp` path were reset). All processes
captured before the reset were re-derived after it: q_backend and its worker
were restarted from this session pointed at the already-running Postgres/Redis
containers (`docker ps` showed them healthy, 16 minutes old, i.e. started by
the owner's own prior `dev.sh` run), and the mocks-mode frontend was restarted
on `:1421`. A second, brief real-time collision happened when the owner tried
to bring up their own `./dev.sh` (which starts the actual Wine MT5 terminal
and gateway) and found port 8000 already held by this session's manually
started backend; that backend and its worker were stopped so the owner's
`dev.sh` — the one with the real gateway — could bind `:8000`, and the
frontend that instance served landed on port `1422` (`1420`/`1421` already
taken). Every `--web` asset in the inventory below was captured **after**
this handover, from the owner's own `dev.sh` session.

## Fixture audit (all twelve subjects)

The work order pre-answers subjects 3, 5, and 11; the note column below
records how each pre-answer held up or changed, and the reasoning for the
other nine.

| # | Subject | Decision | Reason |
| - | --- | --- | --- |
| 1 | Launcher | `--web` | Mocks' System Gauge widget shows the same thin-fixture "BACKEND API OFFLINE / 0.1.0-mock" state as subject 11's known problem (it reads the identical `mockSystemHealth` fixture). Real backend, once the health-check bug above was fixed and the gateway reconnected, shows a clean "ONLINE" status and a populated Recent Simulations panel from real backtests run during this capture. |
| 2 | Dock | `--web` | The live job-progress badge needs an actual in-flight job; a real backtest run (CCM$, MA Crossover, 5-year H1 history) produced a genuine "BACKTESTS LIVE" progress badge, captured at the instant of triggering the run. |
| 3 | Market data | `--web` (superseded) | Work order text pre-decided mocks (dense `generateOhlcv` fixture) because at evidence-gathering time the real stack's local parquet store was empty. **Superseded during this capture**: the owner fixed the backend's MT5 gateway connection mid-session, so `--web` now serves real historical bars (PETR4, real MT5-backed candles) and was judged the stronger, more authentic image. The right-side Quote/Tape/Info panel does not populate live tick data even though the candlestick series does — a real, currently-existing gap in the live environment, not a mock artifact, accepted as-is. |
| 4 | Backtest configuration | `--web` | The Entry/Exit strategy catalog and per-strategy parameter editor are static form UI, identical in content regardless of environment; captured against the real stack mid-configuration (CCM$, H1, full history, MA Crossover selected) immediately before the run used for subject 5. |
| 5 | Backtest results | `--web` | Work order pre-decided against the mock fixture (12-point near-straight equity curve). A real backtest (CCM\$, MA Crossover, H1, full 2021–2026 history, $100,000 capital, real CCM$ point value 450) produced a genuine, well-shaped equity curve and drawdown chart with realistic magnitudes (+2,515.50 PnL, 62 trades, -12.05% max drawdown) — no synthetic seeding was needed. |
| 6 | Optimization | `--mocks` | The real stack's local store held only three symbol/timeframe combinations (none with a completed optimization study), so no real Optuna run was reachable in the capture window. Mocks has three completed studies; the two chart-style views (Chart tab, 3D Landscape surface) render empty or single-point in this fixture, so the populated **Trials** table (30 trials, Objective/Net Profit/Sharpe/Max Drawdown columns) was used instead of a literal scatter plot. |
| 7 | Walk-forward validation | `--mocks` | Same reachability limit as Optimization — no real walk-forward run existed against cached local data. Mocks has a completed "WIN$ walk-forward MA" run with a populated in-sample-vs-out-of-sample bar comparison and a per-window breakdown table (train/test ranges, best params, IS/OOS return-drawdown). |
| 8 | Strategy discovery | `--mocks` | On the real stack, a search over the empty local store returned every candidate as `ERROR`. Mocks has a completed "PETR4 discovery" search with a real ranked leaderboard (best strategy, OOS return/drawdown, efficiency). |
| 9 | Research / feature store | `--mocks` | Real backend's Feature Store showed `0` total/production/scored features (freshly restarted, unseeded). Mocks renders the full 51-feature catalog with category/status filters populated — the richer, more representative image. |
| 10 | Paper execution | `--mocks` | Real backend's execution monitor (separate heartbeat from the Dramatiq worker used for backtests) reported `API degraded / Worker offline / Market data offline` with the kill switch engaged and no deployments — an artifact of this session only running the general task worker, not a dedicated execution daemon. Mocks shows a clean paper account (Cash Balance R$98,540.50), a running `WIN H1 MACrossover` deployment, and the required `PAPER` + `LIVE LOCKED` badges. |
| 11 | System diagnostics | `--web` | Work order pre-decided against the mock fixture (same degraded/offline/`0.1.0-mock` state as subject 1). Real backend, after the health-check fix and gateway reconnect, shows `status: healthy`, `dataLakeStatus: online`, `mt5_available: true`, `active_provider: remote`, real Backend Health telemetry and a Last Sync timestamp. |
| 12 | Native desktop shell | `DEFERRED` | See below. |

## Asset inventory

Environment column reads `web` or `mocks`; the fixture audit table above has
the full reasoning.

| File | Deliverable bytes | Deliverable SHA-256 | Master bytes | Master SHA-256 | Environment / source | Approved use |
| --- | --- | --- | --- | --- | --- | --- |
| `launcher.webp` | 357,036 | `0c3d70c347b534ca8de19872325bd12159ea564b78b0512935ba9966914bf4c1` | 4,949,697 | `de933872153d9fad298d40f5ed321e084ad5ec02f425e1c581ddd0b9b2c93a3d` | web — `/`, real backend post health-fix | Show the launcher dashboard: draggable market monitor, system gauge, recent simulations |
| `dock.webp` | 65,914 | `eca9359d284dd4f7c48cfe7863a154affb50e3074d8ee041094f0f5cb1bf024e` | 1,109,437 | `81ca4664545e8ce048ca0ce1d7fb9c43ab674e8a1ef33f1aabc5a6d7fc26beb0` | web — `/backtests`, real in-flight backtest job | Show the glassmorphic workspace dock with a live job-progress badge |
| `market-data.webp` | 156,000 | `5e07c91ed800f905e123c2adf483c75bd3953d545a0c18c4da57b9925d157dae` | 2,637,357 | `29710b8518ef1943a9c565774be1de6b3e6c99c722e828b29d0f178da69a253b` | web — `/market-data`, real MT5-backed PETR4 candles | Show candlestick charting with indicators and volume |
| `backtest-studio.webp` | 171,018 | `336d93007df5ed0d9ce9b433bdaaebc4d037b6e3abe0aed80dfc3af7efea5506` | 962,808 | `c301f7478065d2a2634f02009ba3630dd990e8db6178d577b944be6bdd6335d7` | web — `/backtests`, CCM$/H1 config pre-run | Show the Entry/Exit strategy catalog and per-strategy parameter editor |
| `backtest-results.webp` | 90,228 | `3cb7d75ccc020391809454361ee9df4bf33911625bd70d059550c495a2fd9ec7` | 1,085,432 | `2b7ccae9433ce0a9db6885cd89706c7917b97abd9e70ab6787c73e1b4a375be6` | web — `/backtests`, real CCM$/MA Crossover run, 2021–2026, H1 | Show a populated equity curve and drawdown from a real backtest |
| `optimize-pareto.webp` | 125,700 | `1eb7c83e6ba449d5c01baba8603d70049a5ff766332c9b55b61e5c24ba1ca48b` | 1,297,588 | `4271d1178d88de742e69946515af0c3a66faeca6228fa5dc9fd2d648b4346c36` | mocks — `/backtests?mode=optimize`, "WIN$ MA sweep" study, Trials tab | Show completed optimization trials ranked by objective, net profit, Sharpe, and drawdown |
| `walkforward.webp` | 74,892 | `6ef72ae626e9831d86adeb9153ebb61edebf466338971791dd30defcd7043e38` | 506,434 | `6584a86af752dc27cab4e7874dccb2706ad86ce586c11639ad65cf559261b2e8` | mocks — `/backtests?mode=validate`, "WIN$ walk-forward MA" run | Show in-sample vs out-of-sample window comparison and the per-window breakdown |
| `discover-leaderboard.webp` | 163,294 | `ae0683b6c51c082fda3fce0639ca148bea303ee0c2d8cb04547a6191642cf7d7` | 1,425,974 | `8808a27e84efa6c53d82e3053943437cc57e2b75ca743d44b3e86ecb1e5bbfde` | mocks — `/discover`, "PETR4 discovery" completed search | Show the OOS-ranked strategy discovery leaderboard |
| `research-features.webp` | 188,324 | `95bdda8acba5f59f49c6b89b93b85a5d71646a438573ffee11f39327d1782c3a` | 2,813,017 | `419e6593532e535fc3ccdce40349d8688ecb23a2f1f1133a43d13ba176460f7f` | mocks — `/research?tab=store` | Show the Feature Store catalog (51 features, category/status filters) |
| `execution.webp` | 268,532 | `8bd7027fb45bbc40009ae62e814539070913468a761aa68d5b1961148e3b85e3` | 3,185,048 | `0ca9c1f9f86ebda95c9397c60f559df42944857b2adf7cf05c47ed361c3b5790` | mocks — `/execution` | Show paper accounts, a running deployment, and the locked live-trading badges |
| `system.webp` | 301,284 | `5b176cf994b714c95b8e5c6a13156777a239773898618e7324ca3315bc62826b` | 4,350,052 | `93b21a1b7fc726e2c0555413bf4d34d586cca215013ea199d450c143f07ed6a4` | web — `/system` (scrolled to Backend Health), real backend post health-fix | Show data-source, environment, and backend-health diagnostics |

Total `public/work/q/`: **1.9 MiB** across 11 files, all ≤500 KiB (target
≤250 KiB; three files — `launcher`, `system`, `execution` — exceeded the
target to preserve legibility of dense panels, still well inside the ceiling).

## Capture procedure (summary)

1. Confirmed WO-024's accepted evidence and the revised WO-025 dual-environment
   contract.
2. Recorded `git status --short --branch` for both Q repositories as the
   before-baseline (both carried the owner's own pre-existing uncommitted MT5
   gateway work; this capture did not add to that diff).
3. Started a second, mocks-mode `q_frontend` instance on a free port alongside
   the owner's already-running `--web` stack.
4. Audited every subject by rendering it on whichever environment(s) were
   reachable and judging the result (see the fixture-audit table).
5. Wrote a Playwright capture script in the session scratchpad
   (`mktemp -d`-equivalent, outside every repository), resolving
   `q_frontend`'s own installed Playwright via `NODE_PATH` rather than adding
   any file to either Q repo.
6. Captured masters at viewport 1600×900, `deviceScaleFactor: 2` (3200×1800
   raw), with an automated per-shutter text scan for broker/account/API-key/
   credential patterns (zero matches across all captures) plus manual visual
   inspection of every master before deriving a deliverable.
7. Derived 2560×1440 WebP deliverables via `ffmpeg -c:v libwebp -quality 90
   -preset text` (no upscaling — 3200×1800 already shares the 16:9 aspect
   ratio, so this is a straight 0.8× downscale), re-inspected each at full
   resolution for legible text and unbroken chart lines.
8. Copied only the eleven accepted deliverables into `public/work/q/`.

## Rejected captures

| Attempt | Reason |
| --- | --- |
| `backtest-results` — MA Crossover, $100,000 capital, 1-year default range | Zero trades (crossover never triggered on this narrow window) — rejected before deriving a deliverable. |
| `backtest-results` — RSI Mean Reversion, $100,000 capital, Val/Point 1 (default) | 17 trades but a mathematically flat equity curve (real $ PnL negligible against $100k capital) — same problem as the WO's flagged mock fixture, for a different reason. Rejected. |
| `backtest-results` — CCM$/MA Crossover, $5,000 capital, Val/Point 450 | Good equity curve shape, but Max Drawdown reported -229.86% (real leverage math against under-sized capital) — confusing for a flagship screenshot. Rejected in favor of $100,000 capital at the same real point value, which produced -12.05%. |
| `dock` — navigated to a calm page after triggering a run | The real CCM$ backtest against cached local data completes in well under a second; every attempt to navigate away before shutter caught the job already finished. Accepted instead: a same-page capture at the instant of the click, which shows both the dock badge and the "Simulating strategy…" state truthfully (the badge's own source action, not an incidental loading skeleton). |
| `optimize-pareto` — Chart tab and 3D Landscape tab | Chart tab rendered an empty axes frame (real rendering gap against the mock fixture, reproduced on two studies); 3D Landscape rendered only the single best-trial marker, not a scatter of all 30 trials. Neither met "Pareto front or trial scatter." Used the populated Trials table instead. |
| `execution` — real `--web` backend | API degraded / Worker offline / Market data offline, kill switch engaged, no deployments — an artifact of this session's worker configuration, not representative. Used mocks instead. |
| `launcher` / `system` — real `--web`, first pass | Captured while the backend's health-check bug (see above) was still live, showing "BACKEND API: DEGRADED". Recaptured after the owner's fix and gateway reconnect. |

## Subject 12: native desktop shell

**Outcome: `DEFERRED`.** Attempted `VITE_ENABLE_MSW=true pnpm tauri:dev` from
`q_frontend`. Two blockers, either alone sufficient to stop the build in this
environment:

```text
$ which cargo
(no output — cargo not found on PATH)
```

`q_frontend/README.md` states plainly: "Rust Toolchain: Required to compile
the desktop Tauri shell." `dev.sh` itself detects this exact condition and
falls back to `--web` mode with the message `'cargo' (Rust toolchain) was not
found on PATH` / `Falling back to Web Browser mode (--web)`.

Independently, the Linux WebKitGTK libraries Tauri 2's `wry` runtime needs are
also absent:

```text
$ pkg-config --exists webkit2gtk-4.1 && echo present || echo MISSING
MISSING
$ pkg-config --exists javascriptcoregtk-4.1 && echo present || echo MISSING
MISSING
```

No desktop-shell screenshot was captured. WO-026 should write the
native-desktop-application claim (`Tauri 2 desktop shell around a React SPA`,
already a `FACT — SOURCE` in the evidence register) without a supporting
image, or defer that specific illustration to a later capture pass on a host
with a Rust toolchain and WebKitGTK 4.1 installed.

## AVIF observation

Not in scope for this order (existing `<picture>` markup in
`case-study-media.tsx` is the seam for a second source, untouched here). One
representative comparison was run for input only: `launcher.webp` (WebP
quality 90, 357,036 bytes) vs. the same 2560×1440 frame encoded
`libaom-av1 -crf 28 -still-picture 1` (203,615 bytes) — **AVIF was
≈43% smaller** at a broadly comparable visual quality for this flat-UI,
limited-palette content. AVIF would very likely meaningfully beat these WebP
sizes across the set; worth a follow-up decision, not executed here.

## Confidentiality / OCR scan

Every capture ran an automated text-content scan (`document.body.innerText`)
against broker/login/server, API-key, password, database-URL, `.env`, and
account-number patterns immediately before the shutter — **zero matches**
across all captures, including the rejected ones. Manual visual inspection of
all eleven accepted masters and deliverables at original resolution confirmed
no broker name, account number, balance, MT5 server or login string, API key,
or `.env` value is legible. The only host-identifying string visible anywhere
is `http://127.0.0.1:8000` (the local API base URL shown on the System page)
— a loopback address, not a private deployment identifier, judged safe to
publish. Strategy names, parameters, and market-data symbols (PETR4, CCM$,
WIN$, VALE3, BTCUSD, EURUSD) carry no restriction per locked owner fact 7.

## Source-repository status

Both `q_backend` and `q_frontend` remained on `development` throughout.
`q_backend` carried the owner's own pre-existing uncommitted changes
(`.env.example`, `gateway/mt5_gateway.py`,
`src/q_backend/market_data/api_service.py`,
`src/q_backend/storage/runtime_config.py`, three test files, and — added
mid-session by the owner, not by this capture —
`src/q_backend/api/routers/system.py` and
`tests/api/test_system_health.py`) before and after this order; `q_frontend`
carried one pre-existing uncommitted file
(`src/workspaces/system/SystemWorkspace.tsx`) before and after. Neither
repository was written to by this capture's own tooling or script.

## Assets available to WO-026

`launcher.webp`, `dock.webp`, `market-data.webp`, `backtest-studio.webp`,
`backtest-results.webp`, `optimize-pareto.webp`, `walkforward.webp`,
`discover-leaderboard.webp`, `research-features.webp`, `execution.webp`,
`system.webp` — eleven assets in `public/work/q/`, all uncropped 2560×1440,
ready for the twelve-part narrative's at-most-one-image-per-section budget.
No desktop-shell image exists; WO-026 should not place one.

## Placeholder identity asset (2026-08-03 visual revision)

The visual revision requires a Q-emblem / Unreal Engine scene image for the
hero and for the "Designing the identity" section, but no such subject was
ever captured by this order (see [Subject 12](#subject-12-native-desktop-shell)
for the closest analogue — a different, still-deferred subject). Rather than
block the rest of the revision on it, `public/work/q/identity-placeholder.svg`
was added: a small inline SVG, clearly labelled "Placeholder — Q emblem /
Unreal Engine scene / Pending final render", at 2560×1440 to match every other
asset's intrinsic dimensions. It is referenced from `src/content/case-studies/q.ts`
via a single `IDENTITY_MEDIA_SRC` constant — replace that one path with the
approved render, still, or muted loop once it exists, and both placements
(hero + section 2) update together.
