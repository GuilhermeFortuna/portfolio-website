"use client";

import { LayoutGroup } from "motion/react";

import { useLocale } from "@/components/i18n/language-context";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { NavActiveIndicator } from "@/components/layout/nav-active-indicator";
import { getSiteContent, getSiteNavigation, type NavItem } from "@/content/site";
import {
  sectionIdFromHref,
  useActiveSection,
} from "@/hooks/use-active-section";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { cn } from "@/lib/cn";

const HOME_SECTION_IDS = ["work", "process", "about", "contact"] as const;

const linkClassName =
  "relative inline-flex min-h-9 px-3 py-1.5 items-center justify-center rounded-full [font-family:var(--font-geist-mono)] text-[0.75rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]";

function NavLinkList({
  items,
  activeSection,
  layoutId,
  ariaLabel,
  className,
}: {
  items: NavItem[];
  activeSection: string | null;
  layoutId: string;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <nav aria-label={ariaLabel} className={className}>
      {items.map((item) => {
        const sectionId = sectionIdFromHref(item.href);
        const isActive =
          sectionId != null && activeSection != null && sectionId === activeSection;

        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              linkClassName,
              isActive
                ? "text-[var(--color-text)] font-semibold"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-line)]/30",
            )}
          >
            <span className="relative z-10 inline-flex items-center">
              {item.label}
            </span>
            {isActive ? <NavActiveIndicator layoutId={layoutId} /> : null}
          </a>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const locale = useLocale();
  const siteContent = getSiteContent(locale);
  const siteNavigation = getSiteNavigation(locale);
  const scrolled = useScrolledPast();
  const activeSection = useActiveSection(HOME_SECTION_IDS);

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-4 left-[var(--page-gutter)] z-50 -translate-y-[200%] rounded-full bg-[var(--color-surface-strong)] px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[var(--color-text)] shadow-lg transition-transform focus:translate-y-0"
      >
        {siteNavigation.skipLink}
      </a>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className={cn(
          "fixed inset-x-0 top-0 z-20 px-[var(--page-gutter)] transition-all duration-[var(--duration-medium)] ease-[var(--ease-standard)]",
          scrolled
            ? "py-2 bg-[var(--color-canvas)]/85 backdrop-blur-md border-b border-[var(--color-line)]"
            : "py-3 lg:py-4 bg-[var(--color-canvas)] border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-[var(--content-wide)] items-center justify-between rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)]/80 px-4 lg:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-[var(--duration-medium)]">
          <a
            href={siteNavigation.wordmarkHref}
            className={cn(
              linkClassName,
              "group flex items-center gap-2.5 text-[var(--color-text)] transition-transform duration-[var(--duration-fast)] active:scale-95",
            )}
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-b)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-b)]" />
            </span>
            <span>{siteContent.wordmark}</span>
          </a>
          <div className="flex items-center gap-4 lg:gap-6">
            <LayoutGroup>
              <NavLinkList
                items={siteNavigation.desktop}
                activeSection={activeSection}
                layoutId="nav-active-desktop"
                ariaLabel="Primary"
                className="hidden items-center gap-1 lg:flex"
              />
              <NavLinkList
                items={siteNavigation.mobile}
                activeSection={activeSection}
                layoutId="nav-active-mobile"
                ariaLabel="Primary mobile"
                className="flex items-center gap-1 lg:hidden"
              />
            </LayoutGroup>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
}
