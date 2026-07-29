import { SectionShell } from "@/components/layout/section-shell";
import { siteContent } from "@/content/site";

export function ProcessSection() {
  return (
    <SectionShell
      id="process"
      label={siteContent.processLabel}
      labelledBy="process-title"
    >
      <h2
        id="process-title"
        className="mt-8 max-w-[var(--content-reading)] text-[clamp(2.25rem,5vw,4.75rem)] leading-none font-[540] tracking-[-0.04em]"
      >
        {siteContent.processTitle}
      </h2>
      <p className="mt-8 [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
        {siteContent.processSequence}
      </p>
      <p className="mt-8 max-w-[var(--content-reading)] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.65] text-[var(--color-text-muted)]">
        {siteContent.processBody}
      </p>
    </SectionShell>
  );
}
