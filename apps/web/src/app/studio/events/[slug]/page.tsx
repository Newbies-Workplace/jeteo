import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { Text } from "@/components/atoms/text/Text";
import styles from "./page.module.scss";
import { getEvent } from "@/common/getEvent";
import { notFound } from "next/navigation";
import { StudioLectureCard } from "@/components/molecules/studioLectureCard/StudioLectureCard";
import React from "react";
import { getEventLectures } from "@/common/getLecture";

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  const lectures = await getEventLectures(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className={styles.content}>
      <StudioHeader title={event.title} />

      <div className={styles.cards}>
        <StudioFunctionCard
          href={`/events/${event.slug}`}
          title="Zobacz"
          subtitle="wydarzenie"
        />
        <StudioFunctionCard
          href={`/studio/events/edit/${event.slug}/basic`}
          title="Edytuj"
          subtitle="wydarzenie"
        />
        <StudioFunctionCard href="#" title="Usuń" subtitle="wydarzenie" />
      </div>

      <Text variant="headL" style={{ marginTop: 16, marginBottom: 16 }}>
        Prelekcje
      </Text>

      {lectures.map((lecture) => (
        <StudioLectureCard
          eventSlug={event.slug}
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
  );
}
