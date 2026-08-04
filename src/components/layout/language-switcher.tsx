"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/components/i18n/language-context";
import type { Locale } from "@/lib/i18n";
import { locales, localizePathname } from "@/lib/i18n";

const LOCALE_COOKIE_MAX_AGE_SECONDS = 31_536_000; // 1 year

/** Persist locale for middleware preference (outside component to satisfy immutability lint). */
function persistLocaleCookie(locale: Locale): void {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const handleSwitch = (targetLocale: Locale) => {
    if (targetLocale === currentLocale) return;

    const newPathname = localizePathname(pathname, targetLocale);
    persistLocaleCookie(targetLocale);
    router.push(newPathname);
  };

  return (
    <div
      aria-label="Language selection"
      className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/60 px-1 py-0.5 backdrop-blur-sm"
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
            className={`min-h-8 px-2.5 rounded-full [font-family:var(--font-geist-mono)] text-[0.625rem] font-bold tracking-widest uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] ${
              isActive
                ? "bg-[var(--color-text)] text-[var(--color-canvas)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
