import { LectureBasicForm } from "@/components/organisms/lectureForm/basic/LectureBasicForm";
import React from "react";
import { getLectureDetails } from "@/common/getLecture";
import { LectureDetailsResponse } from "shared/model/lecture/response/lecture.response";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; lectureSlug: string }>;
}) {
  const { lectureSlug, slug } = await params;
  const lecture: LectureDetailsResponse = await getLectureDetails(lectureSlug);

  return <LectureBasicForm eventSlug={slug} lecture={lecture} />;
}
