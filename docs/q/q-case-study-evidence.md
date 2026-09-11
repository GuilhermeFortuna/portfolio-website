# Quant — Case-Study Evidence and Publication Contract

**Work Order:** WO-024. **State on handoff:** `REVIEW`.
**Sources inspected (read-only):** `/home/gui/projects/q/dev.sh`,
`/home/gui/projects/q/q_backend` (backend), and
`/home/gui/projects/q/q_frontend` (frontend). No file in either source
repository was modified. Evidence paths below are relative to the source
repository named in the row (`q_backend/…` or `q_frontend/…`), or to the
portfolio batch index when citing owner facts.

## Public disclosure boundary (read first)

This register governs what may become public Quant wording. Nothing here is
published automatically; it is the reviewed input for WO-025 and WO-026.

Quant is the owner's own product. There is **no employer, client, or
third-party confidentiality boundary**. Most of this register is a factual
inventory of what the system does so copy can describe it accurately.

- **Confidential and omitted from all public output:** credentials and `.env`
  values, broker names, account numbers, balances, MetaTrader 5 login or server
  details, API keys, and private deployment identifiers. This document
  deliberately does **not** reproduce those values; it cites the file where
  they live so a reviewer can confirm them at the source.
- **Private source:** project repositories are private and are not linked
  publicly.
- **Screenshot content:** the owner set no strategy, parameter, feature, or
  market-data restriction on what may be legible in captures. Capture the
  interface as it is from the approved mock path. The credential/broker/account
  prohibition above still applies; it is a security rule, not a disclosure
  rule.
- **No invented outcomes:** no trading profit or loss, returns, Sharpe or other
  risk-adjusted ratio, win rate, alpha, edge, strategy effectiveness,
  prediction accuracy, users or adopters, uptime, or ingestion throughput may
  be published as a real result. Those rows are listed explicitly as
  `UNSUPPORTED — DO NOT PUBLISH` below.
- **README claims are not source evidence.** Promotional README language
  (`state-of-the-art`, `high-performance`, `real-time`, `high-frequency`) is a
  candidate claim only until a cited file, route, test, migration, or command
  implements it. Several README statements are stale relative to code; code
  wins.

## Classifications

Exactly these values appear in the `Classification` column:

- `FACT — OWNER` — stated by the owner and recorded in `BATCH-04-README.md`.
- `FACT — SOURCE` — verifiable in a named source-repository file.
- `DECISION` — an owner or editorial decision about what to publish.
- `CONFIDENTIAL` — real but must not be published; value omitted here.
- `INFERENCE — REVIEW REQUIRED` — reasonable reading of the source that a
  reviewer must confirm before it is published as fact.
- `UNSUPPORTED — DO NOT PUBLISH` — no accepted evidence exists; prohibited.

Git history is evidence for dates and authorship only. It is **not** evidence
of trading outcomes, performance, correctness, or production usage.

