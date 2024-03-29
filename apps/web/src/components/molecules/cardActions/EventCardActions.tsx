"use client";

import React from "react";
import styles from "./CardActions.module.scss";
import { Text } from "@/components/atoms/text/Text";
import cs from "classnames";
import { EventResponse } from "shared/model/event/response/event.response";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { CalendarButton } from "@/components/atoms/calendarButton/CalendarButton";

export const EventCardActionsFuture: React.FC<{ event: EventResponse }> = ({
  event,
}) => {
  dayjs.extend(relativeTime);
  dayjs.locale("pl");

  const timeLeft = dayjs().to(event.from, true);

  return (
    <div className={styles.actions}>
      <CalendarButton
        id={event.id}
        name={event.title}
        startTime={event.from}
        endTime={event.to}
        timeZone="Europe/Warsaw"
        location={
          event.address
            ? `${event.address.city} ${event.address.place}`
            : "online"
        }
        className={cs(styles.action, styles.stretched)}
      />

      <Text className={cs(styles.action, styles.stretched)} bold>
        Rozpoczęcie za {timeLeft}
      </Text>
    </div>
  );
};

export const EventCardActionsLive: React.FC<{
  event: EventResponse;
}> = ({ event }) => {
  dayjs.extend(relativeTime);
  dayjs.locale("pl");

  const timeLeft = dayjs(event.to).fromNow(true);

  return (
    <div className={styles.actions}>
      <RateButton event={event} />

      <Text className={cs(styles.action, styles.live, styles.stretched)} bold>
        Na żywo, {timeLeft} do zakończenia
      </Text>
    </div>
  );
};

export const EventCardActionsFresh: React.FC<{ event: EventResponse }> = ({
  event,
}) => {
  return (
    <div className={styles.actions}>
      <RateButton event={event} />

      <EventRating event={event} />
    </div>
  );
};

export const EventCardActionsArchive: React.FC<{ event: EventResponse }> = ({
  event,
}) => {
  return (
    <div className={styles.actions}>
      <EventRating event={event} />
    </div>
  );
};

const RateButton: React.FC<{ event: EventResponse }> = ({ event }) => {
  return (
    <Link
      className={cs(styles.action, styles.liveAction)}
      href={`/events/${event.slug}#rate`}
      onClick={(e) => e.stopPropagation()}
    >
      <Text bold>Kliknij aby ocenić</Text>
    </Link>
  );
};

const EventRating: React.FC<{ event: EventResponse }> = ({ event }) => {
  return (
    <Text className={cs(styles.action, styles.rate, styles.stretched)} bold>
      <span className={styles.rateAverage}>Średnia ocena</span>

      <div className={styles.stars}>
        {event.ratingSummary.average.toFixed(2)}
      </div>
    </Text>
  );
};
