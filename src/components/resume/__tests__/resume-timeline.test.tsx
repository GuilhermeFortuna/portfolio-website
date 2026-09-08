import { describe, expect, it } from "vitest";

import { ResumeTimeline } from "@/components/resume/resume-timeline";
import type { ResumeExperience } from "@/types/resume";
import { render, screen, within } from "@/test/render";

const entries: readonly ResumeExperience[] = [
  {
    organization: "First Systems",
    role: "Platform Engineer",
    period: "2025 – Present · Remote",
    location: "Remote",
    highlights: ["Built dependable platform services.", "Improved operational visibility."],
  },
  {
    organization: "Second Systems",
    role: "Software Developer",
    period: "2023 – 2025 · Remote",
    location: "Remote",
    highlights: ["Built data pipelines."],
  },
];

describe("ResumeTimeline", () => {
  it("renders experience in one semantic ordered list without duplicating content", () => {
    render(
      <ResumeTimeline
        entries={entries}
        sectionLabel="Experience"
        sectionTitle="Work Experience"
      />,
    );

    const section = screen.getByRole("region", { name: "Work Experience" });
    const list = within(section).getByRole("list", { name: "Experience" });
    const items = Array.from(list.querySelectorAll<HTMLElement>(":scope > li"));

    expect(list.tagName).toBe("OL");
    expect(items).toHaveLength(entries.length);
    expect(within(items[0]).getByText(entries[0].period)).toBeInTheDocument();
    expect(within(items[0]).getByText(entries[0].organization)).toBeInTheDocument();
    expect(
      within(items[0]).getByText(`${entries[0].role} · ${entries[0].location}`),
    ).toBeInTheDocument();
    expect(within(items[0]).getByText(entries[0].highlights[0])).toBeInTheDocument();
    expect(within(items[1]).getByText(entries[1].organization)).toBeInTheDocument();
    expect(screen.getAllByText(entries[0].organization)).toHaveLength(1);
    expect(screen.getAllByText(entries[0].highlights[0])).toHaveLength(1);
  });

  it("keeps the chronology beam decorative and renders an empty semantic section", () => {
    const { rerender } = render(
      <ResumeTimeline entries={[]} sectionLabel="Experience" sectionTitle="Work Experience" />,
    );

    const section = screen.getByRole("region", { name: "Work Experience" });
    expect(within(section).getByRole("list")).toHaveAttribute("aria-label", "Experience");
    expect(within(section).getByRole("list")).toBeEmptyDOMElement();

    const beam = section.querySelector('[aria-hidden="true"]');
    expect(beam).toBeInTheDocument();
    expect(beam).not.toHaveAttribute("role");

    rerender(
      <ResumeTimeline
        entries={entries}
        sectionLabel="Experience"
        sectionTitle="Work Experience"
      />,
    );
    expect(
      within(screen.getByRole("region", { name: "Work Experience" })).getByRole("list", {
        name: "Experience",
      }),
    ).toBeInTheDocument();
  });
});
