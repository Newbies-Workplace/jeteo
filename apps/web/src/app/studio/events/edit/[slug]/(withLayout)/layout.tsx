import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepNavigation } from "@/components/molecules/stepNavigation/StepNavigation";
import React from "react";
import { EventResponse } from "shared/model/event/response/event.response";
import { getEvent } from "@/common/getEvent";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const event: EventResponse = await getEvent(params.slug);
  if (!event) {
    notFound();
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <StudioHeader
        title={`Edycja wydarzenia: ${event.title}`}
        returnPath={`/studio/events/${params.slug}`}
      />
      <StepNavigation
        links={[
          {
            name: "Podstawowe informacje",
            href: `/studio/events/edit/${params.slug}/basic`,
          },
          { name: "Wygląd", href: `/studio/events/edit/${params.slug}/theme` },
          {
            name: "Prelekcje",
            href: `/studio/events/edit/${params.slug}/lectures`,
          },
          {
            name: "Widoczność",
            href: `/studio/events/edit/${params.slug}/visibility`,
          },
        ]}
      />

      <div className={"flex flex-col bg-surface rounded-xl p-4 shadow"}>
        {children}
      </div>
    </div>
  );
}
