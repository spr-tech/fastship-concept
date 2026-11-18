import Reveal from "@/components/ui/reveal/reveal";
import Text from "@/components/ui/typography/text";
import { track } from "@/data/track";
import TrackForm from "./trackForm";

export default function TrackShipment() {
  return (
    <section id="track" aria-labelledby="track-title" className="mx-auto max-w-7xl px-5 pt-section-xs md:px-8">
      <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-card-lg border border-border bg-surface p-6">
        <div className="flex-[1_1_280px]">
          <Text variant="displaySm" id="track-title">
            {track.title}
          </Text>
          <Text variant="body" tone="body" className="mt-2">
            {track.intro}
          </Text>
        </div>

        <TrackForm track={track} />
      </Reveal>
    </section>
  );
}
