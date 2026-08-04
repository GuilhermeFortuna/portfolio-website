# gosigapp Case Study — Release Review (WO-033)

## Decision

**GO.**

`/work/gosigapp` may ship. Zero `MAJOR` findings. Two pre-existing, sitewide
`MINOR` findings carried forward (not introduced by WO-032, not gating). One
new `MINOR` finding specific to this order's build/documentation is recorded
below and does not block release.

## Scope and Frozen Commit

- Reviewed commit: `development` @ `0789fbc5` (WO-032's own commit is
  `8ff47e82`; one unrelated i18n commit landed on top before this review
  started — see Finding F-04).
- Build: `next build` (Turbopack, Next.js 16.2.12) + `next start` on a
  temporary local port (4033). No dev server was used for any recorded
  check.
- Engines: Chromium 151.0.7922.34, Firefox 152.0.4 (via Playwright
  1.61.0/1.62.1 driver, browsers launched with explicit `executablePath`
  overrides against the pre-installed `~/.cache/ms-playwright` revisions).
  WebKit could not be launched in this environment — see Finding F-05.

## 1. Truth and Disclosure

| Check | Result |
| --- | --- |
| Visible strings match WO-031 contract verbatim | **PASS** — 11 sections (1 `h1` + 10 `h2`), all headings and all prose paragraphs extracted from the rendered production HTML and diffed word-for-word against `docs/gosigapp-case-study-content.md`. 0 mismatches. |
| Claims trace to accepted WO-029 claim IDs | **PASS** — spot-checked citations for the system-map diagram (SYS-01–05, SEC-01–02, OPS-01–04) and the "WebSocket progress broadcasting" system-map label specifically, since it isn't in the WO-031 prose; confirmed as `OPS-02` `FACT — SOURCE` in `docs/gosigapp-case-study-evidence.md` line 57. |
| No operational-metric claim stated as real | **PASS** — no uptime/success-rate/volume figures found. The compliance-check terminal capture shows record counts (e.g. "1,420 bettor records") but these are OCR-verified as fixture data, not live metrics. |
| Employer not named/hinted; `BRX`/`RICO` absent everywhere | **PASS** — 0 matches for `BRX`/`RICO`/`[REQUIRED:`/`[CONFIDENTIAL:` in rendered HTML. Extended the scan beyond rendered output to every `.next/static` and `.next/server` build artifact (0 matches) and to every JS chunk referenced by the `/work/gosigapp` document (0 real matches; a case-insensitive `rico` grep hit was a false positive on minified `encodeURIComponent`/`decodeURIComponent`, verified by inspecting context). |
| Zero forbidden markers, external/repo links | **PASS** — all anchors same-origin (`/#work`, `/#contact`). |
| Secret/credential/account/cert-path scan on rendered HTML and assets | **PASS** — no AWS access-key pattern, ARN, 12-digit account ID, S3 URI, PEM header, or bucket name found anywhere in the rendered document. |

## 2. Media Integrity

| File | Manifest SHA-256 | Actual SHA-256 | Match |
| --- | --- | --- | --- |
| `system-map.svg` | `aee5e1fe75...1bd66e8` | `aee5e1fe75...1bd66e8` | **YES** |
| `compliance-check-output.webp` | `734b3398...e715d04` | `734b3398...e715d04` | **YES** |
| `cli-pipeline-run.webp` | `dd0b7b43...d2d1c40` | `dd0b7b43...d2d1c40` | **YES** |

All three manifest-listed assets are byte- and hash-exact against
`docs/gosigapp-case-study-media.md`. A fourth file, `placeholder.svg`, exists
in `public/work/gosigapp/` but is the homepage project-card thumbnail (same
pattern as `/work/q`'s `identity-placeholder.svg` and Nexo Dental's
placeholder) — it is outside the WO-030 case-study media manifest by design,
generic (hatched pattern + "PLACEHOLDER / GOSIGAPP" text), and carries no
sensitive content.

- **No cloud-console screenshot present** — confirmed by direct file listing;
  only one vector diagram and two terminal-capture WebPs exist in the
  directory. Explicit owner prohibition satisfied.
- **OCR pass** (`tesseract`, both WebP assets, converted via `ffmpeg`):
  `cli-pipeline-run.webp` and `compliance-check-output.webp` both OCR to
  fixture-only content — `operator-fixture` brand, `staging` environment,
  synthetic receipt ID `sigap-rec-20260601-0042-8a9b`, generic
  `S3 fixture bucket` reference (no bucket name), and no real bettor CPFs,
  account IDs, hostnames, or credentials. Matches the media manifest's own
  "PASSED" leakage-inspection rows.
