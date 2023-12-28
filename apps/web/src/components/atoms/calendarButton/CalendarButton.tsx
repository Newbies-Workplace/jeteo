"use client";

import CalendarIcon from "@/assets/calendar-primary.svg";
import cs from "classnames";
import styles from "./CalendarButton.module.scss";
import dayjs from "dayjs";
import Button from "@/components/atoms/button/Button";

interface CalendarButtonProps {
  name: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  location: string;
  className?: string;
}

export const CalendarButton = (props: CalendarButtonProps) => {
  const googleCalendarUrl = generateGoogleCalendarUrl(props);

  return (
    <Button
      leftIcon={CalendarIcon}
      size="small"
      onClick={(e) => {
        e.preventDefault();
        window.open(googleCalendarUrl, "_blank");
      }}
      className={cs(styles.calendarButton, props.className)}
    >
      Dodaj do kalendarza
    </Button>
  );
};

function generateGoogleCalendarUrl(event: CalendarButtonProps): string {
  function parseDataTime(date: string) {
    return dayjs(date).format("YYYYMMDDTHHmmss");
  }

  const { startTime, endTime } = event;
  const startDateTime = parseDataTime(startTime);
  const endDateTime = parseDataTime(endTime);

  const encodedName = encodeURIComponent(event.name);
  const encodedLocation = encodeURIComponent(event.location);

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedName}&dates=${startDateTime}/${endDateTime}&details=${encodedLocation}&location=${encodedLocation}&ctz=Europe/Warsaw&sf=true&output=xml`;
}
