import { motionValue } from "motion/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ResumeCareerReveal,
  ResumeExperienceScene,
} from "@/components/resume/resume-career-reveal";
import { ResumeSceneRuntime } from "@/components/resume/resume-scene-runtime";
import { getResumeContent } from "@/content/resume";
import { render, screen, within } from "@/test/render";

const createTimeline = vi.fn();
let prefersReducedMotion = false;

vi.mock("@/components/motion/motion-runtime", () => ({
  useSceneTimeline: (...args: unknown[]) => createTimeline(...args),
  useMotionRuntime: () => ({
    scrollProgress: motionValue(0),
    prefersReducedMotion,
  }),
}));

afterEach(() => {
  createTimeline.mockReset();
  prefersReducedMotion = false;
});

describe("ResumeCareerReveal", () => {
  it.each(["en", "pt-BR"] as const)(
    "renders every %s career fact once in reverse chronology",
    (locale) => {
      const resume = getResumeContent(locale);
      const { container } = render(
        <ResumeCareerReveal
          entries={resume.experience}
          sectionLabel={resume.labels.experience}
          sectionTitle={resume.labels.experience}
        />,
      );

      const section = screen.getByRole("region", { name: resume.labels.experience });
      const entries = Array.from(
        within(section)
          .getByRole("list", { name: resume.labels.experience })
          .querySelectorAll<HTMLElement>(":scope > li"),
      );

      expect(entries).toHaveLength(resume.experience.length);
      expect(entries.map((entry) => entry.textContent)).toEqual(
        expect.arrayContaining(resume.experience.map((entry) => expect.stringContaining(entry.organization))),
      );
      expect(entries[0]).toHaveTextContent(resume.experience[0].organization);
      expect(entries[1]).toHaveTextContent(resume.experience[1].organization);

      for (const entry of resume.experience) {
        const item = entries.find((candidate) => candidate.textContent?.includes(entry.organization));
        expect(item).toBeDefined();
        expect(within(item!).getByText(entry.organization)).toBeInTheDocument();
        expect(item).toHaveTextContent(entry.role);
        expect(item).toHaveTextContent(entry.period);
        expect(item).toHaveTextContent(entry.location);
        for (const highlight of entry.highlights) expect(item).toHaveTextContent(highlight);
        expect(item!.querySelectorAll("[data-resume-highlight-label]")).toHaveLength(
          entry.highlights.length,
        );
      }

      expect(container.querySelector("[data-resume-career-progress]")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(container.querySelector("[data-resume-career-viewport]")).toHaveAttribute(
        "data-career-stage",
        "single-card",
      );
      expect(container.querySelectorAll("[data-resume-career-card]")).toHaveLength(
        resume.experience.length,
      );
      expect(container.innerHTML).not.toContain("/work/aegis");
    },
  );

  it("delegates horizontal-track ownership to the scoped motion lifecycle", () => {
    const resume = getResumeContent("en");
    render(
      <ResumeCareerReveal
        entries={resume.experience}
        sectionLabel={resume.labels.experience}
        sectionTitle={resume.labels.experience}
      />,
    );

    expect(createTimeline).toHaveBeenCalledTimes(1);
    expect(createTimeline.mock.calls[0]).toEqual([
      expect.objectContaining({ current: expect.any(HTMLElement) }),
      expect.any(Function),
      [resume.experience.length],
    ]);
  });

  it("keeps the enhanced track non-pinning so breakpoint fallback swaps preserve React ownership", () => {
    const resume = getResumeContent("en");
    render(
      <ResumeCareerReveal
        entries={resume.experience}
        sectionLabel={resume.labels.experience}
        sectionTitle={resume.labels.experience}
      />,
    );

    const fakeTo = vi.fn(() => ({ kill: vi.fn() }));
    const call = (createTimeline.mock.calls as unknown as Array<[unknown, unknown]>)[0];
    const factory = call[1] as ((context: { gsap: { to: typeof fakeTo } }) => unknown);
    factory({ gsap: { to: fakeTo } });

    const timelineCall = (fakeTo.mock.calls as unknown as Array<[unknown, unknown]>)[0];
    expect(timelineCall?.[1]).toEqual(
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({ pin: false }),
      }),
    );
  });

  it("keeps the existing timeline as the reduced-motion fallback instead of rendering two chronologies", () => {
    const resume = getResumeContent("en");
    prefersReducedMotion = true;
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { container } = render(
      <ResumeSceneRuntime chapters={[{ id: "experience", label: resume.labels.experience }]}>
        <ResumeExperienceScene
          entries={resume.experience}
          sectionLabel={resume.labels.experience}
          sectionTitle={resume.labels.experience}
        />
      </ResumeSceneRuntime>,
    );

    expect(container.querySelectorAll("[data-resume-career-reveal]")).toHaveLength(0);
    expect(container.querySelectorAll('section[aria-labelledby="resume-experience-heading"]')).toHaveLength(1);
    expect(screen.getAllByRole("list", { name: resume.labels.experience })).toHaveLength(1);
  });
});
