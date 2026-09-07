# Aegis Case-Study Release Review (WO-023)

**Date:** 2026-07-31
**Reviewer:** Auto (WO-023 release review), independent of WO-021 and WO-022
**Subject:** `/work/aegis` and its homepage entry point
**Implementation under review:** `development` @ `a1eef93` (hero spacing at `8747587`)
**Build:** production only (`pnpm run build` + `pnpm run start`); no dev-server timing was used

## Decision

**GO.**

The review first recorded `NO-GO` on one `MAJOR` finding: the hero fact labels on
`/work/aegis` failed WCAG 2.2 SC 1.4.3 at a measured **4.04:1** against a
**4.5:1** requirement. The owner authorized raising the shared
`--color-text-dim` token at its root rather than patching the route, that
correction was applied, and **`/work/aegis` now reports zero axe violations**.
No blocker and no major finding remains, so the gate passes.

Everything else in the review matrix passed on the first pass. Truthfulness,
confidentiality, media integrity, cross-engine behaviour, navigation,
no-JavaScript rendering, media-failure resilience, reduced motion, keyboard
access, performance, and the homepage WebGL budget are all clean and evidenced
below.

Two `MINOR` findings remain open and are explicitly **not** gating: both are
pre-existing homepage-scope gaps that predate Batch 03 and neither affects
`/work/aegis`.

## Findings

