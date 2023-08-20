import React from "react";
import { LectureBasicForm } from "@/components/organisms/lectureForm/basic/LectureBasicForm";

export default function Page({ params }: { params: { slug: string } }) {
  return <LectureBasicForm eventSlug={params.slug} />;
}
