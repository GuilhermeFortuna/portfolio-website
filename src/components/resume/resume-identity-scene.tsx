"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import {
  useResumeSceneMode,
  useResumeSceneRuntime,
} from "@/components/resume/resume-scene-runtime";
import { MagicCard } from "@/components/ui/magic-card";
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

  useEffect(() => {
    const refresh = window.setTimeout(() => {
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(refresh);
  }, []);

  const mode = runtimeMode;
  const sceneProgress = Math.min(1, Math.max(0, progress / 0.18));
  const style = {
    "--resume-identity-progress": sceneProgress,
  } as CSSProperties;

  return (
    <section
      className={`resume-identity resume-identity--${mode}`}
      data-resume-identity
      data-motion-mode={mode}
      data-motion-preference={String(prefersReducedMotion)}
      data-resume-hydrated={hydrated ? "true" : "false"}
      style={style}
    >

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

        <MagicCard
          animated={mode === "enhanced"}
          beam
          className="resume-identity__actions"
          data-resume-identity-card
        >
          <p className="resume-identity__actions-eyebrow">{labels.contact}</p>
          <address>
            <ul className="resume-identity__ledger">
              {links.map((link) => (
                <li key={link.kind} className="resume-identity__ledger-row">
                  <ExternalLink href={link.href}>
                    <span className="resume-identity__ledger-label">{link.label}</span>
                    <span aria-hidden="true" className="resume-identity__ledger-arrow">
                      ↗
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </address>
          <div className="resume-identity__buttons">
            <a
              href={pdf.href}
              target="_blank"
              rel="noreferrer"
              className="resume-identity__button resume-identity__button--primary"
              data-primary="true"
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
          </div>
        </MagicCard>
      </header>
    </section>
  );
}
