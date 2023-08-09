import { EventResponse } from "shared/model/event/response/event.response";
import { myFetch } from "@/common/fetch";

export const getEvent = async (eventSlug: string): Promise<EventResponse> => {
  const eventId = eventSlug; //todo get id from slug
  const res = await myFetch(`/rest/v1/events/${eventId}`, {
    cache: "no-store",
  });
  if (!res.ok) return undefined;
  return res.json();
};
