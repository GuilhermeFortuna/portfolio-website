// Adapted from https://magicui.design/docs/components/magic-card (Magic Card)
// and https://magicui.design/docs/components/border-beam (Border Beam).
// Both MIT, magicuidesign/magicui. `next-themes` and the Tailwind utilities of
// the sources are replaced by project tokens and the `.magic-card*` selectors
// in `src/app/globals.css`.
"use client";

import {
  useCallback,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/cn";

export type MagicCardProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  /**
   * Pointer spotlight and beam are only mounted when `true`; otherwise the
   * card renders a static surface with a fixed gradient hairline.
   */
  animated: boolean;
  /** Mount the traveling Border Beam. Reserved for one primary card per view. */
  beam?: boolean;
  /** Radius, in CSS px, of the pointer-tracked border gradient and spotlight. */
  gradientSize?: number;
  /** Seconds for one full beam lap. */
  beamDuration?: number;
  /** Beam length in CSS px. */
  beamSize?: number;
};

const OFFSCREEN = "-9999px";

function BorderBeam({ duration, size }: { duration: number; size: number }): ReactNode {
  return (
    <span aria-hidden="true" className="magic-card__beam" data-magic-card-beam>
      <motion.span
        className="magic-card__beam-light"
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          } as CSSProperties
        }
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
    </span>
  );
}

export function MagicCard({
  children,
  animated,
  beam = false,
  gradientSize = 220,
  beamDuration = 9,
  beamSize = 120,
  className,
  style,
  onPointerMove,
  onPointerLeave,
  ...rest
}: MagicCardProps): ReactNode {
  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--magic-card-x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--magic-card-y", `${event.clientY - rect.top}px`);
      onPointerMove?.(event);
    },
    [onPointerMove],
  );

  const handlePointerLeave = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      target.style.setProperty("--magic-card-x", OFFSCREEN);
      target.style.setProperty("--magic-card-y", OFFSCREEN);
      onPointerLeave?.(event);
    },
    [onPointerLeave],
  );

  const rootStyle = {
    "--magic-card-size": `${gradientSize}px`,
    ...style,
  } as CSSProperties;

  return (
    <div
      {...rest}
      className={cn("magic-card", className)}
      data-magic-card
      data-magic-card-animated={animated ? "true" : "false"}
      style={rootStyle}
      onPointerMove={animated ? handlePointerMove : onPointerMove}
      onPointerLeave={animated ? handlePointerLeave : onPointerLeave}
    >
      {animated ? (
        <span
          aria-hidden="true"
          className="magic-card__spotlight"
          data-magic-card-spotlight
        />
      ) : null}
      {animated && beam ? <BorderBeam duration={beamDuration} size={beamSize} /> : null}
      <div className="magic-card__content" data-magic-card-content>
        {children}
      </div>
    </div>
  );
}
