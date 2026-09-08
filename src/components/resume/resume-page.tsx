import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ResumeCapabilityOrbit } from "@/components/resume/resume-capability-orbit";
import { ResumeExperienceScene } from "@/components/resume/resume-career-reveal";
import {
  ResumeChapter,
  ResumeReadingTrace,
  ResumeSceneRuntime,
} from "@/components/resume/resume-scene-runtime";
import { ResumeChapterNavigationConnected } from "@/components/resume/resume-chapter-navigation";
import { ResumeIdentityScene } from "@/components/resume/resume-identity-scene";
import { getResumeContent } from "@/content/resume";
import type { Locale } from "@/lib/i18n";
import type { ResumeContent } from "@/types/resume";

function ResumeDocument({ resume }: { resume: ResumeContent }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="resume-document"
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
        <ResumeExperienceScene
          entries={resume.experience}
          sectionLabel={resume.labels.experience}
          sectionTitle={resume.labels.experience}
        />
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
