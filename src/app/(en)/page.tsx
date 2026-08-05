import { LanguageProvider } from "@/components/i18n/language-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollChoreography } from "@/components/layout/scroll-choreography";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";

export default function Home() {
  return (
    <LanguageProvider locale="en">
      <SiteHeader />
      <ScrollChoreography>
        <HeroSection />
        <SelectedWorkSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </ScrollChoreography>
      <SiteFooter />
    </LanguageProvider>
  );
}
