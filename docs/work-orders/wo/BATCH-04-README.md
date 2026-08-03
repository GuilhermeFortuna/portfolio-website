# Portfolio Website — Work Orders, Batch 04

## Purpose

Turn **Quant** from a one-sentence homepage claim into the portfolio's second
evidence-led case study, and produce a deliberately large, high-resolution
capture set from the most visually polished interface in the portfolio.

Quant is the strongest visual asset available. This batch treats its media as a
**first-class deliverable**, not as illustration attached to prose: the capture
set is sized, resolved, and archived so a later cinematic batch can crop, zoom,
parallax, and sequence these images without recapturing anything.

## Renumbering Notice

An earlier document reserved "Batch 04" for the Aegis visual experience
(`docs/design/batch-04-aegis-visual-decisions.md`, reverted at `abc682df`).
**That scope is not this batch.** The Aegis/portfolio-wide cinematic layer moves
to a later batch, after all four chapters exist, so the visual system is
designed against every chapter's real content instead of one.

The standing constraints from the reverted document survive the renumbering and
bind this batch:

- **D-001** — the portfolio visual system owns every project page. Q media may
  appear inside the page, but the surrounding page must not imitate Q's product
  interface or adopt a Q-specific design system.
- **D-002** — projects carry comparable weight. Q's larger capture set is a
  media-volume decision, not a licence to give Q a longer or louder narrative
  than Aegis.

## Scope Boundary

In scope: evidence, media, copy, route, and release review for `/work/q`.

Out of scope: cinematic animation, scroll choreography, WebGL, gallery motion,
new visual-effect dependencies, homepage restructuring, and the Aegis page.
Producing animation-ready media is in scope. Animating it is not.

## Locked Facts (source- and Git-derived)

Recorded here from direct inspection on 2026-08-03. WO-024 re-verifies each one
against source before it may be published.

- Repositories: `/home/gui/projects/q/q_backend`, `/home/gui/projects/q/q_frontend`.
- Backend history begins **2026-04-20**; latest commit **2026-08-02**.
- Frontend history begins **2026-05-30**; latest commit **2026-08-03**.
- Frontend Git author names include tooling identities (`Cursor Agent`)
  alongside the owner. As with Aegis (GIT-03), this needs an explicit owner
  statement before single-owner wording may be published.
- Twelve frontend workspace directories exist: `backtests`, `discover`,
  `execution`, `launcher`, `market-data`, `news`, `research`, `storage`,
  `strategy`, `strategy-builder`, `system`, `walkforward`.
- A deterministic mock path exists: `./dev.sh --mocks` runs the SPA on Vite with
  `VITE_ENABLE_MSW=true` and **no backend, no Postgres, no Redis, and no
  MetaTrader 5 connection**. Fixtures live in `q_frontend/src/mocks/`.
- The frontend README states live trading is **locked in UI and backend**, and
  that the execution workspace is **paper** execution.

## Locked Owner Facts

Recorded from the owner on **2026-08-03**. These are `FACT — OWNER` inputs;
WO-024 classifies and cites them but does not relitigate them.

1. **Public project name: `Quant`.** Category stays `Quantitative systems`
   (already in `src/content/projects.ts`). `Q` was the working shorthand and
   the repository prefix; it is not the public name.
   - **Consequence:** `projects[1].name` becomes `Quant`, and the
     `docs/content.md` metadata title `Q — Quantitative Research and Execution`
     becomes `Quant — …`.
   - **Open, low-stakes:** the slug stays `q` (route `/work/q`, assets under
     `public/work/q/`) because that is what `src/content/projects.ts` and the
     `docs/content.md` metadata registry already say. A display name and a slug
     may legitimately differ. If the owner wants `/work/quant` instead, say so
     before WO-025 — no route exists and `href` is still `null`, so the change
     is free now and not free once assets and tests reference the path.
2. **Nature of the work: the owner's own product.** Not client or employer
   work. A research, backtesting, and (in future) execution tool for the
   **Brazilian futures market**. There is therefore **no third-party
   confidentiality boundary**; the only sensitive material is credentials,
   broker/account details, and the private source.
3. **Role: founder and sole developer.** The project is the owner's own.
4. **Period — two distinct timelines, and the copy must not conflate them.**
   - The **idea** is roughly six years old (≈2020) and is what led the owner to
     learn programming. Many versions have been built and rebuilt since.
   - The **current implementation** is the latest and best of those attempts:
     `q_backend` from 2026-04-20, `q_frontend` from 2026-05-30, both active.
   - Git history in these two repositories is evidence **only** for the current
     implementation. The six-year lineage is `FACT — OWNER` and has no
     repository evidence here. WO-024 must classify it that way, and WO-026 must
     not imply the current codebase is six years old.
   - If published copy names a specific starting year, confirm it with the owner
     first; "six years ago" was the owner's phrasing and ≈2020 is derived.
5. **Ownership: sole.** Cursor was a development tool. The `Cursor Agent` and
   `Guilherme Fortuna dos Santos` Git author identities are tooling and
   duplicate identities, not additional contributors. Single-owner wording with
   AI assistance is approved, matching the Aegis GIT-03 resolution.
