import styles from "./layout.module.scss";
import React from "react";
import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepButton } from "@/components/molecules/stepNavigation/StepNavigation";
import { getLecture } from "@/common/getLecture";
import { LectureResponse } from "shared/model/lecture/response/lecture.response";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string; lectureSlug: string };
}) {
  const lecture: LectureResponse = await getLecture(params.lectureSlug);
  if (!lecture) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <StudioHeader title={"Edycja prelekcji"} />
      <div className={styles.stepsContainer}>
        <StepButton title={"Podstawowe informacje"} active={true} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
