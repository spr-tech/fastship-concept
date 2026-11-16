import Badge from "@/components/ui/badge/badge";
import Button from "@/components/ui/button/button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons/icons";
import Text from "@/components/ui/typography/text";
import { hero } from "@/data/hero";
import ComparisonCard from "./comparisonCard";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-7xl px-5 pt-12 pb-20 md:px-8">
      <Badge text={hero.badge} hasPulse />

      {/* The headline is plain text, so it is the LCP (Largest Contentful Paint) element and paints
          with the first HTML. Each line has its own clipping box for the rise-in added in Part 10. */}
      <Text variant="hero" id="hero-title" className="mt-7">
        <span className="block overflow-hidden">
          <span className="block">{hero.title[0]}</span>
        </span>
        <span className="block overflow-hidden">
          <span className="block text-accent">{hero.title[1]}</span>
        </span>
      </Text>

      <div className="mt-14 flex flex-wrap items-start gap-12">
        <div className="min-w-0 flex-[1_1_380px]">
          <Text variant="leadLg" tone="body" className="max-w-120">
            {hero.intro}
          </Text>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              text={hero.primaryCta.label}
              href={hero.primaryCta.href}
              variant="accent"
              endIcon={<ArrowRightIcon size={18} />}
            />
            <Button text={hero.secondaryCta.label} href={hero.secondaryCta.href} variant="outline" />
          </div>

          <ul className="mt-10 flex flex-wrap gap-6 text-sm text-text-body">
            {hero.checks.map((check) => (
              <li key={check} className="flex items-center gap-2">
                <CheckIcon size={18} className="shrink-0 text-accent-text" />
                {check}
              </li>
            ))}
          </ul>
        </div>

        <ComparisonCard />
      </div>
    </section>
  );
}
