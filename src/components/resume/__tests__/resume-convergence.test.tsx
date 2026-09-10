import { act, render, screen, within } from "@/test/render";
import { motionValue } from "motion/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  parseLanguage,
  PATH_RANGES,
  ResumeConvergence,
} from "@/components/resume/resume-convergence";
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

function renderConvergence(locale: "en" | "pt-BR" = "en", customLanguages?: readonly string[]) {
  const resume = getResumeContent(locale);
  const contactHref = resume.links.find((link) => link.kind === "email")!.href;
  const workHref = locale === "en" ? "/#work" : "/pt-BR/#work";

  return render(
    <ResumeSceneRuntime chapters={[{ id: "contact", label: resume.labels.contact }]}>
      <ResumeConvergence
        languageLabel={resume.labels.languages}
        languages={customLanguages ?? resume.languages}
        labels={resume.labels}
        pdf={resume.pdf}
        contactHref={contactHref}
        workHref={workHref}
      />
    </ResumeSceneRuntime>,
  );
}

describe("parseLanguage", () => {
  it("parses the exact English resume language strings", () => {
    const toefl = parseLanguage(
      "English: Bilingual / Full Professional Proficiency (TOEFL iBT 105)",
    );
    expect(toefl).toEqual({
      name: "English",
      level: "Bilingual / Full Professional Proficiency",
      credential: "TOEFL iBT 105",
      raw: "English: Bilingual / Full Professional Proficiency (TOEFL iBT 105)",
    });

    const native = parseLanguage("Portuguese: Native");
    expect(native).toEqual({
      name: "Portuguese",
      level: "Native",
      credential: undefined,
      raw: "Portuguese: Native",
    });
  });

  it("parses the exact Portuguese resume language strings", () => {
    const toeflPt = parseLanguage(
      "Inglês: Bilíngue / Plena proficiência profissional (TOEFL iBT 105)",
    );
    expect(toeflPt).toEqual({
      name: "Inglês",
      level: "Bilíngue / Plena proficiência profissional",
      credential: "TOEFL iBT 105",
      raw: "Inglês: Bilíngue / Plena proficiência profissional (TOEFL iBT 105)",
    });

    const nativePt = parseLanguage("Português: Nativo");
    expect(nativePt).toEqual({
      name: "Português",
      level: "Nativo",
      credential: undefined,
      raw: "Português: Nativo",
    });
  });

  it("handles unparseable or edge-case strings by preserving raw content with undefined level", () => {
    expect(parseLanguage("Spanish")).toEqual({
      name: "Spanish",
      raw: "Spanish",
      level: undefined,
      credential: undefined,
    });

    expect(parseLanguage("")).toEqual({
      name: "",
      raw: "",
      level: undefined,
      credential: undefined,
    });

    expect(parseLanguage(": Fluent")).toEqual({
      name: ": Fluent",
      raw: ": Fluent",
      level: undefined,
      credential: undefined,
    });

    expect(parseLanguage("English:")).toEqual({
      name: "English:",
      raw: "English:",
      level: undefined,
      credential: undefined,
    });

    // String with parentheses not at the end
    expect(parseLanguage("English: Bilingual (TOEFL 100) and Native")).toEqual({
      name: "English",
      level: "Bilingual (TOEFL 100) and Native",
      credential: undefined,
      raw: "English: Bilingual (TOEFL 100) and Native",
    });

    // Empty parentheses
    expect(parseLanguage("English: Fluent ()")).toEqual({
      name: "English",
      level: "Fluent ()",
      credential: undefined,
      raw: "English: Fluent ()",
    });
  });
});

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

  it("renders name, level, and credential as distinct structured elements in English", () => {
    const resume = getResumeContent("en");
    renderConvergence("en");

    const languageList = screen.getByRole("list", { name: resume.labels.languages });
    const items = within(languageList).getAllByRole("listitem");
    expect(items).toHaveLength(2);

    // First language: English with credential
    const englishName = within(items[0]).getByText("English");
    expect(englishName).toHaveClass("resume-convergence__languages-name");

    const englishLevel = within(items[0]).getByText("Bilingual / Full Professional Proficiency");
    expect(englishLevel).toHaveClass("resume-convergence__languages-level");

    const credentialBadge = within(items[0]).getByText("TOEFL iBT 105");
    expect(credentialBadge).toHaveClass("resume-convergence__languages-badge");

    // Second language: Portuguese without credential
    const portugueseName = within(items[1]).getByText("Portuguese");
    expect(portugueseName).toHaveClass("resume-convergence__languages-name");

    const portugueseLevel = within(items[1]).getByText("Native");
    expect(portugueseLevel).toHaveClass("resume-convergence__languages-level");

    expect(within(items[1]).queryByText(/TOEFL/i)).not.toBeInTheDocument();
    expect(items[1].querySelector(".resume-convergence__languages-badge")).toBeNull();
  });

  it("renders name, level, and credential as distinct structured elements in Portuguese", () => {
    const resume = getResumeContent("pt-BR");
    renderConvergence("pt-BR");

    const languageList = screen.getByRole("list", { name: resume.labels.languages });
    const items = within(languageList).getAllByRole("listitem");
    expect(items).toHaveLength(2);

    // First language: Inglês with credential
    const englishName = within(items[0]).getByText("Inglês");
    expect(englishName).toHaveClass("resume-convergence__languages-name");

    const englishLevel = within(items[0]).getByText("Bilíngue / Plena proficiência profissional");
    expect(englishLevel).toHaveClass("resume-convergence__languages-level");

    const credentialBadge = within(items[0]).getByText("TOEFL iBT 105");
    expect(credentialBadge).toHaveClass("resume-convergence__languages-badge");

    // Second language: Português without credential
    const portugueseName = within(items[1]).getByText("Português");
    expect(portugueseName).toHaveClass("resume-convergence__languages-name");

    const portugueseLevel = within(items[1]).getByText("Nativo");
    expect(portugueseLevel).toHaveClass("resume-convergence__languages-level");

    expect(within(items[1]).queryByText(/TOEFL/i)).not.toBeInTheDocument();
    expect(items[1].querySelector(".resume-convergence__languages-badge")).toBeNull();
  });

  it("renders unparseable language strings unchanged in fallback element", () => {
    const custom = [
      "Unparseable Language Without Separator",
      "French: Professional Working",
    ];
    renderConvergence("en", custom);

    const items = screen.getAllByRole("listitem");
    const unparseableItem = items.find((item) =>
      item.textContent?.includes("Unparseable Language Without Separator"),
    )!;
    expect(unparseableItem).toBeInTheDocument();

    const fallbackEl = within(unparseableItem).getByText("Unparseable Language Without Separator");
    expect(fallbackEl).toHaveClass("resume-convergence__languages-fallback");
    expect(unparseableItem.querySelector(".resume-convergence__languages-row")).toBeNull();

    const parsedItem = items.find((item) => item.textContent?.includes("French"))!;
    expect(within(parsedItem).getByText("French")).toHaveClass(
      "resume-convergence__languages-name",
    );
    expect(within(parsedItem).getByText("Professional Working")).toHaveClass(
      "resume-convergence__languages-level",
    );
  });

  it("does not render any invented proficiency measures", () => {
    const { container } = renderConvergence("en");

    expect(container.querySelectorAll("progress, meter")).toHaveLength(0);
    expect(container.querySelectorAll("[role='progressbar']")).toHaveLength(0);
    expect(container.querySelectorAll(".flag, [data-flag]")).toHaveLength(0);
    expect(container.textContent).not.toMatch(/\b(A1|A2|B1|B2|C1|C2)\b/);
    expect(container.textContent).not.toMatch(/\bILR\b/);
    expect(container.textContent).not.toMatch(/\d+%/);
  });

  it("exports PATH_RANGES completing all five strokes together at 0.8 while in view", () => {
    expect(PATH_RANGES).toHaveLength(5);
    // Staggered start points from reference
    expect(PATH_RANGES[0][0]).toBe(0.2);
    expect(PATH_RANGES[1][0]).toBe(0.15);
    expect(PATH_RANGES[2][0]).toBe(0.1);
    expect(PATH_RANGES[3][0]).toBe(0.05);
    expect(PATH_RANGES[4][0]).toBe(0);

    // All strokes complete together at 0.8 in view
    for (const [, end] of PATH_RANGES) {
      expect(end).toBe(0.8);
    }
  });

  it.each(["en", "pt-BR"] as const)(
    "structures closing actions with one primary control and secondary controls from CTA vocabulary for %s",
    (locale) => {
      const resume = getResumeContent(locale);
      renderConvergence(locale);

      const region = screen.getByRole("region", { name: resume.labels.contact });
      const actions = within(region).getAllByRole("link");

      // Exactly four action links
      expect(actions).toHaveLength(4);

      // All links have the resume-convergence__action class
      for (const action of actions) {
        expect(action).toHaveClass("resume-convergence__action");
      }

      // Exactly one primary action: View PDF
      const primaryAction = within(region).getByRole("link", { name: resume.labels.viewPdf });
      expect(primaryAction).toHaveClass("resume-convergence__action--primary");
      expect(primaryAction).toHaveAttribute("data-primary", "true");

      // Secondary controls do not have the primary modifier
      const downloadAction = within(region).getByRole("link", { name: resume.labels.downloadPdf });
      expect(downloadAction).not.toHaveClass("resume-convergence__action--primary");
      expect(downloadAction).not.toHaveAttribute("data-primary");

      const contactAction = within(region).getByRole("link", { name: resume.labels.contact });
      expect(contactAction).not.toHaveClass("resume-convergence__action--primary");

      const workAction = within(region).getByRole("link", { name: resume.labels.returnToWork });
      expect(workAction).not.toHaveClass("resume-convergence__action--primary");
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
    const sharpPaths = svg?.querySelectorAll("[data-resume-convergence-path]");
    expect(sharpPaths).toHaveLength(5);
    expect(sharpPaths?.[0]).toHaveAttribute(
      "d",
      expect.stringContaining("M0 663C145.5 663"),
    );

    const blurPaths = svg?.querySelectorAll("[data-resume-convergence-blur-path]");
    expect(blurPaths).toHaveLength(5);
    expect(svg?.querySelector("#resume-convergence-blur")).toBeInTheDocument();

    // Check data-path-index on each sharp and blur path
    for (let i = 0; i < 5; i++) {
      const sharp = svg?.querySelector(`[data-resume-convergence-path][data-path-index="${i}"]`);
      const blur = svg?.querySelector(`[data-resume-convergence-blur-path][data-path-index="${i}"]`);
      expect(sharp).toBeInTheDocument();
      expect(blur).toBeInTheDocument();
      expect(blur).toHaveAttribute("filter", "url(#resume-convergence-blur)");
    }

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
