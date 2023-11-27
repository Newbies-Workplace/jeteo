"use client";

import * as React from "react";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { myFetch } from "@/common/fetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getIdFromSlug } from "shared/.dist/util";

interface DeleteEventCardProps {
  eventId: string;
}

export const DeleteEventCard: React.FC<DeleteEventCardProps> = ({
  eventId,
}) => {
  const router = useRouter();

  const onDelete = () => {
    toast.promise(
      myFetch(`/rest/v1/events/${eventId}`, {
        method: "DELETE",
      }).then((r) => {
        router.replace("/studio/events");
        router.refresh();
      }),
      {
        loading: "Usuwanie...",
        success: <b>Wydarzenie usunięto pomyślnie!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  return (
    <div onClick={() => onDelete()} style={{ cursor: "pointer" }}>
      <StudioFunctionCard title="Usuń" subtitle="wydarzenie" />
    </div>
  );
};
