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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event: EventResponse = await getEvent(slug);
  if (!event) {
    notFound();
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <StudioHeader
        title={`Edycja wydarzenia: ${event.title}`}
        returnPath={`/studio/events/${slug}`}
      />
      <StepNavigation
        links={[
          {
            name: "Podstawowe informacje",
            href: `/studio/events/edit/${slug}/basic`,
          },
          { name: "Wygląd", href: `/studio/events/edit/${slug}/theme` },
          {
            name: "Prelekcje",
            href: `/studio/events/edit/${slug}/lectures`,
          },
          {
            name: "Widoczność",
            href: `/studio/events/edit/${slug}/visibility`,
          },
        ]}
      />

      <div className={"flex flex-col bg-surface rounded-xl p-4 shadow"}>
        {children}
      </div>
    </div>
  );
}
