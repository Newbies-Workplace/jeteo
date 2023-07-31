"use client";

import React from "react";
import { Section } from "@/components/section/Section";
import { Input } from "@/components/input/Input";
import Button from "@/components/button/Button";
import MDEditor from "@uiw/react-md-editor";
import { Text } from "@/components/text/Text";
import { MapPicker } from "@/components/mapPicker/MapPicker";
import { RadioButtons } from "@/components/radioButtons/RadioButtons";

// todo add react-hook-form

const locationOptions = [
  { id: "location", name: "Na miejscu" },
  { id: "online", name: "On-line" },
];

export const EventBasicForm: React.FC = () => {
  return (
    <>
      <Section title={"Co i Kiedy?"}>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Input
            label={"Rozpoczęcie"}
            value={""}
            type={"datetime-local"}
            setValue={() => {}}
            required
          />
          <Input
            label={"Zakończenie"}
            value={""}
            type={"datetime-local"}
            setValue={() => {}}
            required
          />
        </div>

        <Input
          label={"Tytuł"}
          value={"aaaaaaaaaaaaaaa"}
          setValue={() => {}}
          required
        />
        <Input label={"Podtytuł"} value={""} setValue={() => {}} required />

        <Text variant={"headS"}>Opis</Text>
        <div data-color-mode="light">
          <MDEditor
            textareaProps={{ maxLength: 10000 }}
            height={200}
            value={""}
            onChange={() => {}}
          />
        </div>
      </Section>
      <Section title={"Gdzie?"} contentStyle={{ gap: 8 }}>
        <RadioButtons
          values={locationOptions}
          selectedValueIndex={0}
          onChange={(item) => {}}
        />

        <MapPicker
          onChange={() => {}}
          value={{ lat: 51.08549, lng: 17.0104 }}
        />

        <div style={{ display: "flex", gap: 12, flexDirection: "row" }}>
          <Input label={"Miasto"} value={"Ciechocinek"} setValue={() => {}} />
          <Input
            label={"Adres"}
            value={""}
            setValue={() => {}}
            style={{ flex: 1 }}
          />
        </div>
      </Section>
      {/*<Section title={"Dla kogo?"}></Section>*/}

      <Button primary style={{ alignSelf: "flex-end" }}>
        Zapisz
      </Button>
    </>
  );
};
