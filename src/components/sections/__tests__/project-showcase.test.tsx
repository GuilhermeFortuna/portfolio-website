import type { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProjectShowcase } from "@/components/sections/project-showcase";
import { projects } from "@/content/projects";
import { fireEvent, render, screen, within } from "@/test/render";

/*
 * Visual-effect leaves are mocked so this file proves selection/fallback
 * decisions without WebGL, OGL, or animation-frame work.
 */
vi.mock("@/components/webgl/managed-webgl-effect", () => ({
  ManagedWebGLEffect: ({
    children,
    fallback,
  }: {
    children: (state: { shouldAnimate: boolean }) => ReactNode;
    fallback: ReactNode;
  }) => <>{children ? children({ shouldAnimate: false }) : fallback}</>,
}));

vi.mock("@/components/effects/shape-blur", () => ({
  ShapeBlur: ({ color }: { color: string }) => (
    <output data-testid="shape-blur-color">{color}</output>
  ),
}));

type MediaOptions = {
  /** `(max-width: 767px)` — documents intended mobile vs desktop mode. */
  mobile?: boolean;
  /** `(pointer: fine)` — controls hover-driven selection. */
  finePointer?: boolean;
};

function stubMatchMedia({
  mobile = false,
  finePointer = true,
}: MediaOptions = {}) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => {
      let matches = false;
      if (query.includes("max-width: 767px")) {
        matches = mobile;
      } else if (query.includes("min-width: 1024px") || query.includes("1024px")) {
        matches = !mobile;
      } else if (query.includes("pointer: fine")) {
        matches = finePointer;
      }

      return {
        matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  );
}

function getDiagramRoot(): HTMLElement {
  const slot = document.querySelector("[data-shape-blur-slot]");
  expect(slot).not.toBeNull();
  const diagram = slot!.nextElementSibling;
  expect(diagram).toBeInstanceOf(HTMLElement);
  return diagram as HTMLElement;
}

function expectDiagramFor(slug: (typeof projects)[number]["slug"]) {
  const diagram = getDiagramRoot();

  switch (slug) {
    case "aegis":
      expect(diagram.querySelectorAll("span")).toHaveLength(35);
      expect(diagram.textContent ?? "").not.toMatch(/UPLOAD/);
      break;
    case "q":
      expect(diagram.querySelector(".left-\\[64\\%\\]")).not.toBeNull();
      expect(diagram.textContent ?? "").not.toMatch(/UPLOAD/);
      break;
    case "gosigapp":
      expect(within(diagram).getByText("UPLOAD")).toBeTruthy();
      expect(within(diagram).getByText("VALIDATE")).toBeTruthy();
      expect(within(diagram).getByText("SUBMIT")).toBeTruthy();
      break;
    case "nexo-dental":
      expect(diagram.querySelectorAll(".grid > span")).toHaveLength(12);
      expect(diagram.textContent ?? "").not.toMatch(/UPLOAD/);
      break;
    default: {
      const _exhaustive: never = slug;
      throw new Error(`Unhandled project slug: ${_exhaustive}`);
    }
  }
}

