import { myFetch, urlParams } from "@/common/fetch";
import {
  LectureDetailsResponse,
  LectureResponse,
} from "shared/model/lecture/response/lecture.response";
import {
  GetLecturesQuery,
  GetMyLecturesQuery,
} from "shared/model/lecture/request/getLectures.query";
import { cookies } from "next/headers";
import { getIdFromSlug } from "shared/util";

export const getLecture = async (
  lectureSlug: string
): Promise<LectureResponse> => {
  const lectureId = getIdFromSlug(lectureSlug);
  const res = await myFetch(
    `/rest/v1/lectures/${lectureId}`,
    {
      cache: "no-store",
      headers: {
        Cookie: (await cookies()).toString(),
      },
    },
    false
  );
  if (!res.ok) {
    // @ts-ignore
    return undefined;
  }
  return res.json();
};

export const getLectureDetails = async (
  lectureSlug: string
): Promise<LectureDetailsResponse> => {
  const lectureId = getIdFromSlug(lectureSlug);
  const res = await myFetch(
    `/rest/v1/lectures/${lectureId}/details`,
    {
      cache: "no-store",
      headers: {
        Cookie: (await cookies()).toString(),
      },
    },
    false
  );
  if (!res.ok) {
    // @ts-ignore
    return undefined;
  }
  return res.json();
};

export const getEventLectures = async (
  eventSlug: string
): Promise<LectureResponse[]> => {
  const eventId = getIdFromSlug(eventSlug);
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
        Cookie: (await cookies()).toString(),
      },
    },
    false
  );
  if (!res.ok) {
    // @ts-ignore
    return undefined;
  }
  return res.json();
};

export const getMyLectures = async (): Promise<LectureResponse[]> => {
  const params: GetMyLecturesQuery = {
    page: 1,
    size: 100,
  };

  const res = await myFetch(
    `/rest/v1/lectures/@me?${urlParams(params)}`,
    {
      cache: "no-store",
      headers: {
        Cookie: (await cookies()).toString(),
      },
    },
    false
  );
  if (!res.ok) {
    // @ts-ignore
    return undefined;
  }
  return res.json();
};
