import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { Text } from "@/components/atoms/text/Text";
import styles from "./page.module.scss";
import { getEvent } from "@/common/getEvent";
import { notFound } from "next/navigation";
import { StudioLectureCard } from "@/components/molecules/studioLectureCard/StudioLectureCard";

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

      <StudioLectureCard
        from="2023-08-16T17:19:08.398Z"
        to="2023-08-16T17:19:08.398Z"
        title="Pogadajmy o Formule 1"
        description="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />
      <StudioLectureCard
        from="2023-08-16T17:19:08.398Z"
        to="2023-08-16T17:19:08.398Z"
        title="Pogadajmy o Formule 1"
        description="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />
      <StudioLectureCard
        from="2023-08-16T17:19:08.398Z"
        to="2023-08-16T17:19:08.398Z"
        title="Pogadajmy o Formule 1"
        description="kto zatrzyma maxa verstappena?"
        speakers={[]}
      />
    </div>
  );
}
