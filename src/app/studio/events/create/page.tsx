"use client";

import React from "react";
import { EventBasicForm } from "@/components/organisms/eventForm/basic/EventBasicForm";
import { EventResponse } from "@/lib/models/event.response";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onSubmitted = (event: EventResponse) => {
    router.push(`/studio/events/edit/${event.slug}/theme`);
  };

  return <EventBasicForm onSubmitted={onSubmitted} />;
}