## Owner facts

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| OWN-01 | `FACT — OWNER` | Public project name is **Quant**. Category is **Quantitative systems**. | `docs/work-orders/wo/BATCH-04-README.md` Locked Owner Fact 1; `src/content/projects.ts` category already `Quantitative systems`. | `Q` was the working shorthand and repository prefix; it is not the public name. Slug stays `q` (route `/work/q`) unless the owner later chooses `/work/quant` (DEC-03). |
| OWN-02 | `FACT — OWNER` | Quant is the owner's own product — not client or employer work. | `BATCH-04-README.md` Locked Owner Fact 2. | No third-party confidentiality boundary; only credentials, broker/account details, and private source are sensitive. |
| OWN-03 | `FACT — OWNER` | Role: founder and sole developer. | `BATCH-04-README.md` Locked Owner Facts 3 and 5. | Do not invent a team (see UNSUP-08). |
| OWN-04 | `FACT — OWNER` | The idea behind Quant is roughly six years old (≈2020) and is what led the owner to learn programming; many versions have been built and rebuilt since. | `BATCH-04-README.md` Locked Owner Fact 4 (idea lineage). | **This codebase is not six years old.** Repository evidence covers only the current implementation (GIT-01). If published copy names a specific starting year, confirm with the owner first; "six years ago" was the owner's phrasing and ≈2020 is derived. |
| OWN-05 | `FACT — OWNER` | Guilherme designed and built the product as sole owner, with AI assistance (Cursor was a development tool). | `BATCH-04-README.md` Locked Owner Fact 5; closes authorship for GIT-02. | State "with AI assistance" honestly; do not imply additional human contributors. |
| OWN-06 | `FACT — OWNER` | A research, backtesting, and (in future) execution tool for the **Brazilian futures market**. | `BATCH-04-README.md` Locked Owner Fact 2; instrument defaults corroborated by SYS-09. | Domain framing is owner fact; concrete default symbols come from source (SYS-09). |
| OWN-07 | `FACT — OWNER` | Execution is a future capability; the tool is used today for research and backtesting. | `BATCH-04-README.md` Locked Owner Fact 6; reconciled with SYS-11. | Plain factual description of what the product does today — not a disclaimer. |
| OWN-08 | `FACT — OWNER` | An earlier generation of the owner's research tooling supported a personally traded strategy that grew approximately R$3,000 into R$90,000 over roughly one year. | Owner's direct statement when requesting the WO-026 visual revision, 2026-08-03. | Historical result predates the current implementation (GIT-01). Not a forecast or a claim that this implementation produced those returns; the attribution and qualification in `q-case-study-content.md` section 3 must be preserved verbatim. |
| OWN-09 | `FACT — OWNER` | The owner created the Q emblem in Blender and its cinematic presentation scene in Unreal Engine 5. | Owner's direct statement when requesting the WO-026 visual revision, 2026-08-03. | Visual-production tooling, not a runtime dependency of the desktop application. No approved render/still/loop has been captured yet — sections referencing it use a placeholder asset until one is provided. |

## Git-derived facts (dates and authorship only)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| GIT-01 | `FACT — SOURCE` | Current implementation: backend history begins 2026-04-20 and runs through 2026-08-02; frontend history begins 2026-05-30 and runs through 2026-08-03. | `git log` in `q_backend` (earliest 2026-04-20, latest 2026-08-02) and `q_frontend` (earliest 2026-05-30, latest 2026-08-03). Re-verified 2026-08-03. | Dates show the current-implementation activity window only. Do not merge with OWN-04. |
| GIT-02 | `FACT — OWNER` | Development is single-owner with AI-assisted tooling. | Distinct author names (no emails extracted): backend 2 (`Guilherme Fortuna`, `Guilherme Fortuna dos Santos`); frontend 3 (those two plus `Cursor Agent`). Owner fact 5 states Cursor was a tool and the extra identities are tooling/duplicates. | Authorship wording rests on the owner statement, not on git inference alone. Matches Aegis GIT-03 resolution pattern. |
| GIT-03 | `FACT — SOURCE` | Sustained, active development on the current implementation (backend 164 commits; frontend 260 commits at inspection). | `git rev-list --count HEAD` = 164 (`q_backend`), 260 (`q_frontend`), recorded 2026-08-03. | Commit counts are not a productivity, quality, or trading-outcome metric. |

