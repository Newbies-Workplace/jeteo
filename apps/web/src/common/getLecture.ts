import { EventResponse } from "shared/.dist/model/event/response/event.response";
import { myFetch } from "@/common/fetch";
import { StudioLectureResponse } from "shared/.dist/model/lecture/response/lecture.response";

export const getLecture = async (
  lectureSlug: string
): Promise<EventResponse> => {
  const lectureId = lectureSlug; //todo get id from slug
  const res = await myFetch(
    `/rest/v1/lectures/${lectureId}`,
    {
      cache: "no-store",
    },
    false
  );
  if (!res.ok) return undefined;
  return res.json();
};

export const getStudioLecture = async (
  lectureSlug: string
): Promise<StudioLectureResponse> => {
  const lectureId = lectureSlug; //todo get id from slug
  const res = await myFetch(
    `/rest/v1/lectures/${lectureId}`,
    {
      cache: "no-store",
    },
    false
  );
  if (!res.ok) return undefined;
  return res.json();
};
