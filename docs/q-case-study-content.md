# Quant — UI-Led Case-Study Content Contract

**Work Order:** WO-026 visual revision. **State:** Implemented on `/work/q`
(2026-08-03).
**Evidence register:** [`q-case-study-evidence.md`](./q-case-study-evidence.md)
— now includes `OWN-08` and `OWN-09`, added on the owner's direct
attestation when this revision was requested.
**Media inventory:** [`q-case-study-media.md`](./q-case-study-media.md).
**Implementation:** `src/content/case-studies/q.ts`, rendered by
`src/app/work/q/page.tsx`.

## Implementation notes (read before the section-by-section content below)

- **Identity media is a placeholder.** No approved Q-emblem / Unreal Engine
  render exists yet. The hero's secondary showcase image and section 2's
  figure both point at `/work/q/identity-placeholder.svg` — a clearly
  labelled "pending final render" graphic, not the real asset. Swap
  `IDENTITY_MEDIA_SRC` in `q.ts` for the approved file once it is captured;
  every reference updates from that one constant.
- **Heading depth simplification.** This contract calls for `h3` workspace
  and decision titles nested under their parent `h2`. The shipped
  implementation renders every workspace-tour group and every engineering
  decision as its own `h2` section instead, reusing the existing
  `CaseStudySection` component rather than introducing a new nested-heading
  component. Content and ordering match this contract; heading depth is the
  one accepted deviation.
- **OWN-08 / OWN-09 gate.** Both claims are recorded in the evidence register
  as `FACT — OWNER`, sourced to the owner's direct statement when requesting
  this revision (2026-08-03), the same evidentiary pattern used for
  `OWN-01`–`OWN-07`.

## Editorial direction

Quant is the most visually developed project in the portfolio. Its case study
should therefore behave less like a conventional technical article and more
like a guided product tour.

The page should:

- establish the product and its visual identity immediately;
- give the interface substantially more screen space than the prose;
- display all major workspaces rather than reserving most captures;
- use short copy blocks to explain what each workspace enables;
- preserve the architecture and validation story without allowing them to
  dominate the page;
- show that the product design, visual system, 3D identity, and engineering were
  all created as parts of one coherent product.

Author notes, claim IDs, verification instructions, and `[REQUIRED: ...]`
markers must never reach rendered output.

## Publication gates

Evidence-register entries for the following owner-provided claims are now
recorded (see `OWN-08`, `OWN-09` in `q-case-study-evidence.md`):

- `OWN-08` — An earlier generation of the owner's research tooling supported a
  personally traded strategy that grew approximately R$3,000 into R$90,000 over
  roughly one year. The result predates the current implementation and is not a
  forecast or product-performance claim.
- `OWN-09` — The owner created the Q emblem in Blender and created its cinematic
  presentation scene using Unreal Engine 5.
- `[REQUIRED: approved Q emblem render, Unreal Engine scene still, or short
  muted scene loop]` — **still open.** A placeholder graphic stands in until
  this asset is captured and approved.

---

## 1. Hero

**Heading (h1):**

<!-- copy:start id=hero-title -->
Quant
<!-- copy:end -->

**Deck:**

<!-- copy:start id=hero-deck -->
A native quantitative research platform designed as a professional market instrument
<!-- copy:end -->

**Meta list:**

<!-- copy:start id=hero-meta -->
Role
Founder, designer, and sole developer
Period
April 2026–present
Platform
Native desktop
Market
Brazilian futures and equities
State
Active research and backtesting
Source
Private
<!-- copy:end -->

**Support copy:**

<!-- copy:start id=hero-support limit=80 -->
I designed and built Quant end to end to turn trading ideas into structured
research workflows — from market-data ingestion and strategy construction to
distributed backtesting, optimization, discovery, and out-of-sample validation.
The engineering and visual design were developed together so the product feels
less like a collection of scripts and more like a focused professional tool.
<!-- copy:end -->

**Primary media:** `launcher.webp`

**Alt text:**

<!-- copy:start id=hero-media-alt render=alt-attribute-only -->
The Quant launcher dashboard showing market status, system health, and recent
research activity in a polished dark desktop interface.
<!-- copy:end -->

