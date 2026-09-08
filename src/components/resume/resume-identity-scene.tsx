"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

import { useResumeSceneMode, useResumeSceneRuntime } from "@/components/resume/resume-scene-runtime";
import type { ResumeLabels, ResumeLink } from "@/types/resume";

type ResumeIdentity = { name: string; role: string; focus: string; summary: string };
export type ResumeIdentitySceneProps = { identity: ResumeIdentity; location: string; availability: string; links: readonly ResumeLink[]; pdf: { href: string; downloadName: string }; labels: Pick<ResumeLabels, "skills" | "viewPdf" | "downloadPdf" | "contact"> };

const imageSet = { topLeft: "/work/q/research-features.webp", topRight: "/work/q/launcher.webp", bottomLeft: "/work/gosigapp/system-map.svg", bottomRight: "/work/q/backtest-results.webp" };

export function ResumeIdentityScene({ identity, location, availability, links, pdf, labels }: ResumeIdentitySceneProps): ReactNode {
  const { progress, prefersReducedMotion } = useResumeSceneRuntime();
  const runtimeMode = useResumeSceneMode();
  const [hydrated, setHydrated] = useState(false);
  const [eligible, setEligible] = useState(false);
  useEffect(() => { const id = window.setTimeout(() => { setHydrated(true); setEligible(window.matchMedia?.("(min-width: 1200px) and (min-height: 720px) and (pointer: fine)").matches ?? false); }, 0); return () => window.clearTimeout(id); }, []);
  const enhanced = hydrated && eligible && runtimeMode === "enhanced" && !prefersReducedMotion;
  const phase = Math.min(1, Math.max(0, progress / 0.18) / 0.65);
  const contact = links.find((link) => link.kind === "email");
  return (
    <section className="resume-identity-source" data-resume-identity data-motion-mode={enhanced ? "enhanced" : prefersReducedMotion ? "reduced" : "static"} data-resume-hydrated={hydrated ? "true" : "false"} style={{ ["--resume-identity-progress" as string]: Math.min(1, Math.max(0, progress / 0.18)) }}>
      <div className={`resume-scroll-choreography ${enhanced ? "resume-scroll-choreography--enhanced" : "resume-scroll-choreography--fallback"}`} style={{ ["--resume-choreography-progress" as string]: phase }}>
        <div className="resume-scroll-choreography__sticky">
          <div className="resume-scroll-choreography__images" aria-hidden="true">
            <motion.div className="resume-scroll-choreography__image resume-scroll-choreography__image--tl" animate={{ x: enhanced ? `${-20 + 20 * phase}vw` : 0, y: enhanced ? `${-14 + 14 * phase}vh` : 0, opacity: enhanced ? 1 - Math.max(0, (phase - 0.75) / 0.15) : 0.12 }}><img src={imageSet.topLeft} alt="" /></motion.div>
            <motion.div className="resume-scroll-choreography__image resume-scroll-choreography__image--br" animate={{ x: enhanced ? `${20 - 20 * phase}vw` : 0, y: enhanced ? `${14 - 14 * phase}vh` : 0, opacity: enhanced ? 1 - Math.max(0, (phase - 0.75) / 0.15) : 0.12 }}><img src={imageSet.bottomRight} alt="" /></motion.div>
            <motion.div className="resume-scroll-choreography__image resume-scroll-choreography__image--bl" animate={{ x: enhanced ? `${-20 + 20 * phase}vw` : 0, y: enhanced ? `${14 - 14 * phase}vh` : 0, opacity: enhanced ? 1 - Math.max(0, (phase - 0.75) / 0.15) : 0.12 }}><img src={imageSet.bottomLeft} alt="" /></motion.div>
            <motion.div className="resume-scroll-choreography__image resume-scroll-choreography__image--hero" animate={{ x: enhanced ? `${20 - 20 * phase}vw` : 0, y: enhanced ? `${-14 + 14 * phase}vh` : 0, width: enhanced ? `${36 + 64 * Math.max(0, (phase - 0.65) / 0.35)}vw` : "36vw", height: enhanced ? `${24 + 76 * Math.max(0, (phase - 0.65) / 0.35)}vh` : "24vh" }}><img src={imageSet.topRight} alt="" /></motion.div>
          </div>
          <header className="resume-scroll-choreography__content">
            <p className="resume-identity__eyebrow">{identity.focus}</p><h1>{identity.name}</h1><p className="resume-identity__role">{identity.role}</p><p className="resume-identity__summary">{identity.summary}</p><p className="resume-identity__availability">{location} · {availability}</p>
            <div className="resume-identity__actions"><address>{links.map((link) => <a key={link.kind} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}</address><div className="resume-identity__buttons"><a href={pdf.href} target="_blank" rel="noreferrer" className="resume-identity__button resume-identity__button--primary">{labels.viewPdf}</a><a href={pdf.href} download={pdf.downloadName} className="resume-identity__button">{labels.downloadPdf}</a>{contact ? <a href={contact.href} className="resume-identity__contact">{labels.contact}</a> : null}</div></div>
          </header>
        </div>
      </div>
    </section>
  );
}
