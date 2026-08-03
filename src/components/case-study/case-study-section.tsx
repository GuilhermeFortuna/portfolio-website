import type { ReactNode } from "react";

import type {
  CaseStudyClosing,
  CaseStudySection as CaseStudySectionContent,
} from "@/types/case-study";
import { CaseStudyFigure, CaseStudyVideoFigure } from "./case-study-media";
import {
  headingStyle,
  readingColumnStyle,
} from "./case-study-shell";

const proseClassName =
  "flex flex-col gap-5 text-[clamp(1rem,1.2vw,1.0625rem)] leading-[1.7] text-[var(--color-text-muted)]";

const actionClassName =
  "inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase";

const badgeListClassName = "flex flex-wrap gap-3";

const badgeClassName =
  "inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-line)] px-4 py-2 [font-family:var(--font-geist-mono)] text-[0.75rem] text-[var(--color-text-muted)]";

function BadgeList({ badges }: { badges: readonly string[] }) {
  return (
    <ul className={badgeListClassName} style={{ margin: 0, padding: 0 }}>
      {badges.map((badge) => (
        <li key={badge} className={badgeClassName}>
          {badge}
        </li>
      ))}
    </ul>
  );
}

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className={proseClassName} style={readingColumnStyle}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * `children` is the seam for a section that needs a diagram the authored
 * content cannot express as prose, such as the Aegis system map. It renders
 * after the prose it explains and before the section's own media.
 */
export function CaseStudySection({
  section,
  children,
}: {
  section: CaseStudySectionContent;
  children?: ReactNode;
}) {
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className="flex flex-col gap-8"
    >
      <h2 id={headingId} style={headingStyle}>
        {section.heading}
      </h2>

      {section.paragraphs.length > 0 ? (
        <Prose paragraphs={section.paragraphs} />
      ) : null}

      {section.badges ? <BadgeList badges={section.badges} /> : null}

      {children}

      {section.images?.map((image) => (
        <CaseStudyFigure key={image.src} image={image} />
      ))}

      {section.video ? <CaseStudyVideoFigure video={section.video} /> : null}
    </section>
  );
}

/** The closing note, which ends in the page's only outbound actions. */
export function CaseStudyClosingSection({
  closing,
}: {
  closing: CaseStudyClosing;
}) {
  const headingId = `${closing.id}-heading`;

  return (
    <section
      id={closing.id}
      aria-labelledby={headingId}
      className="flex flex-col gap-8"
    >
      <h2 id={headingId} style={headingStyle}>
        {closing.heading}
      </h2>

      <Prose paragraphs={closing.paragraphs} />

      <nav aria-label="Case study actions" className="flex flex-wrap gap-x-8">
        {closing.actions.map((action) => (
          <a key={action.href} href={action.href} className={actionClassName}>
            {action.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
