# VIZ-004 — Scroll Choreography Handoff

**Status:** `BLOCKED`
**Implementation date:** 2026-08-03

## Delivered

- Added one `ScrollChoreography` client boundary around the semantic homepage.
  It uses the VIZ-002 `useSceneTimeline` contract for responsive chapter
  introductions, Process geometry, Contact atmosphere, refresh, and cleanup.
- Replaced Logo Loop with a semantic ordered Process rail. The six approved
  stages now form an oversized alternating desktop composition and compact
  mobile sequence; there is no pin, spacer, nested scroller, or hidden stage.
- Removed the rejected Sparkles transition without changing
  `project-showcase.tsx` or VIZ-005's internal stage ownership.
- Moved About's word reveal under the shared runtime. Server and client render
  the same word spans; direct anchors and reduced motion keep every word fully
  readable. The legacy client-mounted store defect discovered during browser
  QA was removed.
- Choreographed only the decorative Contact horizon. Contact copy and actions
  remain fully opaque and interactive at every point.
- Preserved `top`, `main-content`, `work`, `process`, `about`, and `contact`, the
  approved strings, native hash behavior, and the five-section DOM order.

## Browser evidence

| Check | Result |
| --- | --- |
| Chromium desktop | 1440×900, normal motion: 56.4 fps during a 3-second continuous full-page stress scroll; 2 long frames; no horizontal overflow. |
| Chromium mobile | 375×780, normal motion: 60.3 fps; 0 long frames; no horizontal overflow. |
| Firefox desktop | 1440×900, normal motion: functional and visually intact, but 42.1 fps in the headless full-page stress sample. Reduced motion reaches 58.5 fps. This misses the agreed 55 fps gate. |
| Firefox mobile | 375×780, normal motion: 58 fps; reduced motion: 60.5 fps; anchors readable; no overflow or browser errors. |
| WebKit | Playwright's installed WebKit 2327 cannot start because the host lacks `libicudata.so.74`. Installing host packages was not performed. |
| Normal-motion axe | 0 violations; the former `scrollable-region-focusable` finding is gone. One contrast check remains incomplete because axe cannot resolve layered gradients. |
| Reduced-motion axe | 0 violations; 0 canvases, static Process transforms, settled Contact horizon, and complete readable copy. |

Artifacts: [desktop Process still](../../design/evidence/viz-004/desktop-process-1440x900.png),
[desktop scroll recording](../../design/evidence/viz-004/desktop-scroll-1440x900.webm),
[mobile Process still](../../design/evidence/viz-004/mobile-process-375x780.png),
and [mobile scroll recording](../../design/evidence/viz-004/mobile-scroll-375x780.webm).

## Anchor and input matrix

| Entry | Result |
| --- | --- |
| `/#work`, `/#process`, `/#about`, `/#contact` | Each target reports `top: 0`, readable content, and settled motion state after direct navigation. |
| Aegis `Back to selected work` | Reaches `/#work` at `top: 0`, readable. |
| Quant `Get in touch` | Reaches `/#contact` at `top: 0`; Contact copy and horizon are settled. |
| Browser back/forward | Restores About and Contact at `top: 0`, readable. |
| Resize at Contact | 1440×900 → 1024×768 retains `top: 0`, readability, and zero overflow. |
| Reduced motion | Native anchors remain immediate; no timeline or canvas is required for content. |

The recorded deliberate full-page traversal reaches Contact in approximately
5.86 seconds desktop and 4.92 seconds mobile. No prior time-to-Contact baseline
was recorded, so the requested percentage comparison cannot be proved; VIZ-004
adds no artificial pinned distance.

## Visual fidelity ledger

| Comparison point | Result |
| --- | --- |
| Approved copy | Hero, Process, About, Contact, navigation, and actions remain unchanged. Above-the-fold copy diff: none. |
| Process hierarchy | Replaced the small ticker with a full-scale editorial claim and six-stage rail; the page now has a material visual delta. |
| Container model | Remains open and full-width—no cards, pills, framed dashboard, or nested scrolling. |
| Typography | Existing Geist system retained; Process adds disciplined oversized display scale with mono indices and labels. |
| Palette | Existing canvas, text, line, and three accent tokens retained; no provider styling or new color system. |
| Responsive behavior | Desktop alternates rail geometry; mobile uses a compact left-to-right hierarchy with no clipping or overflow. |
| Closing atmosphere | Dotted Surface remains shallow and subordinate; only its wrapper moves into position. |

Direct `view_image` comparison against the VIZ-001 desktop/mobile Process
captures confirms an agency-significant compositional upgrade while preserving
the approved visual system. No fixable screenshot mismatch remains.

## Automated checks

| Command | Result |
| --- | --- |
| `pnpm run test` | Pass — 17 files, 119 tests. |
| `pnpm run lint` | Pass. |
| Scoped `tsc --noEmit` excluding the concurrent Q test | Pass. |
| `git diff --check` | Pass. |
| Full `pnpm run typecheck` | Blocked by concurrent Q case-study work: `src/content/__tests__/case-studies.test.ts:288` accesses `section.badges` on a union member without that property. VIZ-004 does not own those files. |
| Full `pnpm run build` | Previously passed during this implementation, before the concurrent Q edits appeared; it cannot be claimed current while the full type-check is red. |

## Specification reconciliation

- **§3:** records the `ScrollChoreography` wrapper while preserving semantic
  order, IDs, anchors, and keyboard order.
- **§7:** replaces the generic Process composition with the natural-flow
  typographic rail and forbids VIZ-004 pinning/nested scrolling.
- **§9:** removes homepage Logo Loop/Sparkles ownership and records the shared
  Process, About, Contact, refresh, reduced-motion, and anchor contracts.

## Blockers before `REVIEW`

1. Restore a green full-repository type-check/build after the concurrent Q
   case-study changes settle.
2. Reproduce WebKit desktop/mobile with the required host libraries available.
3. Resolve or explicitly accept the Firefox normal-motion desktop result below
   the 55 fps gate; reduced motion and Firefox mobile already pass.

VIZ-006 should scrutinize the assembled WebGL budget as the likely owner of the
Firefox desktop delta: VIZ-003's three hero canvases and the retained Contact
surface participate in the same full-page sample, while VIZ-004 itself adds no
RAF, canvas, scroll owner, or pin.
