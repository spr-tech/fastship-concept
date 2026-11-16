import Image from "next/image";
import fastshipLogoLight from "@/assets/images/brand/fastship-logo-light.png";
import { footer } from "@/data/footer";

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-text-on-dark">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-10 px-5 pt-20 md:px-8">
        <div className="flex flex-col gap-4">
          <Image src={fastshipLogoLight} alt={footer.logoAlt} width={114} height={42} className="h-10.5 w-auto self-start" />
          <p className="max-w-80 leading-[1.6] text-text-on-dark-muted">{footer.tagline}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-16 gap-y-10 text-[15px]">
          {footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-1">
              <h2 className="font-bold text-accent">{column.title}</h2>
              {/* Rows are 44px touch targets, so the links sit a little further apart than in the design. */}
              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center underline-offset-4 transition-colors duration-200 hover:text-accent-on-dark hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p className="mx-auto mt-12 max-w-7xl px-5 text-[13px] text-text-on-dark-subtle md:px-8">{footer.conceptNotice}</p>

      {/* Flex centring lets the oversized word spill off both edges evenly on narrow screens,
          where text-align: center would push all the overflow to the right. */}
      <div
        aria-hidden="true"
        className="-mb-10 mt-16 flex justify-center font-display text-[clamp(120px,22vw,330px)] leading-[0.8] tracking-[2px] whitespace-nowrap text-accent"
      >
        {footer.wordmark}
      </div>
    </footer>
  );
}