## Verified system boundaries

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| SYS-01 | `FACT — SOURCE` | Native desktop application shell built with Tauri 2 around a web-rendered React SPA. | `q_frontend/src-tauri/` (`Cargo.toml`, `tauri.conf.json`); `q_frontend/package.json` (`tauri` script, `react` ^19); `q_frontend/README.md` (Tauri 2 / React 19 / Vite — stack names only). | README promotional adjectives are not evidence (see UNSUP-10). |
| SYS-02 | `FACT — SOURCE` | FastAPI HTTP service is the backend API surface. | `q_backend/pyproject.toml` (`fastapi`, `uvicorn`); `q_backend/src/q_backend/api/`; `q_backend/README.md` architecture diagram (candidate only until corroborated by packages). | Do not claim "production-ready" or SLA. |
| SYS-03 | `FACT — SOURCE` | Dramatiq worker pool backed by Redis runs asynchronous jobs. | `q_backend/pyproject.toml` (`dramatiq[redis]`, `redis`); `q_backend/src/q_backend/tasks/`; `q_backend/docker-compose.yml` (`redis` service). | Presence of workers is not a throughput claim (UNSUP-09). |
| SYS-04 | `FACT — SOURCE` | PostgreSQL with Alembic migrations stores application schema. | `q_backend/pyproject.toml` (`psycopg`, `sqlalchemy`, `alembic`); `q_backend/alembic/` (17 version files); `q_backend/docker-compose.yml` (`postgres` service). | Schema evolution evidence, not data-volume evidence. |
| SYS-05 | `FACT — SOURCE` | MetaTrader 5 integration for market-data and (future) execution, with a separate read-only remote gateway that exposes no order API. | `q_backend/pyproject.toml` (`metatrader5`); `q_backend/gateway/mt5_gateway.py` (module docstring: read-only OHLCV/ticks/symbols; "never imports or exposes any trading/order API"). | Gateway is market-data only. Live order path remains locked (SYS-11). |
| SYS-06 | `FACT — SOURCE` | Optuna-driven optimization is part of the backend stack. | `q_backend/pyproject.toml` (`optuna`); `q_backend/src/q_backend/optimization/`; frontend optimize route redirects into Backtests (`q_frontend/src/app/router.tsx` `/optimize` → `/backtests?mode=optimize`). | Do not claim optimization "edge" or strategy effectiveness (UNSUP-05). |
| SYS-07 | `FACT — SOURCE` | Market-data ingestion and local Parquet/storage paths exist alongside MT5 and remote-gateway providers. | `q_backend/src/q_backend/market_data/`; `q_backend/src/q_backend/storage/`. | Do not publish ingestion throughput (UNSUP-09). |
| SYS-08 | `FACT — SOURCE` | Deterministic mock path: `./dev.sh --mocks` runs the SPA on Vite with `VITE_ENABLE_MSW=true` and starts no backend, Postgres, Redis, or MetaTrader 5 connection; fixtures live under `q_frontend/src/mocks/`. | `/home/gui/projects/q/dev.sh` (mocks mode skips infra/backend; sets `VITE_ENABLE_MSW=true`); `q_frontend/src/mocks/` (`browser.ts`, `handlers.ts`, domain fixtures); `q_frontend/public/mockServiceWorker.js`. | This is the approved capture path for WO-025. |
| SYS-09 | `FACT — SOURCE` | Default instrument directory includes B3 equities (`PETR4`, `VALE3`, `ITUB4` on BOVESPA) and BMF futures (`WIN$` IBOVESPA Mini, `WDO$` Dólar Mini); additional symbols can appear from the local store or MT5. | `q_backend/src/q_backend/market_data/api_service.py` (`DEFAULT_B3_INSTRUMENTS`, `infer_asset_class`); Brasília timezone helpers in `q_backend/src/q_backend/market_data/timezone.py`. | `CCM$` appears in README/tests as a showcase symbol but is **not** in `DEFAULT_B3_INSTRUMENTS`. Prefer "Brazilian futures / B3" framing over inventing a multi-venue catalogue. |
| SYS-10 | `FACT — SOURCE` | Neural / feature-intelligence backend packages and migrations exist alongside the Research Neural Features UI. | `q_backend/src/q_backend/neural/`; `q_backend/src/q_backend/features/`; Alembic neural-related migrations under `q_backend/alembic/versions/`; frontend WF-07. | Implementation depth may still be early relative to any full autoencoder roadmap; do not claim prediction accuracy (UNSUP-06). |
| SYS-11 | `FACT — SOURCE` | Live trading is locked in the UI and refused by the backend: the Execution workspace forces paper mode and shows a Live locked badge; API validation allows only `paper` broker mode and rejects `live_activation_enabled`; settings default to live capability locked / live execution disabled / dry-run true; additional live gates and dry-run blocks exist on the MT5 broker path. | UI: `q_frontend/src/workspaces/execution/ExecutionWorkspace.tsx` (`execution-live-locked-badge`, `broker_mode: 'paper'`, `live_activation_enabled: false`). API: `q_backend/src/q_backend/execution/validation.py` (`validate_broker_mode` — "only paper broker_mode is supported", "live_activation_enabled is locked"). Settings: `q_backend/src/q_backend/storage/settings.py` (`execution_live_capability_locked=True`, `live_execution_enabled=False`, `live_execution_dry_run=True`). Gates: `q_backend/src/q_backend/execution/brokers/live_gates.py`, `metatrader.py`. | Reconciles with OWN-07. Describe as research/backtesting with paper execution today; live execution is future capability, not a current operating mode. |

