import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StepNavigation } from "@/components/molecules/stepNavigation/StepNavigation";
import React from "react";
import { getEvent } from "@/lib/actions/get-events";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const event = await getEvent(slug);
  if (!event) {
    notFound();
  }

  return {
    title: `Studio: ${event.title}`,
  };
}

export default async function Layout({
  children,
  params,
}: React.PropsWithChildren<Props>) {
  const { slug } = await params;
  const event = await getEvent(slug);
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
