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

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className={proseClassName} style={readingColumnStyle}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export function CaseStudySection({
  section,
}: {
  section: CaseStudySectionContent;
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

      <Prose paragraphs={section.paragraphs} />

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
