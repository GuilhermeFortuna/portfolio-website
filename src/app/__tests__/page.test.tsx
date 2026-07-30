import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { projects } from "@/content/projects";
import { siteContent } from "@/content/site";
import { render, screen } from "@/test/render";

/*
 * Browser-incompatible visual-effect leaves are mocked locally. Each mock keeps
 * the accessible surface the real component exposes when WebGL/GSAP/particles
 * cannot run (static fallback, named link, or plain text).
 */
vi.mock("@/components/webgl/managed-webgl-effect", () => ({
  // Always render the manager fallback so Liquid Metal keeps its static accent
  // ring and decorative WebGL slots stay empty under jsdom.
  ManagedWebGLEffect: ({ fallback }: { fallback: ReactNode }) => (
    <>{fallback}</>
  ),
}));

vi.mock("@/components/effects/sparkles", () => ({
  // Decorative only; the real component's static glow is aria-hidden.
  SparklesAccent: () => null,
}));

vi.mock("@/components/effects/scroll-reveal", () => ({
  // Mirrors the reduced-motion accessible fallback: a plain paragraph.
  ScrollReveal: ({
    children,
    className,
  }: {
    children: string;
    className?: string;
  }) => <p className={className}>{children}</p>,
}));

vi.mock("@/components/ui/logo-loop", () => ({
  // Preserve the loop's accessible name without starting the rAF track.
  LogoLoop: ({ ariaLabel }: { ariaLabel?: string }) => (
    <div aria-label={ariaLabel} />
  ),
}));

function stubMatchMedia(reducedMotion: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: reducedMotion && query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

describe("homepage composition", () => {
  beforeEach(() => {
    // Prefer reduced motion so ProcessSection uses its static stage list and
    // About avoids GSAP ScrollTrigger under jsdom.
    stubMatchMedia(true);
  });

  it("keeps one h1, section order, required h2s, and four project h3s", async () => {
    const { default: Home } = await import("@/app/page");
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: siteContent.heroTitle }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    expect(
      Array.from(
        document.querySelectorAll("main section[id]"),
      ).map((section) => section.id),
    ).toEqual(["top", "work", "process", "about", "contact"]);

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((heading) =>
        heading.textContent,
      ),
    ).toEqual([
      siteContent.workTitle,
      siteContent.processTitle,
      siteContent.aboutTitle,
      siteContent.contactTitle,
    ]);

    // Desktop selectors and mobile articles both render project headings; CSS
    // hides one tree in the browser. Assert the authored set, not DOM count.
    const projectHeadingNames = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(new Set(projectHeadingNames)).toEqual(
      new Set(projects.map((project) => project.name)),
    );

    // External profile actions keep security attributes on the homepage shell.
    const linkedIn = screen.getByRole("link", { name: "LinkedIn" });
    expect(linkedIn).toHaveAttribute("target", "_blank");
    expect(linkedIn).toHaveAttribute("rel", "noreferrer");

    for (const link of screen.getAllByRole("link", { name: "GitHub" })) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    }
  });
});
