"use client";

import React from "react";
import { Section } from "@/components/section/Section";
import { EventCard } from "@/components/eventCard/EventCard";

export const EventThemeForm: React.FC = () => {
  return (
    <>
      <Section title={"Motyw"}></Section>
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
        />
      </Section>
    </>
  );
};
