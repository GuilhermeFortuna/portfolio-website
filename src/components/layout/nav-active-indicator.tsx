"use client";

import { motion } from "motion/react";

import { useMotionPreference } from "@/hooks/use-motion-preference";

type NavActiveIndicatorProps = {
  /** Unique per visible nav so desktop/mobile do not fight over one layoutId. */
  layoutId: string;
};

/**
 * Hairline active underline. Pattern inspired by 21st motion/underline navs;
 * ownership and tokens are local.
 */
export function NavActiveIndicator({ layoutId }: NavActiveIndicatorProps) {
  const prefersReducedMotion = useMotionPreference();

  if (prefersReducedMotion) {
    return (
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-1 h-px bg-[var(--color-line-strong)]"
      />
    );
  }

  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden
      className="absolute inset-x-0 -bottom-1 h-px bg-[var(--color-line-strong)]"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  );
}
