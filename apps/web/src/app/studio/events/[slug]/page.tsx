import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { Text } from "@/components/atoms/text/Text";
import styles from "./page.module.scss";
import { getEvent } from "@/common/getEvent";
import { notFound } from "next/navigation";
import React from "react";
import { getEventLectures } from "@/common/getLecture";
import { EventLecturesForm } from "@/components/organisms/eventForm/lectures/EventLecturesForm";
import Link from "next/link";
import { DeleteEventCard } from "@/app/studio/events/[slug]/DeleteEventCard";

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
        <Link href={`/events/${event.slug}`}>
          <StudioFunctionCard title="Zobacz" subtitle="wydarzenie" />
        </Link>
        <Link href={`/studio/events/edit/${event.slug}/basic`}>
          <StudioFunctionCard title="Edytuj" subtitle="wydarzenie" />
        </Link>
        <DeleteEventCard eventId={event.id} />
      </div>

      <Text variant="headL" style={{ marginTop: 16, marginBottom: 16 }}>
        Prelekcje
      </Text>

      <EventLecturesForm eventSlug={params.slug} lectures={lectures} />
    </div>
  );
}
