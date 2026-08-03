import { ContactDottedSurfaceHorizon } from "@/components/effects/dotted-surface";
import { SectionShell } from "@/components/layout/section-shell";
import { siteContent } from "@/content/site";

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      label={siteContent.contactLabel}
      labelledBy="contact-title"
      className="scene-section contact-scene relative min-h-[44rem]"
    >
      <div data-contact-horizon className="contact-horizon">
        <ContactDottedSurfaceHorizon />
      </div>

      <div
        data-scene-intro
        className="scene-introduction relative z-[1]"
        style={{ maxWidth: "var(--content-reading)" }}
      >
        {/*
          Typography is inline because the unlayered heading reset in
          globals.css (`font-size: inherit`) outranks Tailwind's layered
          utilities, which would otherwise render these at body size.
        */}
        <p
          className="mt-8"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            lineHeight: 1.12,
            fontWeight: 450,
            letterSpacing: "-0.035em",
          }}
        >
          {siteContent.contactManifesto}
        </p>

        <h2
          id="contact-title"
          className="mt-10"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 4.75rem)",
            lineHeight: 1,
            fontWeight: 540,
            letterSpacing: "-0.04em",
          }}
        >
          {siteContent.contactTitle}
        </h2>

        <div style={{ marginTop: "1.5rem" }}>
          <p className="text-[var(--color-text-dim)]">
            {siteContent.contactLocation}
          </p>
          <p className="mt-2 text-[var(--color-text-muted)]">
            {siteContent.contactAvailability}
          </p>
        </div>

        <div
          className="flex flex-wrap gap-x-8 gap-y-4"
          style={{ marginTop: "2.5rem" }}
        >
          {siteContent.contactActions.map((action) => {
            const isExternal = !action.href.startsWith("mailto:");

            return (
              <a
                key={action.href}
                href={action.href}
                className="inline-flex min-h-11 items-center [font-family:var(--font-geist-mono)] text-[0.6875rem] font-semibold tracking-[0.14em] uppercase"
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                {action.label}
              </a>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
