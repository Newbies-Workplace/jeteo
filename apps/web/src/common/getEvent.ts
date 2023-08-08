import { EventResponse } from "shared/model/event/response/event.response";
import { myFetch } from "@/common/fetch";

export const getEvent = async (eventSlug: string): Promise<EventResponse> => {
  const res = await myFetch(
    `/rest/v1/events/${eventSlug}` //todo get id from slug
  );
  if (!res.ok) return undefined;
  return res.json();
};
