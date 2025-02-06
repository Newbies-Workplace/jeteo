import { Navbar } from "@/components/molecules/navbar/Navbar";
import { GetUser } from "@/components/home/GetUser";
import { SmartEventCard } from "@/components/molecules/eventCard/EventCard";
import Link from "next/link";
import React from "react";
import { Text } from "@/components/atoms/text/Text";
import { getPublicEvents } from "@/lib/data/events";
import { generateSlug } from "@/lib/slugs";

export const dynamic = "force-dynamic";

export default async function Page() {
  const events = await getPublicEvents(1, 100);

  return (
    <div className={"flex flex-col w-screen items-center"}>
      <Navbar />
      <div className={"flex w-screen justify-center"}>
        <div
          className={
            "m-0 mx-4 flex flex-col max-w-screen-xl items-center gap-4 flex-1 self-stretch"
          }
        >
          <Text
            variant="headM"
            className={"flex h-10 flex-col justify-end self-stretch"}
          >
            Witaj, <GetUser /> 👋
          </Text>
          <div
            className={
              "flex flex-col justify-center items-start gap-4 self-stretch"
            }
          >
            {events &&
              events.map((event) => {
                return (
                  <Link
                    key={event.id}
                    href={`/events/${generateSlug(event.title, event.id)}`}
                    style={{ alignSelf: "stretch" }}
                  >
                    <SmartEventCard event={event} />
                  </Link>
                );
              })}

            {!events && (
              <Text
                variant="bodyM"
                className={"flex h-10 flex-col justify-end self-stretch"}
              >
                Błąd pobierania wydarzeń
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
