import { IconButton } from "../../iconButton/IconButton";
import CallendarIcon from "@/assets/calendar.svg";
import Button from "../Button";
import styles from "./CallendarButton.module.scss";
interface EventProps {
  name: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  location: string;
  className?: string;
}

function generateGoogleCalendarUrl(event: EventProps): string {
  const { startTime, endTime, timeZone, name, location } = event;
  const startDateTime = startTime;
  const endDateTime = endTime;

  const encodedName = encodeURIComponent(event.name);
  const encodedLocation = encodeURIComponent(event.location);

  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedName}&dates=${startDateTime}/${endDateTime}&details=${encodedLocation}&location=${encodedLocation}&ctz=Europe/Warsaw&sf=true&output=xml`;

  return calendarUrl;
}

const BasicCallendarButton = (event: EventProps) => {
  const googleCalendarUrl = generateGoogleCalendarUrl(event);
  console.log("Google Calendar URL:", googleCalendarUrl);

  return (
    <Button
      leftIcon={CallendarIcon}
      size="small"
      onClick={() => {
        console.log("calendar");
        window.open(googleCalendarUrl, "_blank");
      }}
    //   className={styles.callendarButton}
    className={event.className}
    >
      Dodaj do kalendarza
    </Button>
  );
};

export default BasicCallendarButton;
