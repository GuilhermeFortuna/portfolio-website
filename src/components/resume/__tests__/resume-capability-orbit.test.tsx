import { fireEvent, render, screen, within } from "@/test/render";
import { motionValue } from "motion/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResumeCapabilityOrbit } from "@/components/resume/resume-capability-orbit";
import { ResumeSceneRuntime } from "@/components/resume/resume-scene-runtime";
import { getResumeContent } from "@/content/resume";

const progress = motionValue(0);
let prefersReducedMotion = false;

vi.mock("@/components/motion/motion-runtime", () => ({
  useMotionRuntime: () => ({
    scrollProgress: progress,
    prefersReducedMotion,
  }),
}));

function renderOrbit() {
  const resume = getResumeContent("en");
  return render(
    <ResumeSceneRuntime chapters={[{ id: "capabilities", label: resume.labels.skills }]}>
      <ResumeCapabilityOrbit
        title={resume.labels.skills}
        centerLabel={resume.identity.role}
        groups={resume.skills}
      />
    </ResumeSceneRuntime>,
  );
}

describe("ResumeCapabilityOrbit", () => {
  beforeEach(() => {
    prefersReducedMotion = false;
    progress.set(0);
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  });

  it("renders exactly six ordered groups and every skill once", () => {
    renderOrbit();

    const groups = screen.getAllByRole("button");
    expect(groups).toHaveLength(6);
    expect(groups.map((group) => group.textContent)).toEqual([
      "Languages",
      "Frontend and UI",
      "Backend and APIs",
      "Cloud and DevOps",
      "Data and AI systems",
      "Security and quality",
    ]);

    const list = screen.getByRole("list", { name: "Technical Skills" });
    for (const skill of getResumeContent("en").skills.flatMap((group) => group.items)) {
      expect(within(list).getAllByText(skill)).toHaveLength(1);
    }
    expect(document.body.textContent).not.toContain("Planning");
    expect(document.body.textContent).not.toContain("energy");
  });

  it("uses native keyboard activation, Escape, and blur to control emphasis", () => {
    renderOrbit();
    const first = screen.getByRole("button", { name: "Languages" });
    const second = screen.getByRole("button", { name: "Frontend and UI" });

    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-pressed", "true");
    expect(first).toHaveAttribute("aria-pressed", "false");

    fireEvent.keyDown(second, { key: "Escape" });
    expect(second).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(first);
    fireEvent.blur(first, { relatedTarget: null });
    expect(first).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps the wrapping semantic fallback in reduced motion", () => {
    prefersReducedMotion = true;
    const { container } = renderOrbit();

    expect(container.querySelector("[data-resume-capability-orbit]")).toHaveAttribute(
      "data-motion-mode",
      "reduced",
    );
    expect(container.querySelector("[data-resume-capability-list]")).toHaveAttribute(
      "data-fallback",
      "true",
    );
  });
});
