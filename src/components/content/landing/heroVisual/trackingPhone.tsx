import type { CSSProperties } from "react";
import type { HeroVisual } from "@/models/hero";

// Height of one timeline step, in rem. The fill line, dots and pulsing marker all step by this.
const STEP_REM = 2.5;

/**
 * Front-left layer of the hero visual: a phone tracking one parcel. --timeline (set by the motion
 * wrapper) says which step is current; earlier steps are filled in and the current one pulses.
 */
export default function TrackingPhone({ phone }: { phone: HeroVisual["phone"] }) {
  const lastStep = phone.steps.length - 1;

  return (
    <div className="rounded-[1.75rem] border border-ink-line bg-ink p-1.5 text-text-on-dark shadow-card">
      <div className="rounded-[1.4rem] bg-ink-raised px-3.5 pt-2.5 pb-4">
        <span className="mx-auto block h-1.5 w-12 rounded-full bg-ink-line" />

        <p className="mt-3 text-mock font-semibold text-text-on-dark-subtle">{phone.title}</p>
        <p className="mt-0.5 text-small font-bold">{phone.route}</p>
        <span className="mt-2 inline-flex rounded-full bg-accent px-2.5 py-0.5 text-mock font-bold text-ink">{phone.status}</span>

        <div className="relative mt-4">
          {/* The line between the first and last dot, and its orange fill growing down to the current step. */}
          <span
            className="absolute top-1.5 left-[0.3125rem] w-0.5 rounded-full bg-ink-line"
            style={{ height: `${lastStep * STEP_REM}rem` }}
          />
          <span
            className="absolute top-1.5 left-[0.3125rem] w-0.5 origin-top rounded-full bg-accent transition-[scale] duration-700 ease-hover"
            style={{ height: `${lastStep * STEP_REM}rem`, scale: `1 calc(var(--timeline) / ${lastStep})` }}
          />
          {/* The pulsing marker on the current step. */}
          <span
            className="absolute top-0 left-0 size-3 transition-[translate] duration-700 ease-hover"
            style={{ translate: `0 calc(var(--timeline) * ${STEP_REM}rem)` }}
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
            <span className="absolute inset-0 rounded-full bg-accent ring-2 ring-ink-raised" />
          </span>

          <ol>
            {phone.steps.map((step, index) => {
              // 1 for steps reached so far, 0 for steps still to come.
              const reached = `clamp(0, calc(var(--timeline) - ${index} + 1), 1)`;
              return (
                <li key={step} className="relative flex items-start gap-2.5" style={{ height: `${STEP_REM}rem` }}>
                  <span className="relative mt-0 size-3 shrink-0 rounded-full border-2 border-ink-line bg-ink-raised">
                    <span
                      className="absolute -inset-0.5 rounded-full bg-accent transition-opacity duration-500"
                      style={{ opacity: reached } as CSSProperties}
                    />
                  </span>
                  <span
                    className="-mt-0.5 text-mock font-semibold transition-opacity duration-500"
                    style={{ opacity: `clamp(0.45, calc(var(--timeline) - ${index} + 1), 1)` } as CSSProperties}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
