"use client";
import React from "react";
import { Section } from "@/components/section/Section";
import {
  RadioButtons,
  RadioItem,
} from "@/components/radioButtons/RadioButtons";

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

export const EventVisibilityForm: React.FC = () => {
  return (
    <>
      <Section title={"Widoczność"}>
        <RadioButtons
          values={visibilities}
          selectedValueIndex={0}
          onChange={(item) => {}}
        />
      </Section>
    </>
  );
};
