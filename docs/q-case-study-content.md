# Quant — Case-Study Content Contract

**Work Order:** WO-026. **State on handoff:** `DONE` (owner approved
2026-08-03).
**Evidence register (authoritative for claims):**
[`q-case-study-evidence.md`](./q-case-study-evidence.md).
**Media inventory (authoritative for assets):**
[`q-case-study-media.md`](./q-case-study-media.md).
**Consumers:** WO-027 renders this copy verbatim into `/work/q`. WO-027 must
not reword visible copy without a new gate.

## How to read this file

Each numbered section below is one section of the `/work/q` page, in the fixed
order WO-026 requires. Every section gives:

- **Heading** — the exact visible heading string.
- **Visible copy** — the exact rendered prose. Copy it verbatim.
- **Media** — the asset filename from `public/work/q/`, its alt text or an
  explicit decorative decision, and any visible caption.
- **Author note** — not rendered. Cites the WO-024 claim IDs backing each
  technical claim, plus wording limits.

Visible prose is delimited by `<!-- copy:start … -->` / `<!-- copy:end -->` HTML
comments so the word budget is machine-countable (see
[Verification](#verification)). Those comments are invisible when rendered and
must not be carried into route code.

**Author notes and `[REQUIRED: …]` markers must never reach rendered output,
metadata, JSON-LD, generated assets, or the production bundle.**

---

## 1. Hero

**Heading (h1):**

<!-- copy:start id=hero-title -->
Quant
<!-- copy:end -->

**Deck (visible, directly under the h1):**

<!-- copy:start id=hero-deck -->
Research and backtesting for the Brazilian futures market
<!-- copy:end -->

**Meta list** — four label/value pairs, rendered as a definition list:

<!-- copy:start id=hero-meta -->
Role
Founder and sole developer
Period
April 2026–present
State
Research and backtesting
Source
Private
<!-- copy:end -->

**Support copy (46 words, limit 55):**

<!-- copy:start id=hero-support limit=55 -->
Quant is my research and backtesting tool for the Brazilian futures market. I
am the founder and sole developer. The idea is about six years old; this
implementation dates from April 2026. I designed and built every layer as a
native desktop application, with AI assistance.
<!-- copy:end -->

**Actions:** none. The live-environment control is omitted entirely (DEC-02).
WO-027 must not render Aegis's disabled `Live environment — coming soon` pill
on this route.

**Media:** `launcher.webp`.

Alt text:

<!-- copy:start id=hero-media-alt render=alt-attribute-only -->
The Quant launcher dashboard: a dark desktop console with a market monitor, a
system gauge reading online, and a recent-simulations panel.
<!-- copy:end -->

**Author note.** Title and category framing ← OWN-01. Role ← OWN-03. Period ←
GIT-01 for the current implementation window; do not merge with OWN-04's
six-year idea lineage in the meta list — the support sentence keeps both
timelines explicit and separate. State ← OWN-07 / SYS-11 (research and
backtesting today; execution is future). `Source: Private` ← DEC-01. Domain ←
OWN-06. Native desktop ← SYS-01. "with AI assistance" ← OWN-05. Own product,
not client work ← OWN-02. Hero media is the launcher still and carries no
caption, matching the Aegis hero pattern. Subject 12 (native window chrome)
was deferred in WO-025, so the hero shows the product surface, not the OS
frame.

---

## 2. Context

**Heading (h2):**

<!-- copy:start id=context-heading -->
The context
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=context-body -->
Quant is my own product. It is a research, backtesting, and future-execution
tool aimed at the Brazilian futures market — instruments like WIN$ and WDO$ on
BMF, alongside B3 equities when the local store or MetaTrader 5 provides them.

The idea is roughly six years old. It is the problem that made me learn to
program, and I have rebuilt it many times. What you see here is the current
implementation, begun in April 2026 — not a six-year-old codebase. This is the
most capable version I have shipped of that long idea.
<!-- copy:end -->

**Media:** none.

**Author note.** Own product ← OWN-02. Domain and Brazilian futures ← OWN-06.
Default instruments WIN$/WDO$ and B3 equities ← SYS-09; MetaTrader 5 as a
provider ← SYS-05. Two timelines ← OWN-04 and GIT-01; the sentence that denies
a six-year codebase is mandatory. "most capable" is comparative across the
owner's own rebuilds, not a market claim (UNSUP-05).

---

## 3. Problem

**Heading (h2):**

<!-- copy:start id=problem-heading -->
The problem
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=problem-body -->
A strategy idea is cheap. Turning it into something I can test, optimize,
validate, and eventually deploy is not — especially if a single backtest is
allowed to look like proof.

The work is a pipeline, not a chart. Market data has to land in a place the
research tools can reuse. Simulations have to run without freezing the
interface. Parameter searches have to be inspectable. Out-of-sample checks
have to sit between a promising run and any path toward live money. And until
execution is ready, the product must refuse to pretend it is already trading
live.
<!-- copy:end -->

**Media:** none.

**Author note.** No technology is named in this section, per the WO-026 rule
that the problem precedes the stack. The pipeline verbs map forward to SYS-07
(ingestion), SYS-03 (async jobs), SYS-06 (optimization), WF-04 validate mode /
walk-forward surfaces, and SYS-11 / OWN-07 (live locked). "live money" is the
problem statement, not a published trading outcome (UNSUP-01–UNSUP-05).

---

## 4. System overview

**Heading (h2):**

<!-- copy:start id=system-heading -->
How the system fits together
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=system-body -->
Quant is a native desktop application: a Tauri 2 shell around a React
single-page app. The SPA talks to a FastAPI service. Heavy research jobs —
backtests, optimization studies, discovery searches — leave the API and run in
a Dramatiq worker pool backed by Redis. PostgreSQL holds the application
schema through Alembic migrations. Market data arrives through MetaTrader 5
and a separate read-only remote gateway that exposes no order API, then lands
in local storage paths the research workspaces read. A mocks mode runs the
same interface against fixtures with no backend, database, queue, or broker
connection at all.
<!-- copy:end -->

**Media:** `system.webp`.

Alt text:

<!-- copy:start id=system-media-alt render=alt-attribute-only -->
The Quant system workspace showing data-source status, environment details, and
backend-health telemetry with the service marked healthy.
<!-- copy:end -->

Caption:

<!-- copy:start id=system-media-caption -->
System diagnostics against a local stack: data source, environment, and
backend health in one place.
<!-- copy:end -->

**Author note.** Desktop shell ← SYS-01. FastAPI ← SYS-02. Dramatiq/Redis ←
SYS-03. Postgres/Alembic ← SYS-04. MT5 + read-only gateway ← SYS-05. Market-data
ingestion and local storage ← SYS-07. Mocks path ← SYS-08. Do not say
"production-ready", "real-time", or "high-performance" (UNSUP-10). Alt text
describes only what is in the pixels; the capture is from the live `--web`
stack after the owner fixed the health-check path (`q-case-study-media.md`).

---

## 5. Decision 1

**Heading (h2):**

<!-- copy:start id=decision-1-heading -->
Decision 1 — Ship a desktop application, not a website
<!-- copy:end -->

**Visible copy (138 words, limit 140):**

<!-- copy:start id=decision-1-body limit=140 -->
The shortest path would have been a browser app. I built Quant as a native
desktop product instead: Tauri 2 wraps the React interface so the research
console lives on my machine, next to the market-data and worker processes it
depends on.

My reasoning was control and honesty about the boundary. A quantitative
research tool that talks to MetaTrader 5, holds local Parquet, and runs long
jobs does not behave like a public website. Packaging it as a desktop shell
keeps that boundary visible — this is an operator tool, not a SaaS page waiting
for a staging URL.

The cost is a real native toolchain. Without Rust and the platform WebKit
libraries, the shell does not build, and the same interface falls back to a
browser for development. That fallback is useful. It is not the product.
<!-- copy:end -->

**Media:** none. Subject 12 (native desktop chrome) was deferred in WO-025; do
not invent a shell screenshot.

**Author note.** Tauri 2 desktop boundary ← SYS-01. MT5 and local storage as
reasons ← SYS-05, SYS-07. Workers as part of the local stack ← SYS-03. No live
URL / omit hero control ← DEC-02. Browser fallback for development is how
`dev.sh` and WO-025 capture actually behaved when `cargo` was missing; it must
not be described as the shipped product shape. First-person judgement with a
stated cost, matching the Aegis decision tone.

---

## 6. Decision 2

**Heading (h2):**

<!-- copy:start id=decision-2-heading -->
Decision 2 — Push heavy work onto a queued worker pool
<!-- copy:end -->

**Visible copy (119 words, limit 140):**

<!-- copy:start id=decision-2-body limit=140 -->
Backtests, optimization sweeps, and discovery searches are too heavy to run
inside the API request that starts them. Blocking there would freeze the
console every time a study began.

So the API accepts the job and returns. Dramatiq workers, backed by Redis,
pull the work and run it asynchronously while the interface keeps responding.
The workspace dock shows progress on jobs that are actually in flight — a
badge, not a spinner pretending the page itself is computing.

The trade-off is operational: workers, Redis, and the API have to stay aligned,
or the console looks healthy while the research path is offline. That is a
failure mode I would rather see in diagnostics than hide behind a synchronous
endpoint.
<!-- copy:end -->

**Media:** `dock.webp`.

Alt text:

<!-- copy:start id=decision-2-media-alt render=alt-attribute-only -->
The Quant workspace dock with a glassmorphic bar and a live job-progress badge
reading that a backtest is in flight.
<!-- copy:end -->

Caption:

<!-- copy:start id=decision-2-media-caption -->
A backtest accepted by the API and running on the worker pool, with progress on
the dock.
<!-- copy:end -->

**Author note.** Dramatiq/Redis worker pool ← SYS-03. Job types named are the
research surfaces that use async work (WF-04 optimize/validate modes, WF-06
discover). Presence of workers is not a throughput claim (UNSUP-09). Dock
capture ← `q-case-study-media.md` subject 2 (`--web`, real in-flight job).

---

## 7. Decision 3

**Heading (h2):**

<!-- copy:start id=decision-3-heading -->
Decision 3 — Force validation between backtest and deployment
<!-- copy:end -->

**Visible copy (113 words, limit 140):**

<!-- copy:start id=decision-3-body limit=140 -->
A single backtest can flatter any idea. I did not want a straight line from a
pretty equity curve to a deployment switch.

So the research path is staged inside Backtests. Optimize and Validate are
modes on that workspace, not separate products. Validation surfaces
walk-forward style checks: in-sample against out-of-sample windows, with a
per-window breakdown, so a parameter set has to survive held-out periods
before it looks trustworthy.

I still treat that as a gate in my own process, not as proof that a strategy
works. The system computes the comparison; it does not earn a return. Live
trading stays locked. Paper execution is the only broker mode the product will
accept today.
<!-- copy:end -->

**Media:** `walkforward.webp`.

Alt text:

<!-- copy:start id=decision-3-media-alt render=alt-attribute-only -->
A walk-forward validation view comparing in-sample and out-of-sample window
results beside a per-window breakdown table.
<!-- copy:end -->

Caption:

<!-- copy:start id=decision-3-media-caption -->
In-sample versus out-of-sample windows on a completed validation run. The
figures are what the tool computes — not a published trading record.
<!-- copy:end -->

**Author note.** Optimize/Validate as Backtests modes ← WF-04. Walk-forward UI
components exist under `walkforward/` but are not a top-level routed workspace
← WF-12 / GAP-02; copy correctly attributes validation to Backtests modes and
must not list Walk-Forward as a shipped primary dock item. Caption discharges
UNSUP-01–UNSUP-05: describing computed comparison is allowed; claiming earned
returns is not. Live locked / paper only ← SYS-11, OWN-07. Capture is from
mocks (`q-case-study-media.md` subject 7).

---

## 8. Decision 4

**Heading (h2):**

<!-- copy:start id=decision-4-heading -->
Decision 4 — Build the interface against fixtures first
<!-- copy:end -->

**Visible copy (122 words, limit 140):**

<!-- copy:start id=decision-4-body limit=140 -->
Waiting for every backend path before shaping the console would have stalled
the product. I needed the workspaces to exist as a real interface while the
API, workers, and market-data path were still moving.

So the frontend has a deterministic mocks mode: one command starts the SPA with
Mock Service Worker fixtures and starts no backend, Postgres, Redis, or
MetaTrader connection. I could design launcher, backtests, research, and
execution against stable responses, then point the same screens at the real
stack when it was ready.

The cost is discipline. Fixture data can look finished. The rule on this page
is the same as in the product: the interface may show what a run computes; it
must not invent a live track record.
<!-- copy:end -->

**Media:** none. The decision is a development boundary, not a product surface
to illustrate with a gallery shot.

**Author note.** MSW / `./dev.sh --mocks` ← SYS-08. DEC-05 preferred mocks for
portfolio capture; WO-025 widened per-subject source choice, which does not
change this engineering decision. Closing sentence re-asserts UNSUP-01–UNSUP-05
and MEDIA-02. Named workspaces are shipped surfaces ← WF-01, WF-04, WF-07,
WF-08.

---

## 9. Contribution

**Heading (h2):**

<!-- copy:start id=contribution-heading -->
What I did
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=contribution-body -->
I designed and built Quant end to end, with AI assistance throughout: product
and interaction design, the Tauri shell and React workspaces, the FastAPI
service, the Dramatiq workers, the Postgres schema, market-data ingestion and
the read-only MetaTrader gateway, optimization and validation flows, paper
execution with live trading locked, the test suites, and the mocks path that
lets the interface move ahead of the API.

AI sped that work up — scaffolding, refactors, tests, review. The architecture,
the trade-offs above, and the product decisions are mine.
<!-- copy:end -->

**Media:** none.

**Author note.** End-to-end ownership with AI assistance ← OWN-05, OWN-03;
Cursor as tooling ← GIT-02. Layer list maps to SYS-01, SYS-02, SYS-03, SYS-04,
SYS-05, SYS-06, SYS-07, SYS-08, SYS-11, WF-*. No team or leadership claim
(UNSUP-08). Second paragraph required: AI assists, it does not independently
build the product.

---

## 10. Delivered

**Heading (h2):**

<!-- copy:start id=delivered-heading -->
Delivered
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=delivered-body -->
Quant is in active use for research and backtesting. Execution is a future
capability. This page reports what was built, not what any strategy earned.

Shipped and working: the launcher; market data; storage; backtests with
optimize and validate modes; strategy builder; discovery; research including
neural features; paper execution with live trading locked; system diagnostics;
and a secondary news reader. A mocks mode runs the full interface without
infra. Default instruments cover B3 equities and BMF futures such as WIN$ and
WDO$.

Three limits I would rather state outright. Live trading is refused by the UI
and the API — paper is the only broker mode today. Walk-forward UI components
exist, but they are not mounted as a top-level workspace; validation is reached
through Backtests. Performance budgets are documented and smoke-testable, but
they are not enforced in CI yet.
<!-- copy:end -->

**Media:** `execution.webp`.

Alt text:

<!-- copy:start id=delivered-media-alt render=alt-attribute-only -->
The Quant execution workspace showing a paper account, a running paper
deployment, and badges that mark paper mode and live trading as locked.
<!-- copy:end -->

Caption:

<!-- copy:start id=delivered-media-caption -->
Paper execution with live trading locked. Fixture data in the capture; not a
broker statement.
<!-- copy:end -->

**Author note.** Active research/backtesting + future execution ← OWN-07.
Heading is `Delivered`, never `Impact`. Capability list ← WF-01–WF-10, SYS-08,
SYS-09, SYS-11. Gaps ← SYS-11, GAP-02/WF-12, GAP-03/PERF-01. Caption is the
single fixture-data disclosure for this page's placed figures that need it;
do not repeat a disclaimer on every image. Capture from mocks
(`q-case-study-media.md` subject 10). Do not quote fixture cash balances or
PnL as real results (UNSUP-01–UNSUP-05, CONF-02).

---

## 11. Technology in context

**Heading (h2):**

<!-- copy:start id=technology-heading -->
Technology, in context
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=technology-body -->
Tauri 2 for the desktop shell. React, Vite, and the SPA router for the
interface. FastAPI for the HTTP API. Dramatiq and Redis for the worker pool.
PostgreSQL and Alembic for schema. MetaTrader 5 plus a read-only remote
gateway for market data. Optuna for optimization studies. Mock Service Worker
for the fixture-first frontend. pytest and the frontend unit suite for
automated checks.

Nothing there was chosen for its own sake; each entry exists because a decision
above needed it.
<!-- copy:end -->

**Media:** none.

**Author note.** Stack names ← SYS-01–SYS-08, SYS-06. Closing sentence required
by the batch prohibition on a bare technology inventory. No version numbers.
No promotional README adjectives (UNSUP-10).

---

## 12. Disclosure note and actions

**Heading (h2):**

<!-- copy:start id=disclosure-heading -->
A note on disclosure
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=disclosure-body -->
Quant is my own product, so there is no client confidentiality boundary here.
I have still left things off this page: credentials, broker login details,
account numbers, private deployment identifiers, and any repository link. The
source is private. Live trading is locked in the product today; what you see
in execution captures is paper mode.

To go further than a public page allows, ask me directly.
<!-- copy:end -->

**Actions** — exactly two, in this order:

<!-- copy:start id=disclosure-actions -->
Back to selected work
Get in touch
<!-- copy:end -->

**Media:** none.

**Author note.** Own product ← OWN-02. Omissions ← CONF-01–CONF-04, DEC-01.
Execution status ← SYS-11, OWN-07. Action targets match Aegis:
`Back to selected work` → `/#work`; `Get in touch` → `/#contact`. No live
environment, résumé, or repository action. Heading uses `disclosure` rather
than `confidentiality` because Quant has no third-party confidentiality
regime; the section still states what is omitted.

---

## Media-to-section mapping

| Asset | Section | Role | Accessible text |
| --- | --- | --- | --- |
| `launcher.webp` | 1. Hero | Hero still | `alt` from `hero-media-alt` |
| `system.webp` | 4. System overview | Figure + caption | `alt` from `system-media-alt` |
| `dock.webp` | 6. Decision 2 | Figure + caption | `alt` from `decision-2-media-alt` |
| `walkforward.webp` | 7. Decision 3 | Figure + caption | `alt` from `decision-3-media-alt` |
| `execution.webp` | 10. Delivered | Figure + caption | `alt` from `delivered-media-alt` |

Five of eleven accepted WO-025 assets are placed. At most one image per
narrative section. No asset outside `public/work/q/` is introduced. Subject 12
(native desktop shell) remains unavailable and is not placed.

## Reserved-media manifest

First-class outcome of WO-026: captures deliberately not placed on this page,
reserved for a later visual batch.

| Asset | One-line later-use note |
| --- | --- |
| `market-data.webp` | Candlestick workspace with indicators; strong for a market-data deep dive or animated series beat. |
| `backtest-studio.webp` | Entry/exit strategy catalog and parameter editor; supports a configuration-focused visual chapter. |
| `backtest-results.webp` | Equity curve and drawdown from a real CCM$ run; use only with captions that refuse outcome claims. |
| `optimize-pareto.webp` | Optimization trials table; later optimize/study surface without treating metric columns as published results. |
| `discover-leaderboard.webp` | OOS-ranked discovery leaderboard; later discovery chapter without effectiveness claims. |
| `research-features.webp` | Feature Store catalog (51 fixture features); later research/neural features visual. |
| Native desktop shell (subject 12, deferred) | OS window chrome around the SPA; recapture on a host with Rust + WebKitGTK 4.1 when Decision 1 needs a literal shell still. |

## Forbidden-language review

| Term | Status in this file |
| --- | --- |
| `production-ready` | Not used. |
| `revolutionary` | Not used. |
| `state-of-the-art` | Not used. |
| `enterprise-grade` | Not used. |
| `real-time` | Not used. |
| `high-frequency` | Not used. |
| `high-performance` | Not used. |
| `Impact` as a delivery word | Not used. Section 10 is headed `Delivered`. |
| Trading profit / return / Sharpe / win rate / alpha / edge as real results | Not used as claims. Section 7 and captions describe computed comparisons only; section 10 refuses earned outcomes. |

## Claim-by-claim reconciliation

Every visible sentence traces to an accepted register row. Claims used:
OWN-01, OWN-02, OWN-03, OWN-04, OWN-05, OWN-06, OWN-07, GIT-01, GIT-02,
SYS-01, SYS-02, SYS-03, SYS-04, SYS-05, SYS-06, SYS-07, SYS-08, SYS-09,
SYS-11, WF-01, WF-04, WF-06, WF-07, WF-08, WF-09, WF-10, WF-12, PERF-01,
GAP-02, GAP-03, DEC-01, DEC-02, DEC-05, MEDIA-02, CONF-01, CONF-02, CONF-03,
CONF-04.

Deliberately **not** used in visible copy:

| Claim | Why it is absent |
| --- | --- |
| GIT-03 | Commit counts are activity, not achievement. |
| SYS-10 | Neural packages exist; section 10 names the Research neural-features surface via WF-07 without depth or accuracy claims (UNSUP-06). |
| PERF-02 | Chart memoization is an implementation detail, not chapter-level copy. |
| GAP-01 | README drift is an authoring note, not visitor-facing. |
| GAP-04 | Homepage display-name rename is WO-027 scope. |
| DEC-03, DEC-04 | Route slug and metadata title are editorial; reflected in `content.md`, not body prose. |
| UNSUP-01 … UNSUP-10 | Prohibited. |

## Unresolved documentation-only markers

None introduced by this contract for Quant chapter facts that now have
evidence. Site-wide markers outside WO-026 remain in `content.md`:

- `[REQUIRED: 1200×630 approved social image]`
- `[REQUIRED: production URL]`

DEC-02 is closed: Quant omits the live-environment control, so no Quant-scoped
`[REQUIRED: live environment URL]` marker is needed. Aegis retains its own
disabled-control decision and marker.

**No `[REQUIRED: …]` marker appears in any `copy:start` block in this file.**

## Verification

**Recorded at handoff (2026-08-03).** All visible strings: **1,353 words**.
Prose only, excluding headings, the hero meta list, and action labels:
**1,264 words** (target 900–1,400). Hero support 46 (limit 55); decision
bodies 138, 119, 113, and 122 (limit 140 each). No block exceeds its limit.
37 delimiter pairs / identified copy blocks (alt/`render=` blocks excluded
from prose totals). Scans: required `paper` / `locked` / `AI assistance`
present; forbidden promo terms appear only in the review table and author-note
negations, never as claims; outcome vocabulary (`Sharpe`, `win rate`, `profit`,
`alpha`, `edge`, `outperform`) appears only in the forbidden-language review
table, not in visible copy; no `[REQUIRED:` inside any `copy:start` block.

Word budget, counted over `copy:start` / `copy:end` blocks only:

```bash
python3 - <<'PY'
import re, pathlib
src = pathlib.Path("docs/q-case-study-content.md").read_text()
src = src.split("## Verification")[0]   # ignore this snippet's own example
blocks = re.findall(r"<!-- copy:start ([^>]*?)-->(.*?)<!-- copy:end -->", src, re.S)
CHROME = {"hero-title", "hero-deck", "hero-meta", "hero-actions",
          "disclosure-actions", "confidentiality-actions",
          "decision-4-media-title"}
total = prose = 0
for meta, body in blocks:
    ident = re.search(r"id=(\S+)", meta)
    if not ident:
        continue
    bid = ident.group(1)
    limit = re.search(r"limit=(\d+)", meta)
    words = len(body.split())
    if "render=" in meta:      # alt text / aria-label: not visible prose
        continue
    total += words
    if not (bid in CHROME or bid.endswith("-heading")):
        prose += words
    flag = " OVER LIMIT" if limit and words > int(limit.group(1)) else ""
    print(f"{bid:34} {words:5}{flag}")
print(f"{'ALL VISIBLE STRINGS':34} {total:5}")
print(f"{'PROSE ONLY (no headings/labels)':34} {prose:5}  (target 900-1400)")
PY
```

Documentation checks required by WO-026:

```bash
git diff --check
rg -n "paper|locked|AI assistance" docs/q-case-study-content.md
rg -n "revolutionary|state-of-the-art|enterprise-grade|production-ready|real-time|high-frequency|high-performance" docs/q-case-study-content.md
rg -n "Sharpe|win rate|profit|alpha|edge|outperform" docs/q-case-study-content.md
rg -n "\[REQUIRED:" docs/q-case-study-content.md docs/content.md
```

## What WO-027 consumes

```text
docs/q-case-study-content.md   # this file: exact copy, media placement, a11y text
docs/q-case-study-media.md     # asset inventory and hashes
docs/q-case-study-evidence.md  # claim register; the boundary on any new sentence
docs/content.md                # Quant chapter and route metadata
public/work/q/                 # the eleven accepted assets (five placed here)
```

Structural requirements WO-027 must honour:

1. Sections render in the order 1–12 above. Do not reorder or merge.
2. One `h1` (`Quant`); every section heading is an `h2`.
3. Copy is rendered verbatim. Rewording needs a new WO-026 gate.
4. Author notes, `copy:*` comments, and claim IDs never reach the DOM.
5. The hero has **no** live-environment control (`CaseStudyHero.liveEnvironment`
   must be optional; Aegis keeps its disabled pill).
6. No video on this chapter.
7. Every placed figure has the `alt` text above; reserved assets stay off the
   page unless a later visual batch places them.
8. Homepage display name `Q` → `Quant` (`GAP-04`) is in WO-027 scope.
