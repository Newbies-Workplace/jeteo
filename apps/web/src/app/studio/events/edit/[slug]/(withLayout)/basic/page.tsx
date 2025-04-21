import React from "react";
import { getEvent } from "@/lib/actions/get-events";
import { EventBasicFormWrapper } from "./EventBasicFormWrapper";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return notFound();
  }

  return <EventBasicFormWrapper event={event} />;
}
