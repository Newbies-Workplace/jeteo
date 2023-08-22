import { LectureBasicForm } from "@/components/organisms/lectureForm/basic/LectureBasicForm";
import React from "react";
import { getLecture } from "@/common/getLecture";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";

export default async function Page({
  params,
}: {
  params: { slug: string; lectureSlug: string };
}) {
  const lecture: LectureResponse = await getLecture(params.lectureSlug); //todo get studio lecture instead of lecture

  return <LectureBasicForm eventSlug={params.slug} lecture={lecture} />;
}
