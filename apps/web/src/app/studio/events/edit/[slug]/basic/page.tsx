"use client";

import { EventBasicForm } from "@/components/organisms/eventForm/basic/EventBasicForm";
import React from "react";
import { useRouter } from "next/navigation";
import { EventResponse } from "shared/model/event/response/event.response";

export default function Page() {
  const router = useRouter();

  const onEventUpdated = (event: EventResponse) => {
    router.push(`/studio/events/edit/${event.slug}/theme`);
  };

  return <EventBasicForm onSubmitted={onEventUpdated} />;
}
