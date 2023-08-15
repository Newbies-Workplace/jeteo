import dayjs from "dayjs";

export const formatFromToDates = (from: string, to: string): string => {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);

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
