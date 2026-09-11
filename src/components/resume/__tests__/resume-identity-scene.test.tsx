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
    expect(screen.getByRole("heading", { level: 1, name: "Guilherme Fortuna" })).toBeInTheDocument();
    const content = within(container.querySelector(".resume-identity__content")!);
    expect(content.getByText("Python, TypeScript & Platform Systems")).toBeInTheDocument();
    expect(content.getByText(/5\+ years building software systems/)).toBeInTheDocument();
    expect(content.getByText(/Criciúma, Brazil/)).toBeInTheDocument();
    expect(content.getByText(/Available and actively looking/)).toBeInTheDocument();

    expect(content.getAllByRole("link")).toHaveLength(7);
    expect(content.getByRole("link", { name: "View PDF" })).toHaveAttribute(
      "href",
      "/resume/guilherme-fortuna-resume-en.pdf",
    );
    expect(content.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "download",
      "guilherme-fortuna-resume-en.pdf",
    );
  });

  it("anchors the contact cluster in one sourced card with a ledger of links", () => {
    const resume = getResumeContent("en");
    const { container } = renderScene();

    const card = container.querySelector("[data-resume-identity-card]");
    expect(card).toHaveAttribute("data-magic-card");
    expect(card).toHaveTextContent(resume.labels.contact);

    const ledger = within(card as HTMLElement).getByRole("list");
    const rows = within(ledger).getAllByRole("listitem");
    expect(rows).toHaveLength(resume.links.length);
    resume.links.forEach((link, index) => {
      const anchor = within(rows[index]).getByRole("link", { name: link.label });
      expect(anchor).toHaveAttribute("href", link.href);
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(rows[index].querySelector("[aria-hidden='true']")).toBeInTheDocument();
    });

    // The Email row is the contact destination; no duplicate "Contact" link.
    expect(
      within(card as HTMLElement).queryByRole("link", { name: resume.labels.contact }),
    ).toBeNull();
    expect(
      within(card as HTMLElement).getByRole("link", { name: resume.labels.viewPdf }),
    ).toHaveAttribute("data-primary", "true");
  });

  it("keeps the card static without a beam outside the enhanced mode", () => {
    const { container } = renderScene();
    const card = container.querySelector("[data-resume-identity-card]");

    expect(card).toHaveAttribute("data-magic-card-animated", "false");
    expect(card?.querySelector("[data-magic-card-beam]")).toBeNull();
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

  it("renders no decorative field, floating text, or media behind the identity", () => {
    const { container } = renderScene();

    expect(container.querySelector(".resume-identity__field")).toBeNull();
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("marks visual echoes decorative and settles without motion", () => {
    prefersReducedMotion = true;
    const { container } = renderScene();

    expect(container.querySelector("[data-resume-identity]")).toHaveAttribute(
      "data-motion-mode",
      "reduced",
    );
    expect(screen.getByRole("link", { name: "View PDF" })).toBeVisible();
  });
});
