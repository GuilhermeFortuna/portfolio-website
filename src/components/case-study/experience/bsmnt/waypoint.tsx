// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/components/waypoint/index.tsx
// SHA-256: 0c69662940c25f7e5790a28ab0aedffb115bb30601dc738625b772a8a9bf20b1
// Adaptation: import useScrollytelling from context (avoid primitive cycle);
// local Slot; React 19 ref typing.

"use client";

import { gsap } from "gsap";
import * as React from "react";

import { useDispatcher, useScrollytelling } from "./context";
import type { DataAttribute } from "./shared-types";
import { Slot } from "./slot";
import type {
  AnimationProps,
  SimpleTween,
  TweenTarget,
  WaypointBaseDef,
} from "./types";
import { buildDeclarativeTween, getTweenTarget } from "./util";

export function Waypoint(
  props: WaypointBaseDef & {
    tween?: SimpleTween & { target: TweenTarget };
  },
): null;

export function Waypoint(
  props: WaypointBaseDef & {
    children: React.ReactNode;
    tween?: SimpleTween;
  },
): React.ReactElement;

export function Waypoint({
  tween,
  children,
  at,
  label,
  onCall,
  onReverseCall,
  disabled = false,
}: WaypointBaseDef & {
  children?: AnimationProps["children"];
  tween?: SimpleTween & { target?: TweenTarget };
}): React.ReactElement | null {
  const ref = React.useRef<HTMLElement>(null);
  const id = React.useId();
  const lastStateRef = React.useRef<"idle" | "complete" | "reverse-complete">(
    "idle",
  );

  const { timeline } = useScrollytelling();
  const { getTimelineSpace } = useDispatcher();

  const waypointLabel = label ?? `label-${id}`;

  React.useEffect(() => {
    if (!timeline || disabled) return;

    let cleanupTween: undefined | (() => void);
    let generatedTween: undefined | gsap.core.Tween;
    if (tween) {
      const { duration, ...op } = tween;
      const tweenTarget = getTweenTarget({ targetContainer: tween, ref });
      cleanupTween = buildDeclarativeTween({
        id: id + "-tween",
        op,
        duration,
        target: tweenTarget,
        paused: true,
      });
      generatedTween = gsap.getById<gsap.core.Tween>(id + "-tween");
    }

    const space = getTimelineSpace({ start: at, end: at });
    if (!space) return;

    const newSet = gsap.set(
      {},
      {
        id,
        paused: true,
        data: {
          id,
          type: "waypoint",
          rootId: timeline.data.id,
          isScrollytellingTween: true,
          label: waypointLabel,
        } satisfies DataAttribute,
      },
    );

    if (lastStateRef.current === "complete") {
      newSet.play();
    }

    newSet.vars.onComplete = () => {
      lastStateRef.current = "complete";
      newSet.data._internalOnCall?.();
      onCall?.();
      generatedTween?.play();
    };
    newSet.vars.onReverseComplete = () => {
      lastStateRef.current = "reverse-complete";
      newSet.data._internalOnReverseCall?.();
      onReverseCall?.();
      if (!tween?.forwards) {
        generatedTween?.reverse();
      }
    };

    timeline.add(newSet, space.position);
    newSet.play();
    timeline.addLabel(waypointLabel, space.position);

    return () => {
      gsap.getById(id)?.revert();
      cleanupTween?.();
      timeline.removeLabel(waypointLabel);
      space.cleanup();
    };
  }, [
    at,
    disabled,
    getTimelineSpace,
    id,
    onCall,
    onReverseCall,
    timeline,
    tween,
    waypointLabel,
  ]);

  if (children) {
    return <Slot ref={ref}>{children}</Slot>;
  }
  return null;
}
