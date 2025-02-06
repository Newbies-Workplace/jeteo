"use client";

import React from "react";
import { Text } from "@/components/atoms/text/Text";
import { EventResponse } from "shared/model/event/response/event.response";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { CalendarButton } from "@/components/atoms/calendarButton/CalendarButton";
import {
  actionClassName,
  ActionsContainer,
} from "@/components/molecules/cardActions/ActionsContainer";
import { cn } from "@/lib/utils";

export const EventCardActionsFuture: React.FC<{ event: EventResponse }> = ({
  event,
}) => {
  dayjs.extend(relativeTime);
  dayjs.locale("pl");

  const timeLeft = dayjs().to(event.from, true);

  return (
    <ActionsContainer>
      <CalendarButton
        id={event.id}
        name={event.title}
        startTime={event.from}
        endTime={event.to}
        location={
          event.address
            ? `${event.address.city} ${event.address.place}`
            : "online"
        }
        className={actionClassName}
      />

      <Text bold className={cn(actionClassName, "bg-white")}>
        Rozpoczęcie za {timeLeft}
      </Text>
    </ActionsContainer>
  );
};

export const EventCardActionsLive: React.FC<{
  event: EventResponse;
}> = ({ event }) => {
  dayjs.extend(relativeTime);
  dayjs.locale("pl");

  const timeLeft = dayjs(event.to).fromNow(true);

  return (
    <ActionsContainer>
      <RateButton eventSlug={event.slug} />

      <Text className={cn(actionClassName, "text-white bg-live")} bold>
        Na żywo, {timeLeft} do zakończenia
      </Text>
    </ActionsContainer>
  );
};

export const EventCardActionsFresh: React.FC<{ event: EventResponse }> = ({
  event,
}) => {
  return (
    <ActionsContainer>
      <RateButton eventSlug={event.slug} />

      <EventRating event={event} />
    </ActionsContainer>
  );
};

export const EventCardActionsArchive: React.FC<{ event: EventResponse }> = ({
  event,
}) => {
  return (
    <ActionsContainer>
      <EventRating event={event} />
    </ActionsContainer>
  );
};

const RateButton: React.FC<{ eventSlug: string }> = ({ eventSlug }) => {
  return (
    <Link
      className={cn(
        actionClassName,
        "cursor-pointer text-white bg-live hover:bg-liveHover"
      )}
      href={`/events/${eventSlug}#rate`}
      onClick={(e) => e.stopPropagation()}
    >
      <Text bold className={"text-md"}>
        Kliknij aby ocenić
      </Text>
    </Link>
  );
};

const EventRating: React.FC<{ event: EventResponse }> = ({ event }) => {
  return (
    <Text
      className={cn(actionClassName, "text-white bg-[#080736] justify-between")}
      bold
    >
      <span className="rateAverage">Średnia ocena</span>

      <div className="stars">{event.ratingSummary.average.toFixed(2)}</div>
    </Text>
  );
};