## Verified user-facing workflows

Twelve directories exist under `q_frontend/src/workspaces/`. Status below is from
router and workspace code, not from README promotional copy.

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| WF-01 | `FACT — SOURCE` | Launcher workspace at `/`. | `q_frontend/src/workspaces/launcher/`; `q_frontend/src/app/router.tsx` index route. | — |
| WF-02 | `FACT — SOURCE` | Market Data workspace at `/market-data`. | `q_frontend/src/workspaces/market-data/`; router `/market-data`. | README "real-time" / "high-frequency" adjectives are prohibited (UNSUP-10). |
| WF-03 | `FACT — SOURCE` | Storage workspace at `/storage`. | `q_frontend/src/workspaces/storage/`; router `/storage`. | — |
| WF-04 | `FACT — SOURCE` | Backtests workspace at `/backtests`; Optimize and Validate are modes on this workspace (`/optimize` and `/validate` redirect here). | `q_frontend/src/workspaces/backtests/`; router redirects at `/optimize` and `/validate`. | Do not invent separate Optimize/Validate top-level products beyond these modes. |
| WF-05 | `FACT — SOURCE` | Strategy Builder (AI Builder) workspace at `/strategy-builder`. | `q_frontend/src/workspaces/strategy-builder/`; router `/strategy-builder`. | — |
| WF-06 | `FACT — SOURCE` | Discover workspace at `/discover`. | `q_frontend/src/workspaces/discover/`; router `/discover`. | — |
| WF-07 | `FACT — SOURCE` | Research workspace at `/research` with tabs including store, scoring, lab, **Neural Features**, and experiments. | `q_frontend/src/workspaces/research/ResearchWorkspace.tsx` (imports `NeuralFeaturesTab`, tab value `neural`); tests in `q_frontend/src/workspaces/research/__tests__/ResearchWorkspace.test.tsx`. | Frontend README still says Neural Features is deferred — **stale**. Code ships the tab. Do not claim model accuracy (UNSUP-06). |
| WF-08 | `FACT — SOURCE` | Execution workspace at `/execution` for paper execution; live trading is locked. | `q_frontend/src/workspaces/execution/ExecutionWorkspace.tsx`; SYS-11. | Paper only today (OWN-07 / SYS-11). |
| WF-09 | `FACT — SOURCE` | System workspace at `/system`. | `q_frontend/src/workspaces/system/`; router `/system`. | — |
| WF-10 | `FACT — SOURCE` | News reader as a secondary window at `/news-reader`. | `q_frontend/src/workspaces/news/`; router `/news-reader` (not a primary dock item). | Secondary surface; do not present as a primary chapter pillar. |
| WF-11 | `FACT — SOURCE` | The `strategy/` directory is shared exit-rule helpers for Backtests/Optimize, not a routed workspace. Path `/strategy` redirects to `/strategy-builder`. | `q_frontend/src/workspaces/strategy/` (`exitRuleSemantics.ts`, `exitWorkbenchGroups.ts` only); router `strategyRoute` redirects to `/strategy-builder`. | Frontend README claim that `/strategy` redirects to Backtests is **stale**; code redirects to Strategy Builder. |
| WF-12 | `FACT — SOURCE` | Walk-forward UI components exist under `walkforward/`, but no router mount exposes them as a top-level workspace; validation is reached via `/validate` → Backtests. | `q_frontend/src/workspaces/walkforward/WalkForwardWorkspace.tsx` (and related components); no `walkforward` path in `q_frontend/src/app/router.tsx`. | Orphaned shell relative to routing — do not list Walk-Forward as a shipped primary workspace. |

