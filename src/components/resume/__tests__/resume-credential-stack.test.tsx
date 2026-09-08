import { act, render, screen, within } from "@/test/render";
import { motionValue } from "motion/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResumeCredentialStack } from "@/components/resume/resume-credential-stack";
import { ResumeSceneRuntime } from "@/components/resume/resume-scene-runtime";
import { getResumeContent } from "@/content/resume";

const progress = motionValue(0);
let prefersReducedMotion = false;
let enhancementEligible = false;

vi.mock("@/components/motion/motion-runtime", () => ({
  useMotionRuntime: () => ({
    scrollProgress: progress,
    prefersReducedMotion,
  }),
}));

function renderStack(locale: "en" | "pt-BR" = "en") {
  const resume = getResumeContent(locale);
  return render(
    <ResumeSceneRuntime chapters={[{ id: "credentials", label: resume.labels.education }]}>
      <ResumeCredentialStack
        entries={resume.education}
        sectionLabel={resume.labels.education}
      />
    </ResumeSceneRuntime>,
  );
}

describe("ResumeCredentialStack", () => {
  beforeEach(() => {
    prefersReducedMotion = false;
    enhancementEligible = false;
    progress.set(0);
    vi.stubGlobal("matchMedia", () => ({
      matches: enhancementEligible,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it.each(["en", "pt-BR"] as const)(
    "renders every %s credential once in source order without invented media or claims",
    (locale) => {
      const resume = getResumeContent(locale);
      const { container } = renderStack(locale);
      const region = screen.getByRole("region", { name: resume.labels.education });
      const list = within(region).getByRole("list", { name: resume.labels.education });
      const items = within(list).getAllByRole("listitem");

      expect(items).toHaveLength(3);
      expect(items.map((item) => item.textContent)).toEqual(
        resume.education.map(
          (entry) => `${entry.institution}${entry.program}${entry.period}`,
        ),
      );
      expect(container.querySelectorAll("img, picture, canvas")).toHaveLength(0);
      expect(container).not.toHaveTextContent(/credential status|proficiency|verified/i);
    },
  );

  it("starts as a spaced static list and exposes the approved stack geometry only after eligibility is known", async () => {
    enhancementEligible = true;
    const { container } = renderStack();
    const section = container.querySelector("[data-resume-credential-stack]");

    expect(section).toHaveAttribute("data-motion-mode", "static");

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(section).toHaveAttribute("data-motion-mode", "enhanced");
    expect(
      Array.from(container.querySelectorAll("[data-resume-credential-card]"), (card) =>
        card.getAttribute("data-stack-scale"),
      ),
    ).toEqual(["0.93", "0.965", "1"]);
    expect(container.querySelector("[data-resume-credential-list]")).not.toHaveClass(
      "overflow-auto",
    );
  });

  it("keeps reduced motion static even on a wide fine-pointer viewport", async () => {
    prefersReducedMotion = true;
    enhancementEligible = true;
    const { container } = renderStack();

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(container.querySelector("[data-resume-credential-stack]")).toHaveAttribute(
      "data-motion-mode",
      "reduced",
    );
  });
});
