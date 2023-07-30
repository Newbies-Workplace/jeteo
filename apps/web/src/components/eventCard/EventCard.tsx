import React from "react";
import { Text } from "@/components/text/Text";
import Image from "next/image";
import styles from "./EventCard.module.scss";
import { Tag } from "@/components/tag/Tag";
import defaultAvatar from "@/assets/images/default-profile-pic.svg";
import LocationIcon from "@/assets/location.svg";
import ClockIcon from "@/assets/clock.svg";

export interface EventCardProps {
  title: string;
  subtitle: string;
  host: {
    avatar?: string;
    name: string;
  };
  place: string;
  startDate: string;
  tags: string[];
  children?: React.ReactNode;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  host,
  place,
  startDate,
  tags,
  children,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.texts}>
          <Text variant={"headM"} bold className={styles.title}>
            {title}
          </Text>
          <Text variant={"bodyM"} className={styles.subtitle}>
            {subtitle}
          </Text>
        </div>
        <div className={styles.host}>
          <Text variant={"bodyS"}>{host.name}</Text>

          <Image
            src={host.avatar ?? defaultAvatar}
            alt={"avatar"}
            width={32}
            height={32}
            className={styles.avatar}
          />
        </div>
      </div>
      <div className={styles.mid}>
        <div className={styles.pins}>
          <div className={styles.pin}>
            <Image src={LocationIcon} alt={"location"} />
            <Text variant={"bodyS"} className={styles.place}>
              {place}
            </Text>
          </div>

          <div className={styles.pin}>
            <Image src={ClockIcon} alt={"time"} />
            <Text variant={"bodyS"} className={styles.date}>
              {startDate}
            </Text>
          </div>
        </div>

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
          </div>
        )}
      </div>

      {children}
    </div>
  );
};
