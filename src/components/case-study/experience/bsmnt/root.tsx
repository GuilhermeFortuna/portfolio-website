// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/primitive.tsx (Root only)
// SHA-256: 94c3d0879de93dd5a4f4c6f7c9db85c7667a2a61767e759a845d185770825068
// Adaptation: drop debugger/Parallax/Pin/Stagger/RegisterGsapPlugins exports;
// local Slot; gsap.context() lifecycle; no Portal visualizer.

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as React from "react";

import {
  ScrollytellingContext,
  ScrollytellingDispatchersContext,
  type ScrollytellingDispatchersContextType,
  useScrollytelling,
} from "./context";
import { internalEventEmmiter } from "./internal-event-emitter";
import type { DataAttribute } from "./shared-types";
import { Slot } from "./slot";

gsap.registerPlugin(ScrollTrigger);

type RootProps = {
  children?: React.ReactNode;
  debug?:
    | false
    | {
        label: string;
        visualizer?: boolean;
        markers?: boolean;
      };
  start?: ScrollTrigger.Vars["start"];
  end?: ScrollTrigger.Vars["end"];
  callbacks?: Pick<
    ScrollTrigger.Vars,
    | "onEnter"
    | "onEnterBack"
    | "onLeave"
    | "onLeaveBack"
    | "onToggle"
    | "onUpdate"
    | "onRefresh"
  >;
  /** Pass `null` while the trigger node is mounting; keeps explicit-trigger mode. */
  trigger?: ScrollTrigger.Vars["trigger"] | null;
  scrub?: boolean | number;
  defaults?: gsap.TweenVars | undefined;
  toggleActions?: ScrollTrigger.Vars["toggleActions"];
  disabled?: boolean;
};

const Scrollytelling = ({
  children,
  debug,
  start,
  end,
  callbacks,
  scrub,
  defaults,
  toggleActions,
  disabled = false,
  trigger,
}: RootProps) => {
  const explicitTriggerMode = trigger !== undefined;

  const ref = React.useRef<HTMLDivElement>(null);
  const explicitScope =
    explicitTriggerMode &&
    typeof Element !== "undefined" &&
    trigger instanceof Element
      ? trigger
      : null;
  const scopedQuerySelector = React.useMemo<gsap.utils.SelectorFunc>(
    () =>
      explicitScope
        ? gsap.utils.selector(explicitScope)
        : ref.current
          ? gsap.utils.selector(ref)
          : () => [],
    [explicitScope],
  );
  const id = React.useId();

  const [timeline, setTimeline] = React.useState<gsap.core.Timeline>();

  const debugMarkers = debug ? debug.markers : false;
  const debugVisualizer = debug ? (debug.visualizer ?? true) : false;
  const debugLabel = debug ? debug.label : undefined;

  const callbacksRef = React.useRef(callbacks);
  React.useEffect(() => {
    callbacksRef.current = callbacks;
  }, [callbacks]);

  React.useEffect(() => {
    if (!explicitTriggerMode && !ref.current) return;

    if (disabled) {
      setTimeline(undefined);
      return;
    }

    const buildTimeline = () => {
      const defaultToggleActions =
        scrub === false ? "play none none none" : undefined;

      const tl = gsap.timeline({
        scrollTrigger: {
          markers: debugMarkers,
          scrub: scrub ?? true,
          start: start ?? "top top",
          end: end ?? "bottom bottom",
          trigger: explicitTriggerMode ? trigger : ref.current,
          toggleActions: toggleActions ?? defaultToggleActions,
          onEnter: (self) => callbacksRef.current?.onEnter?.(self),
          onEnterBack: (self) => callbacksRef.current?.onEnterBack?.(self),
          onLeave: (self) => callbacksRef.current?.onLeave?.(self),
          onLeaveBack: (self) => callbacksRef.current?.onLeaveBack?.(self),
          onToggle: (self) => callbacksRef.current?.onToggle?.(self),
          onUpdate: (self) => callbacksRef.current?.onUpdate?.(self),
          onRefresh: (self) => callbacksRef.current?.onRefresh?.(self),
        },
        paused: true,
        defaults: { ...defaults, duration: 1 },
        data: {
          id,
          type: "root",
          label: debugLabel ?? id,
          debug: debugVisualizer,
          isScrollytellingTween: true,
        } satisfies DataAttribute,
      });

      tl.eventCallback("onUpdate", () => {
        internalEventEmmiter.emit("timeline:update", tl);
      });

      setTimeline(tl);
    };

    const ctx = explicitScope
      ? gsap.context(buildTimeline, explicitScope)
      : gsap.context(buildTimeline, ref);

    return () => {
      ctx.revert();
      setTimeline(undefined);
    };
  }, [
    debugLabel,
    explicitTriggerMode,
    end,
    start,
    scrub,
    defaults,
    toggleActions,
    disabled,
    trigger,
    id,
    debugMarkers,
    debugVisualizer,
    explicitScope,
  ]);

  const addRestToTimeline = React.useCallback(
    (lastEnd: number, targetTimeline: gsap.core.Timeline) => {
      const restTweenId = `rest-${id}`;
      gsap.getById(restTweenId)?.revert();

      const duration = 100 - lastEnd;
      const position = 100 - duration;
      targetTimeline.to(
        {},
        {
          id: restTweenId,
          duration,
          data: { type: "rest", id: restTweenId, rootId: id },
        },
        position,
      );

      return () => {
        gsap.getById(restTweenId)?.revert();
      };
    },
    [id],
  );

  const getTimelineSpace: ScrollytellingDispatchersContextType["getTimelineSpace"] =
    React.useCallback(
      ({ start: spaceStart, end: spaceEnd }) => {
        if (disabled) return null;
        if (!timeline) throw new Error("timeline not initialized");
        const duration = spaceEnd - spaceStart;
        if (spaceStart < 0) {
          throw new Error("start time must be greater than 0");
        }
        if (spaceEnd > 100) {
          throw new Error("end time must be less than 100");
        }
        if (duration < 0) {
          throw new Error("end time must be greater than start time");
        }

        const cleanup = addRestToTimeline(spaceEnd, timeline);
        internalEventEmmiter.emit("timeline:refresh", timeline);

        return {
          duration,
          position: spaceStart,
          cleanup: () => {
            cleanup();
          },
        };
      },
      [disabled, timeline, addRestToTimeline],
    );

  return (
    <ScrollytellingContext.Provider
      value={{ timeline, rootRef: ref, events: internalEventEmmiter }}
    >
      <ScrollytellingDispatchersContext.Provider
        value={{ getTimelineSpace, scopedQuerySelector }}
      >
        {explicitTriggerMode ? children : <Slot ref={ref}>{children}</Slot>}
      </ScrollytellingDispatchersContext.Provider>
    </ScrollytellingContext.Provider>
  );
};

export { Scrollytelling as Root, useScrollytelling };
