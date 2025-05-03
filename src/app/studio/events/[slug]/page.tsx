import { StudioHeader } from "@/components/molecules/studioHeader/StudioHeader";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { Text } from "@/components/atoms/text/Text";
import { getEvent } from "@/lib/actions/get-events";
import { notFound } from "next/navigation";
import React from "react";
import { EventLecturesForm } from "@/components/organisms/eventForm/lectures/EventLecturesForm";
import Link from "next/link";
import { DeleteEventCard } from "@/app/studio/events/[slug]/DeleteEventCard";
import { getEventLectures } from "@/lib/actions/get-lectures";
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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  const lectures = await getEventLectures(slug);
  if (!event) {
    notFound();
  }

  return (
    <div className={"flex flex-col gap-3"}>
      <StudioHeader title={event.title} returnPath={"/studio/events"} />

      <div className={"flex items-start flex-wrap gap-3 cursor-pointer"}>
        <Link href={`/events/${event.slug}`}>
          <StudioFunctionCard title="Zobacz" subtitle="wydarzenie" />
        </Link>
        <Link href={`/studio/events/edit/${event.slug}/basic`}>
          <StudioFunctionCard title="Edytuj" subtitle="wydarzenie" />
        </Link>
        <DeleteEventCard eventId={event.id} eventTitle={event.title} />
      </div>

      <Text variant="headL" style={{ marginTop: 16, marginBottom: 16 }}>
        Prelekcje
      </Text>

      <EventLecturesForm eventSlug={slug} lectures={lectures} />
    </div>
  );
}