**Identity media (placeholder pending the approved asset):**
`identity-placeholder.svg`

**Identity-media alt text:**

<!-- copy:start id=hero-identity-alt render=alt-attribute-only -->
Placeholder graphic. The final Q emblem and Unreal Engine scene render is
pending and will replace this placeholder.
<!-- copy:end -->

**Author note.** Product/domain ← OWN-01, OWN-06. Ownership ← OWN-03, OWN-05.
Current implementation ← GIT-01. Desktop boundary ← SYS-01. Visual-identity
claim ← OWN-09 (evidenced). Identity media is a placeholder, not the approved
render.

---

## 2. Designing the identity

**Heading (h2):**

<!-- copy:start id=identity-heading -->
Designing Q as a product, not just a tool
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=identity-body -->
Quant began as an engineering project, but I did not want its interface to feel
like an internal dashboard assembled around whatever the backend exposed. I
treated visual identity, interaction design, and system architecture as parts
of the same product.

I created the Q emblem in Blender, then used Unreal Engine 5 to build its
cinematic presentation scene. That identity informed the application itself:
dark layered surfaces, restrained metallic accents, strong depth, precise
motion, and workspaces designed to keep dense research information readable.

The result is intentionally more immersive than a typical analytics interface,
without sacrificing the clarity required for long research sessions.
<!-- copy:end -->

**Media:** `identity-placeholder.svg` (placeholder pending the approved asset).

**Caption:**

<!-- copy:start id=identity-caption -->
The Q emblem was created in Blender and presented through a cinematic scene
built in Unreal Engine 5. Placeholder shown pending the final render.
<!-- copy:end -->

**Author note.** Blender and Unreal Engine claim ← OWN-09 (evidenced). Avoid
claiming that Unreal Engine runs inside the application unless separately
evidenced. The scene is part of the project's visual production, not the
desktop runtime.

---

## 3. Why I built it

**Heading (h2):**

<!-- copy:start id=origin-heading -->
Built from a real research problem
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=origin-body -->
Quant grew from my own systematic trading research. I needed a way to move
beyond spreadsheets and disconnected scripts: collect reusable market data,
express strategies consistently, test them across historical periods, explore
large parameter spaces, and challenge promising results before putting capital
at risk.

That problem became the reason I learned to program. I have rebuilt the idea
several times over roughly six years, each version reflecting what I had
learned about markets, software architecture, research discipline, and product
design. The current implementation began in April 2026 and is a new codebase.

An earlier generation of my tooling supported the research behind a strategy I
traded personally, growing approximately R$3,000 into R$90,000 over about one
year. That historical result predates the system shown here. It is project
context, not a forecast or a claim that this implementation produced those
returns.
<!-- copy:end -->

**Media:** none.

**Author note.** Origin and lineage ← OWN-04, OWN-06. Current codebase ←
GIT-01. Historical result ← OWN-08 (evidenced), attribution and limitations
preserved verbatim.

---

## 4. Inside the product

**Heading (h2):**

<!-- copy:start id=tour-heading -->
Inside the product
<!-- copy:end -->

**Introductory copy:**

<!-- copy:start id=tour-intro -->
Quant is organized as a set of focused workspaces connected by a persistent
desktop shell. Each workspace handles a distinct stage of the research process,
while the shared navigation, job state, diagnostics, and visual language make
the system feel like one instrument rather than separate utilities.
<!-- copy:end -->

### Market data and system awareness

<!-- copy:start id=market-data-copy -->
The market-data workspace provides the visual foundation for research:
instruments, historical price series, indicators, and the state of the local
data environment. System diagnostics expose data-source availability,
environment details, and backend health without forcing the user to leave the
application.
<!-- copy:end -->

**Media gallery:**

1. `market-data.webp`
   - **Alt:** A Quant market-data workspace displaying a candlestick chart with
     indicators and market controls.
   - **Caption:** Market data and technical context inside the desktop research
     environment.
2. `system.webp`
   - **Alt:** The Quant system workspace showing data-source status,
     environment details, and backend-health diagnostics.
   - **Caption:** Data sources, environment state, and backend health in one
     diagnostic workspace.

