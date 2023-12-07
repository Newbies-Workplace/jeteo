import { Text } from "@/components/atoms/text/Text";
import { getEvent } from "@/common/getEvent";
import { notFound } from "next/navigation";
import { Tag } from "@/components/atoms/tag/Tag";
import styles from "./page.module.scss";
import { Navbar } from "@/components/molecules/navbar/Navbar";
import { EventDescription } from "@/app/events/[slug]/components/eventDescription/EventDescription";
import { formatFromToDates } from "@/common/utils";
import { Map } from "@/components/molecules/map/Map";
import cs from "classnames";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import { UserSocials } from "@/components/molecules/userSocials/UserSocials";
import { getEventLectures } from "@/common/getLecture";
import { EventLectures } from "@/app/events/[slug]/components/eventLectures/EventLectures";
import colors from "@/colors.module.scss";
import { Metadata } from "next";
import socialpreview from "@/assets/social-preview.png";
import BasicCallendarButton from "@/components/atoms/button/calendarButton/BasicCalendarButton";
import dayjs from "dayjs";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);
  const lectures = await getEventLectures(params.slug);

  if (!event) {
    notFound();
  }

  let title = event.title;
  let description = event.description;
  if (event.subtitle) {
    title += " " + event.subtitle;
  }

  if (title.length > 55) {
    title = title.substring(0, 55) + "...";
  }

  if (description.length > 100) {
    description = description.substring(0, 100) + "...";
  }

  function getSpeakersNames() {
    const speakers = [];
    lectures.map((lecture) => {
      lecture.speakers.map((speaker) => {
        speakers.push(speaker.name);
      });
    });
    return speakers;
  }

  return {
    keywords: event.tags,
    creator: event.host.name,
    authors: getSpeakersNames(),
    openGraph: {
      title: title,
      description: description,
      siteName: "Jeteo",
      images: [
        {
          url: socialpreview.src,
          width: 1280,
          height: 600,
          alt: "jeteo",
        },
      ],
      locale: "pl_PL",
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) {
    notFound();
  }
  const lectures = await getEventLectures(params.slug);

  const now = dayjs();
  const start = dayjs(event.from);
  const isFuture = now.isBefore(start);

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.header}>
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: `url('${event.coverImage}')`,
          }}
        ></div>

        <div
          className={styles.backgroundColor}
          style={{
            background: `linear-gradient(to right, ${event.primaryColor}, ${colors.primary})`,
          }}
        />
        {isFuture&&<div className={styles.containerWrapper} style={{ zIndex: 3 }}>
          <div className={styles.container}>
            <div className={styles.actionBox}>
              <BasicCallendarButton
                name={event.title}
                startTime={event.from}
                endTime={event.to}
                timeZone="Europe/Warsaw"
                location={
                  event.address
                    ? `${event.address.city} ${event.address.place}`
                    : "online"
                }
                className={styles.btn}
              />
            </div>
          </div>
        </div>}
      </div>
      <div className={styles.containerWrapper} style={{ zIndex: 3 }}>
        <div className={styles.container}>
          <div className={styles.titleAnchor}>
            <div className={styles.title}>
              <div className={styles.tags}>
                {event.tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
              <Text variant={"headL"} bold>
                {event.title}
              </Text>
              <Text variant={"bodyM"}>{event.subtitle}</Text>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.main}>
              <div className={cs(styles.box, styles.description)}>
                <Text variant={"headS"} bold>
                  Opis
                </Text>

                <EventDescription description={event.description} />
              </div>
              <div id="rate" className={styles.agenda}>
                <Text variant={"headS"} bold>
                  Agenda
                </Text>

                <EventLectures lectures={lectures} />
              </div>
            </div>

            <div className={styles.side}>
              <div className={cs(styles.box, styles.host)}>
                <Avatar
                  size={86}
                  src={event.host.avatar}
                  className={styles.avatar}
                />
                <Text variant={"headS"} bold>
                  {event.host.name}
                </Text>
                {event.host.jobTitle && (
                  <Text
                    variant={"bodyM"}
                    bold
                    style={{ textAlign: "center", marginTop: -15 }}
                  >
                    {event.host.jobTitle}
                  </Text>
                )}
                {event.host.description && (
                  <Text variant={"bodyM"} style={{ textAlign: "justify" }}>
                    {event.host.description}
                  </Text>
                )}
                <UserSocials socials={event.host.socials} />
              </div>
              <div className={cs(styles.box, styles.timeBox)}>
                <Text variant={"headS"} bold>
                  Kiedy?
                </Text>
                <Text variant={"bodyM"}>
                  {formatFromToDates(event.from, event.to)}
                </Text>
              </div>

              {event.address && (
                <div className={cs(styles.box, styles.location)}>
                  <Text variant={"headS"} bold>
                    Gdzie?
                  </Text>
                  <Text variant={"bodyM"}>
                    {event.address.city}, {event.address.place}
                  </Text>

                  <Map coordinates={event.address.coordinates} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
