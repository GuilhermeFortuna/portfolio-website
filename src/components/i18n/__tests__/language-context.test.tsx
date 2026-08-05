import { afterEach, describe, expect, it } from "vitest";

import {
  LanguageProvider,
  useLocale,
} from "@/components/i18n/language-context";
import { render, screen } from "@/test/render";

function LocaleProbe() {
  return <span>{useLocale()}</span>;
}

afterEach(() => {
  document.documentElement.lang = "en";
});

describe("LanguageProvider", () => {
  it("keeps the document language synchronized after client navigation", () => {
    const { rerender } = render(
      <LanguageProvider locale="en">
        <LocaleProbe />
      </LanguageProvider>,
    );

    expect(screen.getByText("en")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");

    rerender(
      <LanguageProvider locale="pt-BR">
        <LocaleProbe />
      </LanguageProvider>,
    );

    expect(screen.getByText("pt-BR")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("pt-BR");
  });
});