## Performance claims

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| PERF-01 | `FACT — SOURCE` | Frontend documents observability budgets (target FPS 55, frame budget at 60 Hz, long-task warning 50 ms, route mount-query ceilings, strategy-builder renderer budgets) and a `pnpm perf:smoke` script. | `q_frontend/src/lib/performance/budgets.ts`; `q_frontend/package.json` script `perf:smoke`; `q_frontend/README.md` perf-smoke row; unit tests under `q_frontend/tests/unit/lib/performance/`. | Budgets are **not enforced in CI yet** (`budgets.ts` header comment). Publish budget existence, not measured production FPS. |
| PERF-02 | `FACT — SOURCE` | Candlestick chart layers memoize indicator series on `(data, params)` and RAF-throttle hover so data layers do not recompute on pointer move. | `q_frontend/README.md` "Chart performance" memoization notes (implementation detail described there; admissible as the WO-named evidence source for memoization). | Memoization is an implementation technique, not a "real-time" or "high-performance" marketing claim. |

## Media and capture safety

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| MEDIA-01 | `DECISION` | Screenshot content has **no** strategy, parameter, feature, or market-data restriction. Capture the interface as it is. | `BATCH-04-README.md` Locked Owner Fact 7. | Security rule in MEDIA-02 still applies. |
| MEDIA-02 | `DECISION` | **Exact strategy-pixel boundary for WO-025:** fixture-driven UI may show strategy logic, parameters, features, charts, and market-data symbols as rendered by MSW mocks. Operators must **not** capture or publish pixels that reveal credentials, broker login or server strings, account numbers, live balances from a real broker connection, API keys, or `.env` values. Prefer `./dev.sh --mocks` so no live broker session is required. | `BATCH-04-README.md` Locked Owner Fact 7 and Shared Prohibitions; SYS-08 mock path; CONF-* rows. | If a capture accidentally includes a credential or account identifier, discard it and recapture from mocks. |

## Owner and editorial decisions

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| DEC-01 | `DECISION` | Project repositories are private; no public source link is published for Quant. | `docs/content.md` "Chapter structure"; `BATCH-04-README.md` Shared Prohibitions. | Applies to case-study CTAs and metadata. |
| DEC-02 | `DECISION` | Omit the live-environment hero control for Quant. It is a native desktop application with no live URL that will ever resolve; a permanently disabled control would be dead weight. | `BATCH-04-README.md` Locked Owner Fact 8 (recommended); parallel to gosigapp note in `docs/content.md`. | Confirm or overrule before WO-026 if the owner prefers otherwise. Until overruled, WO-026/WO-027 omit the control rather than rendering `Live environment — coming soon`. |
| DEC-03 | `DECISION` | Public display name is `Quant`; route slug stays `q` (`/work/q`, assets under `public/work/q/`). | `BATCH-04-README.md` Locked Owner Fact 1. | Changing to `/work/quant` is free until WO-025 writes assets; after that it is not free. |
| DEC-04 | `DECISION` | Metadata title for `/work/q` uses the public name Quant (not the shorthand Q). | OWN-01; this register; `docs/content.md` Metadata table update in WO-024. | Description must stay free of invented outcome metrics. |
| DEC-05 | `DECISION` | Portfolio media for Quant is produced from the MSW mock path (`./dev.sh --mocks`), not from a live broker or production account session. | SYS-08; MEDIA-02; `BATCH-04-README.md` Shared Prohibitions. | Fixture data in screenshots needs no per-image trading disclaimer; outcome claims remain prohibited. |

## Confidential — do not publish (values omitted)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| CONF-01 | `CONFIDENTIAL` | Omit credentials, API keys, and `.env` contents. | `.env` files exist in local Q environments; they were not opened. | Never read or copy values into portfolio docs, media, or the bundle. |
| CONF-02 | `CONFIDENTIAL` | Omit broker names, account numbers, balances, and MetaTrader 5 login or server details. | Referenced by execution/settings and gateway configuration surfaces; values omitted here. | Security rule for all public copy and every WO-025 capture. |
| CONF-03 | `CONFIDENTIAL` | Omit private deployment identifiers and internal hostnames. | May appear in local operator config; not opened for this register. | Describe architecture generically (SYS-* rows) without hostnames. |
| CONF-04 | `CONFIDENTIAL` | Treat private source repositories as non-public; do not publish repository URLs. | DEC-01; `docs/content.md` chapter-structure decision. | Public GitHub profile link for the person remains separate and already approved. |

