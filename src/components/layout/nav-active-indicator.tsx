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
        className="absolute inset-0 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface-strong)]"
      />
    );
  }

  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden
      className="absolute inset-0 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface-strong)]/80 shadow-[0_-2px_12px_rgba(142,160,255,0.25)] backdrop-blur-sm"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    >
      <span className="absolute -top-px inset-x-2.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[var(--color-accent-a)] to-transparent opacity-90" />
    </motion.span>
  );
}
