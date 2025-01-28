import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepButton } from "@/components/molecules/stepNavigation/StepNavigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col gap-3"}>
      <StudioHeader
        title={"Kreator wydarzenia"}
        returnPath={"/studio/events"}
      />
      <div className={"flex flex-row flex-wrap gap-3"}>
        <StepButton title={"Podstawowe informacje"} active={true} />
        <StepButton title={"Wygląd"} active={false} disabled />
        <StepButton title={"Prelekcje"} active={false} disabled />
        <StepButton title={"Widoczność"} active={false} disabled />
      </div>

      <div className={"flex flex-col bg-surface rounded-xl p-4 shadow"}>
        {children}
      </div>
    </div>
  );
}
