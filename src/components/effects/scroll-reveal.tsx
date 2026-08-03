// Adapted from https://reactbits.dev/text-animations/scroll-reveal
"use client";

import { useMemo, useRef } from "react";

import { useSceneTimeline } from "@/components/motion/motion-runtime";
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
  const safeBaseOpacity = Math.max(0.45, Math.min(baseOpacity, 1));
  const safeBaseRotation = Math.max(-1, Math.min(baseRotation, 1));
  const safeBlurStrength = Math.max(0, Math.min(blurStrength, 1.5));

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

  useSceneTimeline(
    paragraphRef,
    ({ gsap }) => {
      const paragraph = paragraphRef.current;
      if (!paragraph) {
        return;
      }

      const wordElements = Array.from(
        paragraph.querySelectorAll<HTMLElement>(".word"),
      );
      const animateBlur = safeBlurStrength > 0;

      gsap.fromTo(
        paragraph,
        { transformOrigin: "0% 50%", rotate: safeBaseRotation },
        {
          ease: "none",
          immediateRender: false,
          rotate: 0,
          scrollTrigger: {
            trigger: paragraph,
            start: "top bottom",
            end: rotationEnd,
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        wordElements,
        {
          ...(animateBlur
            ? { filter: `blur(${safeBlurStrength}px)` }
            : undefined),
          opacity: safeBaseOpacity,
          willChange: animateBlur ? "opacity, filter" : "opacity",
        },
        {
          ease: "none",
          ...(animateBlur ? { filter: "blur(0px)" } : undefined),
          immediateRender: false,
          opacity: 1,
          stagger: 0.045,
          scrollTrigger: {
            trigger: paragraph,
            start: "top 82%",
            end: wordAnimationEnd,
            scrub: 0.45,
            invalidateOnRefresh: true,
            onLeave: () => clearWillChange(wordElements),
            onLeaveBack: () => clearWillChange(wordElements),
          },
        },
      );

      return () => clearWillChange(wordElements);
    },
    [
      rotationEnd,
      safeBaseOpacity,
      safeBaseRotation,
      safeBlurStrength,
      wordAnimationEnd,
    ],
  );

  return (
    <p ref={paragraphRef} className={cn(className)}>
      {splitText}
    </p>
  );
}
