"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import {
  useWebGlEffect,
  type WebGLEffectConfig,
} from "@/components/webgl/webgl-manager";

/** Contexts are created this far outside the viewport, never on first paint. */
const NEAR_VIEWPORT_MARGIN = "300px";
const VISIBLE_THRESHOLD = 0.05;

export type ManagedWebGlRenderState = {
  /** The manager currently owns a budget slot for this effect. */
  active: boolean;
  /** False while offscreen or hidden: the effect must stop its frame loop. */
  shouldAnimate: boolean;
  dpr: number;
  pointerEnabled: boolean;
  isMobile: boolean;
  size: Readonly<{ width: number; height: number }>;
  /** Live viewport-normalized coordinates from the manager's single listener. */
  pointer: Readonly<{ x: number; y: number }>;
  /** Becomes true by unmounting the child and running its effect cleanup. */
  disposeRequested: boolean;
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
  const [size, setSize] = useState({ width: 0, height: 0 });
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
    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize((current) =>
        current.width === width && current.height === height
          ? current
          : { width, height },
      );
    });

    nearObserver.observe(element);
    visibleObserver.observe(element);
    resizeObserver.observe(element);

    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
      resizeObserver.disconnect();
      setNearRef.current(false);
      setVisibleRef.current(false);
    };
  }, []);

  return (
    <div ref={frameRef} aria-hidden="true" className={className}>
      {state.shouldMount
        ? children({
            active: state.shouldMount,
            shouldAnimate: state.shouldAnimate,
            dpr: state.dpr,
            pointerEnabled: state.pointerEnabled,
            isMobile: state.isMobile,
            size,
            pointer: state.pointer,
            disposeRequested: false,
          })
        : fallback}
    </div>
  );
}
