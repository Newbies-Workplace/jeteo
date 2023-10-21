"use client";

import React from "react";
import { EventBasicForm } from "@/components/organisms/eventForm/basic/EventBasicForm";
import { EventResponse } from "shared/model/event/response/event.response";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

  const onSubmitted = (event: EventResponse) => {
    toast.success("Pomyślnie dodano wydarzenie!");
    router.push(`/studio/events/edit/${event.slug}/theme`);
  };

  return <EventBasicForm onSubmitted={onSubmitted} />;
}
