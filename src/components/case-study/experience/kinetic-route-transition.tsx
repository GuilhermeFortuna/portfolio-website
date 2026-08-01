"use client";

// Adapted from https://github.com/codrops/KineticTypePageTransition
// @ ebe926e2f1de42950c36ff8a678321155280c1af
// Source: src/js/typeTransition.js (signature), index.js open/close wiring,
// CSS .type / .type__line, markup [data-type-transition]
// SHA-256 (WO-024): typeTransition f03ae81c…; index 6c06a417…; base.css b45da81f…;
// index.html 6b232912…
// Demo palette, serif face, article grid, and copy are not adopted.

import { gsap } from "gsap";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

import styles from "./case-study-experience.module.css";

export type KineticRouteTransitionController = {
  /** Entrance timeline (~2.5s). Resolves when complete or already idle. */
  enter: () => Promise<void>;
  /** Exit timeline for WO-032 committed navigation. */
  exit: () => Promise<void>;
  /** Cancel any running timeline immediately. */
  cancel: () => void;
  isAnimating: () => boolean;
  dispose: () => void;
};

type TimelineHandle = gsap.core.Timeline;

type ControllerHost = HTMLElement & {
  __kineticController?: KineticRouteTransitionController;
};

/**
 * Reusable kinetic type field controller. Title is data only — no project-
 * specific letters or styling are baked into the primitive.
 */
export function createKineticRouteTransitionController(
  root: HTMLElement,
  lines: HTMLElement[],
): KineticRouteTransitionController {
  let active: TimelineHandle | null = null;
  let disposed = false;
  let animating = false;
  let settle: (() => void) | null = null;

  const killActive = () => {
    if (active) {
      active.kill();
      active = null;
    }
    animating = false;
    if (settle) {
      const done = settle;
      settle = null;
      done();
    }
  };

  const run = (build: () => TimelineHandle) =>
    new Promise<void>((resolve) => {
      if (disposed) {
        resolve();
        return;
      }
      killActive();
      animating = true;
      settle = resolve;
      const timeline = build();
      active = timeline;
      timeline.eventCallback("onComplete", () => {
        animating = false;
        active = null;
        settle = null;
        resolve();
      });
      timeline.play();
    });

  return {
    enter() {
      // Adapted from TypeTransition.in() — scale/rotate field + staggered lines.
      return run(() =>
        gsap
          .timeline({ paused: true })
          .to(root, {
            duration: 1.4,
            ease: "power2.inOut",
            scale: 2.7,
            rotate: -90,
          })
          .to(
            lines,
            {
              keyframes: [
                { x: "20%", duration: 1, ease: "power1.inOut" },
                { x: "-200%", duration: 1.5, ease: "power1.in" },
              ],
              stagger: 0.04,
            },
            0,
          )
          .to(
            lines,
            {
              keyframes: [
                { opacity: 1, duration: 1, ease: "power1.in" },
                { opacity: 0, duration: 1.5, ease: "power1.in" },
              ],
            },
            0,
          ),
      );
    },
    exit() {
      // Adapted from TypeTransition.out() for WO-032 reuse.
      const typeLineOpacity =
        Number.parseFloat(
          getComputedStyle(document.body).getPropertyValue(
            "--type-line-opacity",
          ),
        ) || 0.35;

      return run(() =>
        gsap
          .timeline({ paused: true })
          .to(
            root,
            {
              duration: 1.4,
              ease: "power2.inOut",
              scale: 1,
              rotate: 0,
            },
            1.2,
          )
          .to(
            lines,
            {
              duration: 2.3,
              ease: "back",
              x: "0%",
              stagger: -0.04,
            },
            0,
          )
          .to(
            lines,
            {
              keyframes: [
                { opacity: 1, duration: 1, ease: "power1.in" },
                {
                  opacity: typeLineOpacity,
                  duration: 1.5,
                  ease: "power1.in",
                },
              ],
            },
            0,
          ),
      );
    },
    cancel: killActive,
    isAnimating: () => animating,
    dispose() {
      disposed = true;
      killActive();
      gsap.set(root, { clearProps: "transform" });
      gsap.set(lines, { clearProps: "transform,opacity" });
    },
  };
}

function buildTitleLines(title: string): string[] {
  const token = title.trim() || "PROJECT";
  return Array.from({ length: 10 }, () => `${token} ${token} ${token}`);
}

type KineticRouteTransitionProps = {
  /** Project title data for the glyph field. */
  title: string;
  /** Fires after the controller initializes (safe point to enhance DOM). */
  onReady?: () => void;
  /** Fires once when the entrance completes successfully. */
  onEnterComplete?: () => void;
  children?: ReactNode;
  className?: string;
};

/**
 * Route entrance kinetic field. Server/no-JS content stays visible; the
 * enhancement hides/transforms only after the controller initializes.
 * Cancels on unmount so rapid navigation and Strict Mode remounts do not
 * leave competing timelines.
 */
export function KineticRouteTransition({
  title,
  onReady,
  onEnterComplete,
  children,
  className,
}: KineticRouteTransitionProps) {
  const reactId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  const onCompleteRef = useRef(onEnterComplete);
  const lines = buildTitleLines(title);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onCompleteRef.current = onEnterComplete;
  }, [onEnterComplete]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lineNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-kinetic-line]"),
    );
    const controller = createKineticRouteTransitionController(root, lineNodes);
    (root as ControllerHost).__kineticController = controller;

    let cancelled = false;
    root.dataset.kineticReady = "true";
    onReadyRef.current?.();

    void controller.enter().then(() => {
      if (!cancelled) {
        onCompleteRef.current?.();
      }
    });

    return () => {
      cancelled = true;
      controller.cancel();
      controller.dispose();
      root.dataset.kineticReady = "false";
      delete (root as ControllerHost).__kineticController;
    };
  }, [reactId, title]);

  return (
    <>
      <div
        ref={rootRef}
        className={[styles.typeField, className].filter(Boolean).join(" ")}
        data-type-transition=""
        data-kinetic-ready="false"
        aria-hidden="true"
      >
        {lines.map((line, index) => (
          <div
            key={`${reactId}-${index}`}
            className={styles.typeLine}
            data-kinetic-line=""
          >
            {line}
          </div>
        ))}
      </div>
      {children}
    </>
  );
}

/** Imperative access for WO-032 exit handoff. */
export function getKineticControllerFromElement(
  root: HTMLElement | null,
): KineticRouteTransitionController | null {
  if (!root) return null;
  return (root as ControllerHost).__kineticController ?? null;
}
