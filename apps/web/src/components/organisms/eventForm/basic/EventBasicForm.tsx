"use client";

import React from "react";
import { Section } from "@/components/molecules/section/Section";
import { Input } from "@/components/atoms/input/Input";
import Button from "@/components/atoms/button/Button";
import MDEditor from "@uiw/react-md-editor";
import { Text } from "@/components/atoms/text/Text";
import { MapPicker } from "@/components/molecules/mapPicker/MapPicker";
import { RadioButtons } from "@/components/molecules/radioButtons/RadioButtons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ControlledInput } from "@/components/atoms/input/ControlledInput";

// todo add react-hook-form
// todo validation

const locationOptions = [
  { id: "location", name: "Na miejscu" },
  { id: "online", name: "On-line" },
];

type BasicForm = {
  title: string;
  subtitle: string;
  description: string;
  from: Date;
  to: Date;
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

export const EventBasicForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BasicForm>({
    defaultValues: {
      address: {
        coordinates: {
          latitude: 51.08549,
          longitude: 17.0104,
        },
      },
    },
  });

  const onSubmit: SubmitHandler<BasicForm> = (data: BasicForm) => {
    console.log(data);
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
          required
          control={control}
        />

        <Controller
          render={({ field, fieldState, formState }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Text variant={"headS"}>Opis</Text>
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
        <RadioButtons
          values={locationOptions}
          selectedValueIndex={0}
          onChange={(item) => {}}
        />

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
      </Section>
      {/*<Section title={"Dla kogo?"}></Section>*/}

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
