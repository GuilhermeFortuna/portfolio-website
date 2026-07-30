import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { siteContent, siteNavigation } from "@/content/site";
import { render, screen, within } from "@/test/render";

describe("SiteHeader", () => {
  it("renders a skip link to the main content landmark", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: siteNavigation.skipLink }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("exposes labelled primary navigation with the approved destinations", () => {
    render(<SiteHeader />);

    const desktopNav = screen.getByRole("navigation", { name: "Primary" });
    for (const item of siteNavigation.desktop) {
      expect(
        within(desktopNav).getByRole("link", { name: item.label }),
      ).toHaveAttribute("href", item.href);
    }

    const mobileNav = screen.getByRole("navigation", {
      name: "Primary mobile",
    });
    for (const item of siteNavigation.mobile) {
      expect(
        within(mobileNav).getByRole("link", { name: item.label }),
      ).toHaveAttribute("href", item.href);
    }
  });

  it("keeps the wordmark and navigation links keyboard-reachable", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.tab();
    expect(
      screen.getByRole("link", { name: siteNavigation.skipLink }),
    ).toHaveFocus();

    await user.tab();
    const wordmark = screen.getByRole("link", { name: siteContent.wordmark });
    expect(wordmark).toHaveFocus();
    expect(wordmark).toHaveAttribute("href", siteNavigation.wordmarkHref);

    await user.tab();
    expect(document.activeElement?.tagName).toBe("A");
    expect(document.activeElement).toHaveAttribute("href");
  });
});
