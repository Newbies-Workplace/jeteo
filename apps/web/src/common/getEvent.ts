import { EventResponse } from "shared/model/event/response/event.response";
import { myFetch, urlParams } from "@/common/fetch";
import { GetEventsQuery } from "shared/model/event/request/getEvents.query";
import { cookies } from "next/headers";
import { getIdFromSlug } from "shared/util";

export const getEvent = async (eventSlug: string): Promise<EventResponse> => {
  const eventId = getIdFromSlug(eventSlug);
  const res = await myFetch(
    `/rest/v1/events/${eventId}`,
    {
      cache: "no-store",
      headers: {
        Cookie: (await cookies()).toString(),
      },
    },
    false
  );
  if (!res.ok) return undefined;
  return res.json();
};

export const getEvents = async (): Promise<EventResponse[]> => {
  const params: GetEventsQuery = {
    page: 1,
    size: 100,
  };
  const res = await myFetch(`/rest/v1/events?${urlParams(params)}`, {
    cache: "no-store",
  });
  if (!res.ok) return undefined;
  return res.json();
};

export const getMyEvents = async (): Promise<EventResponse[]> => {
  const params: GetEventsQuery = {
    page: 1,
    size: 100,
  };
  const res = await myFetch(`/rest/v1/events/@me?${urlParams(params)}`, {
    cache: "no-store",
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
  if (!res.ok) return undefined;
  return res.json();
};
