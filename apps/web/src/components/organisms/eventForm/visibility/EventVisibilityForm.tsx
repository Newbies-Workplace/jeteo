"use client";

import React from "react";
import { Section } from "@/components/molecules/section/Section";
import {
  RadioButtons,
  RadioItem,
} from "@/components/molecules/radioButtons/RadioButtons";
import Button from "@/components/atoms/button/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EventResponse } from "shared/model/event/response/event.response";
import { myFetch } from "@/common/fetch";

const visibilities: RadioItem[] = [
  {
    id: "PRIVATE",
    name: "Prywatna",
    description: "Widoczna tylko dla Ciebie i prelegentów",
  },
  {
    id: "HIDDEN",
    name: "Niepubliczna",
    description: "Widoczna tylko dla osób posiadających link wydarzenia",
  },
  { id: "PUBLIC", name: "Publiczna", description: "Widoczna dla każdego" },
];

type VisibilityForm = {
  visibility: "PRIVATE" | "HIDDEN" | "PUBLIC";
};

interface EventVisibilityFormProps {
  event: EventResponse;
  onSubmitted?: (event: EventResponse) => void;
}

export const EventVisibilityForm: React.FC<EventVisibilityFormProps> = ({
  event,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VisibilityForm>({
    defaultValues: {
      visibility: event.visibility,
    },
  });
  const onSubmit: SubmitHandler<VisibilityForm> = (data: VisibilityForm) => {
    myFetch(`/rest/v1/events/${event.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <Section title={"Widoczność"}>
        <Controller
          name={"visibility"}
          control={control}
          render={({ field }) => (
            <RadioButtons
              values={visibilities}
              selectedValueIndex={visibilities.findIndex(
                (value) => value.id === field.value
              )}
              onChange={(item) => field.onChange(item.id)}
            />
          )}
        />
      </Section>
      <Button
        primary
        style={{ alignSelf: "flex-end" }}
        onClick={handleSubmit(onSubmit)}
      >
        Zapisz
      </Button>
    </form>
  );
};
