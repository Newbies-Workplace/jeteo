'use client';
import CalendarIcon from "@/assets/calendar-primary.svg";
import Button from "../Button";
import cs from "classnames";
import styles from "./CalendarButton.module.scss";
import dayjs from "dayjs";
interface EventProps {
  name: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  location: string;
  className?: string;
}

function generateGoogleCalendarUrl(event: EventProps): string {

  function parseDataTime(date: string) {
    return dayjs(date).format("YYYYMMDDTHHmmss");
  }

  const { startTime, endTime } = event;
  const startDateTime = parseDataTime(startTime);
  const endDateTime = parseDataTime(endTime);

 
  

  const encodedName = encodeURIComponent(event.name);
  const encodedLocation = encodeURIComponent(event.location);

  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedName}&dates=${startDateTime}/${endDateTime}&details=${encodedLocation}&location=${encodedLocation}&ctz=Europe/Warsaw&sf=true&output=xml`;

  return calendarUrl;
}

const BasicCalendarButton = (event: EventProps) => {
  const googleCalendarUrl = generateGoogleCalendarUrl(event);
  console.log("Google Calendar URL:", googleCalendarUrl);

  return (
    <Button
      leftIcon={CalendarIcon}
      size="small"
      onClick={() => {
        window.open(googleCalendarUrl, "_blank");
      }}
      className={cs(styles.calendarButton, event.className)}
    >
      Dodaj do kalendarza
    </Button>
  );
};

export default BasicCalendarButton;
