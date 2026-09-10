"use client";

import {
  useRef,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";

import { useResumeSceneMode } from "@/components/resume/resume-scene-runtime";
import type { ResumeEducation } from "@/types/resume";

export type ResumeCredentialStackProps = {
  entries: readonly ResumeEducation[];
  sectionLabel: string;
};


function CredentialCopy({
  entry,
  headingId,
  index,
}: {
  entry: ResumeEducation;
  headingId: string;
  index: number;
}): ReactNode {
  return (
    <article aria-labelledby={headingId} className="resume-credential-stack__card">
      <div
        className="resume-credential-stack__strip"
        data-resume-credential-header-strip
      >
        <div className="resume-credential-stack__strip-main">
          <span
            aria-hidden="true"
            className="resume-credential-stack__index"
            data-resume-credential-index
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p
            className="resume-credential-stack__institution"
            data-resume-credential-institution
          >
            {entry.institution}
          </p>
        </div>
        <span
          className="resume-credential-stack__period"
          data-resume-credential-period
        >
          {entry.period}
        </span>
      </div>

      <div className="resume-credential-stack__body">
        <h3
          id={headingId}
          className="resume-credential-stack__program"
          data-resume-credential-program
        >
          {entry.program}
        </h3>
      </div>
    </article>
  );
}

function StaticCredentialList({
  entries,
  sectionLabel,
}: ResumeCredentialStackProps): ReactNode {
  return (
    <ol
      aria-label={sectionLabel}
      className="resume-credential-stack__list"
      data-resume-credential-list
    >
      {entries.map((entry, index) => (
        <li
          key={`${entry.institution}-${entry.period}`}
          className="resume-credential-stack__slot"
          data-resume-credential-card
          data-stack-scale="1"
        >
          <CredentialCopy
            entry={entry}
            headingId={`resume-credential-${index}-heading`}
            index={index}
          />
        </li>
      ))}
    </ol>
  );
}

/**
 * Mid-motion scale ranges: scale is 1 at initial rest (progress=0),
 * dips slightly during the mid-motion stacking transition as depth cue,
 * and returns to 1 when the card / stack settles.
 */
function useCardStackScale(
  index: number,
  progress: MotionValue<number>,
  total: number,
): MotionValue<number> {
  const step = 0.6 / Math.max(1, total);
  const start = 0.12 + index * step;
  const peak = start + step * 0.5;
  const end = Math.min(0.95, start + step);
  const dip = index === total - 1 ? 0.985 : 0.97;

  return useTransform(progress, [0, start, peak, end, 1], [1, 1, dip, 1, 1]);
}

function EnhancedCredentialCard({
  entry,
  index,
  total,
  progress,
}: {
  entry: ResumeEducation;
  index: number;
  total: number;
  progress: MotionValue<number>;
}): ReactNode {
  const scale = useCardStackScale(index, progress, total);
  const style = {
    "--resume-credential-index": index,
    scale,
  } as MotionStyle & Record<"--resume-credential-index", number>;

  return (
    <motion.li
      className="resume-credential-stack__slot"
      data-resume-credential-card
      data-stack-scale="1"
      style={style}
    >
      <CredentialCopy
        entry={entry}
        headingId={`resume-credential-${index}-heading`}
        index={index}
      />
    </motion.li>
  );
}

function EnhancedCredentialList({
  entries,
  sectionLabel,
}: ResumeCredentialStackProps): ReactNode {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 85%", "end 20%"],
  });

  return (
    <ol
      ref={listRef}
      aria-label={sectionLabel}
      className="resume-credential-stack__list resume-credential-stack__list--enhanced"
      data-resume-credential-list
    >
      {entries.map((entry, index) => (
        <EnhancedCredentialCard
          key={`${entry.institution}-${entry.period}`}
          entry={entry}
          index={index}
          total={entries.length}
          progress={scrollYProgress}
        />
      ))}
    </ol>
  );
}

export function ResumeCredentialStack({
  entries,
  sectionLabel,
}: ResumeCredentialStackProps): ReactNode {
  const mode = useResumeSceneMode();

  return (
    <section
      aria-labelledby="resume-education-heading"
      className="resume-credential-stack"
      data-motion-mode={mode}
      data-resume-credential-stack
    >
      <header className="resume-credential-stack__heading">
        <h2 id="resume-education-heading">{sectionLabel}</h2>
      </header>

      {mode === "enhanced" ? (
        <EnhancedCredentialList entries={entries} sectionLabel={sectionLabel} />
      ) : (
        <StaticCredentialList entries={entries} sectionLabel={sectionLabel} />
      )}
    </section>
  );
}
