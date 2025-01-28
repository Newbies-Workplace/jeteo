"use client";

import CalendarIcon from "@/assets/calendar-primary.svg";
import dayjs from "dayjs";
import Button from "@/components/atoms/button/Button";
import { logEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface CalendarButtonProps {
  id: string;
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
        logEvent("reminder_add", {
          event_id: props.id,
        });

        window.open(googleCalendarUrl, "_blank");
      }}
      className={cn("border-0 font-bold text-primary", props.className)}
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
