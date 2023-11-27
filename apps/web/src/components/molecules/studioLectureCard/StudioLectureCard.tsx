import styles from "./StudioLectureCard.module.scss";
import React, { useState } from "react";
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
import { IconButton } from "@/components/atoms/iconButton/IconButton";
import { ConfirmDialog } from "../confirmDialog/ConfirmDialog";
import { Portal } from "../portal/Portal";

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
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

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
      <div className={styles.card}>
        <div className={styles.description} onClick={navigateToSummary}>
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
            <IconButton icon={Edit} />
          </Link>

          <div
            className={styles.action}
            onClick={() => {
              setIsConfirmVisible(true);
            }}
          >
            <IconButton icon={Delete} />
          </div>
          <div className={styles.cardOverwrite} />

          {isConfirmVisible && (
            <Portal>
              <ConfirmDialog
                title={`Czy na pewno chcesz usunąć ${title}?`}
                description="Tej akcji nie można cofnąć"
                onDismiss={() => setIsConfirmVisible(false)}
                onConfirm={() => onDeleteClick()}
              />
            </Portal>
          )}
        </div>
      </div>
    </div>
  );
};
