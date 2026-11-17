import Button from "@/components/ui/button/button";
import Text from "@/components/ui/typography/text";
import { howItWorks } from "@/data/steps";
import { cn } from "@/utilities/helpers/cn";

/** The wavy line behind the four step circles on desktop. Part 10 draws it in. */
function WavyLine() {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="absolute top-3 left-0 hidden h-10 w-full lg:block"
    >
      {/* non-scaling-stroke keeps the line 3px thick while the drawing stretches to the row's width. */}
      <path
        d="M20 20 C 200 -10, 400 50, 600 20 S 1000 -10, 1180 20"
        fill="none"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        className="stroke-accent"
      />
    </svg>
  );
}

/** The short vertical squiggle between steps on mobile. */
function Connector() {
  return (
    <svg width="24" height="52" viewBox="0 0 28 64" aria-hidden="true" focusable="false" className="mx-auto my-3 block lg:hidden">
      <path d="M14 0 C 28 16, 0 32, 14 48 S 14 64, 14 64" fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-accent" />
    </svg>
  );
}

export default function HowItWorks() {
  const lastIndex = howItWorks.steps.length - 1;

  return (
    <section id="how" aria-labelledby="how-title" className="mx-auto max-w-7xl px-5 pt-section-sm pb-section-xl md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <Text variant="eyebrow" tone="accent">
            {howItWorks.eyebrow}
          </Text>
          <Text variant="section" id="how-title" className="mt-2.5">
            <span className="block">{howItWorks.title[0]}</span>{" "}
            <span className="block">{howItWorks.title[1]}</span>
          </Text>
        </div>
        <Button text={howItWorks.cta.label} href={howItWorks.cta.href} variant="outline" size="md" />
      </div>

      <div className="relative mt-10 lg:mt-13">
        <WavyLine />
        {/* Mobile: one centred column with a squiggle between steps. Desktop: four across on the wavy line. */}
        <ol className="relative flex flex-col items-center text-center lg:grid lg:grid-cols-4 lg:items-start lg:gap-6 lg:text-left">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className={cn(
                  "mx-auto flex size-16 items-center justify-center rounded-full border-3 border-ink font-display text-display-step lg:mx-0",
                  index === lastIndex ? "bg-accent" : "bg-bg",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <Text variant="titleSm" className="mt-4 mb-1.5 lg:mt-5">
                {step.title}
              </Text>
              <Text variant="body" tone="body" className="mx-auto max-w-70 lg:mx-0 lg:max-w-none">
                {step.description}
              </Text>
              {index < lastIndex && <Connector />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
