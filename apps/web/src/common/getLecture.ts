import { myFetch } from "@/common/fetch";
import {
  LectureResponse,
  StudioLectureResponse,
} from "shared/model/lecture/response/lecture.response";
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

export const getStudioLecture = async (
  lectureSlug: string
): Promise<StudioLectureResponse> => {
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
