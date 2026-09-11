# Career Operating System — WO-044 Contract

**Work Order:** WO-044

**Contract status:** Owner-approved; amended for WO-048

**Prepared:** 2026-09-08

**Amended:** 2026-09-08 — owner removed the redundant web Resume project
chapter and retargeted Stacking Cards to Education and International Experience.

**Repository:** `portfolio-website`

**Provisional baseline:** `a6fa4296c595132f55a5976d82a88e546b218ad8` on `development`
**Gate note:** The owner explicitly waived the WO-043 `DONE` prerequisite.
WO-043 remains `READY`; this waiver does not waive source verification,
contract acceptance, or the freeze-commit requirement.

## 1. Baseline and invariants

### Recorded baseline

- Working tree was clean before WO-044 branch creation.
- WO-040 is `DONE`; its bilingual content contract and PDF hashes remain the
  factual source of truth.
- WO-041 is `DONE` at `73ee9c9`, delivering `/resume`, `/pt-BR/resume`, typed
  content, localized metadata/actions, PDFs, and static-export behavior.
- WO-042 is `DONE` in the baseline history (`84a56e5`, `e275cbb`, `c9ad01b`,
  `d84596d`), delivering the semantic timeline and Resume navigation.
- The current Resume surface is composed by
  `src/components/resume/resume-page.tsx`; experience is rendered by
  `src/components/resume/resume-timeline.tsx`; factual data is owned by
  `src/content/resume.ts` and typed by `src/types/resume.ts`.
- Runtime inventory: Next.js 16.2.12, React 19.2.4, Motion 12.43.0,
  GSAP 3.15.0, Lenis 1.3.25, and the existing managed WebGL dependencies.
  No dependency is added by this contract or by Batch 08.
- Environment: Node 24.20.0, pnpm 11.17.0.
- `pnpm run build` passed on the baseline and generated both Resume routes.
- Local production-server transfer baseline after redirects:
  `/resume/` 59,230 bytes; `/pt-BR/resume/` 59,774 bytes.
- Baseline route HTML has one `h1` and two localized PDF-action labels per
  route. The combined compressed size of all existing `.next/static/chunks`
  JavaScript files was 467,576 bytes; later work must measure the Resume route
  attribution separately.
- No LCP/CLS/long-task browser measurement is claimed by this document. WO-049
  and WO-050 must measure those values in a production browser and compare the
  route-attributable client JavaScript against this baseline.

### Binding invariants

- `src/content/resume.ts` remains the only source of Resume facts. Scene
  components receive typed data and contain no locale-specific factual copy.
- The English route is `/resume`; Portuguese is `/pt-BR/resume`. Both routes
  use the same scene model and their own localized `ResumeContent` object.
- The web Resume remains the accessible primary document. PDF view/download,
  email, phone, website, GitHub, LinkedIn, and Work actions remain ordinary
  links available before hydration.
- Employer names, phone, public email, and the approved Aegis bullet remain
  confined to the existing Resume publication boundary. Nothing in this batch
  links that wording to `/work/aegis`, and no Work confidentiality rule is
  widened.
- The existing semantic timeline is the single mobile, reduced-motion,
  no-JavaScript, hydration-failure, and missing-CSS content fallback.
- The site has one Motion runtime, one root Lenis instance, one GSAP/
  ScrollTrigger bridge, and manager-owned WebGL. Resume scenes consume these
  owners; they do not create another provider, scroller, ticker, canvas, or
  page-level listener system.

## 2. Narrative and content contract

The page is one authored progression, not a catalog of unrelated demos:

1. **Identity resolution** — existing focus, name, role, summary, location,
   availability, links, and PDF/contact actions resolve into the opening hero.
2. **System map** — the six existing skill groups orbit a non-factual,
   localized full-stack organizing label.
3. **Career chapters** — the two existing experience entries move through an
   editorial track in their existing reverse-chronological order.
4. **Credential stack** — the three existing Education and International
   Experience entries become restrained editorial cards in source order; both
   language entries remain the calm bridge after them.
5. **Convergence/actions** — decorative paths resolve from credentials and
   languages toward the existing PDF, contact, and Return to Work actions
   without adding claims or destinations.

