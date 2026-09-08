import { render, screen, within } from "@/test/render";
import { describe, expect, it } from "vitest";

import { ResumeChapterNavigation } from "@/components/resume/resume-chapter-navigation";
import type { ResumeChapter } from "@/components/resume/resume-scene-runtime";

const chapters: readonly ResumeChapter[] = [
  { id: "identity", label: "Identidade" },
  { id: "capabilities", label: "Competências" },
  { id: "experience", label: "Experiência" },
  { id: "projects", label: "Projetos" },
  { id: "credentials", label: "Credenciais" },
  { id: "contact", label: "Contato" },
];

describe("ResumeChapterNavigation", () => {
  it("renders one localized native anchor for every chapter and one current destination", () => {
    render(
      <ResumeChapterNavigation
        chapters={chapters}
        activeChapter="experience"
        progress={0.5}
      />,
    );

    const navigation = screen.getByRole("navigation");
    const links = within(navigation).getAllByRole("link");

    expect(links).toHaveLength(chapters.length);
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      chapters.map((chapter) => `#resume-chapter-${chapter.id}`),
    );
    expect(within(navigation).getByRole("link", { name: "Experiência" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(links.filter((link) => link.hasAttribute("aria-current"))).toHaveLength(1);
    expect(navigation).toHaveAccessibleName("Identidade · Competências · Experiência · Projetos · Credenciais · Contato");
  });

  it("keeps progress decorative and does not add focus or scroll ownership", () => {
    render(
      <ResumeChapterNavigation chapters={chapters} activeChapter="identity" progress={0.25} />,
    );

    const navigation = screen.getByRole("navigation");
    const progress = navigation.querySelector('[aria-hidden="true"]');
    expect(progress).toBeInTheDocument();
    expect(progress).not.toHaveAttribute("tabindex");
    expect(navigation.querySelector("button")).not.toBeInTheDocument();
    expect(navigation.querySelector("[data-scroll-handler]")).not.toBeInTheDocument();
  });
});
