import React from "react";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import styles from "./EventCard.module.scss";
import { Tag } from "@/components/atoms/tag/Tag";
import LocationIcon from "@/assets/location.svg";
import ClockIcon from "@/assets/clock.svg";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import { EventResponse } from "shared/.dist/model/event/response/event.response";
import {
  EventCardActionsArchive,
  EventCardActionsFresh,
  EventCardActionsFuture,
  EventCardActionsLive,
} from "@/components/molecules/cardActions/EventCardActions";

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

export const SmartEventCard: React.FC<{ event: EventResponse }> = ({
  event,
}) => {
  const now = dayjs();
  const start = dayjs(event.from);
  const end = dayjs(event.to);
  const freshnessEnd = dayjs(event.from).add(2, "day");

  const isFuture = now.isBefore(start);
  const isLive = now.isAfter(start) && now.isBefore(end);
  const isFresh = now.isAfter(end) && now.isBefore(freshnessEnd);
  const isArchive = now.isAfter(freshnessEnd);

  return (
    <EventCard
      title={event.title}
      subtitle={event.subtitle}
      host={{
        name: event.host.name,
        avatar: event.host.avatar,
      }}
      place={
        event.address
          ? event.address.city + ", " + event.address.place
          : undefined
      }
      tags={event.tags}
      startDate={event.from}
    >
      {isFuture && <EventCardActionsFuture event={event} />}
      {isFresh && <EventCardActionsFresh event={event} />}
      {isArchive && <EventCardActionsArchive event={event} />}
      {isLive && <EventCardActionsLive event={event} />}
    </EventCard>
  );
};
