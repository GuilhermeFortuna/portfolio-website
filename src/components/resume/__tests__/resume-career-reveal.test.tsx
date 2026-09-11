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

  it("pins the stable scene wrapper while the enhanced track owns horizontal progress", () => {
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
        scrollTrigger: expect.objectContaining({ pin: true }),
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

  it.each(["en", "pt-BR"] as const)(
    "renders one article per employer with the approved masthead anatomy and no duplicated location text (%s)",
    (locale) => {
      const resume = getResumeContent(locale);
      const { container } = render(
        <ResumeCareerReveal
          entries={resume.experience}
          sectionLabel={resume.labels.experience}
          sectionTitle={resume.labels.experience}
        />,
      );

      const cards = container.querySelectorAll<HTMLElement>("[data-resume-career-card]");
      expect(cards).toHaveLength(resume.experience.length);

      cards.forEach((card, index) => {
        const entry = resume.experience[index];
        const article = card.querySelector("article");
        expect(article).not.toBeNull();
        expect(article).toHaveAttribute("aria-labelledby", `resume-career-${index}-heading`);

        const heading = within(article!).getByRole("heading", { level: 3 });
        expect(heading).toHaveTextContent(entry.organization);
        expect(heading).toHaveAttribute("id", `resume-career-${index}-heading`);

        // Check progress bar inside card frame
        const progress = card.querySelector("[data-resume-career-progress]");
        expect(progress).not.toBeNull();
        expect(progress).toHaveAttribute("aria-hidden", "true");

        // Check period and role
        expect(within(article!).getByText(entry.period)).toBeInTheDocument();
        expect(within(article!).getByText(entry.role)).toBeInTheDocument();

        // Location text is not duplicated (e.g. "Remote" / "Remoto" appears once per card)
        const locationWord = locale === "en" ? "Remote" : "Remoto";
        const matches = (article!.textContent ?? "").match(new RegExp(locationWord, "g"));
        expect(matches).toHaveLength(1);

        // Every highlight is rendered exactly once with label
        const labels = article!.querySelectorAll("[data-resume-highlight-label]");
        expect(labels).toHaveLength(entry.highlights.length);
      });
    },
  );

  it("updates the active-state attribute on each card following the chapter index", () => {
    const resume = getResumeContent("en");
    const { container } = render(
      <ResumeCareerReveal
        entries={resume.experience}
        sectionLabel={resume.labels.experience}
        sectionTitle={resume.labels.experience}
      />,
    );

    const section = container.querySelector<HTMLElement>("[data-resume-career-reveal]");
    expect(section).not.toBeNull();

    const cards = container.querySelectorAll<HTMLElement>("[data-resume-career-card]");
    expect(cards).toHaveLength(2);

    // Initial state: first card active
    expect(section).toHaveAttribute("data-active-career-index", "0");
    expect(cards[0]).toHaveAttribute("data-active", "true");
    expect(cards[0]).toHaveAttribute("data-career-status", "active");
    expect(cards[1]).toHaveAttribute("data-active", "false");
    expect(cards[1]).toHaveAttribute("data-career-status", "upcoming");

    // Grab factory from useSceneTimeline
    const fakeTo = vi.fn(() => ({ kill: vi.fn() }));
    const call = (createTimeline.mock.calls as unknown as Array<[unknown, unknown]>)[0];
    const factory = call[1] as ((context: { gsap: { to: typeof fakeTo } }) => unknown);
    factory({ gsap: { to: fakeTo } });

    const timelineCall = (fakeTo.mock.calls as unknown as Array<[unknown, unknown]>)[0];
    const scrollTrigger = (timelineCall?.[1] as { scrollTrigger?: { onUpdate?: (trigger: { progress: number }) => void } })?.scrollTrigger;
    expect(scrollTrigger?.onUpdate).toBeDefined();

    // Progress 0.75 -> active index 1
    scrollTrigger!.onUpdate!({ progress: 0.75 });
    expect(section).toHaveAttribute("data-active-career-index", "1");
    expect(cards[0]).toHaveAttribute("data-active", "false");
    expect(cards[0]).toHaveAttribute("data-career-status", "completed");
    expect(cards[1]).toHaveAttribute("data-active", "true");
    expect(cards[1]).toHaveAttribute("data-career-status", "active");

    // Progress 0.1 -> active index 0 (reverse scroll)
    scrollTrigger!.onUpdate!({ progress: 0.1 });
    expect(section).toHaveAttribute("data-active-career-index", "0");
    expect(cards[0]).toHaveAttribute("data-active", "true");
    expect(cards[0]).toHaveAttribute("data-career-status", "active");
    expect(cards[1]).toHaveAttribute("data-active", "false");
    expect(cards[1]).toHaveAttribute("data-career-status", "upcoming");
  });
});
