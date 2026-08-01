import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PortfolioMotionProvider } from "@/components/providers/portfolio-motion-provider";
import { WebGLManager } from "@/components/webgl/webgl-manager";
import { siteMetadata } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}
      >
        <PortfolioMotionProvider>
          <WebGLManager>{children}</WebGLManager>
        </PortfolioMotionProvider>
      </body>
    </html>
  );
}
