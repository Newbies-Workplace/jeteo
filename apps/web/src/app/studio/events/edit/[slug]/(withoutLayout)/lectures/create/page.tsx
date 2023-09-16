"use client";

import React from "react";
import { LectureBasicForm } from "@/components/organisms/lectureForm/basic/LectureBasicForm";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();

  return (
    <LectureBasicForm
      eventSlug={params.slug}
      onSubmitted={() => {
        router.replace(`/studio/events/edit/${params.slug}/lectures`);
      }}
    />
  );
}
