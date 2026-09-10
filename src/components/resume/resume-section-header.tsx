import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ResumeSectionHeaderProps = {
  eyebrow: string;
  title: string;
  headingId?: string;
  className?: string;
};

export function ResumeSectionHeader({
  eyebrow,
  title,
  headingId,
  className,
}: ResumeSectionHeaderProps): ReactNode {
  return (
    <header
      className={cn("resume-section-header", className)}
      data-resume-section-header
    >
      <p
        className="resume-section-header__eyebrow"
        data-resume-header-eyebrow
      >
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className="resume-section-header__title"
        data-resume-header-title
      >
        {title}
      </h2>
    </header>
  );
}
