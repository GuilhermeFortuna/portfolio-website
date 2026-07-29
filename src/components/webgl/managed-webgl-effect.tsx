"use client";

import { type ReactNode, useEffect, useRef } from "react";

import {
  useWebGlEffect,
  type WebGLEffectConfig,
} from "@/components/webgl/webgl-manager";

/** Contexts are created this far outside the viewport, never on first paint. */
const NEAR_VIEWPORT_MARGIN = "300px";
const VISIBLE_THRESHOLD = 0.05;

export type ManagedWebGlRenderState = {
  /** False while offscreen or hidden: the effect must stop its frame loop. */
  shouldAnimate: boolean;
  dpr: number;
  pointerEnabled: boolean;
  isMobile: boolean;
};

type ManagedWebGLEffectProps = {
  config: WebGLEffectConfig;
  className?: string;
  /** Rendered whenever the manager withholds a context. */
  fallback: ReactNode;
  children: (state: ManagedWebGlRenderState) => ReactNode;
};

export function ManagedWebGLEffect({
  config,
  className,
  fallback,
  children,
}: ManagedWebGLEffectProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { state, setNear, setVisible } = useWebGlEffect(config);
  const setNearRef = useRef(setNear);
  const setVisibleRef = useRef(setVisible);

  useEffect(() => {
    setNearRef.current = setNear;
    setVisibleRef.current = setVisible;
  }, [setNear, setVisible]);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) {
      return;
    }

    const nearObserver = new IntersectionObserver(
      ([entry]) => setNearRef.current(entry.isIntersecting),
      { rootMargin: NEAR_VIEWPORT_MARGIN },
    );
    const visibleObserver = new IntersectionObserver(
      ([entry]) => setVisibleRef.current(entry.isIntersecting),
      { threshold: VISIBLE_THRESHOLD },
    );

    nearObserver.observe(element);
    visibleObserver.observe(element);

    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
      setNearRef.current(false);
      setVisibleRef.current(false);
    };
  }, []);

  return (
    <div ref={frameRef} aria-hidden="true" className={className}>
      {state.shouldMount
        ? children({
            shouldAnimate: state.shouldAnimate,
            dpr: state.dpr,
            pointerEnabled: state.pointerEnabled,
            isMobile: state.isMobile,
          })
        : fallback}
    </div>
  );
}
