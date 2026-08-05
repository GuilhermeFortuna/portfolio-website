import { render as rtlRender, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

import { LanguageProvider } from "@/components/i18n/language-context";
import type { Locale } from "@/lib/i18n";

/**
 * Thin wrapper over React Testing Library's `render`.
 *
 * Prefer `renderWithLocale` for route/page components that consume
 * `LanguageProvider` via the shared root document.
 */
export function render(ui: ReactElement, options?: RenderOptions) {
  return rtlRender(ui, options);
}

export function renderWithLocale(
  ui: ReactElement,
  locale: Locale = "en",
  options?: RenderOptions,
) {
  return rtlRender(
    <LanguageProvider locale={locale}>{ui}</LanguageProvider>,
    options,
  );
}

export * from "@testing-library/react";
