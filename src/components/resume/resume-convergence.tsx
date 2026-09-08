"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import { useResumeSceneMode } from "@/components/resume/resume-scene-runtime";
import type { ResumeContent, ResumeLabels } from "@/types/resume";

export type ResumeConvergenceProps = {
  languageLabel: string;
  languages: readonly string[];
  labels: Pick<ResumeLabels, "viewPdf" | "downloadPdf" | "contact" | "returnToWork">;
  pdf: ResumeContent["pdf"];
  contactHref: string;
  workHref: string;
};

const PATH_RANGES: Array<[number, number]> = [
  [0.12, 0.64],
  [0.18, 0.7],
  [0.24, 0.76],
  [0.3, 0.82],
  [0.36, 0.88],
] as const;
const PATHS = [
  "M 24 48 C 250 48 320 204 570 204 S 920 204 1176 204",
  "M 24 126 C 240 126 340 204 570 204 S 920 204 1176 204",
  "M 24 204 C 240 204 340 204 570 204 S 920 204 1176 204",
  "M 24 282 C 240 282 340 204 570 204 S 920 204 1176 204",
  "M 24 360 C 250 360 320 204 570 204 S 920 204 1176 204",
] as const;

function ConvergencePath({
  path,
  index,
  progress,
}: {
  path: string;
  index: number;
  progress: MotionValue<number>;
}): ReactNode {
  const pathLength = useTransform(
    progress,
    PATH_RANGES[index] ?? [0, 1],
    [0, 1] as number[],
  );

  return (
    <motion.path
      d={path}
      pathLength={pathLength}
      data-resume-convergence-path
    />
  );
}

function EnhancedConvergencePaths(): ReactNode {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 85%", "end 30%"],
  });

  return (
    <div
      ref={targetRef}
      aria-hidden="true"
      className="resume-convergence__paths"
      data-resume-convergence-paths
    >
      <svg viewBox="0 0 1200 408" preserveAspectRatio="none" fill="none">
        {PATHS.map((path, index) => (
          <ConvergencePath key={path} path={path} index={index} progress={scrollYProgress} />
        ))}
      </svg>
    </div>
  );
}

export function ResumeConvergence({
  languageLabel,
  languages,
  labels,
  pdf,
  contactHref,
  workHref,
}: ResumeConvergenceProps): ReactNode {
  const mode = useResumeSceneMode();

  return (
    <section
      aria-labelledby="resume-contact-heading"
      className="resume-convergence"
      data-motion-mode={mode}
      data-resume-convergence
    >
      {mode === "enhanced" ? <EnhancedConvergencePaths /> : null}
      <div className="resume-convergence__content">
        <div className="resume-convergence__languages">
          <h2 id="resume-languages-heading">{languageLabel}</h2>
          <ul aria-label={languageLabel}>
            {languages.map((language) => <li key={language}>{language}</li>)}
          </ul>
        </div>

        <div className="resume-convergence__actions">
          <h2 id="resume-contact-heading">{labels.contact}</h2>
          <div className="resume-convergence__action-list">
            <a href={pdf.href} target="_blank" rel="noreferrer">
              {labels.viewPdf}
            </a>
            <a href={pdf.href} download={pdf.downloadName}>
              {labels.downloadPdf}
            </a>
            <a href={contactHref}>{labels.contact}</a>
            <a href={workHref}>{labels.returnToWork}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
