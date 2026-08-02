import { forwardRef, type CSSProperties, type ReactNode } from "react";

const shellStyle: CSSProperties = {
  maxWidth: "var(--content-wide)",
  marginInline: "auto",
  paddingInline: "var(--page-gutter)",
  paddingBlock: "var(--section-space)",
  position: "relative",
  scrollPaddingBottom: "calc(6rem + env(safe-area-inset-bottom))",
};

/** Reading measure for prose. Media is allowed the full shell width. */
export const readingColumnStyle: CSSProperties = {
  maxWidth: "var(--content-reading)",
};

/**
 * Typography is set inline throughout the case-study primitives because the
 * unlayered heading reset in `globals.css` (`font-size: inherit`) outranks
 * Tailwind's layered utilities.
 */
export const headingStyle: CSSProperties = {
  fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
  lineHeight: 1.15,
  fontWeight: 520,
  letterSpacing: "-0.025em",
};

export const eyebrowStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: "0.6875rem",
  lineHeight: 1,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};

export const CaseStudyShell = forwardRef<
  HTMLElement,
  { children: ReactNode; className?: string }
>(function CaseStudyShell({ children, className }, ref) {
  return (
    <article
      ref={ref}
      style={shellStyle}
      className={["flex flex-col gap-24", className].filter(Boolean).join(" ")}
    >
      {children}
    </article>
  );
});
