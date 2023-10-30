import styles from "./layout.module.scss";
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
  //todo if create from /studio/events or /studio/events/edit

  return (
    <div className={styles.page}>
      <StudioHeader
        title={"Edycja prelekcji"}
        returnPath={`/studio/events/edit/${params.slug}/lectures`}
      />
      <div className={styles.stepsContainer}>
        <StepButton title={"Podstawowe informacje"} active={true} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
