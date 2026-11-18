import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import Text from "@/components/ui/typography/text";
import { conceptLinks } from "@/data/links";
import type { TwoLineHeading } from "@/models/shared";
import { cn } from "@/utilities/helpers/cn";

/** "or with email", with a rule on each side. */
export function OrDivider({ text }: { text: string }) {
  return (
    <div className="my-6 flex items-center gap-3.5 text-small text-text-muted">
      <span aria-hidden="true" className="h-px flex-1 bg-border-strong" />
      {text}
      <span aria-hidden="true" className="h-px flex-1 bg-border-strong" />
    </div>
  );
}

/** A plain text link styled in the orange that passes contrast on cream. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={cn("font-bold text-accent-text underline underline-offset-2", className)}>
      {children}
    </a>
  );
}

type PanelHeadingProps = {
  logo: StaticImageData;
  logoAlt: string;
  title: TwoLineHeading;
  /** Colour class for the second headline line. */
  secondLineClassName: string;
  text: string;
  textClassName?: string;
};

/** Logo and headline block shared by both brand panels. The logo links back to the landing page. */
export function PanelHeading({ logo, logoAlt, title, secondLineClassName, text, textClassName }: PanelHeadingProps) {
  return (
    <>
      <a href={conceptLinks.home} className="self-start rounded-full">
        <Image src={logo} alt={logoAlt} width={98} height={36} loading="eager" className="h-8 w-auto lg:h-9" />
      </a>
      <div>
        {/* Each line rises from below its own clipping box, the second a moment after the first. */}
        <Text variant="authTitle">
          <span className="block overflow-hidden">
            <span className="block animate-rise">{title[0]}</span>{" "}
          </span>
          <span className="block overflow-hidden">
            <span className={cn("block animate-rise [animation-delay:120ms]", secondLineClassName)}>{title[1]}</span>
          </span>
        </Text>
        <Text variant="lead" className={cn("mt-4 max-w-105 animate-fade-up [animation-delay:300ms]", textClassName)}>
          {text}
        </Text>
      </div>
    </>
  );
}
