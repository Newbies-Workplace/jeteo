import dayjs from "dayjs";

export const Validations = {
  required: "To pole jest wymagane.",
  minLength: (min: number) => ({
    value: min,
    message: `Minimalna ilość znaków: ${min}.`,
  }),
  maxLength: (min: number) => ({
    value: min,
    message: `Maksymalna ilość znaków: ${min}.`,
  }),
  email: {
    value: /\S+@\S+\.\S+/,
    message: "Niepoprawny adres email.",
  },
  youtubeVideoLink: {
    value:
      /^https:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/,
    message: "Niepoprawny link do filmu.",
  },
  dateRange: (from: string, to: string) => {
    const fromDateTime = dayjs(from);
    const toDateTime = dayjs(to);

    if (fromDateTime.isAfter(toDateTime)) {
      return "Rozpoczęcie nie może być później niż zakończenie.";
    }
    return true;
  },
};
