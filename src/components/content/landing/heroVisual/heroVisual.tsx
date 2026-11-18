import type { CSSProperties, ReactNode } from "react";
import { CheckIcon } from "@/components/ui/icons/icons";
import { hero } from "@/data/hero";
import { cn } from "@/utilities/helpers/cn";
import CompareCarriers from "./compareCarriers";
import DashboardWindow from "./dashboardWindow";
import HeroVisualMotion from "./heroVisualMotion";
import TrackingPhone from "./trackingPhone";

type LayerProps = {
  /** How far the layer drifts towards the pointer on desktop, in px. Front layers move most. */
  depth: number;
  /** Length of this layer's float loop, so the layers never bob in step. */
  floatSeconds: number;
  floatDelay?: number;
  className?: string;
  /** Classes for the floating element itself, e.g. its tilt. */
  floatClassName?: string;
  children: ReactNode;
};

/**
 * One layer of the drawing, built from two elements so the motions never fight over a property:
 * the outer one drifts with the pointer (transform), the inner one floats (translate) and holds the
 * layer's resting tilt (rotate).
 */
function Layer({ depth, floatSeconds, floatDelay = 0, className, floatClassName, children }: LayerProps) {
  return (
    <div className={cn("hero-layer", className)} style={{ "--depth": depth } as CSSProperties}>
      <div
        className={cn("hero-float", floatClassName)}
        style={{ "--float-duration": `${floatSeconds}s`, "--float-delay": `${floatDelay}s` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

function BenefitChip({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-surface/70 bg-surface/70 py-1.5 pr-3.5 pl-1.5 text-label font-semibold text-ink shadow-card backdrop-blur-xl backdrop-saturate-150">
      <span className="flex size-6 items-center justify-center rounded-full bg-accent text-ink">
        <CheckIcon size={13} />
      </span>
      {text}
    </span>
  );
}

/**
 * The layered drawing beside the hero copy, built in code with no images except the logo mark.
 * Screen readers get one sentence; everything drawn is aria-hidden. On phones it is the dashboard
 * and the compare card only. The headline stays the page's LCP element: nothing here is larger.
 */
export default function HeroVisual() {
  const { visual } = hero;
  // Two of Fastship's real benefits, from the checks under the hero copy.
  const [doorstep, , insurance] = hero.checks;

  return (
    <figure className="relative w-full min-w-0 flex-[1.15_1_460px] animate-fade-up [animation-delay:450ms] [animation-duration:800ms] lg:max-w-150">
      <figcaption className="sr-only">{visual.label}</figcaption>

      <HeroVisualMotion>
        <div aria-hidden="true" className="relative pb-28 sm:pb-20 lg:aspect-[600/500] lg:pb-0">
          <Layer depth={6} floatSeconds={8} className="w-[94%] lg:absolute lg:top-[5%] lg:left-[11%] lg:w-[89%]" floatClassName="hero-tilt">
            <DashboardWindow dashboard={visual.dashboard} />
          </Layer>

          <Layer depth={20} floatSeconds={6} floatDelay={-2} className="absolute bottom-[1%] left-0 hidden w-[31%] lg:block" floatClassName="-rotate-5">
            <TrackingPhone phone={visual.phone} />
          </Layer>

          <Layer
            depth={14}
            floatSeconds={7}
            floatDelay={-4}
            className="absolute right-0 bottom-0 w-[66%] sm:w-[48%] lg:-right-[2%] lg:bottom-[2%] lg:w-[42%]"
            floatClassName="rotate-2"
          >
            <CompareCarriers compare={visual.compare} />
          </Layer>

          {doorstep && (
            <Layer depth={26} floatSeconds={5} floatDelay={-1} className="absolute top-0 right-[3%] hidden lg:block">
              <BenefitChip text={doorstep} />
            </Layer>
          )}
          {insurance && (
            <Layer depth={24} floatSeconds={6.5} floatDelay={-3} className="absolute bottom-[-3%] left-[27%] hidden lg:block">
              <BenefitChip text={insurance} />
            </Layer>
          )}
        </div>
      </HeroVisualMotion>
    </figure>
  );
}
