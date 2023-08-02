"use client";

import React from "react";
import { EventBasicForm } from "@/components/organisms/eventForm/basic/EventBasicForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const onEventCreated = (event: { slug: string }) => {
    router.push(`/studio/events/edit/${event.slug}/theme`);
  };

  return (
    <>
      <EventBasicForm onSubmitted={onEventCreated} />
    </>
  );
}
