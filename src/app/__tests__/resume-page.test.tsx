import userEvent from "@testing-library/user-event";
import { motionValue } from "motion/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import EnglishResumePage, {
  metadata as englishMetadata,
} from "@/app/(en)/resume/page";
import PortugueseResumePage, {
  generateMetadata as generatePortugueseMetadata,
} from "@/app/[lang]/resume/page";
import { getResumeContent } from "@/content/resume";
import { renderWithLocale, screen, within } from "@/test/render";

vi.mock("@/components/motion/motion-runtime", () => ({
  useMotionRuntime: () => ({
    scrollProgress: motionValue(0),
    prefersReducedMotion: false,
  }),
}));

vi.mock("@/components/webgl/managed-webgl-effect", () => ({
  ManagedWebGLEffect: ({ fallback }: { fallback: ReactNode }) => (
    <div data-testid="webgl-fallback">{fallback}</div>
  ),
}));

describe("resume routes", () => {
  it("renders the decorative backdrop inside the isolated stage, beneath the document", () => {
    renderWithLocale(<EnglishResumePage />, "en");

    const backdrop = document.querySelector("[data-resume-backdrop]");
    expect(backdrop).toHaveAttribute("aria-hidden", "true");
    expect(backdrop?.closest(".resume-stage")).not.toBeNull();
    expect(screen.getByRole("main").closest(".resume-stage")).toBe(
      backdrop?.closest(".resume-stage"),
    );
  });

  it("renders the complete English semantic document", () => {
    const resume = getResumeContent("en");
    renderWithLocale(<EnglishResumePage />, "en");

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: resume.identity.name })).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("main")).toHaveClass("resume-document");
    expect(screen.getByRole("main")).not.toHaveClass("overflow-hidden");
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("list").length).toBeGreaterThanOrEqual(6);

    const chapterLabels = [
      resume.identity.focus,
      resume.labels.skills,
      resume.labels.experience,
      resume.labels.education,
      resume.labels.contact,
    ];
    const chapterNavigation = screen.getByRole("navigation", {
      name: chapterLabels.join(" · "),
    });
    expect(within(chapterNavigation).getAllByRole("link")).toHaveLength(5);
    expect(document.querySelectorAll("[data-resume-chapter]")).toHaveLength(5);
    expect(document.querySelector(".resume-reading-trace")).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    expect(
      within(screen.getByRole("main")).getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent),
    ).toEqual([
      resume.labels.skills,
      resume.labels.experience,
      resume.labels.education,
      resume.labels.languages,
      resume.labels.contact,
    ]);

    const experienceRegion = screen.getByRole("region", {
      name: resume.labels.experience,
    });
    expect(
      within(experienceRegion).getByRole("list", { name: resume.labels.experience }),
    ).toBeInTheDocument();
    expect(within(screen.getByRole("main")).getAllByRole("button")).toHaveLength(6);

    for (const text of [
      resume.identity.role,
      resume.identity.summary,
      ...resume.skills.flatMap((group) => [group.label, ...group.items]),
      ...resume.experience.flatMap((entry) => [entry.organization, ...entry.highlights]),
      ...resume.education.flatMap((entry) => [entry.institution, entry.program]),
      ...resume.languages,
    ]) {
      expect(document.body.textContent).toContain(text);
    }

    expect(screen.queryByRole("heading", { name: "Selected Software Projects" })).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent("Quantitative Research & Execution Platform");
    expect(document.body).not.toHaveTextContent("Multi-Tenant Clinic Management SaaS");

    const main = screen.getByRole("main");
    const viewLinks = within(main).getAllByRole("link", { name: resume.labels.viewPdf });
    expect(viewLinks).toHaveLength(2);
    for (const viewLink of viewLinks) {
      expect(viewLink).toHaveAttribute("href", resume.pdf.href);
      expect(viewLink).toHaveAttribute("target", "_blank");
      expect(viewLink).toHaveAttribute("rel", "noreferrer");
    }
    const downloadLinks = within(main).getAllByRole("link", { name: resume.labels.downloadPdf });
    expect(downloadLinks).toHaveLength(2);
    for (const downloadLink of downloadLinks) {
      expect(downloadLink).toHaveAttribute("href", resume.pdf.href);
      expect(downloadLink).toHaveAttribute("download", resume.pdf.downloadName);
    }
    expect(document.body.innerHTML).not.toContain("/work/aegis");
    expect(document.body.innerHTML).not.toContain("[REQUIRED:");
  });

  it("renders localized Portuguese copy and actions", async () => {
    const resume = getResumeContent("pt-BR");
    const page = await PortugueseResumePage({
      params: Promise.resolve({ lang: "pt-BR" }),
    });
    renderWithLocale(page, "pt-BR");

    expect(screen.getByRole("heading", { level: 1, name: resume.identity.name })).toBeInTheDocument();
    expect(document.querySelector(".resume-identity__role")).toHaveTextContent(
      resume.identity.role,
    );
    expect(screen.getAllByRole("link", { name: resume.labels.viewPdf })).toHaveLength(2);
    const phoneLinks = screen.getAllByRole("link", { name: resume.labels.phone });
    expect(phoneLinks).toHaveLength(2);
    for (const phoneLink of phoneLinks) {
      expect(phoneLink).toHaveAttribute("href", "tel:+5548991814229");
    }
    expect(
      within(screen.getByRole("region", { name: resume.labels.experience })).getByRole("list", {
        name: resume.labels.experience,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: resume.labels.contact }).at(-1)).toHaveAttribute(
      "href",
      "mailto:guilhermefortuna.dev@gmail.com",
    );

    const user = userEvent.setup();
    const tocTrigger = screen.getByRole("button", {
      name: `${resume.labels.tableOfContents}: ${resume.identity.focus}`,
    });
    expect(tocTrigger).toBeInTheDocument();

    await user.click(tocTrigger);
    const region = screen.getByRole("region", {
      name: resume.labels.tableOfContents,
    });
    expect(region).toBeInTheDocument();
    expect(
      within(region).getByText(resume.labels.tableOfContents),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: resume.labels.closeTableOfContents }),
    ).toBeInTheDocument();
  });

  it("enforces strict heading order and hierarchy across all resume chapters", () => {
    const resume = getResumeContent("en");
    renderWithLocale(<EnglishResumePage />, "en");

    const main = screen.getByRole("main");
    const headings = within(main).getAllByRole("heading");

    // Must start with exactly one h1
    expect(headings[0].tagName).toBe("H1");
    expect(headings[0]).toHaveTextContent(resume.identity.name);

    // All h2 headings must be properly ordered
    const h2Headings = headings.filter((h) => h.tagName === "H2");
    expect(h2Headings.map((h) => h.textContent)).toEqual([
      resume.labels.skills,
      resume.labels.experience,
      resume.labels.education,
      resume.labels.languages,
      resume.labels.contact,
    ]);

    // Check heading level progression (no skipped levels)
    let previousLevel = 1;
    for (const heading of headings) {
      const currentLevel = parseInt(heading.tagName.replace("H", ""), 10);
      expect(currentLevel).toBeLessThanOrEqual(previousLevel + 1);
      previousLevel = currentLevel;
    }
  });

  it("exposes the shared header pattern (eyebrow, title, rule) across all non-identity chapters", () => {
    renderWithLocale(<EnglishResumePage />, "en");

    const headers = document.querySelectorAll("[data-resume-section-header]");
    // 5 non-identity section headers: Skills, Experience, Education, Languages, Contact
    expect(headers).toHaveLength(5);

    headers.forEach((header) => {
      const eyebrow = header.querySelector("[data-resume-header-eyebrow]");
      const title = header.querySelector("[data-resume-header-title]");
      expect(eyebrow).toBeInTheDocument();
      expect(eyebrow?.textContent?.trim().length).toBeGreaterThan(0);
      expect(title).toBeInTheDocument();
      expect(title?.tagName).toBe("H2");
      expect(header).toHaveClass("resume-section-header");
    });
  });

  it("preserves chapter IDs and TOC labels unchanged", () => {
    const resume = getResumeContent("en");
    renderWithLocale(<EnglishResumePage />, "en");

    const chapterLabels = [
      resume.identity.focus,
      resume.labels.skills,
      resume.labels.experience,
      resume.labels.education,
      resume.labels.contact,
    ];
    const chapterIds = ["identity", "capabilities", "experience", "credentials", "contact"];

    chapterIds.forEach((id) => {
      const chapterEl = document.querySelector(`[data-resume-chapter="${id}"]`);
      expect(chapterEl).toBeInTheDocument();
      expect(chapterEl).toHaveAttribute("id", `resume-chapter-${id}`);
    });

    const chapterNavigation = screen.getByRole("navigation", {
      name: chapterLabels.join(" · "),
    });
    const links = within(chapterNavigation).getAllByRole("link");
    expect(links).toHaveLength(5);
    links.forEach((link, idx) => {
      expect(link).toHaveTextContent(chapterLabels[idx]);
      expect(link).toHaveAttribute("href", `#resume-chapter-${chapterIds[idx]}`);
    });
  });
});

describe("resume metadata", () => {
  it("uses the English resume contract metadata", () => {
    const resume = getResumeContent("en");
    expect(englishMetadata).toMatchObject({
      title: resume.metadata.title,
      description: resume.metadata.description,
    });
    expect(englishMetadata.alternates).toEqual(
      expect.objectContaining({
        canonical: "/resume",
        languages: expect.objectContaining({
          en: "/resume",
          "pt-BR": "/pt-BR/resume",
          "x-default": "/resume",
        }),
      }),
    );
  });

  it("generates localized Portuguese metadata", async () => {
    const resume = getResumeContent("pt-BR");
    const result = await generatePortugueseMetadata({
      params: Promise.resolve({ lang: "pt-BR" }),
    });

    expect(result).toMatchObject({
      title: resume.metadata.title,
      description: resume.metadata.description,
      alternates: expect.objectContaining({
        canonical: "/pt-BR/resume",
        languages: expect.objectContaining({
          en: "/resume",
          "pt-BR": "/pt-BR/resume",
          "x-default": "/resume",
        }),
      }),
    });
  });
});