**Author note.** Market-data workspace ← SYS-07, WF-*. Diagnostics ← SYS-05,
SYS-11. Do not claim real-time or high-frequency data.

### Strategy construction and backtesting

<!-- copy:start id=backtesting-copy -->
The backtest studio turns strategy definitions into inspectable experiments.
Entry and exit logic, parameters, instruments, and simulation settings live in
one workspace, while completed runs expose the equity path, drawdown, trades,
and supporting statistics needed for analysis.

The interface is designed to keep configuration and evidence close together so
a result can be traced back to the assumptions that produced it.
<!-- copy:end -->

**Media gallery:**

1. `backtest-studio.webp`
   - **Alt:** The Quant backtest studio showing strategy entries, exits,
     parameters, and simulation controls.
   - **Caption:** Strategy configuration and simulation controls in the
     Backtests workspace.
2. `backtest-results.webp`
   - **Alt:** A Quant backtest result showing an equity curve, drawdown view,
     and supporting run statistics.
   - **Caption:** A completed simulation presented for inspection. The figures
     are research output, not a published trading record.

**Author note.** Backtest workflow ← WF-04. Result imagery must not be described
as evidence of effectiveness or live performance.

### Optimization and discovery

<!-- copy:start id=optimization-copy -->
Optimization studies move parameter search out of ad hoc loops and into a
structured workflow. Trials can be compared across multiple objectives rather
than reduced to one headline number.

Discovery expands that process across broader strategy candidates and ranks
results using out-of-sample evidence. The objective is not to let the system
declare a winner, but to help narrow a large search space into candidates worth
further investigation.
<!-- copy:end -->

**Media gallery:**

1. `optimize-pareto.webp`
   - **Alt:** A Quant optimization workspace displaying a table of study trials
     and multiple objective values.
   - **Caption:** Optimization trials compared across multiple objectives.
2. `discover-leaderboard.webp`
   - **Alt:** The Quant discovery workspace showing a leaderboard of strategy
     candidates ranked using out-of-sample metrics.
   - **Caption:** Discovery results organized for comparison and deeper review.

**Author note.** Optimization ← SYS-06, WF-04. Discovery ← WF-06. Avoid
effectiveness, alpha, edge, or market-beating claims.

### Research features and validation

<!-- copy:start id=research-copy -->
The research workspace provides a feature catalog for developing and evaluating
inputs, including neural features. Validation then challenges promising
configurations across in-sample and out-of-sample windows with a per-window
breakdown.

This separation matters: feature creation, simulation performance, and
held-out validation answer different questions. Quant keeps those questions
visible instead of collapsing them into a single score.
<!-- copy:end -->

**Media gallery:**

1. `research-features.webp`
   - **Alt:** The Quant feature store displaying a catalog of research features
     available to the system.
   - **Caption:** A structured feature catalog for research workflows.
2. `walkforward.webp`
   - **Alt:** A validation workspace comparing in-sample and out-of-sample
     results across multiple windows.
   - **Caption:** In-sample and out-of-sample windows from a completed
     validation run.

**Author note.** Research surface ← WF-07. Neural-feature existence may be
named without making accuracy or depth claims ← SYS-10. Validation ← WF-04,
WF-12.

### Execution and background work

<!-- copy:start id=execution-copy -->
Long-running research continues outside the interface through queued workers,
while the desktop shell reports job state through the workspace dock. That
allows the product to remain responsive during backtests, optimization studies,
and discovery searches.

The execution workspace currently supports paper accounts and paper
deployments. Live trading is rejected by both the interface and the API, making
the product's present boundary explicit.
<!-- copy:end -->

**Media gallery:**

1. `dock.webp`
   - **Alt:** The Quant workspace dock showing progress for a backtest running
     in the worker pool.
   - **Caption:** A queued backtest reporting progress through the persistent
     workspace dock.
2. `execution.webp`
   - **Alt:** The Quant execution workspace showing a paper account, an active
     paper deployment, and indicators that live trading is locked.
   - **Caption:** Paper execution with live trading locked. The capture uses
     fixture data.

