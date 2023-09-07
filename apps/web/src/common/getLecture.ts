import { myFetch, urlParams } from "@/common/fetch";
import {
  LectureDetailsResponse,
  LectureResponse,
} from "shared/model/lecture/response/lecture.response";
import { GetLecturesQuery } from "shared/model/lecture/request/getLectures.query";
import { cookies } from "next/headers";

export const getLecture = async (
  lectureSlug: string
): Promise<LectureResponse> => {
  const lectureId = lectureSlug; //todo get id from slug
  const res = await myFetch(
    `/rest/v1/lectures/${lectureId}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    },
    false
  );
  if (!res.ok) return undefined;
  return res.json();
};

export const getLectureDetails = async (
  lectureSlug: string
): Promise<LectureDetailsResponse> => {
  const lectureId = lectureSlug; //todo get id from slug
  const res = await myFetch(
    `/rest/v1/lectures/${lectureId}/details`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    },
    false
  );
  if (!res.ok) return undefined;
  return res.json();
};

export const getEventLectures = async (
  eventSlug: string
): Promise<LectureResponse[]> => {
  const eventId = eventSlug; //todo get id from slug
  const params: GetLecturesQuery = {
    eventId: eventId,
    page: 1,
    size: 100,
  };

  const res = await myFetch(
    `/rest/v1/lectures?${urlParams(params)}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookies().toString(),
      },
    },
    false
  );
  if (!res.ok) return undefined;
  return res.json();
};
