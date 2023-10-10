import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { Text } from "@/components/atoms/text/Text";
import styles from "./page.module.scss";
import { getEvent } from "@/common/getEvent";
import { notFound } from "next/navigation";
import { getEventLectures } from "@/common/getLecture";
import { EventLecturesForm } from "@/components/organisms/eventForm/lectures/EventLecturesForm";

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

      <Text variant="headL">Prelekcje</Text>
      <EventLecturesForm eventSlug={params.slug} lectures={lectures} />
    </div>
  );
}
