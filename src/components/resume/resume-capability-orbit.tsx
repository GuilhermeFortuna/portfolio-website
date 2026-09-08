"use client";

import { useEffect, useState, type FocusEvent, type KeyboardEvent, type ReactNode } from "react";

import {
  useResumeSceneMode,
  useResumeSceneRuntime,
} from "@/components/resume/resume-scene-runtime";
import type { ResumeSkillGroup } from "@/types/resume";

export type ResumeCapabilityOrbitProps = {
  title: string;
  centerLabel: string;
  groups: readonly ResumeSkillGroup[];
};

export function ResumeCapabilityOrbit({
  title,
  centerLabel,
  groups,
}: ResumeCapabilityOrbitProps): ReactNode {
  const runtimeMode = useResumeSceneMode();
  const { prefersReducedMotion } = useResumeSceneRuntime();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [hydrated, setHydrated] = useState(false);
  const [enhancementEligible, setEnhancementEligible] = useState(false);
  useEffect(() => {
    const refresh = window.setTimeout(() => {
      setHydrated(true);
      setEnhancementEligible(
        window.matchMedia?.("(min-width: 1200px) and (min-height: 720px) and (pointer: fine)").matches ?? false,
      );
    }, 0);
    return () => window.clearTimeout(refresh);
  }, []);
  const mode = prefersReducedMotion
    ? "reduced"
    : enhancementEligible
      ? "enhanced"
      : runtimeMode === "reduced"
        ? "reduced"
        : "static";

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setSelectedIndex(null);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setSelectedIndex(null);
    }
  }

  return (
    <section
      className={`resume-capability-orbit resume-capability-orbit--${mode}`}
      data-resume-capability-orbit
      data-motion-mode={mode}
      data-motion-preference={String(prefersReducedMotion)}
      data-resume-hydrated={hydrated ? "true" : "false"}
      onBlur={handleBlur}
    >
      <div className="resume-capability-orbit__heading">
        <h2>{title}</h2>
      </div>
      <div className="resume-capability-orbit__stage">
        <div className="resume-capability-orbit__rings" aria-hidden="true" />
        <div className="resume-capability-orbit__center" aria-hidden="true">
          {centerLabel}
        </div>
        <ul
          className="resume-capability-orbit__list"
          aria-label={title}
          data-resume-capability-list
          data-fallback={mode !== "enhanced" ? "true" : "false"}
        >
          {groups.map((group, index) => {
            const active = selectedIndex === index;
            const skillsId = `resume-capability-skills-${index}`;
            return (
              <li
                key={group.label}
                className={`resume-capability-orbit__group resume-capability-orbit__group--${index + 1}`}
                data-active={active ? "true" : "false"}
              >
                <button
                  type="button"
                  aria-controls={skillsId}
                  aria-pressed={active}
                  onClick={() => setSelectedIndex(index)}
                  onFocus={() => setSelectedIndex(index)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onKeyDown={handleKeyDown}
                  className="resume-capability-orbit__button"
                >
                  {group.label}
                </button>
                <ul id={skillsId} className="resume-capability-orbit__skills" aria-label={group.label} data-active={active ? "true" : "false"}>
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
