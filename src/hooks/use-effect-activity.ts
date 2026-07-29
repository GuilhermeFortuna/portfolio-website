"use client";

import type { RefObject } from "react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { useMotionPreference } from "@/hooks/use-motion-preference";

function subscribeVisibility(onChange: () => void): () => void {
  document.addEventListener("visibilitychange", onChange);
  return () => {
    document.removeEventListener("visibilitychange", onChange);
  };
}

function getVisibilitySnapshot(): boolean {
  return document.visibilityState === "visible";
}

function getVisibilityServerSnapshot(): boolean {
  return false;
}

export function useEffectActivity(ref: RefObject<Element | null>): boolean {
  const prefersReducedMotion = useMotionPreference();
  const isVisible = useSyncExternalStore(
    subscribeVisibility,
    getVisibilitySnapshot,
    getVisibilityServerSnapshot,
  );
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting && isVisible && !prefersReducedMotion;
}
