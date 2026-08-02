import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode, SVGProps } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  CaseStudyChapterInstrument,
  type CaseStudyChapter,
} from "../case-study-chapter-instrument";

function stripMotionProps(props: Record<string, unknown>) {
  const rest = { ...props };
  delete rest.initial;
  delete rest.animate;
  delete rest.exit;
  delete rest.transition;
  delete rest.layout;
  return rest;
}

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => <div {...stripMotionProps(props)}>{children}</div>,
    span: ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => <span {...stripMotionProps(props)}>{children}</span>,
    circle: (props: { [key: string]: unknown }) => (
      <circle {...(stripMotionProps(props) as SVGProps<SVGCircleElement>)} />
    ),
  },
}));

const CHAPTERS: readonly CaseStudyChapter[] = [
  { id: "top", label: "Aegis", href: "#top" },
  { id: "context", label: "The context", href: "#context" },
  { id: "problem", label: "The problem", href: "#problem" },
  {
    id: "system",
    label: "How the system fits together",
    href: "#system",
  },
  {
    id: "decision-1",
    label: "Decision 1 — Keep Aegis a standalone product",
    href: "#decision-1",
  },
  {
    id: "decision-2",
    label: "Decision 2 — Read from a curated store, not the lakehouse",
    href: "#decision-2",
  },
  {
    id: "decision-3",
    label: "Decision 3 — Build for investigation, not for monitoring",
    href: "#decision-3",
  },
  {
    id: "decision-4",
    label: "Decision 4 — Give the product its own identity",
    href: "#decision-4",
  },
  { id: "contribution", label: "What I did", href: "#contribution" },
  { id: "delivered", label: "Delivered", href: "#delivered" },
  { id: "technology", label: "Technology, in context", href: "#technology" },
  {
    id: "confidentiality",
    label: "A note on confidentiality",
    href: "#confidentiality",
  },
];

describe("CaseStudyChapterInstrument", () => {
  it("always exposes a semantic nav with real hash destinations", () => {
    render(
      <CaseStudyChapterInstrument
        chapters={CHAPTERS}
        activeId="problem"
        localProgress={0.4}
        entranceComplete={false}
      />,
    );

    const nav = screen.getByRole("navigation", {
      name: "Case study chapters",
    });
    expect(nav).toHaveAttribute("data-enhanced", "false");
    expect(nav).toHaveAttribute("data-entrance", "pending");

    const links = Array.from(
      nav.querySelectorAll<HTMLAnchorElement>("[data-chapter-static] a"),
    );
    expect(links).toHaveLength(12);
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      CHAPTERS.map((chapter) => chapter.href),
    );
    expect(links[2]).toHaveAttribute("aria-current", "location");
  });

  it("shows the active chapter label and local progress when enhanced", () => {
    render(
      <CaseStudyChapterInstrument
        chapters={CHAPTERS}
        activeId="context"
        localProgress={0.55}
        entranceComplete
      />,
    );

    const nav = screen.getByRole("navigation", {
      name: "Case study chapters",
    });
    expect(nav).toHaveAttribute("data-enhanced", "true");
    expect(nav).toHaveAttribute("data-entrance", "complete");

    const opener = screen.getByRole("button", {
      name: /Chapter 02 of 12/i,
    });
    expect(opener).toBeInTheDocument();
    expect(within(opener).getByText("The context")).toBeInTheDocument();
    expect(within(opener).getByText("02")).toBeInTheDocument();
  });

  it("expands to list all twelve destinations and returns focus on Escape", async () => {
    const user = userEvent.setup();
    render(
      <CaseStudyChapterInstrument
        chapters={CHAPTERS}
        activeId="top"
        localProgress={0.1}
        entranceComplete
      />,
    );

    const opener = screen.getByRole("button", {
      name: /Open chapter list/i,
    });
    await user.click(opener);

    const nav = screen.getByRole("navigation", {
      name: "Case study chapters",
    });
    expect(nav).toHaveAttribute("data-expanded", "true");

    const expandedLinks = Array.from(
      nav.querySelectorAll<HTMLAnchorElement>("[data-chapter-island] ol a"),
    );
    expect(expandedLinks).toHaveLength(12);
    expect(expandedLinks.map((link) => link.getAttribute("href"))).toEqual(
      CHAPTERS.map((chapter) => chapter.href),
    );

    await user.keyboard("{Escape}");
    expect(nav).toHaveAttribute("data-expanded", "false");
    expect(opener).toHaveFocus();
  });

  it("closes on outside activation and restores opener focus", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button type="button">Outside</button>
        <CaseStudyChapterInstrument
          chapters={CHAPTERS}
          activeId="delivered"
          localProgress={0.9}
          entranceComplete
        />
      </div>,
    );

    const opener = screen.getByRole("button", {
      name: /Open chapter list/i,
    });
    await user.click(opener);
    expect(
      screen.getByRole("navigation", { name: "Case study chapters" }),
    ).toHaveAttribute("data-expanded", "true");

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(
      screen.getByRole("navigation", { name: "Case study chapters" }),
    ).toHaveAttribute("data-expanded", "false");
    expect(opener).toHaveFocus();
  });

  it("does not ship forbidden scroll ownership APIs", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const source = await fs.readFile(
      path.join(
        process.cwd(),
        "src/components/case-study/experience/case-study-chapter-instrument.tsx",
      ),
      "utf8",
    );

    expect(source).not.toMatch(/useScroll\(/);
    expect(source).not.toMatch(/new Lenis/);
    expect(source).not.toMatch(/IntersectionObserver/);
    expect(source).not.toMatch(/requestAnimationFrame/);
    expect(source).not.toMatch(/prefers-reduced-motion/);
  });
});
