import Text from "@/components/ui/typography/text";
import { track } from "@/data/track";
import TrackForm from "./trackForm";

export default function TrackShipment() {
  return (
    <section id="track" aria-labelledby="track-title" className="mx-auto max-w-7xl px-5 pt-10 md:px-8">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-5 rounded-[28px] border border-border bg-surface p-7">
        <div className="flex-[1_1_280px]">
          <Text variant="displaySm" id="track-title">
            {track.title}
          </Text>
          <Text variant="body" tone="body" className="mt-2.5">
            {track.intro}
          </Text>
        </div>

        <TrackForm track={track} />
      </div>
    </section>
  );
}
