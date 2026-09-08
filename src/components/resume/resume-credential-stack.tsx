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

const STACK_SCALES = [0.93, 0.965, 1] as const;

function CredentialCopy({
  entry,
  headingId,
}: {
  entry: ResumeEducation;
  headingId: string;
}): ReactNode {
  return (
    <article aria-labelledby={headingId} className="resume-credential-stack__card">
      <h3 id={headingId}>{entry.institution}</h3>
      <p className="resume-credential-stack__program">{entry.program}</p>
      <p className="resume-credential-stack__period">{entry.period}</p>
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
          data-stack-scale={String(STACK_SCALES[index] ?? 1)}
        >
          <CredentialCopy
            entry={entry}
            headingId={`resume-credential-${index}-heading`}
          />
        </li>
      ))}
    </ol>
  );
}

function EnhancedCredentialCard({
  entry,
  index,
  progress,
}: {
  entry: ResumeEducation;
  index: number;
  progress: MotionValue<number>;
}): ReactNode {
  const scaleTarget = STACK_SCALES[index] ?? 1;
  const start = 0.15 + index * 0.22;
  const end = Math.min(0.82, start + 0.29);
  const scale = useTransform(progress, [start, end], [1, scaleTarget]);
  const style = {
    "--resume-credential-index": index,
    scale,
  } as MotionStyle & Record<"--resume-credential-index", number>;

  return (
    <motion.li
      className="resume-credential-stack__slot"
      data-resume-credential-card
      data-stack-scale={String(scaleTarget)}
      style={style}
    >
      <CredentialCopy
        entry={entry}
        headingId={`resume-credential-${index}-heading`}
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
