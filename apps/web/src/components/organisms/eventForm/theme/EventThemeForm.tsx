"use client";

import React, { useState } from "react";
import { Section } from "@/components/molecules/section/Section";
import { SmartEventCard } from "@/components/molecules/eventCard/EventCard";
import { Text } from "@/components/atoms/text/Text";
import { HexColorPicker } from "react-colorful";
import { EventResponse } from "shared/model/event/response/event.response";
import Button from "@/components/atoms/button/Button";
import toast from "react-hot-toast";
import { myFetch } from "@/common/fetch";
import { FileItem } from "@/components/molecules/fileItem/FileItem";
import { FileUpload } from "@/components/molecules/fileUpload/FileUpload";
import { useCropDialog } from "@/contexts/useCropDialog";

const getRequest = async (
  color: string,
  event?: EventResponse
): Promise<EventResponse> => {
  if (event) {
    return myFetch(`/rest/v1/events/${event.id}`, {
      method: "PATCH",
      body: JSON.stringify({ primaryColor: color }),
    }).then((res) => res.json());
  } else {
    return Promise.reject("no event");
  }
};

interface EventThemeFormProps {
  event?: EventResponse;
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
    toast.promise(
      // @ts-ignore
      getRequest(color, event).then((res: EventResponse) => {
        return res;
      }),
      {
        loading: "Zapisywanie...",
        success: <b>Zaktualizowano wygląd wydarzenia!</b>,
        error: <b>Wystąpił błąd</b>,
      }
    );
  };

  const saveCoverImage = async (file: File) => {
    const formData = new FormData();
    formData.append("coverImage", file);

    await myFetch(`/rest/v1/events/${event?.id}/cover`, {
      method: "PUT",
      body: formData,
      headers: undefined,
    }).then((res) => {
      res.ok && res.text().then(setCoverImage);
    });
  };

  const deleteCoverImage = async () => {
    await myFetch(`/rest/v1/events/${event?.id}/cover`, {
      method: "DELETE",
    }).then((res) => {
      // @ts-ignore
      res.ok && setCoverImage(null);
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
            // @ts-ignore
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
