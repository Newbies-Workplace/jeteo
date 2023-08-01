import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepButton } from "@/components/molecules/stepNavigation/StepNavigation";
import styles from "./layout.module.scss";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <StudioHeader title={"Kreator wydarzenia"} />
      <div className={styles.stepsContainer}>
        <StepButton title={"Podstawowe informacje"} active={true} />
        <StepButton title={"Wygląd"} active={false} disabled />
        <StepButton title={"Prelekcje"} active={false} disabled />
        <StepButton title={"Widoczność"} active={false} disabled />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
