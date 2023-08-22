import styles from "./StudioLectureCard.module.scss";
import React from "react";
import Image from "next/image";
import Delete from "@/assets/delete.svg";
import Edit from "@/assets/edit.svg";
import { Text } from "@/components/atoms/text/Text";
import {
  SpeakerCard,
  SpeakerCardProps,
} from "@/components/molecules/lectureCard/SpeakerCard/SpeakerCard";
import { Timer } from "@/components/molecules/timer/Timer";
import Link from "next/link";

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
  return (
    <div className={styles.content}>
      <Timer from={from} to={to} />
      <div className={styles.card}>
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
                    description={item.description}
                    socials={item.socials}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Link
            href={`/studio/events/edit/${eventSlug}/lectures/edit/${lectureSlug}/basic`}
          >
            <Image
              className={styles.action}
              src={Edit}
              alt={"Edit"}
              width={24}
              height={24}
            />
          </Link>

          <Image
            className={styles.action}
            src={Delete}
            alt={"Delete"}
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};
