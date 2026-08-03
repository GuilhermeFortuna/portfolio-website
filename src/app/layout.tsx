import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionRuntime } from "@/components/motion/motion-runtime";
import { WebGLManager } from "@/components/webgl/webgl-manager";
import { getSiteMetadata } from "@/content/site";
import {
  defaultLocale,
  getHtmlLang,
  isValidLocale,
  localeHeader,
} from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const englishSiteMetadata = getSiteMetadata("en");

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  ...createPageMetadata({
    locale: "en",
    pathname: "/",
    title: englishSiteMetadata.title,
    description: englishSiteMetadata.description,
  }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const headerLocale = headerStore.get(localeHeader);
  const locale =
    headerLocale && isValidLocale(headerLocale) ? headerLocale : defaultLocale;

  return (
    <html lang={getHtmlLang(locale)} className="h-full antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}
      >
        <MotionRuntime>
          <WebGLManager>{children}</WebGLManager>
        </MotionRuntime>
      </body>
    </html>
  );
}
