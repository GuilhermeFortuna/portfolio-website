"use client";

import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/components/i18n/language-context";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import type { Locale } from "@/lib/i18n";
import { locales, localizePathname } from "@/lib/i18n";

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const prefersReducedMotion = useMotionPreference();

  const handleSwitch = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) return;

    const newPathname = localizePathname(pathname, targetLocale);
    router.push(newPathname);
  };

  return (
    <div
      aria-label="Language selection"
      className="relative inline-flex items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)]/70 p-1 shadow-inner backdrop-blur-md"
    >
      {locales.map((loc) => {
        const isActive = loc === currentLocale;
        const label = loc === "en" ? "EN" : "PT";
        return (
          <button
            key={loc}
            type="button"
            onClick={() => handleSwitch(loc)}
            aria-label={`Switch to ${loc === "en" ? "English" : "Portuguese"}`}
            aria-pressed={isActive}
            className={`relative z-10 flex h-7 min-w-[2.125rem] items-center justify-center rounded-full px-2.5 [font-family:var(--font-geist-mono)] text-[0.6875rem] font-bold tracking-widest uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] ${
              isActive
                ? "text-[var(--color-canvas)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {isActive ? (
              prefersReducedMotion ? (
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--color-text)] shadow-sm"
                />
              ) : (
                <motion.span
                  layoutId="language-active-pill"
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--color-text)] shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )
            ) : null}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
