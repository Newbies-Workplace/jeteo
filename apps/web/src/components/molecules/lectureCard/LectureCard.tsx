import React from "react";
import styles from "./LectureCard.module.scss";
import { SpeakerCard, SpeakerCardProps } from "./SpeakerCard/SpeakerCard";
import { Text } from "@/components/atoms/text/Text";
import { Timer } from "@/components/molecules/timer/Timer";

interface LectureProps {
  from: string;
  to: string;
  title: string;
  subtitle: string;
  speakers: SpeakerCardProps[];
  children?: React.ReactNode;
}

export const LectureCard: React.FC<LectureProps> = ({
  from,
  to,
  title,
  subtitle,
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
          <Text variant="headS">{subtitle}</Text>
        </div>

        {speakers.length >= 1 && (
          <div className={styles.speakers}>
            {speakers.map((item) => {
              return (
                <SpeakerCard
                  key={item.name}
                  avatar={item.avatar}
                  name={item.name}
                  description={item.description}
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
