import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionShellProps = {
  id: string;
  label?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

const innerStyle: CSSProperties = {
  maxWidth: "var(--content-wide)",
  marginInline: "auto",
  paddingInline: "var(--page-gutter)",
  paddingBlock: "var(--section-space)",
};

const eyebrowStyle: CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: "0.6875rem",
  lineHeight: 1,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};

export function SectionShell({
  id,
  label,
  labelledBy,
  className,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(className)}
    >
      <div style={innerStyle}>
        {label ? (
          <p style={eyebrowStyle} className="text-[var(--color-text-muted)]">
            {label}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
