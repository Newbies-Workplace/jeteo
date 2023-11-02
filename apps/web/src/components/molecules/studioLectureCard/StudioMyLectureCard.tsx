import React from "react";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import styles from "./StudioMyLectureCard.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import ChevronIcon from "@/assets/chevron-stroke.svg";
import { LectureCardActionsArchive } from "@/components/molecules/cardActions/LectureCardActions";
import Link from "next/link";
import { formatFromToDates } from "@/common/utils";
import { Label } from "@/components/atoms/label/Label";

export interface StudioMyLectureCardProps {
  lecture: LectureResponse;
}

export const StudioMyLectureCard: React.FC<StudioMyLectureCardProps> = ({
  lecture,
}) => {
  return (
    <Link
      href={`/studio/events/${lecture.event.slug}/lectures/${lecture.slug}/summary`}
      className={styles.card}
    >
      <div style={{ width: "100%" }}>
        <div className={styles.titleBar}>
          <Text variant="headS" bold>
            {lecture.title}
          </Text>

          <Label text={formatFromToDates(lecture.from, lecture.to)} />
        </div>

        <Text variant="bodyM" style={{ whiteSpace: "pre-line" }}>
          {lecture.description}
        </Text>
      </div>

      <Link href={`/events/${lecture.event.slug}`} className={styles.event}>
        <div className={styles.eventTexts}>
          <Text variant="bodyM" bold>
            {lecture.event.title}
          </Text>
          {lecture.event.subtitle && (
            <Text variant="bodyM">{lecture.event.subtitle}</Text>
          )}
        </div>

        <Image src={ChevronIcon} alt={""} />
      </Link>

      <LectureCardActionsArchive lecture={lecture} />
    </Link>
  );
};
