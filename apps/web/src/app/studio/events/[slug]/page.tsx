import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { Text } from "@/components/atoms/text/Text";
import { LectureCard } from "@/components/molecules/lectureCard/LectureCard";
import styles from "./page.module.scss";
import { getEvent } from "@/common/getEvent";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
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

      <LectureCard
        startingHour="13:00"
        endingHour="14:00"
        title="Pogadajmy o Formule 1"
        subtitle="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />
      <LectureCard
        startingHour="13:00"
        endingHour="14:00"
        title="Pogadajmy o Formule 1"
        subtitle="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />
      <LectureCard
        startingHour="13:00"
        endingHour="14:00"
        title="Pogadajmy o Formule 1"
        subtitle="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />
    </div>
  );
}
