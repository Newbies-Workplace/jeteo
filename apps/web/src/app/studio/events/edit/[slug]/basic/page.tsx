"use client";

import { EventBasicForm } from "@/components/organisms/eventForm/basic/EventBasicForm";
import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onEventUpdated = (event: { slug: string }) => {
    router.push(`/studio/events/edit/${event.slug}/theme`);
  };

  return <EventBasicForm onSubmitted={onEventUpdated} />;
}
