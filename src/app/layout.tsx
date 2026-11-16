import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fastship.Africa redesign concept · Muizz Jamiu",
  description:
    "An unofficial redesign concept of fastship.africa. Not affiliated with Fastship.Africa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
