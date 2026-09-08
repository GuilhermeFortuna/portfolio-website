import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ResumeCapabilityOrbit } from "@/components/resume/resume-capability-orbit";
import {
  ResumeChapter,
  ResumeReadingTrace,
  ResumeSceneRuntime,
} from "@/components/resume/resume-scene-runtime";
import { ResumeChapterNavigationConnected } from "@/components/resume/resume-chapter-navigation";
import { ResumeIdentityScene } from "@/components/resume/resume-identity-scene";
import { ResumeTimeline } from "@/components/resume/resume-timeline";
import { getResumeContent } from "@/content/resume";
import type { Locale } from "@/lib/i18n";
import type { ResumeContent } from "@/types/resume";

function ResumeDocument({ resume }: { resume: ResumeContent }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-[var(--content-wide)] overflow-hidden px-[var(--page-gutter)] pb-16 pt-28 lg:pt-36"
    >
      <ResumeChapter id="identity" label={resume.identity.focus}>
        <ResumeIdentityScene
          identity={resume.identity}
          location={resume.location}
          availability={resume.availability}
          links={resume.links}
          pdf={resume.pdf}
          labels={resume.labels}
        />
      </ResumeChapter>

      <ResumeChapter id="capabilities" label={resume.labels.skills}>
        <ResumeCapabilityOrbit
          title={resume.labels.skills}
          centerLabel={resume.identity.role}
          groups={resume.skills}
        />
      </ResumeChapter>

      <ResumeChapter id="experience" label={resume.labels.experience}>
        <ResumeTimeline
          entries={resume.experience}
          sectionLabel={resume.labels.experience}
          sectionTitle={resume.labels.experience}
        />
      </ResumeChapter>

      <ResumeChapter id="projects" label={resume.labels.projects}>
        <section aria-labelledby="resume-projects-heading" className="border-b border-[var(--color-line)] py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
          <h2 id="resume-projects-heading" className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
            {resume.labels.projects}
          </h2>
          <ol className="min-w-0 divide-y divide-[var(--color-line)]">
            {resume.projects.map((project) => (
              <li key={project.name} className="grid gap-4 py-7 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-8">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--color-text)]">{project.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{project.role} · {project.period}</p>
                </div>
                <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--color-text-muted)]">
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        </section>
      </ResumeChapter>

      <ResumeChapter id="credentials" label={resume.labels.education}>
        <section aria-labelledby="resume-education-heading" className="border-b border-[var(--color-line)] py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
          <h2 id="resume-education-heading" className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
            {resume.labels.education}
          </h2>
          <ol className="list-decimal space-y-5 pl-5 text-sm leading-7 text-[var(--color-text-muted)]">
            {resume.education.map((entry) => (
              <li key={`${entry.institution}-${entry.period}`}>
                <span className="font-semibold text-[var(--color-text)]">{entry.institution}</span> — {entry.program} · {entry.period}
              </li>
            ))}
          </ol>
        </div>
        </section>

        <section aria-labelledby="resume-languages-heading" className="py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
          <h2 id="resume-languages-heading" className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
            {resume.labels.languages}
          </h2>
          <div>
            <ul className="space-y-2 text-sm leading-7 text-[var(--color-text-muted)]">
              {resume.languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
            <ResumeChapter id="contact" label={resume.labels.contact}>
              <a href={resume.locale === "en" ? "/#work" : "/pt-BR/#work"} className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-text)] underline underline-offset-4">
                {resume.labels.returnToWork}
              </a>
            </ResumeChapter>
          </div>
        </div>
        </section>
      </ResumeChapter>
    </main>
  );
}

export function ResumePage({ locale }: { locale: Locale }): ReactNode {
  const resume = getResumeContent(locale);
  const chapters = [
    { id: "identity" as const, label: resume.identity.focus },
    { id: "capabilities" as const, label: resume.labels.skills },
    { id: "experience" as const, label: resume.labels.experience },
    { id: "projects" as const, label: resume.labels.projects },
    { id: "credentials" as const, label: resume.labels.education },
    { id: "contact" as const, label: resume.labels.contact },
  ];

  return (
    <>
      <SiteHeader />
      <ResumeSceneRuntime chapters={chapters}>
        <ResumeChapterNavigationConnected />
        <ResumeReadingTrace />
        <ResumeDocument resume={resume} />
      </ResumeSceneRuntime>
      <SiteFooter />
    </>
  );
}
