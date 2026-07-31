# Portfolio Website — Work Orders, Batch 02

## Purpose

Batch 02 establishes the deterministic Vitest/jsdom baseline for the existing
portfolio without pretending that browser-only WebGL, animation, responsive,
or performance behavior can be proven by component tests.

## Mandatory Reading

1. [`README.md`](README.md) — Batch 01 workflow and handoff contract.
2. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md) — fixed application
   direction.
3. [`WO-STATUS.md`](WO-STATUS.md) — dispatch authority.
4. [`../../content.md`](../../content.md) — authoritative public facts and copy.

## Dependency Order

```text
WO-013 Test Foundation
  ├─ WO-014 Content and Utility Tests
  └─ WO-015 Static Component Tests
       └─ WO-016 Interactive and Hook Tests
            └─ WO-017 Test Baseline Review
```

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-013 | [Test Foundation](./WO-013-test-foundation.md) | Vitest, jsdom, RTL, shared setup |
| WO-014 | [Content and Utility Tests](./WO-014-content-utility-tests.md) | Content contracts and utility coverage |
| WO-015 | [Static Component Tests](./WO-015-static-component-tests.md) | Semantic layout and static component coverage |
| WO-016 | [Interactive and Hook Tests](./WO-016-interactive-hook-tests.md) | Project selector and reusable hook behavior |
| WO-017 | [Test Baseline Review](./WO-017-test-baseline-review.md) | Repeatability, coverage evidence, and documentation |

## Completion Rule

Batch 02 is complete only when WO-017 is `DONE`. Runtime WebGL lifecycle,
responsive rendering, real-browser accessibility, and performance remain
browser-review work rather than jsdom coverage.
