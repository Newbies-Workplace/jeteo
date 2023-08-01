"use client";

import React from "react";
import { Section } from "@/components/molecules/section/Section";
import Button from "@/components/atoms/button/Button";
import MDEditor from "@uiw/react-md-editor";
import { Text } from "@/components/atoms/text/Text";
import { RadioButtons } from "@/components/molecules/radioButtons/RadioButtons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";
import axiosInstance from "@/common/axiosInstance";
import dayjs from "dayjs";
import { MapPicker } from "@/components/molecules/mapPicker/MapPicker";

const locationOptions = [
  { id: "location", name: "Na miejscu" },
  { id: "online", name: "On-line" },
];

type BasicForm = {
  title: string;
  subtitle?: string;
  description: string;
  from: string;
  to: string;
  location: "online" | "location";
  address?: {
    city: string;
    place: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  tags: string[];
};

const defaultValues: BasicForm = {
  title: "",
  subtitle: "",
  description: "",
  from: dayjs().format("YYYY-MM-DDThh:mm"),
  to: dayjs().add(1, "h").format("YYYY-MM-DDThh:mm"),
  location: "location",
  address: {
    city: "",
    place: "",
    coordinates: {
      latitude: 51.08549,
      longitude: 17.0104,
    },
  },
  tags: [],
};

interface EventBasicFormProps {
  onSubmitted: (event: { slug: string }) => void; //todo add type
}

export const EventBasicForm: React.FC<EventBasicFormProps> = ({
  onSubmitted,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BasicForm>({
    defaultValues: defaultValues,
  });
  const watchOnline = watch("location", "location");

  const onSubmit: SubmitHandler<BasicForm> = (data: BasicForm) => {
    axiosInstance.post("/rest/v1/events", data).then((res) => {
      onSubmitted(res.data);
    });
  };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <Section title={"Co i Kiedy?"}>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <ControlledInput
            name={"from"}
            label={"Rozpoczęcie"}
            control={control}
            type={"datetime-local"}
          />
          <ControlledInput
            name={"to"}
            label={"Zakończenie"}
            control={control}
            type={"datetime-local"}
          />
        </div>

        <ControlledInput
          name={"title"}
          label={"Tytuł"}
          required
          control={control}
        />
        <ControlledInput
          name={"subtitle"}
          label={"Podtytuł"}
          control={control}
        />

        <Controller
          render={({ field, fieldState, formState }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Text variant={"headS"}>Opis *</Text>
              <div data-color-mode="light">
                <MDEditor
                  textareaProps={{ maxLength: 10000 }}
                  height={200}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            </div>
          )}
          name={"description"}
          control={control}
        />
      </Section>

      <Section title={"Gdzie?"} contentStyle={{ gap: 8 }}>
        <Controller
          name={"location"}
          control={control}
          render={({ field }) => (
            <RadioButtons
              values={locationOptions}
              selectedValueIndex={locationOptions.findIndex(
                (value) => value.id === field.value
              )}
              onChange={(item) => field.onChange(item.id)}
            />
          )}
        />

        {watchOnline === "location" && (
          <>
            <Controller
              render={({ field, fieldState, formState }) => (
                <MapPicker
                  onChange={(value) => {
                    field.onChange({
                      latitude: value.lat,
                      longitude: value.lng,
                    });
                  }}
                  value={{
                    lat: field.value?.latitude,
                    lng: field.value?.longitude,
                  }}
                />
              )}
              name={"address.coordinates"}
              control={control}
            />

            <div style={{ display: "flex", gap: 12, flexDirection: "row" }}>
              <ControlledInput
                name={"address.city"}
                label={"Miasto"}
                control={control}
              />
              <ControlledInput
                name={"address.place"}
                label={"Adres"}
                control={control}
                style={{ flex: 1 }}
              />
            </div>
          </>
        )}
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
