# Portfolio Website — Work Orders, Batch 03

## Purpose

Turn Aegis from a one-sentence homepage claim into the portfolio's first
evidence-led case study. This batch proves production delivery, end-to-end
ownership, architecture, product design, and the custom motion identity without
exposing the former employer, production data, credentials, or invented impact.

The dark-liquid cinematic concept is not part of this batch. Project media may
appear only where it explains Aegis.

## Locked Owner Facts

- Public project name: `Aegis`.
- Public category: `Fraud intelligence`.
- Context: built for an unnamed betting company in the Brazilian iGaming
  sector.
- Role: `Software Developer`.
- Period: `April 2026–present`; repository history begins on 2026-04-06
  (backend) and 2026-04-12 (frontend).
- Ownership: Guilherme designed and built every product and engineering layer,
  with AI assistance.
- Status: deployed to production and, as far as the owner knows, still active.
- Public version: the repository version is a sanitized, independently
  maintained evolution of the company implementation and may receive further
  polish.
- Business impact: no client-provided metrics or outcome claims are available.
  Do not invent or imply any.
- Entry intro pipeline: Blender model and animation → FBX → Unreal Engine 5
  lighting, aurora, dust particles, scene, and render → 4K image sequence →
  DaVinci Resolve final video.

## Read-Only Evidence Sources

```text
/home/gui/projects/aegis-project/aegis
/home/gui/projects/aegis-project/aegis-front
```

Workers may inspect and run those repositories. They must not modify, commit,
clean, reset, or reconfigure either source repository. Never read or copy `.env`
values, credentials, production dumps, real tenant/player records, or private
deployment identifiers.

## Mandatory Reading

1. This batch index.
2. [`WO-STATUS.md`](WO-STATUS.md).
3. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md).
4. [`../../content.md`](../../content.md).
5. The assigned Work Order and every completed prerequisite handoff.

## Dependency Order

```text
WO-018 Aegis Evidence and Publication Contract
  └─ WO-019 Aegis Safe Media Capture and Adaptation
       └─ WO-020 Aegis Case-Study Content Contract
            └─ WO-021 Shared Case-Study Route Foundation
                 └─ WO-022 Aegis Flagship Case-Study Implementation
                      └─ WO-023 Case-Study Integration and Release Review
```

Do not run these orders in parallel. Each order freezes inputs consumed by the
next one. Only WO-018 may be `READY` when this batch is created.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-018 | [Aegis Evidence and Publication Contract](./WO-018-aegis-evidence-publication-contract.md) | Claim-level evidence register and disclosure boundary |
| WO-019 | [Aegis Safe Media Capture and Adaptation](./WO-019-aegis-safe-media-capture-adaptation.md) | Sanitized screenshots, optimized intro, posters, and media manifest |
| WO-020 | [Aegis Case-Study Content Contract](./WO-020-aegis-case-study-content-contract.md) | Owner-approved narrative and exact visible copy |
| WO-021 | [Shared Case-Study Route Foundation](./WO-021-case-study-route-foundation.md) | Typed content model, reusable shell, and `/work/aegis` route |
| WO-022 | [Aegis Flagship Case-Study Implementation](./WO-022-aegis-flagship-case-study.md) | Finished Aegis route and homepage entry point |
| WO-023 | [Case-Study Integration and Release Review](./WO-023-case-study-integration-release-review.md) | Independent truth, browser, accessibility, metadata, and performance gate |

## Shared Prohibitions

- Do not name or hint at the former employer.
- Do not expose real brands, players, bettors, transactions, credentials,
  internal hosts, project IDs, tenant identifiers, or screenshots of real data.
- Do not claim fraud reduction, money saved, analyst adoption, investigation
  speed, revenue impact, detection accuracy, data volume, uptime, or team size
  without a source accepted in WO-018.
- Do not publish project repository links.
- Do not copy the 17.3 MB 4K intro directly into the portfolio.
- Do not add another visual-effect dependency, animation system, WebGL runtime,
  global cinematic transition, or homepage section.
- Do not turn the case study into a generic technology inventory. Every
  technology mention must support a described problem or decision.
- Do not place `[REQUIRED: ...]`, confidential notes, or development fixtures
  in rendered content, metadata, generated assets, or the production bundle.

## Batch Completion Rule

Batch 03 is complete only when WO-023 records a `GO` release decision and is
marked `DONE`. Completion of the route implementation alone is insufficient.
