import { act, render, screen, within } from "@/test/render";
import { motionValue } from "motion/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ResumeIdentityScene } from "@/components/resume/resume-identity-scene";
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

function renderScene() {
  const resume = getResumeContent("en");
  return render(
    <ResumeSceneRuntime chapters={[{ id: "identity", label: resume.identity.focus }]}>
      <ResumeIdentityScene
        identity={resume.identity}
        location={resume.location}
        availability={resume.availability}
        links={resume.links}
        pdf={resume.pdf}
        labels={resume.labels}
      />
    </ResumeSceneRuntime>,
  );
}

describe("ResumeIdentityScene", () => {
  beforeEach(() => {
    prefersReducedMotion = false;
    progress.set(0);
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  });

  it("keeps one semantic heading, every identity fact, and every action available", () => {
    const { container } = renderScene();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Guilherme Fortuna dos Santos" })).toBeInTheDocument();
    const content = within(container.querySelector(".resume-identity__content")!);
    expect(content.getByText("Python, TypeScript & Platform Systems")).toBeInTheDocument();
    expect(content.getByText(/5\+ years building software systems/)).toBeInTheDocument();
    expect(content.getByText(/Criciúma, Brazil/)).toBeInTheDocument();
    expect(content.getByText(/Available and actively looking/)).toBeInTheDocument();

    expect(content.getAllByRole("link")).toHaveLength(8);
    expect(content.getByRole("link", { name: "View PDF" })).toHaveAttribute(
      "href",
      "/resume/guilherme-fortuna-resume-en.pdf",
    );
    expect(content.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "download",
      "guilherme-fortuna-resume-en.pdf",
    );
  });

  it("clamps shared progress at the identity scene boundaries", () => {
    const { container } = renderScene();
    const scene = container.querySelector<HTMLElement>("[data-resume-identity]");
    expect(scene).toHaveStyle("--resume-identity-progress: 0");

    act(() => progress.set(0.09));
    expect(scene).toHaveStyle("--resume-identity-progress: 0.5");

    act(() => progress.set(0.3));
    expect(scene).toHaveStyle("--resume-identity-progress: 1");
  });

  it("uses factual data plates instead of unrelated project media", () => {
    const { container } = renderScene();

    const field = container.querySelector(".resume-identity__field");
    expect(field).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("[data-resume-identity-plate]")).toHaveLength(5);
    expect(field).toHaveTextContent("Python, TypeScript & Platform Systems");
    expect(field).toHaveTextContent("Full-stack Developer");
    expect(field).toHaveTextContent("Criciúma, Brazil");
    expect(field).toHaveTextContent("Available and actively looking");
    expect(field).toHaveTextContent("Technical Skills");
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("marks visual echoes decorative and settles without motion", () => {
    prefersReducedMotion = true;
    const { container } = renderScene();

    expect(container.querySelector("[data-resume-identity]")).toHaveAttribute(
      "data-motion-mode",
      "reduced",
    );
    expect(container.querySelector(".resume-identity__field")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("link", { name: "View PDF" })).toBeVisible();
  });
});
