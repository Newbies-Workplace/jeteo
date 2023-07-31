import { Text } from "@/components/text/Text";
import Button from "@/components/button/Button";
import styles from "./page.module.scss";
import Link from "next/link";
import { EventCard } from "@/components/eventCard/EventCard";
import {
  EventCardActionsFuture,
  EventCardActionsLive,
} from "@/components/eventCard/EventCardActions";
import React from "react";

export default function Page() {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant={"headM"} bold>
          Wydarzenia
        </Text>

        <Link href={"events/create"}>
          <Button primary>Dodaj</Button>
        </Link>
      </div>

      <Link href={"/events/1"} style={{ alignSelf: "stretch" }}>
        <EventCard
          title="Wydarzenie 1"
          subtitle={"opis wydarzenia"}
          host={{
            name: "host",
          }}
          place={"Wrocław, Racławicka 13"}
          tags={[]}
          startDate={"kiedyś"}
        >
          <EventCardActionsFuture />
        </EventCard>
      </Link>

      <Link href={"/events/2"} style={{ alignSelf: "stretch" }}>
        <EventCard
          title="Wydarzenie 1"
          subtitle={"opis wydarzenia"}
          host={{
            name: "host",
          }}
          place={"Wrocław, Racławicka 13"}
          tags={["tag1", "tag2", "tag3"]}
          startDate={"kiedyś"}
        >
          <EventCardActionsLive />
        </EventCard>
      </Link>
    </div>
  );
}
