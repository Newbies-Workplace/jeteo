"use client";

import * as React from "react";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { myFetch } from "@/common/fetch";
import { useRouter } from "next/navigation";

interface DeleteEventCardProps {
  eventId: string;
}

export const DeleteEventCard: React.FC<DeleteEventCardProps> = ({
  eventId,
}) => {
  const router = useRouter();

  const onDelete = () => {
    myFetch(`/rest/v1/events/${eventId}`, {
      method: "DELETE",
    })
      .then((r) => {
        router.replace("/studio/events");
        router.refresh();
      })
      .catch((e) => console.error(e));
  };

  return (
    <div onClick={() => onDelete()} style={{ cursor: "pointer" }}>
      <StudioFunctionCard title="Usuń" subtitle="wydarzenie" />
    </div>
  );
};
