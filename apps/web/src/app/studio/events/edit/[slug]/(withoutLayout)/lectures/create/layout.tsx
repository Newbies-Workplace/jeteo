import styles from "./layout.module.scss";

import React from "react";
import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepButton } from "@/components/molecules/stepNavigation/StepNavigation";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div className={styles.page}>
      <StudioHeader
        title={"Kreator prelekcji"}
        returnPath={`/studio/events/edit/${params.slug}/lectures`}
      />
      <div className={styles.stepsContainer}>
        <StepButton title={"Podstawowe informacje"} active={true} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
