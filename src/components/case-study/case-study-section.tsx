import type { ReactNode } from "react";

import type {
  CaseStudyClosing,
  CaseStudySection as CaseStudySectionContent,
} from "@/types/case-study";
import { CaseStudyFigure, CaseStudyVideoFigure } from "./case-study-media";
import { CaseStudyEvidencePlane } from "./experience/case-study-evidence-plane";
import type { DecisionComposition } from "./experience/case-study-decision-panel";
import {
  headingStyle,
  readingColumnStyle,
} from "./case-study-shell";

/** Stable D-013 plane ids for Aegis Decision 3/4 media (WO-031). */
const DECISION_EVIDENCE_PLANE_IDS = [
  "aegis-player-investigation",
  "aegis-risk-constellation",
] as const;

const proseClassName =
  "flex flex-col gap-5 text-[clamp(1rem,1.2vw,1.0625rem)] leading-[1.7] text-[var(--color-text-muted)]";

const actionClassName =
  "inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase";

function Prose({
  paragraphs,
  kind,
}: {
  paragraphs: readonly string[];
  kind?: DecisionComposition;
}) {
  return (
    <div
      className={proseClassName}
      style={readingColumnStyle}
      data-case-study-prose=""
      data-decision-prose={kind}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * Typography-led declaration: first paragraph is the decision statement;
 * remaining paragraphs keep the approved reasoning order.
 */
function DeclarationProse({ paragraphs }: { paragraphs: readonly string[] }) {
  const [declaration, ...reasoning] = paragraphs;
  return (
    <div className={proseClassName} data-decision-prose="declaration">
      {declaration ? (
        <p
          data-decision-declaration=""
          style={{
            ...readingColumnStyle,
            maxWidth: "42rem",
            fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
            lineHeight: 1.35,
            color: "var(--color-text)",
            fontWeight: 500,
          }}
        >
          {declaration}
        </p>
      ) : null}
      {reasoning.length > 0 ? (
        <div style={readingColumnStyle} data-decision-reasoning="">
          {reasoning.map((paragraph) => (
            <p key={paragraph} className="mt-5 first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Editorial contrast: lead statement versus supporting trade-off copy. No
 * invented diagram or metric chrome — typography only.
 */
function ContrastProse({ paragraphs }: { paragraphs: readonly string[] }) {
  const [lead, ...rest] = paragraphs;
  return (
    <div className={proseClassName} data-decision-prose="contrast">
      {lead ? (
        <p
          data-decision-contrast-lead=""
          style={{
            ...readingColumnStyle,
            maxWidth: "36rem",
            color: "var(--color-text)",
            fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
            lineHeight: 1.45,
          }}
        >
          {lead}
        </p>
      ) : null}
      {rest.length > 0 ? (
        <div
          data-decision-contrast-rest=""
          style={{
            ...readingColumnStyle,
            maxWidth: "34rem",
            marginInlineStart: "auto",
          }}
        >
          {rest.map((paragraph) => (
            <p key={paragraph} className="mt-5 first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * `children` is the seam for a section that needs a diagram the authored
 * content cannot express as prose, such as the Aegis system map. It renders
 * after the prose it explains and before the section's own media.
 *
 * `composition` is the WO-030 decision-panel layout seam. It never invents
 * copy or media — it only rearranges approved slots.
 */
export function CaseStudySection({
  section,
  children,
  className,
  composition,
}: {
  section: CaseStudySectionContent;
  children?: ReactNode;
  /** Optional layout seam for chapter composition (aperture slots, map). */
  className?: string;
  /** Decision-panel composition variant (WO-030). */
  composition?: DecisionComposition;
}) {
  const headingId = `${section.id}-heading`;

  const prose =
    composition === "declaration" ? (
      <DeclarationProse paragraphs={section.paragraphs} />
    ) : composition === "contrast" ? (
      <ContrastProse paragraphs={section.paragraphs} />
    ) : (
      <Prose paragraphs={section.paragraphs} kind={composition} />
    );

  const images =
    section.images?.map((image, index) => {
      const planeId =
        composition === "evidenceStage"
          ? DECISION_EVIDENCE_PLANE_IDS[index]
          : undefined;
      const figure = (
        <CaseStudyFigure
          key={image.src}
          image={image}
          evidencePlaneId={planeId}
        />
      );
      if (!planeId) return figure;
      return (
        <CaseStudyEvidencePlane key={image.src} id={planeId}>
          {figure}
        </CaseStudyEvidencePlane>
      );
    }) ?? null;

  const stagedImages =
    composition === "evidenceStage" && images ? (
      <div data-decision-media-stage="" className="flex flex-col gap-6">
        {images}
      </div>
    ) : (
      images
    );

  const video = section.video ? (
    composition === "identityVideo" ? (
      <CaseStudyEvidencePlane id="aegis-entry-intro">
        <CaseStudyVideoFigure
          video={section.video}
          evidencePlaneId="aegis-entry-intro"
        />
      </CaseStudyEvidencePlane>
    ) : (
      <CaseStudyVideoFigure video={section.video} />
    )
  ) : null;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      data-case-study-section={section.id}
      data-decision-composition={composition}
      className={["flex flex-col gap-8", className].filter(Boolean).join(" ")}
    >
      <h2 id={headingId} style={headingStyle}>
        {section.heading}
      </h2>

      {composition === "identityVideo" ? (
        <>
          {video}
          {prose}
          {children}
          {stagedImages}
        </>
      ) : (
        <>
          {prose}
          {children}
          {stagedImages}
          {video}
        </>
      )}
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
