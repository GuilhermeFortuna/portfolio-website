import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ResumeTimeline } from "@/components/resume/resume-timeline";
import { getResumeContent } from "@/content/resume";
import type { Locale } from "@/lib/i18n";
import type { ResumeContent } from "@/types/resume";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline decoration-[var(--color-line-strong)] underline-offset-4 transition-colors hover:text-[var(--color-text)]"
    >
      {children}
    </a>
  );
}

function ResumeDocument({ resume }: { resume: ResumeContent }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-[var(--content-wide)] overflow-hidden px-[var(--page-gutter)] pb-16 pt-28 lg:pt-36"
    >
      <header className="grid gap-10 border-b border-[var(--color-line)] pb-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:pb-16">
        <div className="min-w-0">
          <p className="[font-family:var(--font-geist-mono)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {resume.identity.focus}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-[var(--color-text)] sm:text-6xl lg:text-7xl">
            {resume.identity.name}
          </h1>
          <p className="mt-5 text-xl tracking-[-0.02em] text-[var(--color-text-muted)] sm:text-2xl">
            {resume.identity.role}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">
            {resume.identity.summary}
          </p>
          <p className="mt-5 text-sm leading-6 text-[var(--color-text-muted)]">
            {resume.location} · {resume.availability}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 border-t border-[var(--color-line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <address className="flex flex-wrap gap-x-5 gap-y-3 not-italic [font-family:var(--font-geist-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            {resume.links.map((link) => (
              <ExternalLink key={link.kind} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </address>
          <div className="flex flex-wrap gap-3">
            <a
              href={resume.pdf.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-line-strong)] px-5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-text-muted)]"
            >
              {resume.labels.viewPdf}
            </a>
            <a
              href={resume.pdf.href}
              download={resume.pdf.downloadName}
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-line)] px-5 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-text)]"
            >
              {resume.labels.downloadPdf}
            </a>
            <a
              href={resume.links[0].href}
              className="inline-flex min-h-11 items-center text-sm text-[var(--color-text-muted)] underline underline-offset-4 transition-colors hover:text-[var(--color-text)]"
            >
              {resume.labels.contact}
            </a>
          </div>
        </div>
      </header>

      <section aria-labelledby="resume-skills-heading" className="border-b border-[var(--color-line)] py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
          <h2 id="resume-skills-heading" className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] sm:text-3xl">
            {resume.labels.skills}
          </h2>
          <div className="grid min-w-0 gap-8 sm:grid-cols-2">
            {resume.skills.map((group) => (
              <div key={group.label} className="min-w-0">
                <h3 className="text-sm font-semibold text-[var(--color-text)]">{group.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={group.label}>
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs leading-4 text-[var(--color-text-muted)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResumeTimeline
        entries={resume.experience}
        sectionLabel={resume.labels.experience}
        sectionTitle={resume.labels.experience}
      />

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
            <a href={resume.locale === "en" ? "/#work" : "/pt-BR/#work"} className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-text)] underline underline-offset-4">
              {resume.labels.returnToWork}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ResumePage({ locale }: { locale: Locale }): ReactNode {
  return <><SiteHeader /><ResumeDocument resume={getResumeContent(locale)} /><SiteFooter /></>;
}
