import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import Link from "next/link";
import { SmartEventCard } from "@/components/molecules/eventCard/EventCard";
import React from "react";
import { getMyEvents } from "@/common/getEvent";

export default async function Page() {
  const events = await getMyEvents();

  return (
    <div className={"flex flex-col justify-center gap-4"}>
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

      <div
        className={
          "flex flex-col justify-center items-start gap-4 self-stretch"
        }
      >
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