| ID | Severity | Area | Finding |
| --- | --- | --- | --- |
| F-01 | `MAJOR` → **RESOLVED** | Accessibility | `--color-text-dim` (`#667083`) on `--color-canvas` (`#06070a`) measured **4.04:1**. The four hero fact labels (`dt`) render it at 11 px / normal weight, where SC 1.4.3 requires 4.5:1. 6 failing nodes on `/work/aegis`, confirmed identically by Chromium, Firefox, and WebKit. Root cause was the shared Batch 01 token, which also failed on the homepage. **Fixed** by raising the token to `#7a8496`; see [Corrections](#corrections-made-during-this-review). `/work/aegis` now has zero violations. |
| F-02 | `MINOR` | Metadata | No Open Graph or Twitter Card tags on either route. WO-023 asks for an Open Graph fallback; link previews currently degrade to a bare URL. Pre-existing Batch 01 gap, not introduced by this batch. |
| F-03 | `MINOR` | Accessibility | axe `scrollable-region-focusable` on the Process `LogoLoop` container: a scrollable region with no keyboard access. **Homepage only — not on `/work/aegis`.** Reported by Chromium and Firefox, not by WebKit. Pre-existing from WO-007. |
| F-04 | `NOTE` | Metadata | No `rel=canonical`. WO-023 defers canonical behaviour until a canonical base exists, and none does; `metadataBase` is unset. Correct for now. |
| F-05 | `NOTE` | Runtime | The hydration error WO-022 flagged at `process-section.tsx` (`LogoLoop`) **does not reproduce in a production build**: 0 console errors and 0 page errors across 3 engines × 4 viewports. Dev-server-only. |
| F-06 | `NOTE` | Toolchain | The owner-authorized pnpm migration moved four transitive packages one patch level (`baseline-browser-mapping` 2.11.6→2.11.5, `electron-to-chromium` 1.5.398→1.5.397, `enhanced-resolve` 5.24.4→5.24.3, `jose` 6.2.5→6.2.4). No direct dependency changed. |
| F-07 | `NOTE` | Evidence | WebKit could not run on the host: the Playwright build needs Ubuntu ABI versions Fedora 44 does not carry (ICU 74 vs 77, `libjpeg.so.8` vs `.62`, `libjxl 0.8` vs `0.11`, no `libwpe`). Rather than symlink across major ABI bumps and risk unreliable results, WebKit was run in `mcr.microsoft.com/playwright:v1.62.1-noble` against the host server. |

### F-01 in detail, and how it was fixed

Measured with axe-core 4.12.1 and confirmed by hand from the token values.
`--color-text-dim` is used on three different backgrounds, so all three matter:

| Token | Hex | on `#06070a` canvas | on `#0c0f14` surface | on `#111620` surface-strong | Worst case |
| --- | --- | --- | --- | --- | --- |
| `--color-text-dim` (before) | `#667083` | 4.04:1 | 3.85:1 | 3.63:1 | **3.63:1 — fails** |
| `#727c8f` (first estimate) | `#727c8f` | 4.79:1 | 4.57:1 | 4.31:1 | 4.31:1 — still fails |
| **`--color-text-dim` (after)** | **`#7a8496`** | **5.34:1** | **5.09:1** | **4.80:1** | **4.80:1 — passes** |
| `--color-text-muted` | `#9ba6b5` | 8.17:1 | 7.78:1 | 7.34:1 | 7.34:1 — passes |

The failing nodes were the hero definition-list labels rendered by
`case-study-hero.tsx` (the `eyebrowStyle` colour plus the matching utility
class). The same token also failed on the homepage in the project-showcase
labels and the contact time-zone line, so a route-local fix would have left two
routes styling identical labels differently.

**The fix raises the token itself** — a single edit in `globals.css` — which
clears the route and the homepage together and keeps one label style across
both. The value `#7a8496` was chosen over the `~#727c8f` this review first
suggested because `aegis-system-map.tsx` renders dim text on
`--color-surface`, and a check against every background showed `#727c8f` fell to
4.31:1 on `--color-surface-strong`. `#7a8496` holds at least 4.80:1 everywhere
while staying the same dim blue-grey.

Two elements that use the token were never violations and needed no change: the
disabled live-environment control (disabled controls are exempt from SC 1.4.3)
and the `aegis-system-map` node captions, which axe did not flag.

**Post-fix verification (axe-core 4.12.1, production build):**

| Surface | Before | After |
| --- | --- | --- |
| `/work/aegis` | 6 nodes `color-contrast` | **0 violations** |
| `/` settled | `color-contrast` on dim labels + 28 mid-animation nodes | **1 violation** (`scrollable-region-focusable`, F-03) |
| `/` under `prefers-reduced-motion: reduce` | — | **0 violations** |

The 28 extra homepage nodes seen before the fix were an artifact of scanning
mid-animation: the GSAP scroll-reveal words were sampled at `opacity: 0.3` with
`blur(2px)`. Once the About section settles they compute to `opacity: 1`,
`blur(0px)`, and `--color-text` (17.9:1), and the words further down the page are
faded only in proportion to scroll progress, by design. Under reduced motion the
animated words are not rendered at all and the static paragraph is used. The
settled and reduced-motion scans are the honest states, and both are clean of
contrast failures.

## Browsers and versions

| Engine | Version | How it ran |
| --- | --- | --- |
| Chromium | 151.0.7922.34 | Playwright 1.62.1, host |
| Firefox | 153.0 | Playwright 1.62.1, host, outside the agent sandbox (in-sandbox page creation crashed) |
| WebKit | 26.5 | Playwright 1.62.1 inside `mcr.microsoft.com/playwright:v1.62.1-noble`, `--network=host` (see F-07) |

All three agree on every material check. Differences observed were confined to
axe's `scrollable-region-focusable` (F-03, homepage, not reported by WebKit) and
the number of native video sub-stops each engine exposes in the tab sequence.

## Viewport and reflow evidence

`/work/aegis`, all three engines, no horizontal overflow and zero overflowing
elements at every viewport:

| Viewport | scrollWidth / clientWidth | Horizontal overflow | Overflowing elements |
| --- | --- | --- | --- |
| 1440×900 | 1440 / 1440 | no | 0 |
| 1024×768 | 1024 / 1024 | no | 0 |
| 768×1024 | 768 / 768 | no | 0 |
| 375×780 | 375 / 375 | no | 0 |
| 200% zoom (720×450 @ DPR 2) | 720 / 720 | no | 0 |

The homepage also has no horizontal scroll at all four viewports. A first pass
flagged 13–63 elements as extending past the viewport edge; all of them proved
to be clipped by an `overflow`-hiding ancestor (the `LogoLoop` track and
decorative layers), and `scrollWidth` never exceeded `clientWidth`. Not a
finding.

## Accessibility

Passing, with evidence:

- **Structure.** Exactly 1 `h1` and 11 `h2` in contract order; no skipped
  heading level; exactly one `banner`, one `main`, one `contentinfo`; 4
  navigation landmarks; `lang="en"`.
- **Real keyboard traversal.** This closes the gap carried forward from WO-021
  and WO-022, which could not drive native `Tab`. Driven with real key events in
  Chromium, the order is: `Skip to content` → `GUILHERME` → `Work` → `Process` →
  `About` → `Contact` → hero `Back to selected work` → video (and its native
  control sub-stops) → closing `Back to selected work` → `Get in touch` → `Back
  to top`. WebKit produced the same sequence and wrapped correctly at the end.
- **Skip link.** First tab stop, 44 px tall, slides on-screen when focused, and
  `Enter` moves both the location hash and real focus to `MAIN#main-content`.
- **Focus visibility.** Every focusable target shows `2px solid rgb(213, 220, 255)`
  (`--color-focus`) at a `4px` offset.
- **Targets.** 10 visible interactive elements, **0** under 44 px.
- **Images.** 5 images, **0** missing `alt`. The poster loads eagerly; the four
  screenshots are `loading="lazy"` and all four reach 1600×900 once scrolled. An
  early probe reporting `0x0` was reading them before they entered the viewport,
  not a defect.
- **Video.** Accessible name present ("Silent nine-second title sequence for
  Aegis, described in the summary beside this video."), native `controls`, and a
  visible transcript beside it.
- **Reduced motion.** 0 canvases on both routes; the video never plays.

**Limitations, stated deliberately.** This is not a claim of full WCAG
conformance. Automated axe coverage plus the manual checks above cannot
establish conformance on their own. Not assessed: screen-reader announcement
quality with a real assistive technology, colour perception by users with
specific vision conditions, cognitive load, and the correctness of the prose
transcript as an equivalent for the video's content. F-01 is an automated
finding confirmed by hand arithmetic; the remaining SC 1.4.3 surfaces flagged on
the homepage were not exhaustively enumerated because they are out of this
route's scope.

## Media and lifecycle

All six assets match the WO-019 manifest byte-for-byte and hash-for-hash:

| Asset | Bytes | SHA-256 | Result |
| --- | --- | --- | --- |
| `entry-intro.mp4` | 1,954,655 | `d3456485…ffc2` | match |
| `entry-intro-poster.webp` | 37,066 | `9d2f9035…f29d4` | match |
| `overview.webp` | 39,648 | `79893638…11efd` | match |
| `player-investigation.webp` | 46,870 | `b99012e4…1def79` | match |
| `risk-constellation.webp` | 38,492 | `212a95ac…95b81` | match |
| `alerts.webp` | 44,588 | `479e74cc…2fac29` | match |

`public/work/aegis/` contains exactly those six files and nothing else. The
17.3 MB 4K source (`2f95d871…`, 17,280,292 bytes) is **absent**; the only video
in the repository is the 1.86 MiB adaptation, and no file outside
`node_modules`/`.git` reaches 5 MB.

Lifecycle behaviour, identical in all three engines:

- Poster-first with native controls; `preload="metadata"`, no `autoplay`, no
  `loop`, `muted`.
- After scrolling the video into view and waiting 3 s: `paused=true`,
  `currentTime=0`, **`played.length=0`**. Under `prefers-reduced-motion: reduce`
  the same holds and 0 canvases mount.
- User-initiated play, pause, and replay all work; `duration` is 8.625 s, which
  is what the rounded "9 seconds" label describes.
- No autoplay code path exists to gate: nothing under
  `src/components/case-study/`, `src/app/work/`, or `src/content/case-studies/`
  is a Client Component, and there is no `.play()` call, Save-Data check, or
  observer in the route tree. Consequently there is no offscreen, hidden-tab, or
  route-exit media activity to stop.

## Performance and request behaviour

Production build, `next start`, Chromium, 1440×900, cold load with no
interaction:

| Metric | Value |
| --- | --- |
| TTFB | 4 ms |
| First contentful paint | 80 ms |
| **LCP** | **80 ms** |
| **CLS** | **0** (no layout shifts recorded) |
| INP | not measurable without field input; 0 events exceeded 16 ms under scripted interaction |
| DOMContentLoaded | 21.5 ms |
| Load | 93.6 ms |
| Console errors | 0 |

| Resource type | Requests | Transferred |
| --- | --- | --- |
| Document | 1 | 16,255 B |
| Script | 6 | 149,443 B |
| Image | 8 | 79,721 B |
| Font | 2 | 52,996 B |
| Stylesheet | 1 | 7,422 B |
| Media | 1 | 7,516 B |
| **Total** | **19** | **313,353 B (306.0 KiB)** |

The video contributes only **7,516 bytes — 0.4% of the 1,954,655-byte file** on
load, so `preload="metadata"` is genuinely honoured and the full asset is not
downloaded until a user chooses to play it. A `Content-Length` header on the
`206` range response initially suggested a full 1.95 MB transfer; measuring
actual encoded bytes over CDP disproved that.

**Homepage WebGL budgets did not regress.** 2 canvases and 2 live WebGL contexts
at 1440×900 (`1440×900` Line Waves plus the ~170×54 Liquid Metal CTA), matching
the WO-005 baseline of 2 desktop contexts against a budget of 4. Under reduced
motion, 0 canvases mount. No visual runtime, animation system, or homepage
section was added.

## Truth and confidentiality

- **Copy fidelity: 40 of 40 approved copy blocks render verbatim, 0 mismatches**,
  compared mechanically from `docs/aegis-case-study-content.md` against the
  rendered text and the `alt`/`aria-label` attributes. That matches WO-020's own
  count of 40 blocks.
- **Forbidden terms: 0.** Scanned both routes' rendered text for
  `production-ready`, `revolutionary`, `state-of-the-art`, `enterprise-grade`,
  `real-time`, `high-volume`, `fraud reduction`, `revenue`, `money saved`,
  `client satisfaction`, `uptime`, `detection accuracy`, `false-positive rate`,
  `players processed`, `time saved`, and `testimonial`.
- **Leakage markers: 0** occurrences of `[REQUIRED:`, `[CONFIDENTIAL:`,
  `copy:start`, `copy:end`, `Author note`, `TODO`, or `FIXME` in the generated
  HTML of either route.
- **Production delivery is not converted into a business-impact claim.** The
  page states deployment to production and carries no metric attached to it. The
  only numbers in rendered copy are the year, the synthetic 25,000-profile
  figure, section indices, "4K", and the 9-second runtime.
- **The public version is described as sanitized and evolved.** The
  confidentiality section states the repository is private, that there is no
  code link, and that the portfolio version is "a sanitized evolution I maintain
  independently, not a mirror of production".
- **Private-source semantics hold.** `/work/aegis` has 12 distinct `href`s, all
  same-origin, and **zero external links**; 0 occurrences of `github.com`,
  `gitlab`, `bitbucket`, `aegis-project`, or a deployment host.

Identifier scan over `.next/server`, `.next/static`, `src/`, and `public/`,
using literals derived from the read-only Aegis source repositories. No matched
value is reproduced here.

| Category | Result |
| --- | --- |
| Hosts / URLs, domains, cloud project IDs, account numbers from source docs | **0 leaks.** One candidate matched and resolved to `localhost` in Next.js internals. |
| Source-only proper nouns in rendered copy | **0 leaks.** One candidate matched and resolved to the ordinary word "black", which appears in the source README as the Python formatter and in the approved intro transcript as "the aurora fades to black". It is approved contract copy. |
| CPF-formatted numbers, non-private IPv4, JWTs, AWS keys, Google API keys, private-key blocks, secret assignments, Postgres URIs, GCP project refs | **0 occurrences.** |
| Email addresses | 24 distinct; 1 is the owner's intended public contact address. The other 23 are false positives — their "domains" are bundle chunk filenames and version strings (`0.34.5`, `19.2.4`, `tsparticles_…js`). **0 appear in rendered copy.** |

**Both Aegis source repositories were left unmodified.** `aegis` is clean at
`85d7e8b`. `aegis-front` is clean at `2282e7c` apart from two untracked pnpm
files dated **2026-07-28**, three days before this review — the same
pre-existing files WO-019 recorded. Nothing in this review wrote to either
repository.

## Automated repository checks

Run from a clean production build after the pnpm migration:

| Check | Result |
| --- | --- |
| `pnpm run test` | pass — 14 files, **80 tests** |
| `pnpm run test:coverage` | pass — 80 tests; `ProjectShowcase` 85.71%, hooks 94.73% / 88.88%, `cn` and `src/content/` 100% |
| `pnpm run lint` | pass — **0 errors, 0 warnings** |
| `pnpm run typecheck` | pass |
| `pnpm run build` | pass — `/` and `/work/aegis` both `○ (Static)` |
| `git diff --check` | clean |

Metadata on `/work/aegis`: title `Aegis — Fraud Intelligence Case Study`,
the approved description, `viewport width=device-width, initial-scale=1`,
`lang="en"`, and a generated icon. Server-rendered HTML is complete without
JavaScript: with scripting disabled the route still renders the `h1`, all 11
`h2`s, 5 images, the video, 12 links, and 9,655 characters of copy — byte-identical
in body length to the scripted render.

Media-failure resilience: with every `/work/aegis/*` asset request aborted, the
route still renders all 9,655 characters, retains `alt` text on all five images,
introduces no layout overflow, and raises no page errors.

## Corrections made during this review

**One correction, owner-authorized: F-01.**

- `src/app/globals.css` — `--color-text-dim` raised from `#667083` to `#7a8496`
  (worst-case contrast 3.63:1 → 4.80:1), with a comment recording why the value
  is what it is.
- `docs/work-orders/wo/IMPLEMENTATION-SPEC.md` — the token table updated to the
  new value so the fixed specification stays truthful.

No route markup, component structure, approved copy, layout, media asset, or
test was changed. The correction is a single token value plus its
specification record.

Checks re-run after the correction: `pnpm run test` 14 files / 80 tests,
`pnpm run lint` 0 errors 0 warnings, `pnpm run typecheck` clean, `pnpm run build`
with `/` and `/work/aegis` both `○ (Static)`, `git diff --check` clean, and the
axe re-scan in the table above. Per the owner's instruction the re-verification
was scoped to the axe scan rather than the full three-engine matrix; a colour
token cannot change layout, and the viewport, navigation, media, keyboard, and
performance evidence below was collected against otherwise identical markup.

Changes made under the owner's separate authorization to migrate the package
manager, recorded in the WO-STATUS Gate Log:

- `pnpm-lock.yaml` generated by `pnpm import`; `package-lock.json` deleted.
- `pnpm-workspace.yaml` added for `onlyBuiltDependencies`
  (`@tsparticles/engine`, `sharp`, `unrs-resolver` — the install scripts npm ran
  unconditionally) and `confirmModulesPurge: false` for non-interactive runs.
- `package.json` pins `packageManager: pnpm@11.17.0`.
- `.gitignore` adds `/.pnpm-store`.
- README prerequisites, install steps, script table, and test commands now read
  `pnpm`; the Batch 01 work-order index records the toolchain change.

## Cleanup

All temporary processes were stopped and verified: no `next start` or
`next-server` process remains, port 3210 is free, no browser or container
process is running, and the review harness lives outside the repository in
`/tmp/wo023` so no Playwright dependency entered the project manifest. The
owner's own dev server on port 3000 was left running and untouched.

## Release recommendation

**Release `/work/aegis`.** The route is truthful against the WO-018 evidence
register and the WO-020 content contract, leaks nothing confidential, carries
media that matches the WO-019 manifest exactly, behaves consistently across
Chromium, Firefox, and WebKit at four viewports and 200% zoom, works without
JavaScript and when its media fails, never plays video on its own, is fully
keyboard reachable, reports zero axe violations, and loads in 306 KiB with an
LCP of 80 ms and a CLS of 0. The homepage WebGL budget is unchanged.

Two `MINOR` findings stay open and should each get their own work order rather
than blocking this release. Both are pre-existing homepage-scope gaps that
predate Batch 03 and neither appears on `/work/aegis`:

- **F-02 — Open Graph.** Neither route emits `og:*` or `twitter:*` tags, so
  shared links preview as a bare URL. Worth fixing before the portfolio is
  promoted anywhere social. Naturally paired with setting `metadataBase`, which
  would also resolve F-04's deferred canonical.
- **F-03 — `LogoLoop` keyboard access.** The Process marquee container is a
  scrollable region with no keyboard access (axe `scrollable-region-focusable`,
  serious). Homepage only, from WO-007.

One further note for whoever picks up the homepage: the styling bug WO-022
recorded as decision 9 is still there. The unlayered `button { border: 0; padding: 0 }`
reset in `globals.css` outranks Tailwind's layered utilities, so `border-t` and
`py-6` on the desktop selector buttons have never rendered. It is cosmetic and
out of scope here, but it is real.