### Retained `ResumeContent` mapping

The following is a structural map, not a second content source. Implementers
must iterate the typed values from `getResumeContent(locale)` and must not copy
or re-author the strings into scene files.

| Scene | Existing fields consumed | English / Portuguese cardinality and order |
| --- | --- | --- |
| Identity | `identity.focus`, `identity.name`, `identity.role`, `identity.summary`, `location`, `availability`, `links`, `pdf`, localized action labels | 1 identity object per locale; 5 links; 1 PDF object; all action labels from `labels` |
| Capabilities | `skills` and `labels.skills` | 6 groups in source order; each group emits its complete `items` list |
| Career | `experience` and `labels.experience` | 2 entries in source order: `BRXBET & RICOBET`, then `Jones Software`; each emits organization, role, period, location, and every highlight |
| Credentials | `education`, `languages`, `labels.education`, `labels.languages` | 3 education entries in source order and 2 language entries in source order |
| Contact/convergence | `links`, `pdf`, `labels.viewPdf`, `labels.downloadPdf`, `labels.contact`, `labels.returnToWork` | Existing localized links/actions only; no new CTA wording or route |

Locale parity rules:

- English and Portuguese must render the same field paths, cardinalities, and
  ordering. Text differs only where the approved localized values differ.
- English has localized labels for Technical Skills, Work Experience,
  Education and International Experience, Languages, View PDF, Download PDF,
  Email, Phone, Website, GitHub, LinkedIn, Contact, and Return to Work.
  Portuguese uses the corresponding existing `labels` values; scene code must
  never hard-code either set.
- The six capability groups are exactly the existing groups: Languages,
  Frontend and UI, Backend and APIs, Cloud and DevOps, Data and AI, and
  Security and QA in English; their Portuguese values come from the same
  `skills` objects.
- No decorative chapter label may imply a new employer, metric, proficiency,
  chronology, product relationship, or achievement.

## 3. Source and adaptation matrix

Sources were inspected on 2026-09-08 through their public component pages.
The pages exposed component code or public usage data without an account or
purchase. Where a page did not expose a commit or immutable revision, that is
recorded explicitly; no revision is inferred. No source package was installed
and no generated project or remote asset is copied into this repository.