**Author note.** Async work ← SYS-03. Execution boundary ← SYS-11, OWN-07.
Fixture-data disclosure ← MEDIA-02, CONF-02.

---

## 5. How the system fits together

**Heading (h2):**

<!-- copy:start id=architecture-heading -->
How the system fits together
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=architecture-body -->
Quant runs as a Tauri 2 desktop application around a React interface. The
frontend communicates with a FastAPI service, while backtests, optimization
studies, and discovery jobs run asynchronously through Dramatiq workers backed
by Redis. PostgreSQL stores application data through Alembic-managed schema
changes.

Market data arrives through MetaTrader 5 and a separate read-only gateway, then
lands in local storage used by the research workspaces. A deterministic mocks
mode can run the complete interface without the API, database, queue, or broker
connection, allowing product design and frontend development to continue
against stable fixtures.
<!-- copy:end -->

**Media:** the existing `QSystemMap` diagram component (no screenshot reused
in this section, per the preference for a purpose-built diagram).

**Author note.** Tauri ← SYS-01. FastAPI ← SYS-02. Dramatiq/Redis ← SYS-03.
PostgreSQL/Alembic ← SYS-04. Data gateways ← SYS-05. Storage ← SYS-07. Mocks ←
SYS-08.

---

## 6. Engineering decisions behind the experience

**Heading (h2):**

<!-- copy:start id=decisions-heading -->
Engineering decisions behind the experience
<!-- copy:end -->

### Native desktop instead of public SaaS

<!-- copy:start id=desktop-decision-body limit=105 -->
Quant depends on local market-data services, long-running workers, and files
that belong beside the research environment. Packaging the React interface
inside Tauri makes that boundary explicit: this is an operator tool running on
the research machine, not a public website.

The trade-off is a native toolchain and platform-specific dependencies, but the
result matches how the product is actually used.
<!-- copy:end -->

### Queued research jobs

<!-- copy:start id=async-decision-body limit=105 -->
Backtests, optimization sweeps, and discovery searches do not belong inside the
HTTP request that starts them. The API accepts the work and returns, while
Dramatiq workers execute it through Redis and publish job state back to the
interface.

This keeps the UI responsive and lets the dock report progress from the actual
background job.
<!-- copy:end -->

### Validation before deployment

<!-- copy:start id=validation-decision-body limit=110 -->
A single backtest can reward overfitting, so Quant does not treat one equity
curve as sufficient evidence. Optimization and validation live inside the
Backtests workflow, where parameter sets can be compared across in-sample and
out-of-sample windows.

In my own process, held-out validation sits between a promising simulation and
any path toward deployment. The software presents evidence; it does not declare
a strategy successful.
<!-- copy:end -->

### Fixture-first product development

<!-- copy:start id=fixtures-decision-body limit=105 -->
I built a deterministic mocks mode with Mock Service Worker so the workspaces
could evolve while the API, workers, and data paths were still changing.

This separated interaction design from service availability, accelerated
frontend development, and made visual testing reproducible. The same screens
can later point at the complete local stack.
<!-- copy:end -->

**Author note.** Desktop ← SYS-01, SYS-03, SYS-05, SYS-07. Async ← SYS-03.
Validation ← WF-04. Mocks ← SYS-08.

---

## 7. My contribution

**Heading (h2):**

<!-- copy:start id=contribution-heading -->
My contribution
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=contribution-body -->
I conceived, designed, and built Quant as a solo product: its visual identity,
Blender emblem, Unreal Engine scene, desktop shell, interaction system,
frontend workspaces, API, worker architecture, database schema, market-data
paths, research workflows, execution controls, automated tests, and development
tooling.

AI assisted throughout with scaffolding, refactoring, test generation, and
review. It accelerated implementation, but the product direction,
architecture, visual system, engineering trade-offs, and final decisions are
mine.
<!-- copy:end -->

**Media:** none placed. (The optional compact mosaic described in the original
contract is deferred — the preceding galleries are already visually dense.)

**Author note.** Sole ownership ← OWN-03, OWN-05. Technical coverage ←
SYS-01–SYS-08, SYS-11, WF-*. Blender/Unreal claim ← OWN-09 (evidenced). AI
boundary ← OWN-05, GIT-02.

