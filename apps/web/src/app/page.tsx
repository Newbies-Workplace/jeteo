import { Navbar } from "@/components/molecules/navbar/Navbar";
import { GetUser } from "@/components/home/GetUser";
import styles from "@/app/page.module.scss";
import { SmartEventCard } from "@/components/molecules/eventCard/EventCard";
import Link from "next/link";
import React from "react";
import { Text } from "@/components/atoms/text/Text";
import { getEvents } from "@/common/getEvent";

export const dynamic = "force-dynamic";

export default async function Page() {
  const events = await getEvents().catch(() => undefined);

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.main}>
          <Text variant="headM" className={styles.hello}>
            Witaj, <GetUser /> 👋
          </Text>
          <div className={styles.events}>
            {events &&
              events.map((event) => {
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    style={{ alignSelf: "stretch" }}
                  >
                    <SmartEventCard event={event} />
                  </Link>
                );
              })}

            {!events && (
              <Text variant="bodyM" className={styles.hello}>
                Błąd pobierania wydarzeń
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
