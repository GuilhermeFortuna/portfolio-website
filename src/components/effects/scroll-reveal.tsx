// Adapted from https://reactbits.dev/text-animations/scroll-reveal
"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

import { useMotionPreference } from "@/hooks/use-motion-preference";
import { cn } from "@/lib/cn";

export type ScrollRevealProps = {
  children: string;
  className?: string;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

function subscribeToNothing(): () => void {
  return () => {};
}

function getClientMountedSnapshot(): boolean {
  return true;
}

function getServerMountedSnapshot(): boolean {
  return false;
}

function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    getClientMountedSnapshot,
    getServerMountedSnapshot,
  );
}

function clearWillChange(elements: HTMLElement[]) {
  for (const element of elements) {
    element.style.willChange = "auto";
  }
}

export function ScrollReveal({
  children,
  className,
  baseOpacity = 0.3,
  baseRotation = 2,
  blurStrength = 2,
  rotationEnd = "bottom 70%",
  wordAnimationEnd = "bottom 65%",
}: ScrollRevealProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useMotionPreference();
  const isClient = useIsClient();

  // Keep the static paragraph until the client is live so hydration does not
  // mirror the motion-allowed server snapshot and import GSAP under reduced motion.
  const useStaticFallback = !isClient || prefersReducedMotion;

  const splitText = useMemo(() => {
    return children.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) {
        return word;
      }

      return (
        <span className="word inline-block" key={`${word}-${index}`}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph || useStaticFallback) {
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const liveParagraph = paragraphRef.current;
        if (cancelled || !liveParagraph) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const wordElements = Array.from(
          liveParagraph.querySelectorAll<HTMLElement>(".word"),
        );

        const context = gsap.context(() => {
          gsap.fromTo(
            liveParagraph,
            { transformOrigin: "0% 50%", rotate: baseRotation },
            {
              ease: "none",
              rotate: 0,
              scrollTrigger: {
                trigger: liveParagraph,
                start: "top bottom",
                end: rotationEnd,
                scrub: true,
              },
            },
          );

          gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: "opacity, filter" },
            {
              ease: "none",
              opacity: 1,
              stagger: 0.05,
              scrollTrigger: {
                trigger: liveParagraph,
                start: "top bottom-=20%",
                end: wordAnimationEnd,
                scrub: true,
                onUpdate: (self) => {
                  if (self.progress === 1) {
                    clearWillChange(wordElements);
                  }
                },
              },
            },
          );

          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: "none",
              filter: "blur(0px)",
              stagger: 0.05,
              scrollTrigger: {
                trigger: liveParagraph,
                start: "top bottom-=20%",
                end: wordAnimationEnd,
                scrub: true,
              },
            },
          );
        }, liveParagraph);

        cleanup = () => {
          context.revert();
          clearWillChange(wordElements);
          if (ScrollTrigger.getAll().length === 0) {
            gsap.ticker.sleep();
          }
        };
      } catch {
        // Keep the static/split paragraph readable if the motion chunk fails.
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [
    baseOpacity,
    baseRotation,
    blurStrength,
    rotationEnd,
    useStaticFallback,
    wordAnimationEnd,
  ]);

  if (useStaticFallback) {
    return <p className={cn(className)}>{children}</p>;
  }

  return (
    <p ref={paragraphRef} className={cn(className)}>
      {splitText}
    </p>
  );
}
