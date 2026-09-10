"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { useMotionPreference } from "@/hooks/use-motion-preference";
import { formatRoleText, splitHighlight } from "@/components/resume/resume-career-reveal";
import { ResumeSectionHeader } from "@/components/resume/resume-section-header";
import type { ResumeExperience } from "@/types/resume";

export type ResumeTimelineProps = {
  entries: readonly ResumeExperience[];
  sectionLabel: string;
  sectionTitle: string;
};

export function ResumeTimeline({
  entries,
  sectionLabel,
  sectionTitle,
}: ResumeTimelineProps): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });
  const progress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 120, damping: 24, mass: 0.2 },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="resume-experience-heading"
      className="resume-timeline border-b border-[var(--color-line)]"
      data-resume-timeline
    >
      <ResumeSectionHeader
        eyebrow={sectionLabel}
        title={sectionTitle}
        headingId="resume-experience-heading"
      />

      <div className="relative mt-10">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[0.3rem] top-0 w-px bg-[var(--color-line-strong)]"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[var(--color-accent-a)] via-[var(--color-accent-b)] to-transparent"
            style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: progress }}
          />
        </div>

        <ol aria-label={sectionLabel} className="space-y-12">
          {entries.map((entry, index) => {
            const roleText = formatRoleText(entry.role, entry.location, entry.period);

            return (
              <li
                key={`${entry.organization}-${entry.period}`}
                className="resume-timeline__item relative pl-8 sm:pl-10"
                data-resume-timeline-item
              >
                <span
                  aria-hidden="true"
                  className="resume-timeline__node absolute left-0 top-6 h-2.5 w-2.5 rounded-full border border-[var(--color-accent-b)] bg-[var(--color-canvas)]"
                />
                <article
                  aria-labelledby={`resume-timeline-${index}-heading`}
                  className="resume-career-card resume-career-card--fallback"
                >
                  <div
                    aria-hidden="true"
                    className="resume-career-card__progress-track"
                    data-resume-career-progress
                  >
                    <div className="resume-career-card__progress-fill resume-career-card__progress-fill--fallback" />
                  </div>
                  <div className="resume-career-card__masthead">
                    <h3
                      id={`resume-timeline-${index}-heading`}
                      className="resume-career-card__org"
                    >
                      {entry.organization}
                    </h3>
                    <div className="resume-career-card__meta">
                      <p className="resume-career-card__role">{roleText}</p>
                      <p className="resume-career-card__period">{entry.period}</p>
                    </div>
                  </div>
                  <ul className="resume-career-card__highlights">
                    {entry.highlights.map((highlight, highlightIndex) => {
                      const { label, detail } = splitHighlight(highlight);

                      return (
                        <li key={highlight} className="resume-career-card__highlight">
                          <span aria-hidden="true" className="resume-career-card__highlight-index">
                            {String(highlightIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="resume-career-card__highlight-copy">
                            <span
                              data-resume-highlight-label
                              className="resume-career-card__highlight-label resume-career-reveal__highlight-label"
                            >
                              {label}{detail ? ":" : ""}
                            </span>
                            {detail ? (
                              <span className="resume-career-card__highlight-detail resume-career-reveal__highlight-detail">
                                {" "}
                                {detail}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
