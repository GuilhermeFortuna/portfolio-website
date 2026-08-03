# Portfolio Website — Work Orders, Batch 05

## Purpose

Turn **gosigapp** from a one-sentence homepage claim into the portfolio's
third evidence-led case study, following the pattern
[`BATCH-03-README.md`](BATCH-03-README.md) (Aegis) and
[`BATCH-04-README.md`](BATCH-04-README.md) (Quant) established.

gosigapp has no UI. It is a Go backend pipeline that fetches betting/gaming
data from S3, digitally signs it (PFX certificates, RSA-SHA256), and submits
it over mTLS to SIGAP — the Brazilian government regulatory API that betting
operators are legally required to report daily and monthly files to. There is
no screen to photograph. The case study's entire case rests on what the
pipeline provably does: correctness, security, retry/audit behavior, and
reliability in a system a government regulator depends on.

This is the project most at risk of reading as minor, because it has no
product surface. Do not let the disclosure discipline this batch shares with
Batches 03 and 04 collapse the story into a dry technology inventory. The
portfolio exists so the owner can get hired; the compliance stakes — a
regulatory deadline the operator cannot miss — are the opening, not a footnote,
and "no UI" is framed as full-stack backend ownership of a regulator
relationship, not a gap to apologize for.

## Locked Owner Facts

- Public project name: `gosigapp`. `docs/content.md` already reserves
  `/work/gosigapp` with the title `gosigapp — Reliable SIGAP Submission
  Pipeline` and the summary `A Go backend pipeline for file validation,
  processing, retries, auditability, and submission to SIGAP.` WO-029
  re-verifies this wording against source before WO-031 may treat it as final.
- Category: a government-compliance / backend-pipeline category, exact
  wording finalized in WO-031, consistent with `Fraud intelligence` (Aegis)
  and `Quantitative systems` (Quant) as a short, factual noun phrase.
- Context: built for the same unnamed betting operator as Aegis, in the
  Brazilian iGaming sector, to satisfy that operator's legal duty to submit
  daily and monthly regulatory files to SIGAP.
- Role: `Software Developer`, sole author, same authorship model as Aegis and
  Quant — designed and built with AI assistance, not AI-authored.
- Period: repository history begins **2025-12-24** and the latest commit is
  **2026-06-22** (100 commits total), verified directly via `git log` on
  2026-08-03. All commits carry a single author identity
  (`Guilherme Fortuna dos Santos` / `guilherme`) — no tooling-identity
  reconciliation is needed here, unlike Aegis's frontend and Quant's GIT-03
  case.
- Ownership: designed and built every layer — pipeline, signing/security,
  HTTP API, scheduler, deployment — solo, same claim as Aegis.
- Status: deployed to AWS ECS/Fargate. `Dockerfile`, `.github/workflows/
  deploy.yml`, `gosigapp-task-definition.json`, and `iam-policies/` are all
  present in source. As far as the owner knows, still active. WO-029 verifies
  the deployment claim from source structure; it does not assume the service
  is currently running.
- Business impact: no client-provided metrics are available. Do not invent or
  imply file counts, uptime, error rates, or SLA performance without a source
  WO-029 accepts.
- **Confidential — must never appear in copy, diagrams, captures, log
  excerpts, or the media manifest:** the employer's identity, the brand codes
  `BRX` and `RICO` (or any other value `ACTIVE_BRANDS` could hold), S3 bucket
  names, PFX/certificate file paths or passwords, AWS account IDs, ARNs, IAM
  policy values, JWT secrets, API tokens, and any real submission payload
  content. `SIGAP` itself is already public — used in `docs/content.md` — so
  the regulator's name and the general shape of the submission mechanism may
  be described.
- No live-environment control: `docs/content.md`'s existing decision already
  covers this — "gosigapp has no UI (CLI/backend only) and will not receive a
  live-environment action." The hero omits the control entirely, the same
  resolution Quant used for a different reason (native desktop app).

## Read-Only Evidence Sources

```text
/home/gui/projects/gosigapp
```

Workers may inspect and run this repository, using only fixture/placeholder
configuration values, never the real `.env`, PFX certificate, or AWS
credentials. They must not modify, commit, clean, reset, or reconfigure the
source repository. Never read or copy `.env` values, PFX certificates or
passwords, AWS credentials, IAM policy values, real S3 bucket contents, real
submission payloads, or production log data.

## Mandatory Reading

1. This batch index.
2. [`WO-STATUS.md`](WO-STATUS.md).
3. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md).
4. [`../../content.md`](../../content.md).
5. [`BATCH-03-README.md`](BATCH-03-README.md) and
   [`BATCH-04-README.md`](BATCH-04-README.md) and the deliverables they
   produced — this batch follows their pattern and must stay consistent with
   both, adapted for a project with no UI.
6. The assigned Work Order and every completed prerequisite handoff.

## Dependency Order

```text
WO-029 gosigapp Evidence and Publication Contract
  └─ WO-030 gosigapp Architecture Diagram and CLI/Log Evidence Capture
       └─ WO-031 gosigapp Case-Study Content Contract
            └─ WO-032 gosigapp Case-Study Implementation
                 └─ WO-033 gosigapp Integration and Release Review
```

Do not run these orders in parallel. Each order freezes inputs consumed by
the next. Only WO-029 may become `READY` when this batch opens.

Batch 05 has **no route-foundation order**, the same shortcut Batch 04 took.
WO-021 already delivered the typed content model, the shared shell, and the
case-study primitives, and they are `DONE`. WO-032 reuses them and may extend
them only as WO-027 (Quant) was permitted to.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-029 | [gosigapp Evidence and Publication Contract](./WO-029-gosigapp-evidence-publication-contract.md) | Claim-level evidence register and disclosure boundary |
| WO-030 | [gosigapp Architecture Diagram and CLI/Log Evidence Capture](./WO-030-gosigapp-diagram-cli-log-evidence-capture.md) | System-map diagram, sanitized CLI/log captures, and media manifest |
| WO-031 | [gosigapp Case-Study Content Contract](./WO-031-gosigapp-case-study-content-contract.md) | Owner-approved narrative and exact visible copy |
| WO-032 | [gosigapp Case-Study Implementation](./WO-032-gosigapp-case-study.md) | Finished `/work/gosigapp` route and homepage entry point |
| WO-033 | [gosigapp Integration and Release Review](./WO-033-gosigapp-integration-release-review.md) | Independent truth, browser, accessibility, metadata, and performance gate |

## Shared Prohibitions

- Do not name or hint at the former employer.
- Do not expose the brand codes `BRX`/`RICO`, S3 bucket names, PFX/
  certificate paths or passwords, AWS account IDs, ARNs, IAM policy values,
  JWT secrets, API tokens, or any real submission payload content.
- Do not claim files-processed volume, uptime, error rate, submission
  latency, or SLA performance without a source WO-029 accepts.
- Do not publish the project repository link.
- Do not capture or reference AWS/cloud-console screenshots of any kind —
  evidence for this chapter is limited to the architecture diagram and
  sanitized CLI/log text (owner decision, 2026-08-03).
- Do not add another visual-effect dependency, animation system, WebGL
  runtime, global cinematic transition, or homepage section.
- Do not turn the case study into a generic technology inventory. Every
  technology mention must support a described problem or decision, and the
  compliance stakes come before the mechanics.
- Do not place `[REQUIRED: ...]`, confidential notes, or development
  fixtures in rendered content, metadata, generated assets, or the
  production bundle.

## Batch Completion Rule

Batch 05 is complete only when WO-033 records a `GO` release decision and is
marked `DONE`. Completion of the route implementation alone is insufficient.
