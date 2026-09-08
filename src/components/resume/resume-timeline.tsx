"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { useMotionPreference } from "@/hooks/use-motion-preference";
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
      className="border-b border-[var(--color-line)] py-12 lg:py-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-line)] pb-6">
        <div>
          <p className="[font-family:var(--font-geist-mono)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {sectionLabel}
          </p>
          <h2
            id="resume-experience-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl"
          >
            {sectionTitle}
          </h2>
        </div>
      </div>

      <div className="relative mt-10">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[0.3rem] top-0 w-px bg-[var(--color-line-strong)] lg:left-[12rem]"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[var(--color-accent-a)] via-[var(--color-accent-b)] to-transparent"
            style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: progress }}
          />
        </div>

        <ol aria-label={sectionLabel} className="space-y-12">
          {entries.map((entry) => (
            <li
              key={`${entry.organization}-${entry.period}`}
              className="relative grid gap-6 pl-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border border-[var(--color-accent-b)] bg-[var(--color-canvas)] lg:left-[11.68rem]"
              />
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="[font-family:var(--font-geist-mono)] text-xs font-semibold uppercase leading-5 tracking-[0.08em] text-[var(--color-text-dim)]">
                  {entry.period}
                </p>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--color-text)] sm:text-2xl">
                  {entry.organization}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  {entry.role} · {entry.location}
                </p>
                <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--color-text-muted)]">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
