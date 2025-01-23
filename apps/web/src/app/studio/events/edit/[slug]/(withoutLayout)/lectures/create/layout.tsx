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
    <div className={"flex flex-col gap-3"}>
      <StudioHeader
        title={"Kreator prelekcji"}
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
