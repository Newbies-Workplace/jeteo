import React from "react";
import { getEvent } from "@/common/getEvent";
import { EventResponse } from "shared/model/event/response/event.response";
import { EventBasicFormWrapper } from "./EventBasicFormWrapper";

export default async function Page({ params }: { params: { slug: string } }) {
  const event: EventResponse = await getEvent(params.slug);

  return <EventBasicFormWrapper event={event} />;
}
