"use client";

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type ReactNode } from "react";
import { useResumeSceneMode, useResumeSceneRuntime } from "@/components/resume/resume-scene-runtime";
import type { ResumeSkillGroup } from "@/types/resume";

export type ResumeCapabilityOrbitProps = { title: string; centerLabel: string; groups: readonly ResumeSkillGroup[] };

function NodeIcon({ index }: { index: number }) { return <svg aria-hidden="true" viewBox="0 0 24 24" className="resume-orbit__icon"><circle cx="12" cy="12" r={index % 2 ? 7 : 5} /><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /></svg>; }

export function ResumeCapabilityOrbit({ title, centerLabel, groups }: ResumeCapabilityOrbitProps): ReactNode {
  const runtimeMode = useResumeSceneMode();
  const { prefersReducedMotion } = useResumeSceneRuntime();
  const [selected, setSelected] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [eligible, setEligible] = useState(false);
  const refs = useRef<Record<number, HTMLLIElement | null>>({});
  useEffect(() => { const id = window.setTimeout(() => { setHydrated(true); setEligible(window.matchMedia?.("(min-width: 1200px) and (min-height: 720px) and (pointer: fine)").matches ?? false); }, 0); return () => window.clearTimeout(id); }, []);
  const enhanced = hydrated && eligible && runtimeMode === "enhanced" && !prefersReducedMotion;
  useEffect(() => { if (!enhanced || selected !== null) return; const id = window.setInterval(() => setRotation((value) => Number(((value + 0.3) % 360).toFixed(3))), 50); return () => window.clearInterval(id); }, [enhanced, selected]);
  const clear = () => setSelected(null);
  const blur = (event: FocusEvent<HTMLElement>) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) clear(); };
  const keyDown = (event: KeyboardEvent<HTMLButtonElement>) => { if (event.key === "Escape") clear(); };
  const setNode = (index: number) => { setSelected(index); setRotation(270 - (index / Math.max(groups.length, 1)) * 360); };
  return (
    <section className={`resume-capability-source ${enhanced ? "resume-capability-source--enhanced" : "resume-capability-source--fallback"}`} data-resume-capability-orbit data-motion-mode={enhanced ? "enhanced" : prefersReducedMotion ? "reduced" : "static"} data-resume-hydrated={hydrated ? "true" : "false"} onBlur={blur}>
      <h2>{title}</h2>
      <div className="resume-orbit" onClick={(event) => { if (event.target === event.currentTarget) clear(); }}>
        <div className="resume-orbit__plane" style={{ transform: `translate(0px, 0px) rotate(${enhanced ? rotation : 0}deg)` }}>
          <div className="resume-orbit__center" aria-hidden="true"><span className="resume-orbit__center-ring" /><span className="resume-orbit__center-core" />{centerLabel}</div>
          <div className="resume-orbit__ring" aria-hidden="true" />
          <ul className="resume-orbit__nodes" aria-label={title} data-resume-capability-list data-fallback={enhanced ? "false" : "true"}>
            {groups.map((group, index) => { const angle = (index / Math.max(groups.length, 1) * 360 + (enhanced ? rotation : 0)) * Math.PI / 180; const x = 200 * Math.cos(angle); const y = 200 * Math.sin(angle); const active = selected === index; return <li key={group.label} ref={(node) => { refs.current[index] = node; }} className="resume-orbit__node" style={{ transform: enhanced ? `translate(${x}px, ${y}px)` : undefined, zIndex: active ? 200 : Math.round(100 + 50 * Math.cos(angle)), opacity: active || !enhanced ? 1 : Math.max(.4, Math.min(1, .4 + .6 * ((1 + Math.sin(angle)) / 2))) }}>
              <button type="button" aria-pressed={active} onClick={(event) => { event.stopPropagation(); setNode(index); }} onFocus={() => setNode(index)} onMouseEnter={() => setNode(index)} onKeyDown={keyDown} className={`resume-orbit__button ${active ? "resume-orbit__button--active" : ""}`}><span className="resume-orbit__glow" aria-hidden="true" /><span className="resume-orbit__button-face"><NodeIcon index={index} /></span><span className="resume-orbit__label">{group.label}</span></button>
              <ul className={`resume-orbit__card ${active ? "resume-orbit__card--active" : ""}`} aria-label={group.label} data-active={active ? "true" : "false"}>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </li>; })}
          </ul>
        </div>
      </div>
    </section>
  );
}
