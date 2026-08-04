"use client";

import { useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";

/** True once document scroll exceeds `thresholdPx` (Lenis or native). */
export function useScrolledPast(thresholdPx = 72): boolean {
  const [scrolled, setScrolled] = useState(false);

  const sync = useCallback(
    (scrollY: number) => {
      setScrolled(scrollY > thresholdPx);
    },
    [thresholdPx],
  );

  useLenis((lenis) => {
    sync(lenis.scroll);
  });

  useEffect(() => {
    const onScroll = () => {
      sync(window.scrollY || document.documentElement.scrollTop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [sync]);

  return scrolled;
}
