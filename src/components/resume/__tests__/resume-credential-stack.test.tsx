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
    "renders every %s credential with header-strip anatomy and one article per credential",
    (locale) => {
      const resume = getResumeContent(locale);
      const { container } = renderStack(locale);
      const region = screen.getByRole("region", { name: resume.labels.education });
      const list = within(region).getByRole("list", { name: resume.labels.education });
      const items = within(list).getAllByRole("listitem");
      const articles = within(list).getAllByRole("article");

      expect(items).toHaveLength(resume.education.length);
      expect(articles).toHaveLength(resume.education.length);

      resume.education.forEach((entry, index) => {
        const item = items[index];
        const article = articles[index];
        const strip = item.querySelector("[data-resume-credential-header-strip]");

        expect(strip).toBeInTheDocument();
        expect(strip).toHaveTextContent(entry.institution);
        expect(strip).toHaveTextContent(entry.period);
        expect(within(article).getByRole("heading", { level: 3, name: entry.program })).toBeInTheDocument();

        const indexIndicator = strip?.querySelector("[data-resume-credential-index]");
        expect(indexIndicator).toHaveAttribute("aria-hidden", "true");
        expect(indexIndicator).toHaveTextContent(String(index + 1).padStart(2, "0"));

        const surface = item.querySelector("[data-resume-credential-surface]");
        expect(surface).toHaveAttribute("data-magic-card");
        expect(surface).toContainElement(article);

        const ghost = article.querySelector("[data-resume-credential-ghost]");
        expect(ghost).toHaveAttribute("aria-hidden", "true");
        expect(ghost).toHaveTextContent(String(index + 1).padStart(2, "0"));
        expect(within(article).getByRole("heading", { level: 3 })).not.toContainElement(
          ghost as HTMLElement,
        );
      });

      expect(container.querySelectorAll("img, picture, canvas")).toHaveLength(0);
      expect(container).not.toHaveTextContent(/credential status|proficiency|verified/i);
    },
  );

  it("renders identical fields in both static and enhanced modes", async () => {
    const resume = getResumeContent("en");

    // 1. Static render
    enhancementEligible = false;
    const { container: staticContainer, unmount } = renderStack("en");
    const staticArticles = staticContainer.querySelectorAll("article");
    expect(staticArticles).toHaveLength(resume.education.length);

    const staticData = Array.from(staticArticles, (art) => ({
      institution: art.querySelector("[data-resume-credential-institution]")?.textContent?.trim(),
      program: art.querySelector("[data-resume-credential-program]")?.textContent?.trim(),
      period: art.querySelector("[data-resume-credential-period]")?.textContent?.trim(),
    }));

    unmount();

    // 2. Enhanced render
    enhancementEligible = true;
    const { container: enhancedContainer } = renderStack("en");
    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    const enhancedArticles = enhancedContainer.querySelectorAll("article");
    expect(enhancedArticles).toHaveLength(resume.education.length);

    const enhancedData = Array.from(enhancedArticles, (art) => ({
      institution: art.querySelector("[data-resume-credential-institution]")?.textContent?.trim(),
      program: art.querySelector("[data-resume-credential-program]")?.textContent?.trim(),
      period: art.querySelector("[data-resume-credential-period]")?.textContent?.trim(),
    }));

    expect(enhancedData).toEqual(staticData);
    expect(staticData).toEqual(
      resume.education.map((entry) => ({
        institution: entry.institution,
        program: entry.program,
        period: entry.period,
      })),
    );
  });

  it("ensures rest-state scale is 1 in both static and enhanced modes", async () => {
    enhancementEligible = true;
    const { container } = renderStack();
    const section = container.querySelector("[data-resume-credential-stack]");

    const resume = getResumeContent("en");
    const expectedScales = resume.education.map(() => "1");

    expect(section).toHaveAttribute("data-motion-mode", "static");
    // In static mode before hydration, every card has scale 1
    expect(
      Array.from(container.querySelectorAll("[data-resume-credential-card]"), (card) =>
        card.getAttribute("data-stack-scale"),
      ),
    ).toEqual(expectedScales);

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(section).toHaveAttribute("data-motion-mode", "enhanced");
    // At rest in enhanced mode (scroll progress = 0), rest-state scale is 1
    expect(
      Array.from(container.querySelectorAll("[data-resume-credential-card]"), (card) =>
        card.getAttribute("data-stack-scale"),
      ),
    ).toEqual(expectedScales);

    expect(container.querySelector("[data-resume-credential-list]")).not.toHaveClass(
      "overflow-auto",
    );
    expect(
      Array.from(container.querySelectorAll("[data-resume-credential-surface]"), (card) =>
        card.getAttribute("data-magic-card-animated"),
      ),
    ).toEqual(resume.education.map(() => "true"));
    expect(container.querySelector("[data-magic-card-beam]")).toBeNull();
  });

  it("keeps reduced motion static even on a wide fine-pointer viewport", async () => {
    prefersReducedMotion = true;
    enhancementEligible = true;
    const { container } = renderStack();
    const resume = getResumeContent("en");
    const expectedScales = resume.education.map(() => "1");

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(container.querySelector("[data-resume-credential-stack]")).toHaveAttribute(
      "data-motion-mode",
      "reduced",
    );
    expect(
      Array.from(container.querySelectorAll("[data-resume-credential-card]"), (card) =>
        card.getAttribute("data-stack-scale"),
      ),
    ).toEqual(expectedScales);
    expect(
      Array.from(container.querySelectorAll("[data-resume-credential-surface]"), (card) =>
        card.getAttribute("data-magic-card-animated"),
      ),
    ).toEqual(resume.education.map(() => "false"));
  });
});
