import React from "react";
import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepButton } from "@/components/molecules/stepNavigation/StepNavigation";
import { getLectureDetails } from "@/common/getLecture";
import { LectureDetailsResponse } from "shared/model/lecture/response/lecture.response";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string; lectureSlug: string };
}) {
  const lecture: LectureDetailsResponse = await getLectureDetails(
    params.lectureSlug
  );
  if (!lecture) {
    notFound();
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <StudioHeader
        title={"Edycja prelekcji"}
        returnPath={`/studio/events/edit/${params.slug}/lectures`}
      />
      <div className={"flex flex-row flex-wrap gap-3"}>
        <StepButton title={"Podstawowe informacje"} active={true} />
      </div>
      <div className={"flex flex-col bg-surface rounded-xl p-4 shadow"}>
        {children}
      </div>
    </div>
  );
}
