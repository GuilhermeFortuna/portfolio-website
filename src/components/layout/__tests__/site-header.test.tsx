import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { siteContent, siteNavigation } from "@/content/site";
import { render, screen, within, act } from "@/test/render";

type ObserverCallback = IntersectionObserverCallback;

function createIntersectionObserverDouble() {
  const observers: Array<{
    callback: ObserverCallback;
    observe: (el: Element) => void;
  }> = [];

  class IntersectionObserverDouble {
    callback: ObserverCallback;

    constructor(callback: ObserverCallback) {
      this.callback = callback;
      observers.push({
        callback,
        observe: (el: Element) => {
          void el;
        },
      });
    }

    observe(el: Element) {
      void el;
    }

    unobserve() {}

    disconnect() {}

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    root = null;
    rootMargin = "";
    thresholds = [];
  }

  vi.stubGlobal("IntersectionObserver", IntersectionObserverDouble);

  return {
    trigger(entries: IntersectionObserverEntry[]) {
      for (const observer of observers) {
        observer.callback(entries, observer as unknown as IntersectionObserver);
      }
    },
  };
}

function sectionEntry(
  id: string,
  overrides: Partial<IntersectionObserverEntry> = {},
): IntersectionObserverEntry {
  const target = document.getElementById(id) ?? document.createElement("section");
  if (!target.id) {
    target.id = id;
    document.body.appendChild(target);
  }
  return {
    target,
    isIntersecting: true,
    intersectionRatio: 0.5,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: 0,
    ...overrides,
  };
}

describe("SiteHeader", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );

    for (const id of ["work", "process", "about", "contact"]) {
      const section = document.createElement("section");
      section.id = id;
      document.body.appendChild(section);
    }
  });

  afterEach(() => {
    for (const id of ["work", "process", "about", "contact"]) {
      document.getElementById(id)?.remove();
    }
  });

  it("renders a skip link to the main content landmark", () => {
    createIntersectionObserverDouble();
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: siteNavigation.skipLink }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("exposes labelled primary navigation with the approved destinations", () => {
    createIntersectionObserverDouble();
    render(<SiteHeader />);

    const desktopNav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of siteNavigation.desktop) {
      expect(
        within(desktopNav).getByRole("link", { name: item.label }),
      ).toHaveAttribute("href", item.href);
    }

    const mobileNav = screen.getByRole("navigation", {
      name: "Primary mobile",
    });
    for (const item of siteNavigation.mobile) {
      expect(
        within(mobileNav).getByRole("link", { name: item.label }),
      ).toHaveAttribute("href", item.href);
    }
  });

  it("keeps the wordmark and navigation links keyboard-reachable", async () => {
    createIntersectionObserverDouble();
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.tab();
    expect(
      screen.getByRole("link", { name: siteNavigation.skipLink }),
    ).toHaveFocus();

    await user.tab();
    const wordmark = screen.getByRole("link", { name: siteContent.wordmark });
    expect(wordmark).toHaveFocus();
    expect(wordmark).toHaveAttribute("href", siteNavigation.wordmarkHref);

    await user.tab();
    expect(document.activeElement?.tagName).toBe("A");
    expect(document.activeElement).toHaveAttribute("href");
  });

  it("starts with a solid canvas fill and gains glass chrome after scroll", () => {
    createIntersectionObserverDouble();
    render(<SiteHeader />);

    const header = document.querySelector("header");
    expect(header).toHaveAttribute("data-scrolled", "false");
    expect(header?.className).toContain("bg-[var(--color-canvas)]");

    act(() => {
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        value: 120,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(header).toHaveAttribute("data-scrolled", "true");
    expect(header?.className).toContain("backdrop-blur-md");
  });

  it("marks the intersecting section link with aria-current", () => {
    const intersection = createIntersectionObserverDouble();
    render(<SiteHeader />);

    const work = siteNavigation.desktop[0];
    const desktopNav = screen.getByRole("navigation", { name: "Primary" });
    const workLink = within(desktopNav).getByRole("link", {
      name: work.label,
    });

    expect(workLink).not.toHaveAttribute("aria-current");

    act(() => {
      intersection.trigger([sectionEntry("work", { intersectionRatio: 0.8 })]);
    });

    expect(workLink).toHaveAttribute("aria-current", "true");
  });
});
