"use client";

import { useInsertionEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useSceneTimeline } from "@/components/motion/motion-runtime";
import { useResumeSceneMode } from "@/components/resume/resume-scene-runtime";
import { ResumeSectionHeader } from "@/components/resume/resume-section-header";
import { ResumeTimeline } from "@/components/resume/resume-timeline";
import type { ResumeExperience } from "@/types/resume";

export type ResumeCareerRevealProps = {
  entries: readonly ResumeExperience[];
  sectionLabel: string;
  sectionTitle: string;
};

export function splitHighlight(highlight: string): { label: string; detail: string } {
  const separator = highlight.indexOf(":");
  if (separator < 0) {
    return { label: highlight, detail: "" };
  }

  return {
    label: highlight.slice(0, separator).trim(),
    detail: highlight.slice(separator + 1).trim(),
  };
}

export function formatRoleText(role: string, location: string, period: string): string {
  const normalizedPeriod = period.toLowerCase();
  const normalizedLocation = location.toLowerCase();
  if (normalizedPeriod.includes(normalizedLocation)) {
    return role;
  }
  return `${role} · ${location}`;
}

/**
 * The only client-side choice between the server-safe chronology and the
 * desktop treatment. Keeping the fallback as the initial render prevents a
 * hydration or media-query failure from removing Resume facts.
 */
export function ResumeExperienceScene(props: ResumeCareerRevealProps): ReactNode {
  const mode = useResumeSceneMode();
  const sceneRef = useRef<HTMLDivElement>(null);
  const previousMode = useRef(mode);

  useInsertionEffect(() => {
    if (previousMode.current === "enhanced" && mode !== "enhanced") {
      const scene = sceneRef.current;
      if (scene) {
        for (const trigger of ScrollTrigger.getAll()) {
          const triggerElement = trigger.trigger;
          if (triggerElement instanceof Element && scene.contains(triggerElement)) {
            trigger.kill(true);
          }
        }
      }
    }
    previousMode.current = mode;
  }, [mode]);

  return (
    <div ref={sceneRef} data-resume-experience-scene data-motion-mode={mode}>
      {mode !== "enhanced" ? <ResumeTimeline {...props} /> : <ResumeCareerReveal {...props} />}
    </div>
  );
}

/**
 * Presentational desktop adaptation of Horizontal Feature Reveal. Its list is
 * the sole experience DOM while the GSAP context changes only its geometry.
 */
export function ResumeCareerReveal({
  entries,
  sectionLabel,
  sectionTitle,
}: ResumeCareerRevealProps): ReactNode {
  const scopeRef = useRef<HTMLElement>(null);

  useSceneTimeline(
    scopeRef,
    ({ gsap }) => {
      const scope = scopeRef.current;
      const track = scope?.querySelector<HTMLElement>("[data-resume-career-track]");
      if (!scope || !track) {
        return;
      }
      const pinTarget = scope.closest<HTMLElement>("[data-resume-experience-scene]") ?? scope;

      const updateActiveCard = (activeIndex: number) => {
        scope.dataset.activeCareerIndex = String(activeIndex);
        const cards = scope.querySelectorAll<HTMLElement>("[data-resume-career-card]");
        cards.forEach((card, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          card.dataset.active = String(isActive);
          if (isActive) {
            card.setAttribute("data-career-status", "active");
          } else if (isPast) {
            card.setAttribute("data-career-status", "completed");
          } else {
            card.setAttribute("data-career-status", "upcoming");
          }
        });
      };

      const tween = gsap.to(track, {
        x: () => Math.min(0, scope.clientWidth - track.scrollWidth),
        ease: "none",
        scrollTrigger: {
          trigger: pinTarget,
          start: "top top+=96",
          end: () => `+=${Math.max(scope.clientWidth, track.scrollWidth)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (trigger) => {
            const nextIndex = Math.min(entries.length - 1, Math.floor(trigger.progress * entries.length));
            updateActiveCard(nextIndex);
          },
        },
      });

      return () => {
        tween.kill();
        delete scope.dataset.activeCareerIndex;
      };
    },
    [entries.length],
  );

  return (
    <section
      ref={scopeRef}
      aria-labelledby="resume-experience-heading"
      className="resume-career-reveal border-b border-[var(--color-line)]"
      data-resume-career-reveal
      data-active-career-index="0"
    >
      <ResumeSectionHeader
        eyebrow={sectionLabel}
        title={sectionTitle}
        headingId="resume-experience-heading"
      />

      <div
        className="resume-career-reveal__viewport"
        data-resume-career-viewport
        data-career-stage="single-card"
      >
        <ol aria-label={sectionLabel} className="resume-career-reveal__track" data-resume-career-track>
          {entries.map((entry, index) => {
            const roleText = formatRoleText(entry.role, entry.location, entry.period);
            const isActive = index === 0;

            return (
              <li
                key={`${entry.organization}-${entry.period}`}
                className="resume-career-reveal__card"
                data-resume-career-card
                data-active={String(isActive)}
                data-career-status={isActive ? "active" : "upcoming"}
                data-card-index={index}
              >
                <article
                  aria-labelledby={`resume-career-${index}-heading`}
                  className="resume-career-card"
                >
                  <div
                    aria-hidden="true"
                    className="resume-career-card__progress-track"
                    data-resume-career-progress
                  >
                    <div className="resume-career-card__progress-fill" />
                  </div>
                  <div className="resume-career-card__masthead">
                    <h3
                      id={`resume-career-${index}-heading`}
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
