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

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(anton.variable, inter.variable, "antialiased")}>
      <body>
        <ConceptBanner text={site.conceptNotice} />
        {children}
      </body>
    </html>
  );
}
