import React from "react";
import styles from "./LectureCard.module.scss";
import { SpeakerCard, SpeakerCardProps } from "./SpeakerCard/SpeakerCard";
import { Text } from "@/components/atoms/text/Text";
import { Timer } from "@/components/molecules/timer/Timer";
import { LectureResponse } from "shared/.dist/model/lecture/response/lecture.response";
import { LectureRateAction } from "@/components/molecules/lectureCard/RateAction/LectureRateAction";

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
  openRate?: () => void;
}> = ({ lecture, openRate }) => {
  return (
    <LectureCard
      from={lecture.from}
      to={lecture.to}
      title={lecture.title}
      description={lecture.description}
      speakers={[...lecture.speakers, ...lecture.invites]}
    >
      {lecture._metadata.canBeRated && <LectureRateAction onPress={openRate} />}
    </LectureCard>
  );
};
