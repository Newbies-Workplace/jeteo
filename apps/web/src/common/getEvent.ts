import { EventResponse } from "shared/model/event/response/event.response";
import { myFetch } from "@/common/fetch";
import { GetEventsQueryRequest } from "shared/.dist/model/event/request/getEventsQuery.request";
import { cookies } from "next/headers";

export const getEvent = async (eventSlug: string): Promise<EventResponse> => {
  const eventId = eventSlug; //todo get id from slug
  const res = await myFetch(`/rest/v1/events/${eventId}`, {
    cache: "no-store",
  });
  if (!res.ok) return undefined;
  return res.json();
};

export const getEvents = async (): Promise<EventResponse[]> => {
  const params: GetEventsQueryRequest = {
    page: 1,
    size: 100,
  };
  const res = await myFetch(`/rest/v1/events?` + new URLSearchParams(params), {
    cache: "no-store",
  });
  if (!res.ok) return undefined;
  return res.json();
};

export const getMyEvents = async (): Promise<EventResponse[]> => {
  const params: GetEventsQueryRequest = {
    page: 1,
    size: 100,
  };
  const res = await myFetch(
    `/rest/v1/events/@me?` + new URLSearchParams(params),
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  if (!res.ok) return undefined;
  return res.json();
};