| Role / source | Provenance snapshot | Public inspectability and license | Runtime/DOM observations | Retained concept and required local adaptation |
| --- | --- | --- | --- | --- |
| Identity — [Scroll Choreography](https://21st.dev/@componentry/components/scroll-choreography) | Author: componentry; source/registry page above; retrieved 2026-09-08; published 2026-07-10; immutable commit not exposed | Component and usage code visible on the public page; no account or purchase observed; page did not expose a license declaration, so license confirmation remains required before source redistribution | React client component; page lists `framer-motion`; four image quadrants and a full-screen expansion assume viewport-sized media and client animation | Retain staged multi-plate convergence. Replace all images with CSS/data plates; use existing Motion; keep identity facts in semantic flow; no portrait, remote media, or image claim; static hero is primary fallback |
| Capabilities — [Radial Orbital Timeline](https://21st.dev/@jatin-yadav05/components/radial-orbital-timeline) | Author: Jatin Yadav; source/registry page above; retrieved 2026-09-08; published 2025-04-29; immutable commit not exposed | Component and usage code visible publicly; page declares MIT License; no account or purchase observed | Client component; page lists `lucide-react`; data model includes node ids, title, date, content, category, icon, related ids, status, and energy; circular geometry assumes a sufficiently wide viewport | Retain radial nodes around a center. Remove status/energy/date/relationship claims and icon dependency; use six existing skill groups; semantic list remains primary; pointer/keyboard emphasis is optional visual enhancement |
| Career — [Horizontal Feature Reveal](https://21st.dev/@hyperiux/components/horizontal-feature-reveal) | Author: Hyperiux Vault; source/registry page above; retrieved 2026-09-08; published 2026-09-03; immutable commit not exposed | Component and usage code visible publicly; page declares MIT License; no account or purchase observed | Client component; page lists GSAP; vertical scroll drives a horizontal track, SplitText line masks, and image parallax; theme and fixed card-gap assumptions require replacement | Retain vertical-to-horizontal editorial progression. Use existing GSAP/ScrollTrigger through `useSceneTimeline`; remove SplitText/image requirements; retain full bullets in semantic order; natural timeline fallback below the contract threshold |
| Credentials — [Stacking Cards](https://21st.dev/@danielpetho/components/stacking-cards) | Author shown as Daniel Petho; example comment credits Khoa Phan; source/registry page above; retrieved 2026-09-08; published date not exposed; immutable commit not exposed | Component and usage code visible publicly; license declaration not exposed on the inspected page, so license confirmation remains required | Client component; Motion-based sticky cards; demo assumes a scroll container, fixed card height, image slots, and visual overlap | Retain presentational sticky/scale stack only. Use the three existing education entries; no images or new claims; one semantic ordered list stays in document order; Languages remains a separate calm list; static spaced flow for mobile, zoom, reduced motion, and failure |
| Navigation — [Dynamic Island TOC](https://21st.dev/@digitalzone0707/components/dynamic-island-toc) | Author: Digital Zone; source/registry page above; retrieved 2026-09-08; published 2026-05-07; immutable commit not exposed | Component and usage code visible publicly; license declaration not exposed on the inspected page, so license confirmation remains required | Client component; page lists Motion and `lucide-react`; discovers headings/data attributes, uses scroll spy, reading progress, expansion, and smooth scrolling; default selectors could duplicate or capture unrelated headings | Retain compact expanding chapter rail and active-section indication. Supply an explicit five-item model; use native anchors and existing Lenis behavior; no heading auto-discovery, nested scroller, or second smooth-scroll owner |
| Reading trace — [Tracing Beam](https://ui.aceternity.com/components/tracing-beam) | Aceternity UI; source page above; retrieved 2026-09-08; page describes an SVG-following beam; component revision not exposed | Free component page and props (`className`, `children`) publicly inspectable; no account or purchase required for the component page; license text was not exposed in the inspected page and must be confirmed before redistribution | SVG path/scroll-linked visual; implementation must remain decorative and must not become the semantic chronology or add a second scroll observer | Retain a single visual reading trace along the chapter rail. Adapt to existing tokens and shared scene progress; use `aria-hidden`; static line or no line in fallback |
| Convergence — [Google Gemini Effect](https://ui.aceternity.com/components/google-gemini-effect) | Aceternity UI; source page above; retrieved 2026-09-08; page exposes `pathLengths: MotionValue[]`, optional title/description/className; component revision not exposed | Free component page and usage contract publicly inspectable; no account or purchase required for the component page; license text was not exposed in the inspected page and must be confirmed before redistribution | SVG paths driven by MotionValues; demo includes default marketing copy that is prohibited locally; no WebGL | Retain restrained SVG path convergence from credentials/languages toward the existing PDF, contact, and Return to Work actions. Replace all demo copy with existing localized action labels; decorative paths are optional and `aria-hidden`; links remain ordinary, early, and usable |

### Rejected sources and substitutions

- React Bits Pro and all paid/private implementations are explicitly excluded;
  they were not inspected, traced, or used as a visual target.
- No listed role required substitution during this research pass. If a listed
  source becomes inaccessible or its license cannot be confirmed before the
  relevant implementation order, that order must stop and propose a free,
  publicly inspectable replacement for owner acceptance.
- Remote preview images, generated screenshots, demo copy, and source-specific
  demo content are not product inputs.

## 4. Local interfaces and ownership

The following interfaces are the narrow contracts consumed by WO-045 onward.
They intentionally carry data and progress, not source-specific implementation
details:

```ts
type ResumeChapterId =
  | "identity"
  | "capabilities"
  | "experience"
  | "credentials"
  | "contact";

type ResumeMotionMode = "enhanced" | "reduced" | "static";

type ResumeSceneProps = {
  id: ResumeChapterId;
  label: string;
  children: React.ReactNode;
};
```

Allowed refinements:

- A scene may additionally receive typed, locale-neutral slices of
  `ResumeContent`, a `ResumeMotionMode`, a read-only normalized progress value,
  and an explicit `fallback`/`onChapterChange` contract where required.
- The scene shell owns section ids, document order, progress publication,
  reduced/static mode selection, and cleanup boundaries.
- `ResumeMotionMode` is derived from user motion preference plus deterministic
  viewport/pointer capability. It never hides required content.
- Capabilities may expose a typed selection state, but selection only changes
  visual emphasis over an existing skill group and does not create content.
- Navigation controls may expose native links/buttons with localized labels;
  no component owns URL parsing, smooth scrolling, or global active-section
  discovery.

Ownership matrix:

| Concern | Sole owner | Scene contract |
| --- | --- | --- |
| Facts/localization | `src/content/resume.ts` | Consume typed values; no factual literals |
| Document composition | Resume page and scene shell | One semantic source in document order |
| Smooth document scroll | Existing root Lenis | Never instantiate a second scroller |
| Authored scroll timelines | Existing `useSceneTimeline` | Scoped GSAP context and cleanup |
| State/layout transitions | Existing Motion runtime | No second Motion provider |
| WebGL | Existing manager | Career OS uses no new WebGL |
| Chapter navigation | WO-045 Resume-only rail | Native anchors, one current destination |
| Fallback chronology | Existing `ResumeTimeline` | Sole complete experience fallback |

## 5. Responsive storyboard

Storyboard frames describe the expected hierarchy, not a pixel-perfect asset
spec. Every frame contains the complete semantic document in DOM order.

### 1440×900 desktop

| Frame | Visible composition | Progress/interaction contract |
| --- | --- | --- |
| Start | Header; compact chapter rail at the edge; identity plates and the single name `h1` dominate; primary PDF/contact actions are visible | Identity progress 0.00–0.18; plates enter with transform/opacity only; links are immediately usable |
| Mid | Identity has resolved into the name/role/summary; capability section occupies the viewport with six restrained nodes around the center; rail marks capabilities | Identity exits before orbit dominates; orbit may respond to scroll/pointer/keyboard without hiding skills; one dominant effect |
| End | Career track is readable with one employer chapter emphasized; the subsequent credential stack, Languages bridge, and convergence remain reachable below | Horizontal career enhancement may pin only here; the semantic timeline remains the underlying content source; no blank spacer or scroll trap |

### 1024×768 tablet boundary

| Frame | Visible composition | Contract |
| --- | --- | --- |
| Start | Identity remains a two-column editorial hero only if content fits; otherwise collapses to one column | No pin or orbit compression that causes clipping; actions wrap normally |
| Mid | Skills are a wrapping two-column/list presentation; chapter rail is compact or inline | Enhanced effects may be disabled at the measured boundary; semantic order wins |
| End | Experience, credentials, Languages, and actions are natural-flow sections | No horizontal reading requirement; no fixed-height card stack |

### 375×780 mobile

| Frame | Visible composition | Contract |
| --- | --- | --- |
| Start | Header, identity `h1`, summary, contact/PDF links, and compact labels in one column | No pin, orbit, horizontal track, sticky stack, or pointer interaction |
| Mid | All six skill groups and both experience entries appear as ordinary lists/sections | Existing semantic timeline is the visual and accessibility representation |
| End | All education/languages and PDF/contact/Work actions remain visible in document flow | Decorative trace/path may be omitted; no content waits for hydration |

### 200% zoom and short viewport

- At 200% zoom, treat the effective layout as narrow: no horizontal overflow,
  clipped focus, fixed overlay covering content, or horizontal-only interaction.
- For a short viewport such as 375×480 or 1024×600, disable all pinning and
  sticky scene choreography; preserve normal vertical sections and action links.
- The 200% zoom and short-viewport mode must be deterministic from CSS/media
  conditions, not discovered only after a failed animation measurement.

## 6. Motion grammar

- Normalize all scene progress to `[0, 1]` from the shared scene shell.
- Scene handoffs reserve a quiet interval of at least 0.08 normalized progress
  between dominant effects; no two pinned scenes overlap.
- Identity: resolve plates from 0.00–0.70 of its scene, settle from 0.70–1.00.
- Capabilities: orbit emphasis may follow 0.15–0.85; it settles before career
  begins.
- Career: desktop horizontal translation occupies 0.12–0.88 of its track; the
  remaining range is breathing room for entry/exit.
- Credentials: card stacking may occupy 0.15–0.82; cards never cover their
  heading or create a nested vertical scroller. Languages remains in calm flow.
- Convergence: paths draw only after credentials have entered flow; endpoint
  actions are visible before drawing begins.
- Use existing motion/easing tokens and the existing `MotionConfig`; any new
  duration/easing token must be named in the implementation order and measured
  against the existing system. No source default palette or timing is adopted
  automatically.
- Enhanced transforms are presentational. Heading order, list order, focus
  order, find-in-page, and browser scrolling remain unaffected.
- Reduced motion removes progress-linked transforms, autoplay, orbit rotation,
  path drawing, and card pinning. The settled semantic composition remains.
- One dominant effect is allowed in a viewport. The rail and trace are
  connective chrome and must remain subordinate to the active scene.

## 7. Fallback matrix

| Condition | Required result |
| --- | --- |
| Normal motion, wide/tall viewport | Enhanced scene may run through the shared runtime with deterministic geometry and cleanup |
| `prefers-reduced-motion: reduce` | Static identity, list-based capabilities, semantic timeline, ordinary credential/language flow, static/omitted trace and paths |
| Coarse pointer | Disable pointer-driven emphasis and hover-only behavior; retain keyboard/native links and static composition |
| Narrow viewport | Disable orbital, horizontal, sticky, and stacked choreography; use one-column semantic document |
| Short viewport | Disable pins/sticky positioning; retain natural flow and visible fixed-header offsets |
| No JavaScript | Server-rendered Resume content, headings, lists, actions, and current timeline remain complete and usable |
| Hydration failure | Identical server markup remains readable; no duplicate enhanced copy and no missing action |
| Missing CSS | Native headings, lists, links, and text remain readable in source order; decorative layers have no information value |
| Failed PDF navigation | Web Resume remains complete; failure cannot erase or replace the HTML document |

## 8. Accessibility contract

- One page `h1`, then ordered `h2`/`h3` headings. Do not duplicate headings
  solely for visual animation.
- Use semantic `main`, sections, ordered experience/education lists, unordered
  skills/language lists, `address` for contact links, and ordinary anchors for
  PDF, email, phone, locale, and Work actions.
- The document order is identity → capabilities → experience → credentials →
  contact. CSS transforms and horizontal translations never
  reorder accessible content.
- The chapter rail has five native destinations matching the fixed
  `ResumeChapterId` values. Exactly one destination may expose the current
  state; inactive destinations remain keyboard reachable.
- Use visible `:focus-visible` styling with the existing tokens. No focused
  link may be obscured by a pin, card, rail, or header. Skip-link and hash
  navigation retain native browser behavior and fixed-header offset handling.
- If capability nodes become interactive, use native buttons or links with a
  documented roving-tabindex model, visible focus, Escape/blur reset, and no
  hover-only disclosure. Every skill remains present in the semantic list.
- Decorative beams, SVG paths, orbital lines, plate echoes, progress meters,
  and repeated counters use `aria-hidden="true"`; they never carry facts.
- Do not add live regions for scroll progress or active chapter changes.
- No content, action, or factual field depends on hover,
  pointer position, scroll completion, animation completion, canvas, CSS, or
  hydration.
- Motion controls must respect OS reduced-motion preference. Any explicit
  control added later must be a native, labelled control and must not be the
  only way to reach content.

## 9. Budgets and measurement protocol

Hard budgets for WO-049/WO-050:

- zero new runtime packages;
- zero second smooth-scroll or WebGL runtime;
- CLS ≤ 0.05;
- no long task over 200 ms attributable to Resume scenes;
- Resume-attributable client-JS and transfer increase no more than 20 KiB gzip
  over the measured Batch 07 route baseline unless the owner approves a
  source-backed exception;
- no leaked observers, listeners, ScrollTriggers, animation frames, or Lenis
  subscriptions after route unmount;
- no horizontal overflow at required viewports.

Measure both locales from a production build and server, not development mode:

1. Capture LCP, CLS, transferred bytes, request count, route-attributable
   client JavaScript, long tasks, and animation-frame stability at 1440×900
   and 375×780.
2. Repeat with normal/reduced motion, fast forward/reverse scroll, scrollbar
   scrub, resize across the enhanced/fallback threshold, and a second route
   visit.
3. Record observer/listener/ScrollTrigger counts before mount, during each
   scene, and after leaving the Resume route.
4. Compare against the baseline values in this document; report attribution
   methodology and environmental limits instead of aggregating unrelated site
   chunks into a Resume claim.

## 10. Ordered downstream boundaries

| Order | Input frozen by WO-044 | Sole output and non-goal |
| --- | --- | --- |
| WO-045 | Scene ids, shell props, progress/motion modes, chapter rail destinations, tracing-beam role, runtime ownership | Resume scene shell, shared progress, trace, and TOC; no identity/orbit/career/credential visual implementation |
| WO-046 | Identity and capability source/adaptation rows, content field map, responsive thresholds | Identity choreography and six-group capability orbit; no career/credential changes |
| WO-047 | Career source row, two-entry experience map, semantic timeline fallback, progress ranges | Desktop career reveal and its fallback; no changes to facts, credentials, or actions |
| WO-048 | Credential source row, three-entry education map, language flow, project-omission decision, and convergence role/action contract | Credential stack and closing convergence; remove the web Resume project chapter without changing PDFs or Work surfaces; no new media, claims, links, or dependencies |
| WO-049 | All prior scene interfaces and fallback rules | Integrated responsive/accessibility/performance polish and named freeze commit; no new concept/source/dependency |
| WO-050 | WO-049 freeze commit and this accepted contract | Independent GO/NO-GO release review; no silent product repair |

## 11. Test plan and acceptance evidence

### Static/component tests

- Assert all five chapter ids are present once and all scene labels come from
  localized content.
- Assert one semantic copy of every retained web Resume field, one `h1`, ordered
  headings, complete lists, existing action URLs, no rendered project chapter,
  and zero new factual strings.
- Assert English/Portuguese field-path parity, cardinalities, ordering,
  localized labels, PDF names, and no `/work/aegis` link.
- Assert reduced/static mode renders the complete semantic timeline and all
  actions without progress-linked transforms.
- Assert enhanced mode registers only through `useSceneTimeline`, has stable
  cleanup, and does not add Lenis, Motion, GSAP, WebGL, observer, or ticker
  ownership.
- Assert capability interaction, if implemented, is keyboard operable and
  never removes skills or exposes hover-only content.

### Browser matrix

Run the production build in each locally available Chromium, Firefox, and
WebKit engine at 1730×900, 1440×900, 1024×768, 375×780, 320×700, and the
short-landscape viewport selected by implementation. Include normal motion,
OS reduced motion, coarse pointer, 200% zoom, no JavaScript, deep links,
locale switching, keyboard-only traversal, forward/reverse scrolling, fast
scrub, scrollbar drag, resize across the boundary, browser back/forward, and a
second route visit. Record unavailable engines as environmental gaps.

### Source/provenance verification

- Re-open every canonical source before each implementation order and compare
  the selected source role, public inspectability, license evidence, and
  adaptation boundary with this contract.
- Keep all planned entries in `docs/component-provenance.md` marked planned
  until their implementation order ships and is independently reviewed.
- Any source change, license uncertainty, new dependency, or inaccessible code
  blocks implementation and requires owner acceptance of a replacement.

### WO-044 acceptance evidence

- [ ] Seven source records are complete and publicly inspectable, with license
      status and immutable-revision gaps stated honestly.
- [ ] Every retained bilingual `ResumeContent` field is mapped without
      invention or omission; web-only project fields are removed by the
      owner-approved WO-048 amendment.
- [ ] Interfaces, runtime ownership, responsive storyboard, motion grammar,
      fallbacks, accessibility, and budgets are implementation-testable.
- [ ] Later Work Orders have unambiguous boundaries.
- [ ] No product code, assets, PDFs, visible copy, or package files changed.
- [ ] Owner approval and a named freeze commit are recorded before WO-044 is
      marked `DONE`; WO-045 remains blocked until then.
