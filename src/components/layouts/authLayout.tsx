import type { ReactNode } from "react";
import { cn } from "@/utilities/helpers/cn";

type AuthLayoutProps = {
  /** Brand panel content: logo, headline, and anything desktop-only. */
  panel: ReactNode;
  panelTone: "ink" | "accent";
  /** The form column. */
  children: ReactNode;
};

const panelToneClasses = {
  ink: "bg-ink text-text-on-dark",
  accent: "bg-accent text-ink",
};

/**
 * Brand panel and form side by side on desktop (form left), stacked on phones (panel on top).
 *
 * The panel holds the page's h1, so it comes first in the HTML and is the page <header>; the form
 * is <main>. On desktop the panel stretches to the full page height and only its inner wrapper is
 * sticky, so it stays in view while the form scrolls. Making the panel itself sticky would stop it
 * stretching and leave a blank strip at the bottom of long pages.
 */
export default function AuthLayout({ panel, panelTone, children }: AuthLayoutProps) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row-reverse">
      <header className={cn("min-w-0 lg:flex-1", panelToneClasses[panelTone])}>
        <div className="relative flex flex-col justify-between gap-10 px-5 pt-6 pb-8 lg:sticky lg:top-0 lg:h-full lg:max-h-svh lg:min-h-150 lg:gap-12 lg:p-10">
          {panel}
        </div>
      </header>

      <main className="flex min-w-0 flex-1 items-center justify-center px-5 py-8 lg:px-10 lg:py-12">
        <div className="w-full max-w-110 animate-fade-up [animation-delay:200ms]">{children}</div>
      </main>
    </div>
  );
}
