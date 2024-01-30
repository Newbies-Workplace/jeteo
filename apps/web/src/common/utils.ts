import "dayjs/locale/pl";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatFromToDates = (from: string, to: string): string => {
  dayjs.locale("pl");

  const fromDate = dayjs
    .utc(from)
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const toDate = dayjs
    .utc(to)
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone);

  if (fromDate.isSame(toDate, "day")) {
    return `${fromDate.format("D MMMM YYYY, HH:mm")} do ${toDate.format(
      "HH:mm"
    )}`;
  } else {
    return `${fromDate.format("D MMMM YYYY, HH:mm")} do ${toDate.format(
      "D MMMM, HH:mm"
    )}`;
  }
};

export const formatStartDate = (from: string): string => {
  dayjs.locale("pl");

  const fromDate = dayjs
    .utc(from)
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone);

  return `${fromDate.format("D MMMM YYYY, HH:mm")}`;
};
