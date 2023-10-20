"use client";

import React from "react";
import styles from "./EventLecturesForm.module.scss";
import { StudioLectureCard } from "@/components/molecules/studioLectureCard/StudioLectureCard";
import Link from "next/link";
import Button from "@/components/atoms/button/Button";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";

const baseUrl: string = process.env["NEXT_PUBLIC_FRONTEND_URL"];

export const EventLecturesForm: React.FC<{
  eventSlug: string;
  lectures: LectureResponse[];
}> = ({ eventSlug, lectures }) => {
  return (
    <div className={styles.content}>
      <div className={styles.lectures}>
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
      <div className={styles.buttons}>
        <Link
          href={`${baseUrl}/studio/events/edit/${eventSlug}/lectures/create`}
        >
          <Button>Dodaj</Button>
        </Link>
      </div>
    </div>
  );
};
