import React from "react";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import styles from "./EventCard.module.scss";
import { Tag } from "@/components/atoms/tag/Tag";
import LocationIcon from "@/assets/location.svg";
import ClockIcon from "@/assets/clock.svg";
import dayjs from "dayjs";
import { Avatar } from "@/components/atoms/avatar/Avatar";

export interface EventCardProps {
  title: string;
  subtitle?: string;
  host: {
    avatar?: string;
    name: string;
  };
  place?: string;
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
          {subtitle && (
            <Text variant={"bodyM"} className={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </div>
        <div className={styles.host}>
          <Text variant={"bodyS"}>{host.name}</Text>

          <Avatar src={host.avatar} size={32} />
        </div>
      </div>
      <div className={styles.mid}>
        <div className={styles.pins}>
          {place !== undefined && (
            <div className={styles.pin}>
              <Image src={LocationIcon} alt={"location"} />
              <Text variant={"bodyS"} className={styles.place}>
                {place}
              </Text>
            </div>
          )}

          <div className={styles.pin}>
            <Image src={ClockIcon} alt={"time"} />
            <Text variant={"bodyS"} className={styles.date}>
              {dayjs(startDate).format("D MMMM YYYY, HH:mm")}
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
