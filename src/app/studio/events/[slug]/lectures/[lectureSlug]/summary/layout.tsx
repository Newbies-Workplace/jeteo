import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepButton } from "@/components/molecules/stepNavigation/StepNavigation";
import React from "react";
import { LectureDetailsResponse } from "@/lib/models/lecture.response";
import { getLectureDetails } from "@/lib/actions/get-lectures";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    lectureSlug: string;
  }>;
}) {
  const { slug, lectureSlug } = await params;

  const lecture: LectureDetailsResponse = await getLectureDetails(lectureSlug);

  return (
    <div className={"flex flex-col gap-3"}>
      <StudioHeader
        title={lecture.title}
        returnPath={`/studio/events/${slug}`}
      />
      <div className={"flex flex-row flex-wrap gap-3"}>
        <StepButton title={"Feedback"} active={true} />
      </div>

      <div className={"flex flex-col bg-surface rounded-xl p-4 shadow"}>
        {children}
      </div>
    </div>
  );
}
