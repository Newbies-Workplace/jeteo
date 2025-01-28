"use client";

import React from "react";
import { LectureBasicForm } from "@/components/organisms/lectureForm/basic/LectureBasicForm";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  return (
    <LectureBasicForm
      eventSlug={slug}
      onSubmitted={() => {
        router.replace(`/studio/events/edit/${slug}/lectures`);
      }}
    />
  );
}
