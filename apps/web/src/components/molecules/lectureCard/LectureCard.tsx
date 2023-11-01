import React from "react";
import styles from "./LectureCard.module.scss";
import {
  SpeakerCard,
  SpeakerCardProps,
} from "@/components/molecules/speakerCard/SpeakerCard";
import { Text } from "@/components/atoms/text/Text";
import { Timer } from "@/components/molecules/timer/Timer";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import {
  LectureCardActionsArchive,
  LectureCardActionsFresh,
  LectureCardActionsLive,
} from "@/components/molecules/cardActions/LectureCardActions";
import dayjs from "dayjs";

interface LectureProps {
  from: string;
  to: string;
  title: string;
  description: string;
  speakers: SpeakerCardProps[];
  children?: React.ReactNode;
}

export const LectureCard: React.FC<LectureProps> = ({
  from,
  to,
  title,
  description,
  speakers,
  children,
}) => {
  return (
    <div className={styles.content}>
      <Timer from={from} to={to} />
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <Text variant="headS" bold>
            {title}
          </Text>
          <Text variant="headS">{description}</Text>
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

        {children}
      </div>
    </div>
  );
};

export const SmartLectureCard: React.FC<{
  lecture: LectureResponse;
}> = ({ lecture }) => {
  const now = dayjs();
  const start = dayjs(lecture.from);
  const end = dayjs(lecture.to);
  const freshnessEnd = dayjs(lecture.from).add(2, "day");

  const isLive = now.isAfter(start) && now.isBefore(end);
  const isFresh = now.isAfter(end) && now.isBefore(freshnessEnd);
  const isArchive = now.isAfter(freshnessEnd);

  return (
    <LectureCard
      from={lecture.from}
      to={lecture.to}
      title={lecture.title}
      description={lecture.description}
      speakers={[...lecture.speakers, ...lecture.invites]}
    >
      {isLive && <LectureCardActionsLive lecture={lecture} />}
      {isFresh && <LectureCardActionsFresh lecture={lecture} />}
      {isArchive && <LectureCardActionsArchive lecture={lecture} />}
    </LectureCard>
  );
};
