# Quant — Hiring Narrative and Replacement Media Contract

**Revision:** recruiter-focused bilingual rewrite, 2026-08-05.
**Implementation:** `src/content/case-studies/q.ts`, rendered at `/work/q` and
`/pt-BR/work/q`.
**Evidence boundary:** [`q-case-study-evidence.md`](./q-case-study-evidence.md).
**Review state:** implemented for owner review; replacement screenshots remain
owner-supplied and require a separate visual acceptance.

## Editorial objective

Present Quant as evidence that Guilherme can own an ambitious product across
product strategy, interface design, frontend, backend, data, infrastructure,
research discipline, and testing. The primary audience is a senior
product-engineering hirer. Quant and financial-system depth supports that
positioning; it does not replace it with a feature catalogue.

The narrative follows problem → decision → consequence. It must not claim
customers, revenue, scale, production readiness, market performance, alpha,
reliability metrics, or live execution.

## Exact English copy

### Hero

- **Category:** Quantitative systems
- **Title:** Quant
- **Deck:** A solo-built desktop platform for turning trading ideas into
  disciplined, inspectable research.
- **Role:** Founder, Product Engineer, and sole developer
- **Period:** April 2026–present
- **Platform:** Native desktop
- **Market:** Brazilian futures and equities
- **State:** Research, backtesting, and paper execution
- **Source:** Private

> I built Quant across product design, desktop UX, backend services, data
> infrastructure, research workflows, and testing. A Tauri and React interface
> coordinates FastAPI, Redis-backed workers, PostgreSQL, and market-data paths,
> keeping complex experiments structured and inspectable in one native product.

The hero renders `launcher.webp` until its approved replacement lands. Quant
has no live-environment action.

### 1. Built end to end as one product

> Quant crosses product, design, frontend, backend, data, and infrastructure
> boundaries. I owned them together so the workflow and architecture could
> evolve around the same research problem.
>
> I also created the Q emblem in Blender and its presentation scene in Unreal
> Engine 5. Layered surfaces, restrained metallic accents, and clear hierarchy
> carry that identity into dense workspaces designed for long research
> sessions.

No identity image renders until `identity.webp` exists and passes review. Never
publish an identity placeholder or pending-asset message.

### 2. A six-year idea, rebuilt for disciplined research

> My own systematic trading research exposed the limits of spreadsheets and
> disconnected scripts. I needed reusable data, consistent strategy
> definitions, repeatable simulations, structured parameter search, and a way
> to challenge promising results before capital was involved.
>
> The idea is roughly six years old and is what led me to learn programming. I
> rebuilt it several times as my understanding of markets, architecture,
> research discipline, and product design grew. The implementation shown here
> is a new codebase begun in April 2026.
>
> An earlier generation of my tooling supported a strategy I traded personally,
> growing approximately R$3,000 into R$90,000 over about one year. That result
> predates this implementation; it is origin context, not a forecast or
> evidence that Quant produced those returns.

The last paragraph is subordinate origin context. It must never become the hero
hook or lose its qualification.

### 3. From market context to inspectable experiments

> Research starts with instruments, historical series, indicators, and data
> availability. Quant keeps those inputs close to entry and exit rules,
> parameters, and simulation settings so an experiment can be reconstructed
> instead of remembered.
>
> Completed runs put the equity path, drawdown, trades, and supporting
> statistics beside the assumptions that produced them. A promising chart
> remains tied to a specific configuration rather than becoming an isolated
> screenshot or headline metric.

Temporary media: `market-data.webp`, `backtest-studio.webp`, and
`backtest-results.webp`.

### 4. Challenge results before trusting them

> A useful search process must do more than surface the highest number.
> Optimization compares trials across multiple objectives, while discovery
> narrows broader candidate sets into work worth deeper investigation.
>
> Validation stays inside the Backtests workflow and separates in-sample from
> out-of-sample windows. Feature creation, simulation performance, and held-out
> evidence remain distinct questions instead of collapsing into one score.

Temporary media: `optimize-pareto.webp`, `discover-leaderboard.webp`, and
`walkforward.webp`. Walk-forward is described as validation within Backtests,
not as a separate shipped workspace.

### 5. Keep heavy research work off the interaction path

> Backtests, optimization studies, and discovery searches can outlive an HTTP
> request. Quant accepts work through the API, runs it in Dramatiq workers
> backed by Redis, and reports job state through the desktop shell so the
> interface can stay responsive.
>
> Execution is deliberately narrower than the research stack: the product
> supports paper accounts and paper deployments today. Live trading is
> rejected by both the interface and the API, turning the current safety
> boundary into visible product behavior.

Temporary media: `system.webp` and `execution.webp`.

### 6. A native product around asynchronous services

> Quant packages a React interface inside Tauri 2 and connects it to FastAPI.
> PostgreSQL and Alembic manage application state; Redis and Dramatiq coordinate
> asynchronous research; MetaTrader 5 and a separate read-only gateway feed
> market data into local storage.
>
> The desktop owns interaction; services own durable data and compute-heavy
> work. That boundary keeps long-running research out of the UI process without
> fragmenting the product.

The localized semantic `QSystemMap` follows this prose.

### 7. Why desktop was the right boundary

> Quant belongs beside local market-data services, workers, and research files.
> A native Tauri shell makes that operating context explicit and supports a
> focused desktop workflow instead of pretending the product is a public SaaS.
>
> The trade-off is a native toolchain and platform-specific dependencies. I
> accepted it because it fits how the product is actually used.

