"use client";

import * as React from "react";
import { StudioFunctionCard } from "@/components/molecules/studioFunctionCard/StudioFunctionCard";
import { deleteEvent } from "@/lib/actions/events";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { ConfirmDialog } from "@/components/molecules/confirmDialog/ConfirmDialog";
import { Portal } from "@/components/molecules/portal/Portal";

interface DeleteEventCardProps {
  eventId: string;
  eventTitle: string;
}

export const DeleteEventCard: React.FC<DeleteEventCardProps> = ({
  eventId,
  eventTitle,
}) => {
  const router = useRouter();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const onDelete = () => {
    toast.promise(
      deleteEvent(eventId).then(() => {
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
    <>
      <div
        onClick={() => {
          setIsConfirmVisible(true);
        }}
      >
        <StudioFunctionCard title="Usuń" subtitle="wydarzenie" />
      </div>

      {isConfirmVisible && (
        <Portal>
          <ConfirmDialog
            title={`Czy na pewno chcesz usunąć ${eventTitle}?`}
            description="Tej akcji nie można cofnąć"
            onDismiss={() => setIsConfirmVisible(false)}
            onConfirm={() => onDelete()}
          />
        </Portal>
      )}
    </>
  );
};
