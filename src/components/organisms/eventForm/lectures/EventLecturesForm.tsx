"use client";

import React from "react";
import { StudioLectureCard } from "@/components/molecules/studioLectureCard/StudioLectureCard";
import Link from "next/link";
import Button from "@/components/atoms/button/Button";
import { LectureResponse } from "@/lib/models/lecture.response";

export const EventLecturesForm: React.FC<{
  eventSlug: string;
  lectures: LectureResponse[];
}> = ({ eventSlug, lectures }) => {
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex flex-col items-center gap-3 w-full">
        {lectures.map((lecture) => (
          <StudioLectureCard
            eventSlug={eventSlug}
            lectureSlug={lecture.slug}
            key={lecture.id}
            title={lecture.title}
            description={lecture.description}
            speakers={[
              ...lecture.speakers.map((speaker) => ({
                name: speaker.name,
                avatar: speaker.avatar,
                jobTitle: speaker.jobTitle,
              })),
              ...lecture.invites,
            ]}
            from={lecture.from}
            to={lecture.to}
          />
        ))}
      </div>
      <div className="flex">
        <Link href={`/studio/events/edit/${eventSlug}/lectures/create`}>
          <Button>Dodaj</Button>
        </Link>
      </div>
    </div>
  );
};
