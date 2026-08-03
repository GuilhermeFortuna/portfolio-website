"use client";

import type { DependencyList, ReactNode, RefObject } from "react";
import { createContext, useContext, useEffect, useMemo } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig, type MotionValue, useMotionValue } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMotionPreference } from "@/hooks/use-motion-preference";

type MotionRuntimeValue = {
  /** Normalized document progress, updated only by the root Lenis instance. */
  scrollProgress: MotionValue<number>;
  /** Mirrors the operating-system preference; never force-enables motion. */
  prefersReducedMotion: boolean;
};

const MotionRuntimeContext = createContext<MotionRuntimeValue | null>(null);

export type SceneTimelineContext = MotionRuntimeValue & {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
};

export type SceneTimelineFactory = (
  context: SceneTimelineContext,
) => void | (() => void);

/**
 * ReactLenis publishes its instance after its own effect runs. Keeping the
 * GSAP bridge beneath that provider means wheel input can never be intercepted
 * by an un-ticked Lenis instance during the first mount.
 */
function LenisScrollBridge({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const syncScroll = () => {
      scrollProgress.set(lenis.progress);
      ScrollTrigger.update();
    };
    const tick = (time: number) => lenis.raf(time * 1000);

    const unsubscribe = lenis.on("scroll", syncScroll);
    gsap.ticker.add(tick);
    syncScroll();

    return () => {
      unsubscribe();
      gsap.ticker.remove(tick);
    };
  }, [lenis, scrollProgress]);

  return null;
}

/**
 * Site-level owner for smooth document scrolling and its bridges to GSAP.
 * `autoRaf` is deliberately disabled: GSAP owns the one shared ticker callback.
 */
export function MotionRuntime({ children }: { children: ReactNode }) {
  const scrollProgress = useMotionValue(0);
  const prefersReducedMotion = useMotionPreference();
  const value = useMemo(
    () => ({ scrollProgress, prefersReducedMotion }),
    [prefersReducedMotion, scrollProgress],
  );

  return (
    <MotionRuntimeContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        <ReactLenis root autoRaf={false}>
          <LenisScrollBridge scrollProgress={scrollProgress} />
          {children}
        </ReactLenis>
      </MotionConfig>
    </MotionRuntimeContext.Provider>
  );
}

export function useMotionRuntime(): MotionRuntimeValue {
  const runtime = useContext(MotionRuntimeContext);
  if (!runtime) {
    throw new Error(
      "useMotionRuntime must be called beneath the site-level <MotionRuntime>.",
    );
  }
  return runtime;
}

/**
 * Registers a section-scoped GSAP context. The context, all ScrollTriggers it
 * creates, and an optional custom cleanup are reverted when the section leaves.
 */
export function useSceneTimeline(
  scopeRef: RefObject<Element | null>,
  createTimeline: SceneTimelineFactory,
  dependencies: DependencyList,
): void {
  const runtime = useMotionRuntime();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || runtime.prefersReducedMotion) {
      return;
    }

    let disposed = false;
    let cleanup = () => {};

    if (disposed) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const result = createTimeline({
        ...runtime,
        gsap,
        ScrollTrigger,
      });
      if (typeof result === "function") {
        cleanup = result;
      }
    }, scope);

    const previousCleanup = cleanup;
    cleanup = () => {
      previousCleanup();
      context.revert();
    };

    return () => {
      disposed = true;
      cleanup();
    };
    // Callers control timeline recreation through the explicit dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runtime, scopeRef, ...dependencies]);
}
