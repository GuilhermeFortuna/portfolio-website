"use client";

/**
 * Local Radix Slot equivalent for BSMNT composition.
 * WO-024 permits replacing `@radix-ui/react-slot` with a one-file local
 * equivalent so WO-026 adds zero packages.
 */

import * as React from "react";

import { mergeRefs } from "./merge-refs";

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, forwardedRef) => {
    if (!React.isValidElement(children)) {
      return null;
    }

    const child = children as React.ReactElement<{
      ref?: React.Ref<HTMLElement>;
      className?: string;
      style?: React.CSSProperties;
    }>;

    const refs = [forwardedRef, child.props.ref].filter(
      (ref): ref is NonNullable<typeof ref> => ref != null,
    );

    return React.cloneElement(child, {
      ...props,
      ...child.props,
      className: [props.className, child.props.className]
        .filter(Boolean)
        .join(" ") || undefined,
      style:
        props.style || child.props.style
          ? { ...props.style, ...child.props.style }
          : undefined,
      ref: refs.length > 0 ? mergeRefs(refs) : undefined,
    });
  },
);

Slot.displayName = "Slot";
