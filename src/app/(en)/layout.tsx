import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootDocument } from "@/components/layout/root-document";
import { getSiteMetadata } from "@/content/site";
import { createPageMetadata, deploymentRobotsMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const englishSiteMetadata = getSiteMetadata("en");

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  ...createPageMetadata({
    locale: "en",
    pathname: "/",
    title: englishSiteMetadata.title,
    description: englishSiteMetadata.description,
  }),
  ...deploymentRobotsMetadata(),
};

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
