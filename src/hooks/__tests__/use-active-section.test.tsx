import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import {
  sectionIdFromHref,
  useActiveSection,
} from "@/hooks/use-active-section";

type ObserverCallback = IntersectionObserverCallback;

function createIntersectionObserverDouble() {
  let latestCallback: ObserverCallback | null = null;

  class IntersectionObserverDouble {
    constructor(callback: ObserverCallback) {
      latestCallback = callback;
    }

    observe() {}
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
      latestCallback?.(entries, {} as IntersectionObserver);
    },
  };
}

function entry(
  id: string,
  ratio: number,
  intersecting = ratio > 0,
): IntersectionObserverEntry {
  const target = document.getElementById(id)!;
  return {
    target,
    isIntersecting: intersecting,
    intersectionRatio: ratio,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: 0,
  };
}

describe("sectionIdFromHref", () => {
  it("reads the hash target from localized and bare hrefs", () => {
    expect(sectionIdFromHref("/#work")).toBe("work");
    expect(sectionIdFromHref("/pt-BR/#about")).toBe("about");
    expect(sectionIdFromHref("/#top")).toBeNull();
    expect(sectionIdFromHref("/work/aegis")).toBeNull();
  });
});

describe("useActiveSection", () => {
  const ids = ["work", "process", "about", "contact"] as const;

  beforeEach(() => {
    for (const id of ids) {
      const section = document.createElement("section");
      section.id = id;
      document.body.appendChild(section);
    }
  });

  afterEach(() => {
    for (const id of ids) {
      document.getElementById(id)?.remove();
    }
  });

  it("returns null when no section ids exist in the document", () => {
    createIntersectionObserverDouble();
    for (const id of ids) {
      document.getElementById(id)?.remove();
    }

    const { result } = renderHook(() => useActiveSection(ids));
    expect(result.current).toBeNull();
  });

  it("selects the section with the highest intersection ratio", () => {
    const intersection = createIntersectionObserverDouble();
    const { result } = renderHook(() => useActiveSection(ids));

    act(() => {
      intersection.trigger([
        entry("work", 0.2),
        entry("process", 0.7),
        entry("about", 0),
        entry("contact", 0),
      ]);
    });

    expect(result.current).toBe("process");
  });
});
