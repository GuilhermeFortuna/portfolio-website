import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getResumeContent } from "@/content/resume";
import type { Locale } from "@/lib/i18n";
import type { ResumeContent } from "@/types/resume";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="underline decoration-[var(--color-line-strong)] underline-offset-4 hover:text-[var(--color-text)]">
      {children}
    </a>
  );
}

function ResumeDocument({ resume }: { resume: ResumeContent }) {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[var(--content-wide)] px-[var(--page-gutter)] pb-16 pt-32 lg:pt-40">
      <header className="border-b border-[var(--color-line)] pb-10">
        <p className="[font-family:var(--font-geist-mono)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{resume.identity.focus}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text)] sm:text-6xl">{resume.identity.name}</h1>
        <p className="mt-4 text-xl text-[var(--color-text-muted)]">{resume.identity.role}</p>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">{resume.identity.summary}</p>
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">{resume.location} · {resume.availability}</p>
        <address className="mt-8 flex flex-wrap gap-x-6 gap-y-3 not-italic [font-family:var(--font-geist-mono)] text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          {resume.links.map((link) => (
            <ExternalLink key={link.kind} href={link.href}>{link.label}</ExternalLink>
          ))}
        </address>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={resume.pdf.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-line-strong)] px-5 text-sm font-semibold text-[var(--color-text)]">{resume.labels.viewPdf}</a>
          <a href={resume.pdf.href} download={resume.pdf.downloadName} className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-line)] px-5 text-sm text-[var(--color-text-muted)]">{resume.labels.downloadPdf}</a>
          <a href={resume.links[0].href} className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-line)] px-5 text-sm text-[var(--color-text-muted)]">{resume.labels.contact}</a>
        </div>
      </header>

      <section aria-labelledby="resume-skills-heading" className="border-b border-[var(--color-line)] py-12">
        <h2 id="resume-skills-heading" className="text-2xl font-semibold text-[var(--color-text)]">{resume.labels.skills}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resume.skills.map((group) => <div key={group.label}><h3 className="text-sm font-semibold text-[var(--color-text)]">{group.label}</h3><ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--color-text-muted)]">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
        </div>
      </section>

      <section aria-labelledby="resume-experience-heading" className="border-b border-[var(--color-line)] py-12">
        <h2 id="resume-experience-heading" className="text-2xl font-semibold text-[var(--color-text)]">{resume.labels.experience}</h2>
        <ol className="mt-8 space-y-10">
          {resume.experience.map((entry) => <li key={entry.organization}><h3 className="text-xl font-semibold text-[var(--color-text)]">{entry.organization}</h3><p className="mt-2 text-sm text-[var(--color-text-muted)]">{entry.role} · {entry.period}</p><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--color-text-muted)]">{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></li>)}
        </ol>
      </section>

      <section aria-labelledby="resume-projects-heading" className="border-b border-[var(--color-line)] py-12">
        <h2 id="resume-projects-heading" className="text-2xl font-semibold text-[var(--color-text)]">{resume.labels.projects}</h2>
        <ol className="mt-8 space-y-10">{resume.projects.map((project) => <li key={project.name}><h3 className="text-xl font-semibold text-[var(--color-text)]">{project.name}</h3><p className="mt-2 text-sm text-[var(--color-text-muted)]">{project.role} · {project.period}</p><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--color-text-muted)]">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></li>)}</ol>
      </section>

      <section aria-labelledby="resume-education-heading" className="border-b border-[var(--color-line)] py-12"><h2 id="resume-education-heading" className="text-2xl font-semibold text-[var(--color-text)]">{resume.labels.education}</h2><ol className="mt-8 list-decimal space-y-5 pl-5 text-sm leading-7 text-[var(--color-text-muted)]">{resume.education.map((entry) => <li key={`${entry.institution}-${entry.period}`}><span className="font-semibold text-[var(--color-text)]">{entry.institution}</span> — {entry.program} · {entry.period}</li>)}</ol></section>
      <section aria-labelledby="resume-languages-heading" className="py-12"><h2 id="resume-languages-heading" className="text-2xl font-semibold text-[var(--color-text)]">{resume.labels.languages}</h2><ul className="mt-8 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--color-text-muted)]">{resume.languages.map((language) => <li key={language}>{language}</li>)}</ul><a href={resume.locale === "en" ? "/#work" : "/pt-BR/#work"} className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-text)] underline underline-offset-4">{resume.labels.returnToWork}</a></section>
    </main>
  );
}

export function ResumePage({ locale }: { locale: Locale }): ReactNode {
  return <><SiteHeader /><ResumeDocument resume={getResumeContent(locale)} /><SiteFooter /></>;
}
