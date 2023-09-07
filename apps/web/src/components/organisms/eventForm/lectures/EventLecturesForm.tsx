"use client";

import React from "react";
import styles from "./EventLecturesForm.module.scss";
import { StudioLectureCard } from "@/components/molecules/studioLectureCard/StudioLectureCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/atoms/button/Button";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";

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
            speakers={lecture.speakers.map((speaker) => ({
              name: speaker.name,
              avatar: speaker.avatar,
            }))}
            from={lecture.from}
            to={lecture.to}
          />
        ))}
      </div>
      <div className={styles.buttons}>
        <Link href={`${usePathname()}/create`}>
          <Button>Dodaj</Button>
        </Link>
      </div>
    </div>
  );
};
