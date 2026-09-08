import { act, render, screen, within } from "@/test/render";
import { motionValue } from "motion/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResumeConvergence } from "@/components/resume/resume-convergence";
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

function renderConvergence(locale: "en" | "pt-BR" = "en") {
  const resume = getResumeContent(locale);
  const contactHref = resume.links.find((link) => link.kind === "email")!.href;
  const workHref = locale === "en" ? "/#work" : "/pt-BR/#work";

  return render(
    <ResumeSceneRuntime chapters={[{ id: "contact", label: resume.labels.contact }]}>
      <ResumeConvergence
        languageLabel={resume.labels.languages}
        languages={resume.languages}
        labels={resume.labels}
        pdf={resume.pdf}
        contactHref={contactHref}
        workHref={workHref}
      />
    </ResumeSceneRuntime>,
  );
}

describe("ResumeConvergence", () => {
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
    "keeps both %s languages once and converges on the four existing native links",
    (locale) => {
      const resume = getResumeContent(locale);
      const { container } = renderConvergence(locale);
      const region = screen.getByRole("region", { name: resume.labels.contact });
      const languageList = within(region).getByRole("list", {
        name: resume.labels.languages,
      });

      expect(within(languageList).getAllByRole("listitem").map((item) => item.textContent)).toEqual(
        [...resume.languages],
      );

      const view = within(region).getByRole("link", { name: resume.labels.viewPdf });
      expect(view).toHaveAttribute("href", resume.pdf.href);
      expect(view).toHaveAttribute("target", "_blank");
      expect(view).toHaveAttribute("rel", "noreferrer");

      expect(
        within(region).getByRole("link", { name: resume.labels.downloadPdf }),
      ).toHaveAttribute("download", resume.pdf.downloadName);
      expect(within(region).getByRole("link", { name: resume.labels.contact })).toHaveAttribute(
        "href",
        "mailto:guilhermefortuna.dev@gmail.com",
      );
      expect(
        within(region).getByRole("link", { name: resume.labels.returnToWork }),
      ).toHaveAttribute("href", locale === "en" ? "/#work" : "/pt-BR/#work");

      expect(container).not.toHaveTextContent("Build with Aceternity UI");
      expect(container.querySelectorAll("canvas")).toHaveLength(0);
    },
  );

  it("keeps paths absent from static output and adds five decorative paths only in enhanced mode", async () => {
    enhancementEligible = true;
    const { container } = renderConvergence();
    const section = container.querySelector("[data-resume-convergence]");

    expect(section).toHaveAttribute("data-motion-mode", "static");
    expect(container.querySelector("svg")).not.toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(section).toHaveAttribute("data-motion-mode", "enhanced");
    const svg = container.querySelector("[data-resume-convergence-paths]");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg?.querySelectorAll("[data-resume-convergence-path]")).toHaveLength(5);
    expect(svg?.querySelector("[data-resume-convergence-path]")).toHaveAttribute(
      "d",
      expect.stringContaining("M0 663C145.5 663"),
    );
    expect(svg?.querySelectorAll("[data-resume-convergence-blur-path]")).toHaveLength(5);
    expect(svg?.querySelector("#resume-convergence-blur")).toBeInTheDocument();
    expect(section?.querySelector(".resume-convergence__content + [data-resume-convergence-paths]"))
      .toBeInTheDocument();
  });

  it("omits progress-linked paths under reduced motion without removing content or actions", async () => {
    prefersReducedMotion = true;
    enhancementEligible = true;
    const resume = getResumeContent("en");
    const { container } = renderConvergence();

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    });

    expect(container.querySelector("[data-resume-convergence]")).toHaveAttribute(
      "data-motion-mode",
      "reduced",
    );
    expect(container.querySelector("svg")).not.toBeInTheDocument();
    expect(screen.getByRole("list", { name: resume.labels.languages })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: resume.labels.returnToWork })).toBeInTheDocument();
  });
});
