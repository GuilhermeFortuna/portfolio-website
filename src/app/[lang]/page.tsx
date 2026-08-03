import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollChoreography } from "@/components/layout/scroll-choreography";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { getSiteMetadata } from "@/content/site";
import { isPrefixedLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

function resolvePrefixedLocale(lang: string | undefined): Locale {
  if (!lang || !isPrefixedLocale(lang)) {
    notFound();
  }
  return lang;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolvePrefixedLocale(lang);
  const siteMetadata = getSiteMetadata(locale);

  return createPageMetadata({
    locale,
    pathname: "/",
    title: siteMetadata.title,
    description: siteMetadata.description,
  });
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ScrollChoreography>
        <HeroSection />
        <SelectedWorkSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </ScrollChoreography>
      <SiteFooter />
    </>
  );
}
