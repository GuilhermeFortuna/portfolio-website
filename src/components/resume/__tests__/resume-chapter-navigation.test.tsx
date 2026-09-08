import userEvent from "@testing-library/user-event";
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
    expect(navigation).toHaveAccessibleName(
      "Identidade · Competências · Experiência · Projetos · Credenciais · Contato",
    );
  });

  it("displays active chapter in closed state and shows reading progress circle", () => {
    render(
      <ResumeChapterNavigation
        chapters={chapters}
        activeChapter="capabilities"
        progress={0.35}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: "Table of contents: Competências",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveTextContent("Competências");

    const circle = trigger.querySelector("svg");
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute("aria-hidden", "true");
  });

  it("toggles expand state on click and closes on close button", async () => {
    const user = userEvent.setup();
    render(
      <ResumeChapterNavigation
        chapters={chapters}
        activeChapter="identity"
        progress={0.1}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: "Table of contents: Identidade",
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Table of contents" })).toBeInTheDocument();

    const closeButton = screen.getByRole("button", {
      name: "Close table of contents",
    });
    await user.click(closeButton);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes menu on Escape key press", async () => {
    const user = userEvent.setup();
    render(
      <ResumeChapterNavigation
        chapters={chapters}
        activeChapter="identity"
        progress={0.1}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: "Table of contents: Identidade",
    });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps progress decorative and does not add unmanaged scroll listeners", () => {
    render(
      <ResumeChapterNavigation
        chapters={chapters}
        activeChapter="identity"
        progress={0.25}
      />,
    );

    const navigation = screen.getByRole("navigation");
    const progressSvg = navigation.querySelector(
      ".resume-dynamic-island__progress-circle",
    );
    expect(progressSvg).toBeInTheDocument();
    expect(progressSvg).toHaveAttribute("aria-hidden", "true");
    expect(navigation.querySelector("[data-scroll-handler]")).not.toBeInTheDocument();
  });
});
