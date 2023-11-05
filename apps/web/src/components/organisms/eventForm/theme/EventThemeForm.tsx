"use client";

import React from "react";
import { Section } from "@/components/molecules/section/Section";
import { EventCard } from "@/components/molecules/eventCard/EventCard";
import styles from "./EventThemeForm.module.scss";
import { Text } from "@/components/atoms/text/Text";
import { HexColorPicker } from "react-colorful";
import { EventResponse } from "shared/model/event/response/event.response";
import Button from "@/components/atoms/button/Button";
import toast from "react-hot-toast";
import { myFetch } from "@/common/fetch";

const getRequest = async (
  color: string,
  event?: EventResponse
): Promise<EventResponse> => {
  if (event) {
    return myFetch(`/rest/v1/events/${event.id}`, {
      method: "PATCH",
      body: JSON.stringify({ primaryColor: color }),
    }).then((res) => res.json());
  }
};

interface EventThemeFormProps {
  event?: EventResponse;
}

export const EventThemeForm: React.FC<EventThemeFormProps> = ({ event }) => {
  const [color, setColor] = React.useState(event?.primaryColor);

  const onSubmit = () => {
    toast.promise(
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
  return (
    <>
      <Section title={"Motyw"}>
        <div className={styles.themeContainer}>
          <Text variant="headS">Kolor przewodni</Text>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      </Section>
      <Section title={"Podgląd"}>
        <EventCard
          title="Wydarzenie 1"
          subtitle={"opis wydarzenia"}
          host={{
            name: "host",
          }}
          place={"Wrocław, Racławicka 13"}
          tags={[]}
          startDate={"kiedyś"}
          color={color}
        />
      </Section>
      <Button primary style={{ alignSelf: "flex-end" }} onClick={onSubmit}>
        Zapisz
      </Button>
    </>
  );
};
