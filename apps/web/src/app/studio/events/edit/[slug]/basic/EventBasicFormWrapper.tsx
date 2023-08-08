"use client";

import { EventResponse } from "shared/model/event/response/event.response";
import { useRouter } from "next/navigation";
import React from "react";
import { EventBasicForm } from "@/components/organisms/eventForm/basic/EventBasicForm";

export const EventBasicFormWrapper: React.FC<{ event: EventResponse }> = ({
  event,
}) => {
  const router = useRouter();

  const onSubmitted = (event: EventResponse) => {
    router.push(`/studio/events/edit/${event.slug}/theme`);
  };
  return <EventBasicForm onSubmitted={onSubmitted} event={event} />;
};
