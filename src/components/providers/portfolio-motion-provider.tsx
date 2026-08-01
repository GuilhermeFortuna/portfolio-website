"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { useEffect, useMemo, type ReactNode } from "react";

import {
  createPortfolioMotionStore,
  PortfolioMotionContext,
} from "@/components/providers/portfolio-motion-context";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = {
  autoRaf: false,
  anchors: true,
  duration: 1.05,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,
  infinite: false,
  overscroll: true,
} as const;

type PortfolioMotionProviderProps = {
  children: ReactNode;
};

/**
 * Wires the single root Lenis instance into the GSAP ticker and ScrollTrigger.
 * Lives under ReactLenis so it can read the instance without constructing one.
 */
function LenisGsapBridge({ store }: { store: ReturnType<typeof createPortfolioMotionStore> }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    store.setLenis(lenis);
    store.writeSnapshotFromLenis(lenis);

    const onScroll = () => {
      store.writeSnapshotFromLenis(lenis);
      ScrollTrigger.update();
    };
    const unsubscribeScroll = lenis.on("scroll", onScroll);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        lenis.stop();
        return;
      }
      lenis.start();
      ScrollTrigger.refresh();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (document.visibilityState === "hidden") {
      lenis.stop();
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gsap.ticker.remove(onTick);
      unsubscribeScroll();
      store.reset();
    };
  }, [lenis, store]);

  return null;
}

/**
 * Single site-level Motion + Lenis owner. Feeds the existing GSAP ticker and
 * ScrollTrigger exactly once; consumers read Lenis through context hooks only.
 */
export function PortfolioMotionProvider({
  children,
}: PortfolioMotionProviderProps) {
  const store = useMemo(() => createPortfolioMotionStore(), []);

  return (
    <MotionConfig reducedMotion="never">
      <ReactLenis root options={LENIS_OPTIONS}>
        <PortfolioMotionContext.Provider value={store}>
          <LenisGsapBridge store={store} />
          {children}
        </PortfolioMotionContext.Provider>
      </ReactLenis>
    </MotionConfig>
  );
}
