import React from "react";
import styles from "./LectureCard.module.scss";
import { SpeakerCard, SpeakerCardProps } from "./SpeakerCard/SpeakerCard";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import time from "@/assets/clock.svg";

interface LectureProps {
  startingHour: string;
  endingHour: string;
  title: string;
  subtitle: string;
  speakers: SpeakerCardProps[];
  children?: React.ReactNode;
}

export const LectureCard: React.FC<LectureProps> = ({
  startingHour,
  endingHour,
  title,
  subtitle,
  speakers,
  children,
}) => {
  return (
    <div className={styles.content}>
      <div className={styles.timer}>
        <Image alt="time" src={time} width={16} height={16} />
        <Text variant="headS">
          {startingHour} - {endingHour}
        </Text>
      </div>

      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <Text variant="headS" bold>
            {title}
          </Text>
          <Text variant="headS">{subtitle}</Text>
        </div>

        {speakers.length > 1 && (
          <div className={styles.speakers}>
            {speakers.map((item) => {
              return (
                <SpeakerCard
                  key={item.name}
                  avatar={item.avatar}
                  name={item.name}
                  description={item.description}
                  mail={item.mail}
                  twitter={item.twitter}
                  linkedin={item.linkedin}
                  github={item.github}
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
