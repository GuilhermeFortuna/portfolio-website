import { describe, expect, it } from "vitest";

import { getResumeContent } from "@/content/resume";
import { locales } from "@/lib/i18n";

describe("resume content contract", () => {
  it("provides complete bilingual section structure", () => {
    const resumes = locales.map((locale) => getResumeContent(locale));

    for (const resume of resumes) {
      expect(resume.metadata.title).toBeTruthy();
      expect(resume.metadata.description).toBeTruthy();
      expect(resume.identity.name).toBe("Guilherme Fortuna");
      expect(resume.links).toHaveLength(5);
      expect(resume.skills).toHaveLength(6);
      expect(resume.experience).toHaveLength(2);
      expect(resume).not.toHaveProperty("projects");
      expect(resume.labels).not.toHaveProperty("projects");
      expect(resume.education).toHaveLength(2);
      expect(resume.languages).toHaveLength(2);
      expect(resume.pdf.href).toMatch(/^\/[^/]+\/guilherme-fortuna-resume/);

      for (const values of [
        resume.links.map((link) => `${link.label}${link.href}${link.kind}`),
        resume.skills.flatMap((group) => [group.label, ...group.items]),
        resume.experience.flatMap((entry) => [
          entry.organization,
          entry.role,
          entry.period,
          entry.location,
          ...entry.highlights,
        ]),
        resume.education.flatMap((entry) => [
          entry.institution,
          entry.program,
          entry.period,
        ]),
        resume.languages,
        Object.values(resume.labels),
      ]) {
        expect(values.every((value) => value.trim().length > 0)).toBe(true);
      }
    }
  });

  it("keeps approved chronology, contacts, and disclosure boundaries", () => {
    for (const locale of locales) {
      const resume = getResumeContent(locale);

      expect(resume.experience.map((entry) => entry.organization)).toEqual([
        "BRXBET & RICOBET",
        "Jones Software",
      ]);
      expect(resume.links).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            href: "mailto:guilhermefortuna.dev@gmail.com",
            kind: "email",
          }),
          expect.objectContaining({
            href: "tel:+5548991814229",
            kind: "phone",
          }),
          expect.objectContaining({
            href: "https://guilhermefortuna.dev",
            kind: "website",
          }),
          expect.objectContaining({
            href: "https://github.com/GuilhermeFortuna",
            kind: "github",
          }),
          expect.objectContaining({
            href: "https://www.linkedin.com/in/guilherme-fortuna-dos-santos/",
            kind: "linkedin",
          }),
        ]),
      );
      expect(JSON.stringify(resume)).not.toContain("/work/aegis");
    }

    expect(getResumeContent("en").pdf).toEqual({
      href: "/resume/guilherme-fortuna-resume-en.pdf",
      downloadName: "guilherme-fortuna-resume-en.pdf",
    });
    expect(getResumeContent("pt-BR").pdf).toEqual({
      href: "/resume/guilherme-fortuna-resume-pt-BR.pdf",
      downloadName: "guilherme-fortuna-resume-pt-BR.pdf",
    });
  });
});
