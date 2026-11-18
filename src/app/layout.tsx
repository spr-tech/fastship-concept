import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import ConceptBanner from "@/components/layouts/conceptBanner";
import { site } from "@/data/site";
import { cn } from "@/utilities/helpers/cn";
import "./globals.css";

// Anton has a single weight. Inter is variable, so one file covers 400 to 700.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// The Open Graph image and the icons come from the file conventions in this folder
// (opengraph-image.png, icon.png, apple-icon.png, favicon.ico), so they aren't listed here.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: site.titleTemplate },
  description: site.description,
  // A concept must never compete with Fastship's real site in search. robots.ts says the same.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(anton.variable, inter.variable, "antialiased")}>
      {/* A full-height column, so the auth layout can fill exactly the space under the concept banner. */}
      <body className="flex min-h-svh flex-col">
        <ConceptBanner text={site.conceptNotice} />
        {children}
      </body>
    </html>
  );
}
