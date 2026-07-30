import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/layout/site-footer";
import { footerContent } from "@/content/site";
import { render, screen } from "@/test/render";

describe("SiteFooter", () => {
  it("renders the approved copyright from the content contract", () => {
    render(<SiteFooter />);

    expect(screen.getByText(footerContent.copyright)).toBeInTheDocument();
  });

  it("links back to the page top landmark", () => {
    render(<SiteFooter />);

    expect(
      screen.getByRole("link", { name: footerContent.backToTop }),
    ).toHaveAttribute("href", "#top");
  });

  it("does not render external links that would need security attributes", () => {
    // Contact/profile external actions live in page sections, not the footer.
    // This asserts the footer contract stays free of target=_blank anchors.
    render(<SiteFooter />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).not.toHaveAttribute("target");
    expect(links[0]).not.toHaveAttribute("rel");
  });
});
