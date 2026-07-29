// Adapted from https://reactbits.dev/text-animations/scroll-reveal
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";

import { useMotionPreference } from "@/hooks/use-motion-preference";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type ScrollRevealProps = {
  children: string;
  className?: string;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

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
    if (!paragraph || prefersReducedMotion) {
      return;
    }

    const wordElements = Array.from(
      paragraph.querySelectorAll<HTMLElement>(".word"),
    );

    const context = gsap.context(() => {
      gsap.fromTo(
        paragraph,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: paragraph,
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
            trigger: paragraph,
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
            trigger: paragraph,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      );
    }, paragraph);

    return () => {
      context.revert();
      clearWillChange(wordElements);
    };
  }, [
    baseOpacity,
    baseRotation,
    blurStrength,
    prefersReducedMotion,
    rotationEnd,
    wordAnimationEnd,
  ]);

  if (prefersReducedMotion) {
    return <p className={cn(className)}>{children}</p>;
  }

  return (
    <p ref={paragraphRef} className={cn(className)}>
      {splitText}
    </p>
  );
}
