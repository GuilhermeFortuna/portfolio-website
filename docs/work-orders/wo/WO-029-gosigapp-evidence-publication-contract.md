# WO-029 — gosigapp Evidence and Publication Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-029 row is
`READY`. The Locked Owner Facts in [`BATCH-05-README.md`](BATCH-05-README.md)
were recorded on 2026-08-03; read them first and treat them as `FACT — OWNER`
inputs, not open questions.

## Result to Produce

A claim-level evidence register for gosigapp that separates verified facts,
owner decisions, confidential context, safe inferences, and unsupported
outcomes before any diagram, capture, or public route is created — the same
discipline WO-018 (Aegis) and WO-024 (Quant) applied, adapted to a backend-only
compliance pipeline with a real regulator on the other end of it.

## Prerequisites

- Batch 04 `DONE` (WO-028 `GO`)
- Locked Owner Facts recorded in the Batch 05 index (done 2026-08-03)

## Files to Create or Modify

```text
docs/gosigapp-case-study-evidence.md
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

The gosigapp source repository is a read-only input and is not in the write
scope.

## Required Source Inspection

Inspect at minimum:

```text
/home/gui/projects/gosigapp/README.md
/home/gui/projects/gosigapp/go.mod
/home/gui/projects/gosigapp/cmd/pipeline/
/home/gui/projects/gosigapp/cmd/server/
/home/gui/projects/gosigapp/cmd/backfill/
/home/gui/projects/gosigapp/cmd/compliance-check/
/home/gui/projects/gosigapp/cmd/date-detail/
/home/gui/projects/gosigapp/cmd/downloader-batch/
/home/gui/projects/gosigapp/cmd/downloader-monthly/
/home/gui/projects/gosigapp/cmd/migrate-logs/
/home/gui/projects/gosigapp/cmd/refresh-token/
/home/gui/projects/gosigapp/internal/pipeline/
/home/gui/projects/gosigapp/internal/processor/
/home/gui/projects/gosigapp/internal/sender/
/home/gui/projects/gosigapp/internal/auth/
/home/gui/projects/gosigapp/internal/job/
/home/gui/projects/gosigapp/internal/scheduler/
/home/gui/projects/gosigapp/internal/logstore/
/home/gui/projects/gosigapp/internal/impedidos/
/home/gui/projects/gosigapp/internal/validator/
/home/gui/projects/gosigapp/internal/config/
/home/gui/projects/gosigapp/internal/api/
/home/gui/projects/gosigapp/schemas/
/home/gui/projects/gosigapp/tests/
/home/gui/projects/gosigapp/Dockerfile
/home/gui/projects/gosigapp/.github/workflows/deploy.yml
```

`iam-policies/*.json` and `gosigapp-task-definition.json` may be inspected
for **structure only** — what kind of resource they describe (ECS task
definition, IAM role/policy) — never for account IDs, ARNs, role names, or
other live values. Do not open `.env` files, PFX certificates or passwords,
AWS credentials, or any file under a `.env*` glob.

**README claims are not source evidence.** The README describes the project
as "production-ready" and lists features promotionally. A README sentence is
a *candidate* claim; it becomes `FACT — SOURCE` only when the register cites
the code, route, test, or command that implements it.

## Evidence Register Format

`docs/gosigapp-case-study-evidence.md` must begin with the public boundary and
use one row per publishable claim:

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

Every source-backed row names a repository-relative file and, where
practical, a symbol, command, test, or schema. Git history is evidence for
dates and authorship, not proof of production correctness or regulator
acceptance.

Use the ID prefixes `SYS-` (system/architecture), `SEC-` (signing/mTLS/auth),
`GIT-` (history/authorship), `OPS-` (deployment/scheduling/retry), and
`MEDIA-` (capture safety).

## Procedure

1. Record `git status --short --branch` for the gosigapp repository and the
   portfolio. Preserve all pre-existing changes.
2. Record the earliest and latest commit dates and confirm the single-author
   history. Confirm history begins 2025-12-24 and the latest commit is
   2026-06-22 with 100 total commits. If any of these differ, stop and report
   `blocked`.
3. Map the verified pipeline boundary end to end: S3 fetch → ZIP extraction →
   XML processing/aggregation → PFX digital signing (RSA-SHA256) → gzip
   compression → base64 encoding → mTLS-authenticated submission to the SIGAP
   API. Cite the `internal/processor`, `internal/pipeline`, and
   `internal/sender` packages for each stage.
4. Record the six SIGAP dataset types from `schemas/*.xsd` and the README's
   dataset table (`apostadores`, `carteiras`, `esportivas`, `jogos`,
   `diarios` daily; `mensais` monthly), and confirm each against the schema
   files present, not the README table alone.
5. Record the two entry points (`cmd/pipeline` CLI, `cmd/server` HTTP API)
   and the supporting commands (`backfill`, `compliance-check`,
   `date-detail`, `downloader-batch`, `downloader-monthly`, `migrate-logs`,
   `refresh-token`) as a `SYS-` claim: what operational problem each command
   solves, verified by reading its `main.go`, not guessed from its name.
6. Record `internal/impedidos` as a `SYS-` claim: verify from
   `service.go`/`types.go` what compliance check it performs (a blocked/
   self-excluded bettor registry check is the working hypothesis — confirm
   or correct from source before publishing that description) and how it
   relates to the SIGAP submission duty.
7. Record `internal/job`, `internal/scheduler`, and `internal/logstore` as
   `OPS-` claims: job lifecycle/status tracking, scheduled/recurring
   execution, and durable log storage (verify the DynamoDB-backed store in
   `internal/logstore/dynamodb.go`) as the mechanisms behind the "retries"
   and "auditability" already promised in `docs/content.md`'s reserved
   summary. Confirm what retry behavior actually exists in code before
   asserting it; if retries are partial or manual, record that as a limit,
   not a gap to hide.
8. Record the security boundary as a `SEC-` claim: PFX-based RSA-SHA256 XML
   digital signing and mTLS authentication to the SIGAP API, citing
   `internal/auth` and the relevant `internal/processor` signing code. State
   this as a regulator-imposed security requirement the pipeline satisfies,
   not a generic "secure by design" claim.
9. Record the multi-brand architecture as a `SYS-` claim using the *generic*
   mechanism only — environment-based per-brand configuration override,
   concurrent processing of multiple brands — without naming `BRX`, `RICO`,
   or any other brand code. Those codes are `CONFIDENTIAL` rows.
10. Record deployment as an `OPS-` claim: containerized (`Dockerfile`),
    deployed via GitHub Actions (`.github/workflows/deploy.yml`) to AWS
    ECS/Fargate (task-definition and IAM-policy *files present*, structure
    only). State the deployment target as a verified architectural fact; do
    not claim it is *currently running* beyond the owner's own "as far as I
    know, still active" framing from the batch index.
11. Record test coverage as a `FACT — SOURCE` claim: what
    `tests/integration/pipeline_aggregation_test.go` and any `internal/*`
    unit tests actually verify. Do not claim broader coverage than what is
    present.
12. Create `UNSUPPORTED — DO NOT PUBLISH` rows for the outcome claims no
    evidence supports: files processed per day/month, submission success
    rate, uptime, incident count, regulator feedback, penalty avoidance, or
    any operational metric. This is the same no-invented-metrics discipline
    WO-018 and WO-024 applied, extended to this domain's metric vocabulary.
13. Create the public confidentiality note covering the employer, the brand
    codes, S3 bucket names, certificate/credential material, AWS account
    identifiers, IAM policy values, and real submission payload content.
14. Update the gosigapp portion of `docs/content.md` with the accepted facts,
    disclosure boundary, missing inputs, and evidence-register link. Confirm
    or correct the already-reserved `/work/gosigapp` title and summary
    against source; do not change the Aegis or Quant chapters or other
    project facts.
15. Search candidate public wording for the employer name, brand codes,
    bucket names, credentials, internal hostnames, account identifiers, and
    `[REQUIRED: ...]` leakage.
16. Move WO-029 to `REVIEW`. Only an independent reviewer, or the owner
    acting explicitly in that role, may mark it `DONE` and unblock WO-030.

## Automated Checks

```bash
git diff --check
rg -n "FACT — OWNER|FACT — SOURCE|UNSUPPORTED — DO NOT PUBLISH" docs/gosigapp-case-study-evidence.md
rg -n "files processed|success rate|uptime|incident|penalty|regulator feedback" docs/gosigapp-case-study-evidence.md
rg -n "\bBRX\b|\bRICO\b" docs/gosigapp-case-study-evidence.md docs/content.md
rg -n "production-ready|enterprise-grade|state-of-the-art" docs/gosigapp-case-study-evidence.md
rg -n "\[REQUIRED:" docs/gosigapp-case-study-evidence.md docs/content.md
```

Every match in the second, third, and fourth searches must be reviewed: each
one is either inside an `UNSUPPORTED`/`CONFIDENTIAL` row, inside an explicit
prohibition, or backed by a cited source. Run a targeted secret-pattern scan
over only the new and modified documentation. Do not print matched secret
values; report file and classification only.

## Acceptance Checklist

- [ ] Every proposed public claim has a classification and evidence or limit.
- [ ] Owner facts and Git-derived dates are recorded and match the batch
      index exactly.
- [ ] The end-to-end pipeline boundary is mapped stage by stage with source
      citations.
- [ ] Retry and auditability claims are verified against actual code, not
      assumed from the README summary.
- [ ] The `impedidos` check's actual function is verified from source, not
      guessed from its name.
- [ ] Employer identity, brand codes, bucket names, credentials, and account
      identifiers are all classified `CONFIDENTIAL`.
- [ ] Unsupported operational-metric claims have `UNSUPPORTED — DO NOT
      PUBLISH` rows.
- [ ] Promotional README language is either sourced or explicitly prohibited.
- [ ] `docs/content.md` and the evidence register agree.
- [ ] No gosigapp source repository file was modified.
- [ ] Documentation checks pass.

## Handoff

Include the claim count by classification, inspected source areas, the
verified pipeline stage map, the verified retry/audit mechanism, the
verified `impedidos` function, unresolved facts, confidentiality scan
result, source-repository status before and after, and the reviewer decision
needed to unblock WO-030.
