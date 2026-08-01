// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/util/index.ts
// SHA-256: 173994ea01c82cc5cfde23591ab3b1d9e249974c5fcabefbce8217ca147dd746
// Adaptation: import paths for local modules; React types for RefObject.

import { gsap } from "gsap";
import type * as React from "react";

import type { DataAttribute } from "./shared-types";
import type { FromToOptions, TweenTarget } from "./types";

export function getTweenTarget({
  targetContainer,
  ref,
}: {
  targetContainer: { target?: TweenTarget };
  ref: React.RefObject<HTMLElement | null>;
}) {
  if (targetContainer.target) {
    if (
      typeof targetContainer.target === "object" &&
      "current" in targetContainer.target
    ) {
      return targetContainer.target.current;
    }
    return targetContainer.target;
  }
  if (ref) {
    return ref.current;
  }
  return null;
}

export function buildDeclarativeTween({
  op,
  id,
  target,
  duration,
  paused,
  ...timelineAndPosition
}: {
  op: FromToOptions;
  id: string;
  target: TweenTarget;
  duration: number;
  paused?: boolean;
} & (
  | { timeline?: never; position?: never }
  | { timeline: gsap.core.Timeline; position: number }
)) {
  const data: DataAttribute = {
    id,
    type: "animation",
    rootId: timelineAndPosition.timeline?.data.id,
    isScrollytellingTween: true,
  };

  if ("to" in op) {
    if (timelineAndPosition.timeline) {
      timelineAndPosition.timeline.to(
        target,
        {
          ...op.to,
          id,
          duration,
          paused,
          data,
        },
        timelineAndPosition.position,
      );
    } else {
      gsap.to(target, { ...op.to, id, duration, paused });
    }
  } else if ("from" in op) {
    if (timelineAndPosition.timeline) {
      timelineAndPosition.timeline.from(
        target,
        { ...op.from, id, duration, paused, data },
        timelineAndPosition.position,
      );
    } else {
      gsap.from(target, { ...op.from, id, duration, paused });
    }
  } else if ("fromTo" in op) {
    if (timelineAndPosition.timeline) {
      timelineAndPosition.timeline.fromTo(
        target,
        { ...op.fromTo[0] },
        { ...op.fromTo[1], id, duration, paused, data },
        timelineAndPosition.position,
      );
    } else {
      gsap.fromTo(
        target,
        { ...op.fromTo[0] },
        { ...op.fromTo[1], id, duration, paused },
      );
    }
  } else {
    throw new Error("Invalid TweenOp");
  }

  return () => {
    gsap.getById(id)?.revert();
  };
}

export const clsx = (...classes: unknown[]) => {
  return classes.filter(Boolean).join(" ");
};

export function getValidAt(at: number) {
  if (at < 0) {
    throw new Error("at must be a positive number");
  }

  if (at > 100) {
    throw new Error("at must be less than 100");
  }

  if (at === 0) {
    return 0.000001;
  }
  if (at === 100) {
    return 99.999999;
  }
  return at;
}

export const isDev = process.env.NODE_ENV === "development";
