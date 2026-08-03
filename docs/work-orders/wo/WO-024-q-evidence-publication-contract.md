# WO-024 — Q Evidence and Publication Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-024 row is
`READY`. The Locked Owner Facts in
[`BATCH-04-README.md`](BATCH-04-README.md) were recorded on 2026-08-03; read
them first and treat them as `FACT — OWNER` inputs, not open questions.

## Result to Produce

A claim-level evidence register for Quant that separates verified facts, owner
decisions, safe inferences, and unsupported outcomes before any media or public
route is created.

Quant is the owner's own product — no employer, no client, no third-party
confidentiality boundary. Most of this register is therefore a factual
inventory: what the system provably does, so the copy describes it accurately.
Keep it proportionate. The only genuinely sensitive material is credentials,
broker/account details, and the fact that the source is private.

## Prerequisites

- Batch 03 `DONE` (WO-023 `GO`)
- Locked Owner Facts recorded in the Batch 04 index (done 2026-08-03)

## Files to Create or Modify

```text
docs/q-case-study-evidence.md
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

The Q source repositories are read-only inputs and are not in the write scope.

## Required Source Inspection

Inspect at minimum:

```text
/home/gui/projects/q/dev.sh
/home/gui/projects/q/q_backend/README.md
/home/gui/projects/q/q_backend/pyproject.toml
/home/gui/projects/q/q_backend/src/
/home/gui/projects/q/q_backend/gateway/
/home/gui/projects/q/q_backend/alembic/
/home/gui/projects/q/q_backend/docker-compose.yml
/home/gui/projects/q/q_backend/tests/
/home/gui/projects/q/q_backend/docs/
/home/gui/projects/q/q_frontend/README.md
/home/gui/projects/q/q_frontend/AGENTS.md
/home/gui/projects/q/q_frontend/package.json
/home/gui/projects/q/q_frontend/src/workspaces/
/home/gui/projects/q/q_frontend/src/api/queries/
/home/gui/projects/q/q_frontend/src/mocks/
/home/gui/projects/q/q_frontend/src/lib/performance/budgets.ts
/home/gui/projects/q/q_frontend/src-tauri/
/home/gui/projects/q/q_frontend/tests/
```

Do not open `.env` files, broker configuration, credential stores, database
dumps, or captured market-data archives.

**README claims are not source evidence.** Both Q READMEs are promotional in
places (`state-of-the-art`, `high-performance`, `real-time`). A README sentence
may be a *candidate* claim; it becomes `FACT — SOURCE` only when the register
cites the code, route, test, migration, or command that implements it.

## Evidence Register Format

`docs/q-case-study-evidence.md` must begin with the public boundary and use one
row per publishable claim:

```text
Claim ID | Classification | Proposed public wording | Evidence | Limits
```

Allowed classifications are exactly:

- `FACT — OWNER`
- `FACT — SOURCE`
- `DECISION`
- `CONFIDENTIAL`
- `INFERENCE — REVIEW REQUIRED`
- `UNSUPPORTED — DO NOT PUBLISH`

Every source-backed row names a repository-relative file and, where practical, a
symbol, route, test, migration, or command. Git history is evidence for dates
and authorship, not proof of correctness, performance, or trading outcomes.

Use the ID prefixes `SYS-` (system/architecture), `WF-` (workspace/workflow),
`GIT-` (history/authorship), `PERF-` (performance), and `MEDIA-` (capture
safety).

## Procedure

1. Record `git status --short --branch` for both Q repositories and the
   portfolio. Preserve all pre-existing changes.
2. Record the earliest and latest commit dates and the distinct author-name
   count for each repository, without printing author email addresses. Confirm
   backend history begins 2026-04-20 and frontend history begins 2026-05-30. If
   either differs, stop and report `blocked`.
3. Resolve authorship as a `GIT-` claim citing locked owner fact 5: Cursor was a
   development tool and the extra author identities are tooling and duplicates,
   so single-owner-with-AI-assistance wording is approved.
4. Record the **two timelines** from locked owner fact 4 as separate claims, and
   never merge them: a `FACT — OWNER` row for the ≈six-year lineage of the idea
   and its earlier rebuilt versions (no repository evidence exists here for
   those), and a `GIT-` row for the current implementation's dates. Add an
   explicit limit to the lineage row stating that this codebase is not six years
   old.
5. Map verified system boundaries: Tauri desktop shell, React SPA webview,
   FastAPI service, Dramatiq worker pool, Redis queue/cache, PostgreSQL with
   Alembic migrations, MetaTrader 5 integration, Optuna optimization, market-data
   ingestion, and the MSW fixture layer. Distinguish what is implemented from
   what a README describes as planned.
6. Map verified user-facing workspaces. Twelve directories exist under
   `src/workspaces/`; confirm for each whether it is a shipped workspace, a
   shell awaiting panels, or a redirect. The README states `/strategy`
   redirects to Backtests and that Research panels and Neural Features are
   deferred — verify both in code and record them as limits.
7. Record the **execution status** as a `FACT` row: locate in source how live
   trading is disabled (UI gate, backend refusal, configuration, or all three)
   and reconcile it with locked owner fact 6 — execution is a future capability
   and the tool is used today for research and backtesting. This is an accurate
   description of what the product does, not a disclaimer.
8. Create `UNSUPPORTED — DO NOT PUBLISH` rows for the outcome claims no
   evidence supports: trading profit or loss, returns, Sharpe or any
   risk-adjusted ratio, win rate, alpha, edge, strategy effectiveness,
   prediction accuracy, users or adopters, uptime, and ingestion throughput.
   This is the same no-invented-metrics discipline WO-018 applied to Aegis,
   applied to the metric vocabulary this domain happens to use.
9. Record `PERF-` claims only where a budget, benchmark, or test proves them.
   `src/lib/performance/budgets.ts`, `pnpm perf:smoke`, and the memoization
   notes in the frontend README are the only admissible performance evidence.
   Do not publish `high-performance`, `real-time`, or `high-frequency` on README
   authority.
10. Record locked owner fact 7 as a `DECISION` row: the owner set no strategy,
   parameter, feature, or market-data restriction on screenshot content. WO-025
   captures the interface as it is; only the credential/broker/account security
   rule applies.
11. Record the domain as a `FACT — OWNER` row: a research, backtesting, and
    future-execution tool for the **Brazilian futures market** (locked owner
    fact 2). Confirm from source which instruments and venues the market-data
    layer actually handles, so the copy is specific rather than generic.
12. Create the public confidentiality note covering credentials, broker and
    account details, and private source.
13. Update the Q portion of `docs/content.md` with the accepted facts,
    disclosure boundary, missing inputs, and evidence-register link. Do not
    change the Aegis chapter or other project facts.
14. Search candidate public wording for broker names, account numbers, real
    ticker/position data, internal hostnames, credentials, and `[REQUIRED: ...]`
    leakage.
15. Move WO-024 to `REVIEW`. Only an independent reviewer, or the owner acting
    explicitly in that role, may mark it `DONE` and unblock WO-025.

## Automated Checks

```bash
git diff --check
rg -n "FACT — OWNER|FACT — SOURCE|UNSUPPORTED — DO NOT PUBLISH" docs/q-case-study-evidence.md
rg -n "Sharpe|win rate|profit|alpha|edge|accuracy|uptime|throughput" docs/q-case-study-evidence.md
rg -n "state-of-the-art|high-performance|real-time|high-frequency|production-ready" docs/q-case-study-evidence.md
rg -n "\[REQUIRED:" docs/q-case-study-evidence.md docs/content.md
```

Every match in the second and third searches must be reviewed: each one is
either inside an `UNSUPPORTED` row, inside an explicit prohibition, or backed by
a cited source. Run a targeted secret-pattern scan over only the new and
modified documentation. Do not print matched secret values; report file and
classification only.

## Acceptance Checklist

- [ ] Every proposed public claim has a classification and evidence or limit.
- [ ] Owner facts and Git-derived dates are recorded without author emails.
- [ ] Authorship wording rests on an owner statement, not inference.
- [ ] Execution status is established from source and an owner statement, and
      both agree.
- [ ] Unsupported outcome claims have `UNSUPPORTED — DO NOT PUBLISH` rows.
- [ ] Promotional README language is either sourced or explicitly prohibited.
- [ ] The strategy-disclosure boundary is stated in terms a capture operator can
      apply to a screenshot.
- [ ] Deferred and redirecting workspaces are recorded as limits, not features.
- [ ] Credentials, broker, and account information remain confidential.
- [ ] `docs/content.md` and the evidence register agree.
- [ ] No Q source repository file was modified.
- [ ] Documentation checks pass.

## Handoff

Include the claim count by classification, inspected source areas, the verified
execution status, the workspace-by-workspace implemented/deferred table, the
exact strategy pixel boundary WO-025 must enforce, unresolved facts,
confidentiality scan result, source-repository status before and after, and the
reviewer decision needed to unblock WO-025.
