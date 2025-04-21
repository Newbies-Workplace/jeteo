"use client";

import React, { useState } from "react";
import { Section } from "@/components/molecules/section/Section";
import { SmartEventCard } from "@/components/molecules/eventCard/EventCard";
import { Text } from "@/components/atoms/text/Text";
import { HexColorPicker } from "react-colorful";
import { EventResponse } from "@/lib/models/event.response";
import Button from "@/components/atoms/button/Button";
import toast from "react-hot-toast";
import { FileItem } from "@/components/molecules/fileItem/FileItem";
import { FileUpload } from "@/components/molecules/fileUpload/FileUpload";
import { useCropDialog } from "@/contexts/useCropDialog";
import {
  updateEvent,
  updateEventCover,
  deleteEventCover,
} from "@/lib/actions/events";

interface EventThemeFormProps {
  event: EventResponse;
}

export const EventThemeForm: React.FC<EventThemeFormProps> = ({ event }) => {
  const [color, setColor] = useState(event?.primaryColor);
  const [coverImage, setCoverImage] = useState<string | undefined>(
    event?.coverImage
  );

  const { CropDialog, openCropDialog } = useCropDialog({
    aspectRatio: 3,
    title: "Wykadruj zdjęcie",
    confirmText: "Gotowe",
    dismissText: "Anuluj",
    confirmAction: (file) => {
      saveCoverImage(file);
    },
    dismissAction: () => {},
  });

  const onSubmit = () => {
    toast.promise(updateEvent(event.id, { primaryColor: color }), {
      loading: "Zapisywanie...",
      success: <b>Zaktualizowano wygląd wydarzenia!</b>,
      error: <b>Wystąpił błąd</b>,
    });
  };

  const saveCoverImage = async (file: File) => {
    const formData = new FormData();
    formData.append("coverImage", file);

    await toast
      .promise(updateEventCover(event.id, formData), {
        loading: "Aktualizowanie okładki...",
        success: <b>Okładka zaktualizowana</b>,
        error: <b>Wystąpił błąd</b>,
      })
      .then((res) => {
        setCoverImage(res.coverImage);
      });
  };

  const deleteCoverImage = async () => {
    await toast
      .promise(deleteEventCover(event.id), {
        loading: "Usuwanie okładki...",
        success: <b>Okładka usunięta</b>,
        error: <b>Wystąpił błąd</b>,
      })
      .then(() => {
        setCoverImage(undefined);
      });
  };

  return (
    <>
      <CropDialog />
      <Section title={"Motyw"}>
        <div className={"flex flex-col"}>
          <Text variant="headS">Kolor przewodni</Text>
          <HexColorPicker color={color} onChange={setColor} />
          <Text variant="headS" style={{ marginTop: "15px" }}>
            Okładka
          </Text>
          <div className={"flex flex-row gap-3"}>
            <FileUpload
              onChange={(files) => {
                openCropDialog(URL.createObjectURL(files[0]));
              }}
            />
            {coverImage && (
              <FileItem url={coverImage} onDeleteClick={deleteCoverImage} />
            )}
          </div>
        </div>
      </Section>
      <Section title={"Podgląd"}>
        <SmartEventCard
          event={{
            ...event,
            primaryColor: color,
            coverImage: coverImage,
          }}
        />
      </Section>
      <Button primary style={{ alignSelf: "flex-end" }} onClick={onSubmit}>
        Zapisz
      </Button>
    </>
  );
};