describe("ProjectShowcase", () => {
  beforeEach(() => {
    stubMatchMedia({ mobile: false, finePointer: true });
  });

  it("selects a project by click and updates label, summary, and diagram together", async () => {
    const user = userEvent.setup();
    render(<ProjectShowcase projects={projects} />);

    const first = projects[0];
    const second = projects[1];

    expect(
      screen.getByRole("button", { name: new RegExp(first.name) }),
    ).toHaveAttribute("aria-pressed", "true");
    expectDiagramFor(first.slug);

    const nextButton = screen.getByRole("button", {
      name: new RegExp(`${second.name}.*${second.summary}`, "s"),
    });
    await user.click(nextButton);

    expect(nextButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: new RegExp(first.name) }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(nextButton).toHaveTextContent(second.summary);
    expectDiagramFor(second.slug);
  });

  it("selects a project by keyboard focus without requiring hover", async () => {
    const user = userEvent.setup();
    // Coarse pointer: hover must not drive selection.
    stubMatchMedia({ mobile: false, finePointer: false });
    render(<ProjectShowcase projects={projects} />);

    const first = projects[0];
    const third = projects[2];
    const firstButton = screen.getByRole("button", {
      name: new RegExp(first.name),
    });
    const thirdButton = screen.getByRole("button", {
      name: new RegExp(`${third.name}.*${third.summary}`, "s"),
    });

    await user.hover(thirdButton);
    expect(firstButton).toHaveAttribute("aria-pressed", "true");
    expectDiagramFor(first.slug);

    fireEvent.focus(thirdButton);
    expect(thirdButton).toHaveAttribute("aria-pressed", "true");
    expect(firstButton).toHaveAttribute("aria-pressed", "false");
    expect(thirdButton).toHaveTextContent(third.category);
    expect(thirdButton).toHaveTextContent(third.summary);
    expectDiagramFor(third.slug);
  });

  it("updates the visual-effect decision and diagram for every remaining project", async () => {
    const user = userEvent.setup();
    render(<ProjectShowcase projects={projects} />);

    for (const project of projects.slice(1)) {
      await user.click(
        screen.getByRole("button", {
          name: new RegExp(`${project.name}.*${project.summary}`, "s"),
        }),
      );

      expectDiagramFor(project.slug);
    }

    expect(screen.getByTestId("shape-blur-color")).toHaveTextContent("#8EA0FF");
  });

  it("offers the case-study link only for the active project that has a route", async () => {
    const user = userEvent.setup();
    render(<ProjectShowcase projects={projects} />);

    const [aegis, q] = projects;
    expect(aegis.href).toBe("/work/aegis");

    // Aegis starts active, so its link is visible in both trees.
    const links = screen.getAllByRole("link", {
      name: `View ${aegis.name} case study`,
    });
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", aegis.href as string);
      // A link may never be nested inside the selector button.
      expect(link.closest("button")).toBeNull();
    }

    await user.click(
      screen.getByRole("button", {
        name: new RegExp(`${q.name}.*${q.summary}`, "s"),
      }),
    );

    // Selecting Q hides the desktop link; only the mobile article keeps one.
    expect(
      screen.getAllByRole("link", {
        name: `View ${aegis.name} case study`,
      }),
    ).toHaveLength(1);
  });

  it("renders no link, disabled control, or placeholder for a project without a route", () => {
    render(<ProjectShowcase projects={projects} />);

    for (const project of projects.filter(({ href }) => href === null)) {
      expect(
        screen.queryByRole("link", {
          name: new RegExp(project.name),
        }),
      ).toBeNull();
    }

    // Exactly one selector button per project, and no extra pending control.
    expect(screen.getAllByRole("button")).toHaveLength(projects.length);
    expect(document.querySelector("[aria-disabled]")).toBeNull();
    expect(document.body.textContent).not.toContain("[REQUIRED:");
  });

  it("reserves the link slot whether or not the linked project is active", async () => {
    const user = userEvent.setup();
    render(<ProjectShowcase projects={projects} />);

    // The slot survives deselection so rows below it never shift when the
    // pointer crosses the column.
    const aegisRow = () =>
      screen
        .getByRole("button", { name: new RegExp(projects[0].name) })
        .parentElement as HTMLElement;

    expect(aegisRow().children).toHaveLength(2);

    await user.click(
      screen.getByRole("button", {
        name: new RegExp(`${projects[1].name}.*${projects[1].summary}`, "s"),
      }),
    );

    const row = aegisRow();
    expect(row.children).toHaveLength(2);
    expect(row.querySelector("a")).toBeNull();
  });

  it("exposes all four projects in source order for the mobile presentation", () => {
    // Explicit mobile mode via matchMedia — do not infer from layout metrics.
    stubMatchMedia({ mobile: true, finePointer: false });
    expect(window.matchMedia("(max-width: 767px)").matches).toBe(true);

    render(<ProjectShowcase projects={projects} />);

    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(projects.length);

    articles.forEach((article, index) => {
      const project = projects[index];
      expect(
        within(article).getByRole("heading", { level: 3 }),
      ).toHaveTextContent(project.name);
      expect(article).toHaveTextContent(project.summary);
      expect(article).toHaveTextContent(project.category);
      expect(article).toHaveTextContent(project.index);
    });
  });
});
