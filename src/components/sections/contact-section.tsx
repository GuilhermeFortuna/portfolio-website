import { SectionShell } from "@/components/layout/section-shell";
import { siteContent } from "@/content/site";

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      label={siteContent.contactLabel}
      labelledBy="contact-title"
    >
      <p className="mt-8 max-w-[var(--content-reading)] text-[clamp(2rem,4.5vw,4rem)] leading-[1.12] font-[450] tracking-[-0.035em]">
        {siteContent.contactManifesto}
      </p>
      <h2
        id="contact-title"
        className="mt-10 max-w-[var(--content-reading)] text-[clamp(2.25rem,5vw,4.75rem)] leading-none font-[540] tracking-[-0.04em]"
      >
        {siteContent.contactTitle}
      </h2>
      <p className="mt-8 text-[var(--color-text-dim)]">
        {siteContent.contactLocation}
      </p>
      <p className="mt-3 text-[var(--color-text-muted)]">
        {siteContent.contactAvailability}
      </p>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
        {siteContent.contactActions.map((action) => (
          <a
            key={action.href}
            href={action.href}
            className="inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase"
            rel={action.href.startsWith("mailto:") ? undefined : "noreferrer"}
            target={action.href.startsWith("mailto:") ? undefined : "_blank"}
          >
            {action.label}
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