## Unsupported — do not publish

No accepted evidence exists for any of the following as real outcomes. Each is
prohibited unless a source is accepted in a future, reviewed decision. This is
the same no-invented-metrics discipline WO-018 applied to Aegis, applied to
the metric vocabulary this domain uses.

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| UNSUP-01 | `UNSUPPORTED — DO NOT PUBLISH` | Trading profit or loss attributable to Quant. | No source. | Prohibited. |
| UNSUP-02 | `UNSUPPORTED — DO NOT PUBLISH` | Returns or performance track record. | No source. | Prohibited. |
| UNSUP-03 | `UNSUPPORTED — DO NOT PUBLISH` | Sharpe ratio or any other risk-adjusted ratio as a real result. | No source. | Prohibited. Interface may show fixture metric labels; do not assert them as live results. |
| UNSUP-04 | `UNSUPPORTED — DO NOT PUBLISH` | Win rate. | No source. | Prohibited. |
| UNSUP-05 | `UNSUPPORTED — DO NOT PUBLISH` | Alpha, edge, or strategy effectiveness. | No source. | Prohibited. |
| UNSUP-06 | `UNSUPPORTED — DO NOT PUBLISH` | Prediction accuracy or model quality scores as proven outcomes. | No source. | Prohibited. |
| UNSUP-07 | `UNSUPPORTED — DO NOT PUBLISH` | Users, adopters, or customer count. | No source; OWN-02 is a personal product. | Prohibited. |
| UNSUP-08 | `UNSUPPORTED — DO NOT PUBLISH` | Team size or that others were managed/led. | Owner states sole founder/developer with AI assistance (OWN-03, OWN-05). | Prohibited. |
| UNSUP-09 | `UNSUPPORTED — DO NOT PUBLISH` | Uptime, availability, or ingestion throughput numbers. | No source. | Prohibited. |
| UNSUP-10 | `UNSUPPORTED — DO NOT PUBLISH` | Promotional README language as product fact: `state-of-the-art`, `high-performance`, `real-time`, `high-frequency`, `production-ready`. | Appears in `q_frontend/README.md` and/or `q_backend/README.md` as marketing tone; not backed by a cited budget, benchmark, or production proof beyond PERF-01/PERF-02 technique notes. | Prohibited on README authority. Revisit only with new admissible evidence. |

## Known gaps and limits (implemented vs planned)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| GAP-01 | `FACT — SOURCE` | Frontend README workspace notes drift from code: `/strategy` target and Neural Features deferral are outdated. | README vs WF-07 / WF-11 evidence above. | Publish from code. Do not repeat stale README limits as current product limits. |
| GAP-02 | `FACT — SOURCE` | Walk-forward workspace directory is an unmounted shell relative to the router. | WF-12. | Do not list it among shipped primary workspaces. |
| GAP-03 | `FACT — SOURCE` | Performance budgets are documented and smoke-testable but not CI-enforced. | PERF-01 (`budgets.ts` comment). | Do not imply continuous performance gating. |
| GAP-04 | `FACT — SOURCE` | Homepage project record still uses display name `Q` while the public name is `Quant`. | `src/content/projects.ts` (`name: "Q"`, `slug: "q"`). | Out of WO-024 write scope; WO-027 (or an earlier owner edit) must rename the display string. |

## Unresolved facts (needed before or during WO-025/WO-026)

- Owner confirmation that DEC-02 (omit live-environment control) stands for
  WO-026, or an explicit overrule.
- Owner confirmation that slug stays `/work/q` (DEC-03) before WO-025 writes
  assets under `public/work/q/`.
- Display-name rename `Q` → `Quant` in `src/content/projects.ts` (GAP-04) —
  tracked for WO-027; not modified in this order.
- Approved high-resolution media set from the mock path (WO-025).
- Owner-approved narrative and exact visible copy (WO-026).
- **Still open:** an approved Q-emblem render, Unreal Engine scene still, or
  short muted scene loop (OWN-09). The 2026-08-03 visual revision ships with
  `public/work/q/identity-placeholder.svg` standing in for this asset in the
  hero and in section 2 of `q-case-study-content.md`.
