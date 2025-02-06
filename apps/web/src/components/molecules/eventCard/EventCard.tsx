import React from "react";
import { Text } from "@/components/atoms/text/Text";
import Image from "next/image";
import { Tag } from "@/components/atoms/tag/Tag";
import LocationIcon from "@/assets/location.svg";
import ClockIcon from "@/assets/clock.svg";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import { EventResponse } from "shared/model/event/response/event.response";
import {
  EventCardActionsArchive,
  EventCardActionsFresh,
  EventCardActionsFuture,
  EventCardActionsLive,
} from "@/components/molecules/cardActions/EventCardActions";
import { formatStartDate } from "@/lib/dates";

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
  color: string;
  coverImage?: string;
  children?: React.ReactNode;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  host,
  place,
  startDate,
  tags,
  color,
  coverImage,
  children,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 p-4 rounded-2xl relative text-white">
      <div
        className="absolute inset-0 z-[2] rounded-2xl bg-cover bg-center opacity-35"
        style={{
          backgroundImage: coverImage ? `url('${coverImage}')` : undefined,
        }}
      />
      <div
        className="absolute inset-0 z-[1] rounded-2xl"
        style={{
          background: `linear-gradient(to right, ${color}, #4340BE)`,
        }}
      />
      <div className="z-[3] flex justify-between items-start w-full flex-wrap gap-2">
        <div className="flex flex-col items-start gap-1 min-w-[260px] flex-1">
          <Text variant="headM" bold className="w-full break-words mr-5">
            {title}
          </Text>
          {subtitle && (
            <Text variant="bodyM" className="w-full">
              {subtitle}
            </Text>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Text variant="bodyS">{host.name}</Text>
          <Avatar src={host.avatar} size={32} />
        </div>
      </div>
      <div className="z-[3] flex justify-between items-center w-full flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          {place !== undefined && (
            <div className="flex items-center gap-1">
              <Image src={LocationIcon} alt="location" />
              <Text variant="bodyS" className="flex gap-2">
                {place}
              </Text>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Image src={ClockIcon} alt="time" />
            <Text variant="bodyS" className="flex gap-2">
              {formatStartDate(startDate)}
            </Text>
          </div>
        </div>
        {tags.length > 0 && (
          <div className="flex justify-end flex-wrap gap-1">
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
      color={event.primaryColor}
      coverImage={event.coverImage}
    >
      <div className="z-[3] w-full">
        {isFuture && <EventCardActionsFuture event={event} />}
        {isFresh && <EventCardActionsFresh event={event} />}
        {isArchive && <EventCardActionsArchive event={event} />}
        {isLive && <EventCardActionsLive event={event} />}
      </div>
    </EventCard>
  );
};
