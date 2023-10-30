import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepButton } from "@/components/molecules/stepNavigation/StepNavigation";
import styles from "./layout.module.scss";
import React from "react";
import { LectureDetailsResponse } from "shared/.dist/model/lecture/response/lecture.response";
import { getLectureDetails } from "@/common/getLecture";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    lectureSlug: string;
  };
}) {
  const lecture: LectureDetailsResponse = await getLectureDetails(
    params.lectureSlug
  );

  return (
    <div className={styles.page}>
      <StudioHeader
        title={lecture.title}
        returnPath={`/studio/events/${params.slug}`}
      />
      <div className={styles.stepsContainer}>
        <StepButton title={"Feedback"} active={true} />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
