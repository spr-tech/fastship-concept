import Button from "@/components/ui/button/button";
import { ArrowUpRightIcon } from "@/components/ui/icons/icons";
import Text from "@/components/ui/typography/text";
import { closingCta } from "@/data/cta";

export default function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-7xl px-5 pb-section-xl md:px-8">
      <div className="relative isolate overflow-hidden rounded-card-lg bg-accent p-[clamp(2rem,5vw,4rem)] text-ink">
        {/* Large faint arrow in the corner. Part 10 makes it bob. */}
        <ArrowUpRightIcon size={210} strokeWidth={0.6} className="absolute -top-6 -right-6 -z-10 size-28 opacity-18 sm:size-52" />
        <Text variant="closing" id="cta-title" className="max-w-200">
          {closingCta.title}
        </Text>
        <Text variant="lead" className="mt-5 max-w-130 font-medium">
          {closingCta.text}
        </Text>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Button text={closingCta.primary.label} href={closingCta.primary.href} variant="dark" />
          <Button text={closingCta.secondary.label} href={closingCta.secondary.href} variant="outline" />
        </div>
      </div>
    </section>
  );
}
