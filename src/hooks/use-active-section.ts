"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy for in-page section ids. Uses a mid-viewport IntersectionObserver
 * band so one section wins. Returns null when none of the targets exist or
 * intersect (e.g. case-study routes).
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      const clear = window.setTimeout(() => setActiveId(null), 0);
      return () => window.clearTimeout(clear);
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    if (elements.length === 0) {
      const clear = window.setTimeout(() => setActiveId(null), 0);
      return () => window.clearTimeout(clear);
    }

    const ratios = new Map<string, number>();

    const pickWinner = () => {
      let bestId: string | null = null;
      let bestRatio = 0;
      for (const id of sectionIds) {
        const ratio = ratios.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      setActiveId(bestRatio > 0 ? bestId : null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        pickWinner();
      },
      {
        // Bias toward the middle of the viewport so one section owns the spy.
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}

/** Extract a hash target id from a nav href (`/#work`, `/pt-BR/#about`). */
export function sectionIdFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return null;
  }
  const id = href.slice(hashIndex + 1);
  if (!id || id === "top") {
    return null;
  }
  return id;
}
