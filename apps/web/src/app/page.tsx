import { Navbar } from "@/components/navbar/Navbar";
import { GetUser } from "@/components/home/GetUser";
import styles from "@/app/page.module.scss";
import { EventCard } from "@/components/eventCard/EventCard";
import Link from "next/link";
import {
  EventCardActionsArchive,
  EventCardActionsFresh,
  EventCardActionsFuture,
  EventCardActionsLive,
} from "@/components/eventCard/EventCardActions";
import React from "react";
import { Text } from "@/components/text/Text";
import { LectureCard } from "@/components/lectureCard/LectureCard";


import avatar from "@/assets/person-placeholder.svg"

export default function Page() {

// ! testowy do lectureCarda
// const persons = [
//     {
//       id: 1,
//       imageURL: avatar,
//       name: "John Doe",
//       description: "i like crocks",
//       mail: "mail.google.com/mail/u/0/#inbox",
//       twitter: "twitter.com/home?lang=pl",
//       linkedin: "pl.linkedin.com",
//       github: "github.com",
// },
//     {
//       id: 2,
//       imageURL: avatar,
//       name: "Johny Gehen",
//       description: "im profesionall racist(raysist)",
//       mail: "",
//       twitter: "",
//       linkedin: "",
//       github: "",
//     }
//   ]

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.main}>
          <Text variant="headM" className={styles.hello}>
            Witaj, <GetUser /> 👋
          </Text>

          {/*<div>*/}
          {/*  <IsFullyRegistered />*/}
          {/*</div>*/}

          <div className={styles.events}>
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

            <Link href={"/events/2"} style={{ alignSelf: "stretch" }}>
              <EventCard
                title="Wydarzenie 1"
                subtitle={"opis wydarzenia"}
                host={{
                  name: "host",
                }}
                place={"Wrocław, Racławicka 13"}
                tags={["tag2", "tag3"]}
                startDate={"kiedyś"}
              >
                <EventCardActionsFresh />
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
                tags={["Java"]}
                startDate={"kiedyś"}
              >
                <EventCardActionsArchive />
              </EventCard>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
