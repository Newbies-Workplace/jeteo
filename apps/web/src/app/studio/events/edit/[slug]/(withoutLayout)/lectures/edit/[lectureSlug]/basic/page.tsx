import { LectureBasicForm } from "@/components/organisms/lectureForm/basic/LectureBasicForm";
import React from "react";
import { getLecture } from "@/common/getLecture";
import { LectureResponse } from "shared/.dist/model/lecture/response/lecture.response";

export default async function Page({
  params,
}: {
  params: { slug: string; lectureSlug: string };
}) {
  //todo GET LECTURE FIX 500 API

  const lecture: LectureResponse = await getLecture(params.lectureSlug);
  return <LectureBasicForm eventSlug={params.slug} lecture={lecture} />;
}
