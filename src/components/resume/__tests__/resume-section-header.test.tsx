import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResumeSectionHeader } from "@/components/resume/resume-section-header";

describe("ResumeSectionHeader", () => {
  it("renders eyebrow, title, and section header wrapper with expected attributes", () => {
    render(
      <ResumeSectionHeader
        eyebrow="Technical Skills"
        title="Technical Skills"
        headingId="skills-title"
        className="custom-class"
      />,
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-resume-section-header");
    expect(header).toHaveClass("resume-section-header");
    expect(header).toHaveClass("custom-class");

    const eyebrow = header.querySelector("[data-resume-header-eyebrow]");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent("Technical Skills");
    expect(eyebrow).toHaveClass("resume-section-header__eyebrow");

    const title = header.querySelector("[data-resume-header-title]");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Technical Skills");
    expect(title).toHaveAttribute("id", "skills-title");
    expect(title).toHaveClass("resume-section-header__title");
    expect(title?.tagName).toBe("H2");
  });
});
