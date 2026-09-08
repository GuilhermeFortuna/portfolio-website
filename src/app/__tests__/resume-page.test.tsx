import { motionValue } from "motion/react";
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

describe("resume routes", () => {
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
    expect(within(main).getByRole("link", { name: resume.labels.viewPdf })).toHaveAttribute(
      "href",
      resume.pdf.href,
    );
    expect(within(main).getByRole("link", { name: resume.labels.downloadPdf })).toHaveAttribute(
      "download",
      resume.pdf.downloadName,
    );
    expect(within(main).getByRole("link", { name: resume.labels.viewPdf })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(within(main).getByRole("link", { name: resume.labels.viewPdf })).toHaveAttribute(
      "rel",
      "noreferrer",
    );
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
    expect(screen.getByRole("link", { name: resume.labels.viewPdf })).toHaveAttribute(
      "href",
      resume.pdf.href,
    );
    expect(screen.getByRole("link", { name: resume.labels.phone })).toHaveAttribute(
      "href",
      "tel:+5548991814229",
    );
    expect(
      within(screen.getByRole("region", { name: resume.labels.experience })).getByRole("list", {
        name: resume.labels.experience,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: resume.labels.contact }).at(-1)).toHaveAttribute(
      "href",
      "mailto:guilhermefortuna.dev@gmail.com",
    );
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
