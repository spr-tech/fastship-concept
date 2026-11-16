import Image from "next/image";
import fastshipLogo from "@/assets/images/brand/fastship-logo.png";
import Button from "@/components/ui/button/button";
import { ArrowRightIcon } from "@/components/ui/icons/icons";
import { navigation } from "@/data/navigation";
import { cn } from "@/utilities/helpers/cn";
import MobileMenu from "./mobileMenu";

type SiteHeaderProps = {
  /** The nav link marked as the current page. */
  activeHref?: string;
};

/**
 * The floating glass bar. Everything here is server-rendered; only the mobile menu button and its
 * panel ship JavaScript.
 */
export default function SiteHeader({ activeHref = navigation.homeHref }: SiteHeaderProps) {
  return (
    <header className="sticky top-2 z-30 px-3 pt-2 nav:top-3 nav:px-6 nav:pt-3">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-ink/8 bg-surface/78 py-1.5 pr-1.5 pl-4.5 shadow-glass backdrop-blur-lg backdrop-saturate-140 nav:gap-4 nav:p-2 nav:pl-6">
        {/* Plain anchors for in-page links: the browser scrolls and moves focus natively, with no router JavaScript. */}
        <a href={navigation.homeHref} className="flex shrink-0 items-center rounded-full">
          <Image
            src={fastshipLogo}
            alt={navigation.logoAlt}
            width={98}
            height={36}
            loading="eager"
            className="h-8 w-auto nav:h-9"
          />
        </a>

        <nav aria-label={navigation.label} className="hidden items-center justify-center gap-0.5 text-[15px] nav:flex">
          {navigation.links.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3.5 transition-colors duration-200 hover:bg-ink/6 hover:text-ink",
                  isActive ? "font-semibold text-ink" : "font-medium text-text-muted",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 nav:flex">
          <Button text={navigation.logIn.label} href={navigation.logIn.href} variant="subtle" size="sm" />
          <Button
            text={navigation.signUp.label}
            href={navigation.signUp.href}
            variant="dark"
            size="sm"
            endIcon={<ArrowRightIcon size={16} />}
          />
        </div>

        <MobileMenu navigation={navigation} activeHref={activeHref} className="nav:hidden" />
      </div>
    </header>
  );
}
