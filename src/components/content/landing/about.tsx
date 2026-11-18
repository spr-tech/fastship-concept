import DesktopOnlyImage from "@/components/ui/image/desktopOnlyImage";
import Reveal from "@/components/ui/reveal/reveal";
import Text from "@/components/ui/typography/text";
import { about } from "@/data/about";
import { cn } from "@/utilities/helpers/cn";

// Each problem card leans a little, like cards dropped on a table. Uses the rotate property, so the
// hover lift (translate) can't undo the tilt.
const cardTilts = ["-rotate-[1.5deg]", "rotate-1", "-rotate-[0.8deg]"];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 pt-section-lg pb-section-md md:px-8">
      <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
        <div className="min-w-0 flex-[1_1_480px]">
          <Reveal>
            <Text variant="section" id="about-title" className="max-w-225">
              {about.title}
            </Text>
          </Reveal>
          <Reveal index={1}>
            <Text variant="lead" tone="body" className="mt-5 max-w-140">
              {about.intro}
            </Text>
          </Reveal>
        </div>

        {/* Desktop only, as in the design. DesktopOnlyImage stops phones downloading it at all. */}
        <Reveal
          index={1}
          className="relative aspect-4/5 max-w-84 flex-[1_1_260px] rotate-[1.5deg] overflow-hidden rounded-card-lg shadow-card max-md:hidden"
        >
          <DesktopOnlyImage src={about.image.src} alt={about.image.alt} hiddenBelow="(width < 768px)" sizes="336px" />
        </Reveal>
      </div>

      <ol className="mt-block grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
        {about.problems.map((problem, index) => (
          <Reveal
            key={problem.title}
            as="li"
            index={index}
            className={cn("lift rounded-card bg-ink p-card text-text-on-dark", cardTilts[index])}
          >
            {/* Hidden from screen readers: the ordered list already announces "1 of 3". */}
            <span aria-hidden="true" className="block">
              <Text variant="number" tone="accentFill">
                {String(index + 1).padStart(2, "0")}
              </Text>
            </span>
            <Text variant="cardTitle" className="mt-4 mb-1.5">
              {problem.title}
            </Text>
            <Text variant="body" tone="onDarkMuted">
              {problem.description}
            </Text>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <Text variant="statement" className="mt-block">
          {about.statement[0]} <span className="text-accent-text">{about.statement[1]}</span>
        </Text>
      </Reveal>
    </section>
  );
}
