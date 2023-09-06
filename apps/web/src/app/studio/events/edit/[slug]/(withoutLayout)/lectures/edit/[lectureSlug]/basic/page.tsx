import { LectureBasicForm } from "@/components/organisms/lectureForm/basic/LectureBasicForm";
import React from "react";
import { getLectureDetails } from "@/common/getLecture";
import { LectureDetailsResponse } from "shared/model/lecture/response/lecture.response";

export default async function Page({
  params,
}: {
  params: { slug: string; lectureSlug: string };
}) {
  const lecture: LectureDetailsResponse = await getLectureDetails(
    params.lectureSlug
  );

  return <LectureBasicForm eventSlug={params.slug} lecture={lecture} />;
}
