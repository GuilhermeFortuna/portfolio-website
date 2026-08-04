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
  "relative inline-flex min-h-11 min-w-11 items-center justify-center [font-family:var(--font-geist-mono)] text-[0.8125rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]";

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
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              !isActive &&
                "hover:after:absolute hover:after:inset-x-2 hover:after:-bottom-1 hover:after:h-px hover:after:bg-[var(--color-line-strong)] hover:after:content-['']",
            )}
          >
            <span className="relative inline-flex items-center py-0.5">
              {item.label}
              {isActive ? <NavActiveIndicator layoutId={layoutId} /> : null}
            </span>
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
        className="fixed top-4 left-[var(--page-gutter)] z-50 -translate-y-[200%] bg-[var(--color-canvas)] px-4 py-3 text-sm focus:translate-y-0"
      >
        {siteNavigation.skipLink}
      </a>
      <header
        data-scrolled={scrolled ? "true" : "false"}
        className={cn(
          "fixed inset-x-0 top-0 z-20 h-[4.5rem] border-b transition-[background-color,backdrop-filter,border-color] duration-[var(--duration-medium)] ease-[var(--ease-standard)]",
          scrolled
            ? "border-[var(--color-line)] bg-[var(--color-canvas)]/85 backdrop-blur-md"
            : "border-transparent bg-[var(--color-canvas)]",
        )}
      >
        <div className="mx-auto flex h-full max-w-[var(--content-wide)] items-center justify-between px-[var(--page-gutter)]">
          <a
            href={siteNavigation.wordmarkHref}
            className={cn(linkClassName, "text-[var(--color-text)]")}
          >
            {siteContent.wordmark}
          </a>
          <div className="flex items-center gap-6">
            <LayoutGroup>
              <NavLinkList
                items={siteNavigation.desktop}
                activeSection={activeSection}
                layoutId="nav-active-desktop"
                ariaLabel="Primary"
                className="hidden items-center gap-6 lg:flex"
              />
              <NavLinkList
                items={siteNavigation.mobile}
                activeSection={activeSection}
                layoutId="nav-active-mobile"
                ariaLabel="Primary mobile"
                className="flex items-center gap-5 lg:hidden"
              />
            </LayoutGroup>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
}
