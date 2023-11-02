import styles from "./StudioLectureCard.module.scss";
import React from "react";
import Image from "next/image";
import Delete from "@/assets/delete.svg";
import Edit from "@/assets/edit.svg";
import { Text } from "@/components/atoms/text/Text";
import {
  SpeakerCard,
  SpeakerCardProps,
} from "@/components/molecules/speakerCard/SpeakerCard";
import { Timer } from "@/components/molecules/timer/Timer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { myFetch } from "@/common/fetch";
import { getIdFromSlug } from "shared/util";
import toast from "react-hot-toast";

interface StudioLectureCardProps {
  eventSlug: string;
  lectureSlug: string;
  from: string;
  to: string;
  title: string;
  description: string;
  speakers: SpeakerCardProps[];
}

export const StudioLectureCard: React.FC<StudioLectureCardProps> = ({
  eventSlug,
  lectureSlug,
  from,
  to,
  title,
  description,
  speakers,
}) => {
  const router = useRouter();
  const navigateToSummary = () => {
    router.replace(
      `/studio/events/${eventSlug}/lectures/${lectureSlug}/summary`
    );
  };

  const onDeleteClick = () => {
    toast.promise(
      myFetch(`/rest/v1/lectures/${getIdFromSlug(lectureSlug)}`, {
        method: "DELETE",
      }).then((r) => {
        router.refresh();
      }),
      {
        loading: "Usuwanie...",
        success: <b>Prelekcję usunięto pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  return (
    <div className={styles.content}>
      <Timer from={from} to={to} />
      <div className={styles.card} onClick={navigateToSummary}>
        <div className={styles.description}>
          <div className={styles.titles}>
            <Text variant="headS" bold>
              {title}
            </Text>
            <Text variant="bodyM">{description}</Text>
          </div>

          {speakers.length >= 1 && (
            <div className={styles.speakers}>
              {speakers.map((item) => {
                return (
                  <SpeakerCard
                    key={item.name}
                    avatar={item.avatar}
                    name={item.name}
                    jobTitle={item.jobTitle}
                    socials={item.socials}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Link
            className={styles.action}
            href={`/studio/events/edit/${eventSlug}/lectures/edit/${lectureSlug}/basic`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={Edit} alt={"Edit"} width={24} height={24} />
          </Link>

          <Image
            className={styles.action}
            src={Delete}
            alt={"Delete"}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick();
            }}
            width={24}
            height={24}
          />
          <div className={styles.cardOverwrite} />
        </div>
      </div>
    </div>
  );
};
