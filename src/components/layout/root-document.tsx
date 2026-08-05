import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { LanguageProvider } from "@/components/i18n/language-context";
import { MotionRuntime } from "@/components/motion/motion-runtime";
import { WebGLManager } from "@/components/webgl/webgl-manager";
import { getHtmlLang, type Locale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type RootDocumentProps = {
  locale: Locale;
  children: ReactNode;
};

/**
 * Shared document shell for the English and prefixed-locale root layouts.
 * Locale is explicit so static export can emit correct `lang` without middleware.
 */
export function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    <html lang={getHtmlLang(locale)} className="h-full antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}
      >
        <MotionRuntime>
          <WebGLManager>
            <LanguageProvider locale={locale}>{children}</LanguageProvider>
          </WebGLManager>
        </MotionRuntime>
      </body>
    </html>
  );
}