### 8. Develop against stable fixtures

> I built a deterministic Mock Service Worker mode that runs the interface
> without FastAPI, PostgreSQL, Redis, or a broker connection. Stable fixtures
> let product design, frontend behavior, and visual review continue while
> service contracts were changing.
>
> This reduced coordination between interface and infrastructure work and made
> important states reproducible instead of dependent on a particular local
> stack.

### 9. Make validation and execution safety product constraints

> A single backtest can reward overfitting, so Quant keeps optimization,
> held-out validation, and execution controls in the product workflow. The
> software presents evidence and boundaries; it does not declare that a
> strategy is successful.
>
> Paper-only execution and backend live-mode rejection apply the same principle
> operationally: future capability cannot accidentally appear as current
> capability.

### 10. What I owned

> I conceived, designed, and built the product: its identity, desktop shell,
> interaction system, frontend workspaces, API, worker architecture, database
> schema, market-data paths, research workflows, execution controls, automated
> tests, and development tooling.
>
> I used AI for scaffolding, refactoring, test generation, and review. Product
> direction, architecture, visual design, engineering trade-offs, and final
> decisions remained mine.

This is the only visible AI-assistance disclosure on the page.

### 11. Technology across the stack

Tauri 2 · React · Vite · FastAPI · Dramatiq · Redis · PostgreSQL · Alembic ·
MetaTrader 5 · Optuna · Mock Service Worker · pytest · Blender · Unreal Engine 5

### 12. Current status and technical walkthrough

> Quant is actively used for research and backtesting, with paper execution
> available and live trading intentionally disabled while the execution path
> matures.
>
> The repository is private, and public materials omit credentials, broker and
> account details, deployment identifiers, and source code. I can walk through
> the product, architecture, and decisions in greater depth in a technical
> conversation.

Actions, in order: `Back to selected work` → `/#work`; `Discuss Quant` →
`/#contact`.

## Brazilian Portuguese contract

`qCaseStudyPtBr` is a complete editorial adaptation, not a shallow override.
It must localize metadata, facts, headings, prose, alt text, captions,
disclosures, actions, and every `QSystemMap` label. Product and technology names
remain unchanged where they are proper names; no English narrative sentence may
fall through to `/pt-BR/work/q`.

Use natural Brazilian financial terminology: `execução simulada` for paper
execution, `dentro e fora da amostra` for in/out-of-sample, and `sobreajuste`
for overfitting. Keep `backtesting`, `drawdown`, `fixtures`, `frontend`,
`backend`, `stack`, and `trading` where those terms are clearer to the intended
technical audience.

## Replacement screenshot manifest

These paths are reserved but must not be referenced from published content
until the corresponding reviewed files exist.

| Future path | Placement | Required proof |
| --- | --- | --- |
| `public/work/q/launcher.webp` | Hero | Workspace navigation, system state, and recent research activity; communicate product scope immediately. |
| `public/work/q/identity.webp` | Section 1 | Final approved Q emblem or Unreal Engine presentation still; omit media if unavailable. |
| `public/work/q/market-context.webp` | Section 3 | Instrument context, historical charting, indicators, and data controls without implying real-time operation. |
| `public/work/q/strategy-workbench.webp` | Section 3 | Entry/exit rules, parameters, instrument, and simulation assumptions together. |
| `public/work/q/backtest-evidence.webp` | Section 3 | Equity path, drawdown, trades, statistics, and enough run context to connect result and assumptions. |
| `public/work/q/optimization.webp` | Section 4 | Multi-objective or Pareto comparison without centering a profit figure. |
| `public/work/q/walk-forward-validation.webp` | Section 4 | In-sample/out-of-sample windows with a readable per-window breakdown. |
| `public/work/q/background-job.webp` | Section 5 | Long-running research progress in the persistent shell while another workspace remains usable. |
| `public/work/q/paper-execution.webp` | Section 5 | Paper account/deployment state with the `Live locked` boundary visible. |

### Capture and handoff requirements

- Use the real current Quant interface with deterministic fixture data, never
  AI-generated UI.
- Capture at 2560×1440 or another agreed 16:9 source resolution; export WebP at
  no more than 500 KiB per file.
- Give each image one clear focal story; reject loading, empty, error, debug, or
  visibly unfinished states.
- Keep fixture values coherent across related images, but never describe them
  as actual trading results.
- Exclude credentials, broker login/server information, account numbers, real
  balances, internal hosts, and private identifiers.
- Add no marketing overlays or decorative labels.
- Write final English and Portuguese alt text and captions only after inspecting
  the delivered pixels. Captions explain why the screen matters rather than
  repeating visible controls.
- Keep current files until the replacement set is accepted. Swap references
  and remove unreferenced old files only as one reviewed change.

## Acceptance

- The English route renders the twelve headings above in order.
- Rendered English content is approximately 900–1,100 words, including the
  system map, captions, facts, and technology badges.
- The Portuguese route is complete and contains no English fallback prose.
- The historical result retains its attribution and limitation.
- Paper execution and UI/API live-trading rejection remain explicit.
- No placeholder asset or pending-asset message renders.
- No unsupported performance, adoption, business-impact, or trading claim is
  introduced.
- Replacement paths are not published before their files pass content and
  visual review.