6. **Execution status: not live.** Execution is a future capability; the tool is
   used today for research and backtesting. This is consistent with the frontend
   README's statement that live trading is locked in UI and backend, which
   WO-024 verifies in source. Stated as a plain factual description of what the
   tool does today — not as a disclaimer.
7. **Screenshot content: no restriction.** The owner has set no strategy,
   parameter, feature, or market-data limit on what may be legible in captures.
   Capture the interface as it is. The credential/broker/account prohibition in
   the Shared Prohibitions below still applies; it is a security rule, not a
   disclosure rule.
8. **Live-environment control: omit it for Quant.** *(Recommended; confirm or
   overrule before WO-026.)* Aegis renders a visibly disabled
   `Live environment — coming soon` pill in its hero because a staging URL is
   planned but unverified. Quant is a native desktop application, so no live URL
   will ever exist and a permanently disabled control would be dead weight. The
   hero omits the control entirely rather than rendering one that can never
   resolve. `docs/content.md` already notes gosigapp has no live-environment
   action for a comparable reason.

## Narrative Consequence of Fact 4

The six-year lineage is the strongest thing in this chapter and Aegis has no
equivalent. WO-026 should use it: the project that taught the owner to program,
rebuilt repeatedly over six years, now in its most capable form. That is a
credible, verifiable-by-character claim about persistence and growth, and it
costs nothing in invented metrics.

It also constrains the copy. "Six years of building the same idea" is a
statement about the *owner*, not about the current codebase's maturity. Keep
those two claims separate in every sentence that touches either.

## Read-Only Evidence Sources

```text
/home/gui/projects/q/q_backend
/home/gui/projects/q/q_frontend
/home/gui/projects/q/dev.sh
/home/gui/projects/q/docs
```

Workers may inspect and run those repositories. They must not modify, commit,
clean, reset, or reconfigure either one. Never read or copy `.env` values,
broker credentials, MetaTrader 5 login or server details, account identifiers,
real position or balance data, or private deployment identifiers.

## Mandatory Reading

1. This batch index.
2. [`WO-STATUS.md`](WO-STATUS.md).
3. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md).
4. [`../../content.md`](../../content.md).
5. [`BATCH-03-README.md`](BATCH-03-README.md) and the Aegis deliverables it
   produced — this batch follows its pattern and must stay consistent with it.
6. The assigned Work Order and every completed prerequisite handoff.

## Dependency Order

```text
WO-024 Q Evidence and Publication Contract
  └─ WO-025 Q High-Resolution Media Capture
       └─ WO-026 Q Case-Study Content Contract
            └─ WO-027 Q Case-Study Implementation
                 └─ WO-028 Q Integration and Release Review
```

Do not run these orders in parallel. Each order freezes inputs consumed by the
next. Only WO-024 may become `READY` when this batch opens, and only after the
owner facts above are recorded.

Batch 04 has **no route-foundation order**. WO-021 already delivered the typed
content model, the shared shell, and the case-study primitives, and they are
`DONE`. WO-027 reuses them and may extend them only as that order permits.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-024 | [Q Evidence and Publication Contract](./WO-024-q-evidence-publication-contract.md) | Claim-level evidence register and disclosure boundary |
| WO-025 | [Q High-Resolution Media Capture](./WO-025-q-high-resolution-media-capture.md) | Twelve+ high-resolution fixture-driven captures, archived masters, and media manifest |
| WO-026 | [Q Case-Study Content Contract](./WO-026-q-case-study-content-contract.md) | Owner-approved narrative and exact visible copy |
| WO-027 | [Q Case-Study Implementation](./WO-027-q-case-study.md) | Finished `/work/q` route and homepage entry point |
| WO-028 | [Q Integration and Release Review](./WO-028-q-integration-release-review.md) | Independent truth, browser, accessibility, metadata, and performance gate |

## Shared Prohibitions

- Do not state a trading outcome — profit, return, Sharpe ratio, win rate,
  alpha, or edge — as a real result. This is the site-wide
  no-invented-metrics rule from `docs/content.md`, which binds all four
  chapters; it is not a Q-specific disclosure regime. Screenshots of the
  interface showing fixture data are fine and need no per-image disclaimer.
- Do not expose broker names, account numbers, balances, MT5 server or login
  details, credentials, API keys, or private deployment identifiers.
- Do not publish project repository links.
- Do not add a visual-effect dependency, animation system, WebGL runtime,
  global cinematic transition, or homepage section.
- Do not turn the case study into a workspace inventory. Q has twelve
  workspaces; the narrative gets at most four engineering decisions, exactly as
  Aegis did.
- Do not place `[REQUIRED: ...]`, confidential notes, or development fixtures in
  rendered content, metadata, generated assets, or the production bundle.
- Do not copy capture masters into the portfolio repository. Masters are
  archived outside it and referenced by hash.

## Batch Completion Rule

Batch 04 is complete only when WO-028 records a `GO` release decision and is
marked `DONE`. Completion of the route implementation alone is insufficient.
