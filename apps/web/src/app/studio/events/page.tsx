import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import styles from "./page.module.scss";
import Link from "next/link";
import { SmartEventCard } from "@/components/molecules/eventCard/EventCard";
import React from "react";
import { getMyEvents } from "@/common/getEvent";

export default async function Page() {
  const events = await getMyEvents();

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

      <div className={styles.events}>
        {events.map((event) => {
          return (
            <Link
              key={event.id}
              href={`/studio/events/${event.slug}`}
              style={{ alignSelf: "stretch" }}
            >
              <SmartEventCard event={event} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
