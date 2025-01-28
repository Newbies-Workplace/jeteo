import React from "react";
import { getEvent } from "@/common/getEvent";
import { EventResponse } from "shared/model/event/response/event.response";
import { EventBasicFormWrapper } from "./EventBasicFormWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event: EventResponse = await getEvent(slug);

  return <EventBasicFormWrapper event={event} />;
}
