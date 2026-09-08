"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import {
  useResumeSceneMode,
  useResumeSceneRuntime,
} from "@/components/resume/resume-scene-runtime";
import type { ResumeLabels, ResumeLink } from "@/types/resume";

type ResumeIdentity = {
  name: string;
  role: string;
  focus: string;
  summary: string;
};

export type ResumeIdentitySceneProps = {
  identity: ResumeIdentity;
  location: string;
  availability: string;
  links: readonly ResumeLink[];
  pdf: { href: string; downloadName: string };
  labels: Pick<ResumeLabels, "skills" | "viewPdf" | "downloadPdf" | "contact">;
};

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="resume-identity__external-link"
    >
      {children}
    </a>
  );
}

export function ResumeIdentityScene({
  identity,
  location,
  availability,
  links,
  pdf,
  labels,
}: ResumeIdentitySceneProps): ReactNode {
  const { prefersReducedMotion, progress } = useResumeSceneRuntime();
  const runtimeMode = useResumeSceneMode();
  const [hydrated, setHydrated] = useState(false);
  const [enhancementEligible, setEnhancementEligible] = useState(false);

  useEffect(() => {
    const refresh = window.setTimeout(() => {
      setHydrated(true);
      setEnhancementEligible(
        window.matchMedia?.(
          "(min-width: 1200px) and (min-height: 720px) and (pointer: fine)",
        ).matches ?? false,
      );
    }, 0);
    return () => window.clearTimeout(refresh);
  }, []);

  const mode = prefersReducedMotion
    ? "reduced"
    : enhancementEligible && runtimeMode === "enhanced"
      ? "enhanced"
      : "static";
  const sceneProgress = Math.min(1, Math.max(0, progress / 0.18));
  const assemblyProgress = Math.min(1, sceneProgress / 0.7);
  const settleProgress = Math.min(1, Math.max(0, (sceneProgress - 0.7) / 0.3));
  const contactLink = links.find((link) => link.kind === "email") ?? links[0];
  const style = {
    "--resume-identity-progress": sceneProgress,
    "--resume-identity-assembly": assemblyProgress,
    "--resume-identity-settle": settleProgress,
  } as CSSProperties;
  const plates = [
    identity.focus,
    identity.role,
    location,
    availability,
    labels.skills,
  ];

  return (
    <section
      className={`resume-identity resume-identity--${mode}`}
      data-resume-identity
      data-motion-mode={mode}
      data-motion-preference={String(prefersReducedMotion)}
      data-resume-hydrated={hydrated ? "true" : "false"}
      style={style}
    >
      <div className="resume-identity__field" aria-hidden="true">
        {plates.map((plate, index) => (
          <span
            key={`${plate}-${index}`}
            className={`resume-identity__plate resume-identity__plate--${index + 1}`}
            data-resume-identity-plate
          >
            <span className="resume-identity__plate-index">0{index + 1}</span>
            {plate}
          </span>
        ))}
      </div>

      <header className="resume-identity__content">
        <div className="resume-identity__copy">
          <p className="resume-identity__eyebrow">{identity.focus}</p>
          <h1>{identity.name}</h1>
          <p className="resume-identity__role">{identity.role}</p>
          <p className="resume-identity__summary">{identity.summary}</p>
          <p className="resume-identity__availability">
            {location} · {availability}
          </p>
        </div>

        <div className="resume-identity__actions">
          <address>
            {links.map((link) => (
              <ExternalLink key={link.kind} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </address>
          <div className="resume-identity__buttons">
            <a
              href={pdf.href}
              target="_blank"
              rel="noreferrer"
              className="resume-identity__button resume-identity__button--primary"
            >
              {labels.viewPdf}
            </a>
            <a
              href={pdf.href}
              download={pdf.downloadName}
              className="resume-identity__button"
            >
              {labels.downloadPdf}
            </a>
            {contactLink ? (
              <a href={contactLink.href} className="resume-identity__contact">
                {labels.contact}
              </a>
            ) : null}
          </div>
        </div>
      </header>
    </section>
  );
}