---

## 8. Current status

**Heading (h2):**

<!-- copy:start id=status-heading -->
Current status
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=status-body -->
The current implementation is actively used for research and backtesting, with
paper execution available and live trading intentionally disabled while the
execution path continues to mature.

The repository is private. Public materials omit credentials, broker details,
account identifiers, deployment identifiers, and private source code. For a
deeper technical or product walkthrough, contact me directly.
<!-- copy:end -->

**Actions — exactly two, in this order:**

<!-- copy:start id=status-actions -->
Back to selected work
Get in touch
<!-- copy:end -->

**Author note.** State ← OWN-07, SYS-11. Private source ← DEC-01. Disclosure ←
CONF-01–CONF-04. Actions: `Back to selected work` → `/#work`; `Get in touch` →
`/#contact`.

---

## Technology summary

Rendered as compact pill badges, not as a prose section.

<!-- copy:start id=technology-summary -->
Tauri 2 · React · Vite · FastAPI · Dramatiq · Redis · PostgreSQL · Alembic ·
MetaTrader 5 · Optuna · Mock Service Worker · pytest · Blender · Unreal Engine 5
<!-- copy:end -->

**Author note.** Application stack ← SYS-01–SYS-08. Blender and Unreal Engine 5
← OWN-09 (evidenced), labeled as visual-production tools, not runtime
dependencies.

---

## Media plan

### Primary sequence (as implemented)

| Order | Asset | Purpose |
| --- | --- | --- |
| 1 | `launcher.webp` | Establish the complete product immediately |
| 2 | `identity-placeholder.svg` | Stand in for the visual identity until the emblem/scene render is approved |
| 3 | `market-data.webp` | Show market-facing workspace |
| 4 | `system.webp` | Show operational awareness |
| 5 | `backtest-studio.webp` | Show strategy construction |
| 6 | `backtest-results.webp` | Show simulation evidence |
| 7 | `optimize-pareto.webp` | Show structured optimization |
| 8 | `discover-leaderboard.webp` | Show discovery workflow |
| 9 | `research-features.webp` | Show feature research |
| 10 | `walkforward.webp` | Show held-out validation |
| 11 | `dock.webp` | Show background-job integration |
| 12 | `execution.webp` | Show paper execution boundary |
| 13 | `QSystemMap` diagram | Explain the system succinctly |

### Layout guidance

- Full-width showcase frames are used for the launcher, the identity
  placeholder, and every workspace-tour figure.
- Paired galleries (two images per workspace group) are used for the five
  workspace-tour groups.
- Captions stay restrained; the UI carries most of the visual narrative.
- Native image proportions are preserved (`2560×1440` throughout).

---

## Editorial constraints

Visible copy must not claim:

- production readiness;
- real-time or high-frequency operation;
- market-beating performance;
- strategy effectiveness;
- returns produced by the current implementation;
- future profitability;
- live execution capability;
- a public or recruiter-accessible repository;
- that Unreal Engine or Blender are runtime dependencies of the desktop app.

The historical result appears only with the exact attribution and
qualification in section 3, now that `OWN-08` is recorded.

---

## Implementation requirements (status)

1. Sections 1–8 render in the order above. ✅
2. One `h1`; section headings are `h2`. Workspace/decision titles are also
   rendered as `h2` (see the heading-depth deviation noted above), not `h3`. ⚠️
3. Media scale and pacing are prioritized over dense prose. ✅
4. Every accepted workspace capture in the media plan is rendered. ✅
5. No author notes, claim IDs, comments, or publication markers reach the DOM. ✅
6. No live-environment control is rendered. ✅
7. The technology summary renders as compact badges. ✅
8. Every placed image carries the alt text specified above. ✅
9. The historical-performance paragraph is published now that `OWN-08` exists. ✅
10. The Blender/Unreal Engine claims are published now that `OWN-09` exists. ✅
11. Section 2 ships with a placeholder asset; swap it for the approved
    emblem/scene render when captured. ⚠️
12. Section 5 uses the `QSystemMap` diagram in place of a screenshot. ✅
