import fastshipLogo from "@/assets/images/brand/fastship-logo.png";
import { carriers } from "@/data/carriers";
import { navigation } from "@/data/navigation";
import type { SignUp } from "@/models/auth";
import { cn } from "@/utilities/helpers/cn";
import { PanelHeading } from "./authParts";

export default function SignUpPanel({ panel }: { panel: SignUp["panel"] }) {
  return (
    <>
      <PanelHeading
        logo={fastshipLogo}
        logoAlt={navigation.logoAlt}
        title={panel.title}
        secondLineClassName="text-bg"
        text={panel.text}
        textClassName="font-medium"
      />
      {/* Desktop only. Decorative: the paragraph above already names the five carriers. Part 10 makes them bob. */}
      <ul aria-hidden="true" className="flex max-w-120 flex-wrap gap-2.5 max-lg:hidden">
        {carriers.map((carrier, index) => (
          <li
            key={carrier.wordmark}
            className={cn(
              "rounded-full px-4 py-2.5 font-display text-band tracking-[0.5px]",
              index % 2 === 0 ? "bg-ink text-text-on-dark" : "bg-bg text-ink",
            )}
          >
            {carrier.wordmark}
          </li>
        ))}
      </ul>
    </>
  );
}
