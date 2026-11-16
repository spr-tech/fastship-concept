"use client";

import { useState } from "react";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/field/input";
import { SearchIcon } from "@/components/ui/icons/icons";
import InfoNote from "@/components/ui/notice/infoNote";
import StatusMessage from "@/components/ui/notice/statusMessage";
import type { Track } from "@/models/track";

const NOTE_ID = "track-note";

type TrackFormProps = {
  track: Track;
};

// A client component of its own, rather than DemoNotice, because the design puts the
// "turned off" note between the button row and the status message.
export default function TrackForm({ track }: TrackFormProps) {
  const [isNoticeShown, setIsNoticeShown] = useState(false);

  return (
    <div className="flex min-w-0 flex-[2_1_420px] flex-col gap-2">
      <div className="flex flex-wrap items-end gap-2">
        <Input
          id="track-id"
          name="trackingId"
          label={track.inputLabel}
          placeholder={track.placeholder}
          describedBy={NOTE_ID}
          shape="pill"
          className="min-w-0 flex-[1_1_220px]"
        />
        <Button
          text={track.buttonText}
          variant="dark"
          startIcon={<SearchIcon size={18} />}
          onClick={() => setIsNoticeShown(true)}
        />
      </div>

      <InfoNote id={NOTE_ID} text={track.note} />

      <div role="status">{isNoticeShown && <StatusMessage message={track.notice} className="mt-1" />}</div>
    </div>
  );
}
