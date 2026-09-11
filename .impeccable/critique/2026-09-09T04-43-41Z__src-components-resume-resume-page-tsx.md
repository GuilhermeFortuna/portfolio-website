---
target: Resume page refinement before staging
total_score: 15
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 3
target_identity: "file:/home/gui/projects/portfolio-website/src/components/resume/resume-page.tsx"
target_fingerprint: "sha256:b783545f138fd47a4ccf4a09c6c9dbfacafe33bd8c91b5d6bb8b3becb8bf45b6"
target_path: /home/gui/projects/portfolio-website/src/components/resume/resume-page.tsx
timestamp: 2026-09-09T04-43-41Z
slug: src-components-resume-resume-page-tsx
---
# Resume Page Impeccable Critique

Method: dual-agent (A: `/root/resume_design_review` · B: `/root/resume_detector_review`)

## Design Health Score

| # | Heuristic | Score | Key issue |
| --- | --- | ---: | --- |
| 1 | Visibility of system status | 2 | Chapter progress exists, but the Work `01—02` treatment does not visibly reflect the active employer. |
| 2 | Match system / real world | 3 | Resume terminology and order are clear; abstract ambient plates obscure their relationship to the document. |
| 3 | User control and freedom | 3 | Native scrolling, anchors, and ordinary links work; enhanced horizontal reading has no direct employer navigation. |
| 4 | Consistency and standards | 2 | Hero, orbit, timeline, slab cards, pill actions, and finale links do not yet read as one system. |
| 5 | Error prevention | n/a | No input or destructive workflow exists on this read-only surface. |
| 6 | Recognition rather than recall | 3 | Actions and chapters are labeled, but the compact TOC and ambient-node meaning require interpretation. |
| 7 | Flexibility and efficiency | n/a | Not materially applicable to an Experience-mode portfolio document. |
| 8 | Aesthetic and minimalist design | 2 | Empty scale, weak utility hierarchy, repeated labels, and disconnected ornament waste attention. |
| 9 | Error recovery | n/a | No recoverable input flow exists here. |
| 10 | Help and documentation | n/a | Not applicable to this self-contained resume experience. |
| **Total** |  | **15/24** | **Acceptable; significant refinement needed** |

## Design Specificity Verdict

The Resume has a distinctive Career Operating System shell—tracing rail, cyan/violet signals, monospaced telemetry, chapter navigation, and capability orbit—but that authorship collapses where its strongest evidence should appear. Work and Education could be transplanted into almost any dark portfolio unchanged. The hero ambient plates contain real Resume facts, yet their numbering, placement, and relationship to the composition are unexplained, so they read as random.

Impeccable 4.3.1 returned a clean deterministic source scan: `[]`, exit 0, with no rules or file locations. That does not contradict the design review; the problems are hierarchy, specificity, and composition rather than mechanical anti-patterns. Browser evidence independently reproduced the duplicated heading, weak action hierarchy, generic cards, undersized mobile links, and 8 px horizontal overflow.

No reliable user-visible detector overlay is available. Mutable script injection failed in the browser scope, so no Impeccable live server was started and no overlay is claimed.

## Overall Impression

This is a strong visual premise with an unfinished middle, not staging-ready craft. The page promises a sophisticated system, then presents its most important evidence as ordinary cards. The single biggest opportunity is to make every proof section inherit one coherent editorial-system anatomy instead of treating motion as the design.

## What Is Working

- Strong semantic foundation: one `h1`, logical headings, native lists and links, stable chapter anchors, and matching English/Portuguese structure.
- Recognizable visual world: reading trace, signal colors, monospaced metadata, and radial capability map fit a technical systems-builder persona.
- Responsible progressive enhancement: wide-view motion is additive; reduced-motion, narrow, and static modes retain the complete Resume.

## Priority Issues

### P1 — Hero utility cluster has no authority

Recruiters must identify the primary document action in seconds. The tiny contact links, lightly differentiated pills, isolated vertical rule, and separate underlined Contact link read as leftover utilities. Replace the loose cluster with one intentional document-access module: one dominant View PDF action, Download as secondary, Contact as tertiary, and grouped channels beneath a clear shared structure. On mobile, expose the primary document action before the long profile-link list.

Suggested command: `/impeccable layout`.

### P1 — Work Experience is generic at the credibility climax

The employer evidence is the strongest hiring signal, yet the enhanced version is a bordered rectangle with an oversized employer name and prose rows. Recompose each employer as an authored career chapter: structured metadata rail, bounded employer/role lockup, scannable evidence rows, and internal system lines that connect to the Career OS trace. Tie progress to the active employer and give the static timeline the same hierarchy.

Suggested command: `/impeccable bolder`.

### P1 — Credential cards are oversized boxes, not credential artifacts

The current cards spend hundreds of pixels on empty surface while institution, program, and period sit in three ordinary text rows. Build compact credential folios sized around content, with entry index and period as metadata, stronger institution/program contrast, a meaningful reveal edge, and an authored use of the existing Brazil/Finland exchange fact. Sticky stacking should reveal information, not only another rectangle.

Suggested command: `/impeccable shape`.

### P2 — Ambient plates lack a semantic model

The plates repeat real facts, but their sequence and spatial distribution do not explain why they orbit the identity. Map the signals to a real document structure and connect them to the chapter trace, or reduce the field to one meaningful active signal. Background language must preview or explain the Resume, not echo disconnected hero facts.

Suggested command: `/impeccable clarify`.

### P2 — Redundant copy and inert progress reduce polish

`sectionLabel` and `sectionTitle` receive the same localized value, guaranteeing the duplicated Work Experience heading. Location is repeated in period and role metadata, while the progress range is hard-coded. Keep one localized `h2`, render location once, derive progress from real entries and active index, and standardize section-header anatomy.

Suggested command: `/impeccable distill`.

## Persona Red Flags

### Recruiter or hiring manager

- View PDF does not dominate the initial utility cluster.
- Five tiny channels compete equally; email is no easier to find than GitHub or phone.
- Employer outcomes are buried in long paragraphs instead of exposed as scan anchors.
- Education consumes disproportionate space relative to its hiring value.
- The evidence modules do not maintain the sophistication promised by the opening.

### Keyboard, screen-reader, or low-vision visitor

- Native links, headings, skip navigation, focus outlines, and semantic fallbacks are a strong base.
- Hero channel links are approximately 10 px text in roughly 15 px line boxes.
- The orbit's visual order may not match its source-order keyboard sequence.
- Enhanced career reading has no explicit previous/next control or visible active-employer label.
- Muted text should be contrast-measured before staging.

### Distracted mobile visitor

- At 375×780, the header and chapter navigation consume substantial vertical space.
- The document actions begin below the initial viewport.
- Inline contact channels are not comfortable one-handed targets.
- The natural-flow content remains readable without horizontal reading, which must be preserved.

## Minor Observations

- The hero plate numbers do not correspond to chapter order.
- Hero PDF buttons and convergence text links look like different action systems.
- A focus-visible selector targets a credential card that is not focusable.
- Work progress is hard-coded to two entries.
- The rendered local page consistently measured 8 px wider than its viewport.
- The public production Resume route currently returns Not found.

## Questions to Consider

- What must a recruiter accomplish in the first ten seconds: open the Resume, contact Guilherme, or understand the specialization?
- Why are the page's most important proof sections also its most category-interchangeable components?
- If every ambient signal cannot explain its relationship to the document, should it exist?
- Should the enhanced Work section prioritize cinematic progression or fast scanning? The next design must make the hierarchy explicit even if it retains both.
- What if Education were framed as a cross-border technical trajectory instead of three stacked cards?