- **System-map label accuracy** — every `<text>` node in `system-map.svg` was
  extracted and cross-checked against WO-029's accepted claim table. All
  labels (S3 Raw Data Storage, ZIP Extractor & XSD Validator, 6 SIGAP Dataset
  Aggregator, PFX Digital Signer, mTLS & OAuth2 REST Transport, SIGAP
  Impedidos v2 Validation, DynamoDB Audit Log Store, Job Runner & Cron
  Scheduler) map to accepted `SYS`/`SEC`/`OPS` claim IDs. No invented
  component or throughput number found.

## 3. Series Consistency

- `/work/aegis`, `/work/q`, and `/work/gosigapp` share the same shell,
  heading rhythm, and section primitives (`CaseStudyHero`, `CaseStudyFigure`,
  system-map component pattern). gosigapp is visibly lighter and shorter
  (3 media assets vs. Aegis's larger set), which is expected per WO-033's own
  scope note, and the page still reads as a complete narrative (context →
  problem → architecture → three decisions → contribution → evidence/limits
  → tech stack → disclosure), not as thin.
- **Shared-primitive diff review**: WO-032 touched two shared components.
  - `CaseStudyHero`: `hero.media` render is now conditional
    (`hero.media ? <CaseStudyFigure ... /> : null`). Both Aegis and Quant
    always define `hero.media`, so this is a no-op for their rendering.
  - `CaseStudyFigure`: the `<picture><source type="...">` MIME type is now
    derived from the file extension (`.svg` → `image/svg+xml`, else
    `image/webp`) instead of being hardcoded to `image/webp`. This is
    **not** a no-op for Quant — see Finding F-01 below.
- Homepage integration: fetched `/` and confirmed all three shipped case
  studies (Aegis, Quant, gosigapp) link correctly (`/work/aegis`,
  `/work/q`, `/work/gosigapp`), the derived label text is correct
  (`View gosigapp case study`), and Nexo Dental correctly remains unlinked.
- The WO-023 accessibility baseline holds on `/work/gosigapp` per the axe-core
  results below (0 violations, Chromium + Firefox).

### Finding F-01 (MINOR) — Quant's rendered HTML is not byte-identical pre/post WO-032

`docs/gosigapp-case-study-media.md`'s sibling requirement in this WO
("Aegis and Quant rendering are byte-identical to their pre-WO-032 output")
does not hold exactly. WO-032's `CaseStudyFigure` MIME-type fix changes one
attribute in `/work/q`'s rendered HTML: the `<source>` tag for
`identity-placeholder.svg` now reads `type="image/svg+xml"` instead of the
pre-WO-032 `type="image/webp"`.

**Reproduction**: `curl http://localhost:4033/work/q | grep identity-placeholder` on the frozen commit vs. any commit before `8ff47e82`.

**Assessment**: this is a bug fix, not a regression — the previous
`type="image/webp"` on an actual SVG source was itself incorrect and browsers
already ignored that mismatched `<source>` in favor of the `<img src>`
fallback, so the visible image was unchanged before and after. No visual or
functional difference was observed on `/work/q`. Classified `MINOR` only
because it technically breaks the "byte-identical" acceptance wording, not
because it has user-visible impact. No action required.

## 4. Browser, Accessibility, and Performance

### Cross-browser / viewport / zoom

| Engine | 1440×900 | 1024×768 | 768×1024 | 375×780 | 200% zoom |
| --- | --- | --- | --- | --- | --- |
| Chromium 151.0.7922.34 | 0 overflow, 0 axe violations | same | same | same | 0 overflow |
| Firefox 152.0.4 | 0 overflow, 0 axe violations | same | same | same | not tested (zoom check ran on Chromium only) |
| WebKit | **not run** — see F-05 | | | | |

Zero horizontal overflow and zero overflowing elements at all four required
viewports plus 200% zoom, on both engines that could be launched. `axe-core`
4.12.1 (the version already vendored transitively in this repo) reported
**zero violations** on `/work/gosigapp` on both Chromium and Firefox across
all four viewports.

**Pre-existing non-gating findings from WO-023/WO-028 also affect this
route**: F-02 (no Open Graph tags) does **not** reproduce here — `og:title`,
`og:description`, `og:url`, `og:image` (pointing at `system-map.svg`),
`og:image:width/height/alt`, and Twitter Card tags are all present and
correct on `/work/gosigapp`. This appears to have been resolved sitewide
since WO-023/WO-028; not a gosigapp-specific gap. F-03 (`LogoLoop` keyboard
access) does not apply — `/work/gosigapp` does not render `LogoLoop`.

### Keyboard, no-JS, asset-failure

- **Real native `Tab` traversal**: first `Tab` press focuses the "Skip to
  content" link (`href="#main-content"`); `Enter` moves real document focus
  to `<main id="main-content">`. Verified via `document.activeElement`
  inspection, not synthetic focus calls.
- **JavaScript disabled**: page renders completely — full body text (7,042
  characters), `h1` present, all 3 case-study images present in markup.
- **Image/asset failure** (all `webp`/`svg`/`png`/`jpg` requests aborted):
  page still reads completely — identical body text length and `h1`, zero
  page errors thrown.

### Tap target size

**Finding F-03 (MINOR, pre-existing, sitewide, carried forward)** — the
header `EN`/`PT` language-switcher buttons measure 34×32px, under the 44px
minimum interactive-target guideline. This is not specific to
`/work/gosigapp`: `LanguageSwitcher` renders in the shared site header on
every route, is VIZ-owned, and was not touched by WO-032. Flagged for a
follow-up order, not gating this release.

No other interactive element under 44px was found on `/work/gosigapp`.

### Performance

| Page | LCP | CLS | Requests | Transferred bytes |
| --- | --- | --- | --- | --- |
| `/work/gosigapp` | 48ms | 0 | 13 | **52.4 KB** |
| `/work/q` | 56ms | — | 15 | 409.4 KB |
| `/work/aegis` | 64ms | — | 15 | 2.04 MB |

`/work/gosigapp` is confirmed the lightest of the three case studies by a
wide margin (~8x lighter than Quant, ~40x lighter than Aegis), consistent
with its much smaller media set (1 SVG diagram + 2 WebP terminal captures vs.
Aegis's video/image-heavy set). No regression toward Aegis/Quant weight.
Zero console errors on any performance run.

**Homepage WebGL context count**: 4, recorded on this build. No WebGL-related
file (`webgl-effect.tsx`, `webgl-manager.tsx`, or any homepage section) was
touched by WO-032 — the diff is scoped entirely to case-study content,
route, and the two shared `case-study/*` primitives discussed above — so
this count is structurally guaranteed unchanged by this order. No documented
baseline count exists in prior WO evidence to diff against numerically; this
review establishes 4 as the current recorded value for future comparison.

### Finding F-04 (MINOR, informational) — production build reports all three case-study routes as Dynamic, not Static

`next build` at the frozen commit reports `/work/aegis`, `/work/q`, and
`/work/gosigapp` as `ƒ (Dynamic)`, not `○ (Static)`. WO-032's own acceptance
evidence in `WO-STATUS.md` states the build reported `/work/gosigapp` as
`○ (Static)` — that claim does not hold at the frozen commit.

**Root cause**: the sitewide i18n middleware (`src/middleware.ts`, added by
`5f38b938`, predating WO-032's own implementation commit `8ff47e82`) reads
cookies/headers on every request, which forces Next.js to mark all
middleware-intercepted routes as dynamic. This is a site-wide effect of the
i18n/VIZ work stream, not something introduced by WO-032 and not something
gosigapp's write scope (`src/content/**`, `src/app/work/**`) could fix
unilaterally — `src/middleware.ts` is outside Batch 05's write scope.

**Impact assessed as none in practice**: despite the `ƒ` tag, `/work/gosigapp`
still measured LCP 48ms and 52.4 KB transferred in this review, so there is
no observed performance cost. Classified `MINOR`/informational because it
contradicts a specific acceptance-checklist line item's documented evidence,
not because it produces any measurable regression. Recommend a future order
audit whether all three case-study routes should be exempted from the i18n
middleware matcher to restore static generation, referred to the owner
rather than fixed here per this WO's no-unilateral-fix constraint.

### Finding F-05 (evidence gap, not a defect) — WebKit could not be launched in this environment

WebKit (`playwright` driver, cached revision `webkit-2327`) failed to launch:
the `minibrowser-wpe` binary is missing `libicudata.so.74` (the host system
only has `libicudata.so.77`), and the `minibrowser-gtk` variant likewise
could not start. This is a local environment/library-version constraint, not
a product defect — Chromium and Firefox both passed the full check matrix
with zero violations and zero overflow. Recorded as a carried-forward gap:
a future review with a working WebKit runtime should confirm this route
specifically, though nothing in the Chromium/Firefox results suggests
WebKit-specific risk (no experimental CSS, no browser-specific APIs used in
this route).

## 5. Metadata

| Field | Rendered | Registry (`docs/content.md`) | Match |
| --- | --- | --- | --- |
| Title | `gosigapp — Reliable SIGAP Submission Pipeline` | same | **YES** |
| Description | `A Go backend pipeline for file validation, processing, retries, auditability, and submission to SIGAP.` | same | **YES** |
| Canonical | `http://localhost:3000/work/gosigapp` | base URL is `[REQUIRED: production URL]` in the registry (pre-existing, sitewide placeholder, not gosigapp-specific) | **N/A — carried forward** |

JSON-LD: **not present** on `/work/gosigapp`. Verified this is not
gosigapp-specific — `/work/aegis` and `/work/q` also carry zero
`application/ld+json` blocks. No JSON-LD implementation exists anywhere in
the codebase (`grep` for `ld+json` in `src/lib/seo.ts` and all case-study
pages returns 0 matches). Since no JSON-LD exists, the "contains only
verified data" check is vacuously satisfied — there's no fabricated
structured data to find. Carried-forward gap, sitewide, not gating.

## Automated Checks

```
pnpm run test          → 20 files / 149 tests, all passing
pnpm run test:coverage  → 20 files / 149 tests, all passing (65.2% stmts, no gate)
pnpm run lint            → 0 errors, 4 pre-existing warnings (unrelated to gosigapp)
pnpm run typecheck       → clean
pnpm run build           → succeeds; /work/gosigapp reports ƒ (Dynamic) — see F-04
sha256sum public/work/gosigapp/*  → all 3 manifest assets hash-exact
git diff --check         → clean (only WO-STATUS.md modified by this review)
```

## Findings Summary

| ID | Severity | Summary | Gating? |
| --- | --- | --- | --- |
| F-01 | MINOR | `/work/q`'s rendered `<source type>` for its identity SVG changed (bug fix, no visual/functional impact) | No |
| F-02 | — | Open Graph tags: does not reproduce on `/work/gosigapp`, appears resolved sitewide | No |
| F-03 | MINOR (carried forward) | Header `EN`/`PT` buttons are 34×32px, under 44px target minimum, sitewide/VIZ-owned | No |
| F-04 | MINOR/informational | All three case-study routes build as Dynamic, not Static, due to sitewide i18n middleware; no measured performance impact | No |
| F-05 | Evidence gap | WebKit untestable in this environment (missing system ICU library); Chromium + Firefox both clean | No |

No `MAJOR` finding was found in any category: no cloud-console screenshot, no
brand-code leak, no employer-identifying detail, no secret/credential
pattern match, and no accessibility violation.

## Carried-Forward Items for Follow-Up Orders

1. Sitewide 44px tap-target audit for `LanguageSwitcher` (`EN`/`PT`
   buttons) — extends the existing F-03 `LogoLoop` keyboard-access
   follow-up already on record from WO-023/WO-028.
2. Whether `/work/aegis`, `/work/q`, and `/work/gosigapp` should be exempted
   from the i18n middleware matcher to restore static generation (Finding
   F-04) — a VIZ/middleware-scope decision, not Batch 05's to make
   unilaterally.
3. WebKit runtime is not currently launchable in this development
   environment (missing `libicudata.so.74`); either provision the missing
   system library or pin/re-download a WebKit revision matching the
   system's available ICU version before the next release review that needs
   full three-engine coverage.
4. `docs/gosigapp-case-study-content.md`'s stated decision-body word counts
   (86/86/88) do not match the actual word count of the quoted copy
   (79/72/75 by direct count) — a documentation arithmetic error in WO-031,
   not a rendering-fidelity issue (the rendered copy is verbatim to the
   contract). Worth a correction pass on WO-031's own document, no
   visible-copy change needed.
5. **Batch 05's diagram-and-CLI media approach is worth documenting as the
   template for any future no-UI chapter.** The vector system-map diagram
   plus two sanitized terminal-capture WebPs produced a page that is
   simultaneously the most truthful (fixture-only data, zero leakage across
   OCR and pattern scans), the lightest (52.4 KB vs. 409 KB and 2.04 MB for
   the UI-driven chapters), and fully series-consistent despite having no
   screenshots to draw from. Recommend a short WO-030-style template order
   capturing this pattern (diagram sketch → owner-approved SVG render →
   sanitized fixture-driven terminal capture → OCR + pattern-scan gate)
   for reuse on any future backend-only or CLI-only project chapter.

## Process Note

WO-032 was moved from `REVIEW` to `DONE` by explicit owner authorization at
the start of this session (waiving the separate independent-reviewer step,
consistent with every prior order in Batch 03–05), frozen at `development` @
`0789fbc5`. This review was then run independently against that frozen
commit. All temporary processes (the `next start` instance on port 4033) were
stopped at the end of this review; no owner-run process or port was
disturbed at any point.
