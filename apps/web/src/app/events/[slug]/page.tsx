import { Text } from "@/components/atoms/text/Text";
import { getEvent } from "@/common/getEvent";
import { notFound } from "next/navigation";
import { Tag } from "@/components/atoms/tag/Tag";
import styles from "./page.module.scss";
import { Navbar } from "@/components/molecules/navbar/Navbar";
import { EventDescription } from "@/app/events/[slug]/components/eventDescription/EventDescription";
import { LectureCard } from "@/components/molecules/lectureCard/LectureCard";
import { formatFromToDates } from "@/common/utils";
import { Map } from "@/components/molecules/map/Map";
import cs from "classnames";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import { UserSocials } from "@/components/molecules/userSocials/UserSocials";
import { getEventLectures } from "@/common/getLecture";

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  const lectures = await getEventLectures(params.slug);
  console.log(lectures);

  if (!event) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.header} />
      <div className={styles.containerWrapper}>
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
              <div className={cs(styles.agenda, styles.agenda)}>
                <Text variant={"headS"} bold>
                  Agenda
                </Text>

                {lectures.length > 0 &&
                  lectures.map((lecture, index) => (
                    <>
                      {index !== 0 && <div className={styles.separator} />}
                      <LectureCard
                        key={lecture.id}
                        from={lecture.from}
                        to={lecture.to}
                        title={lecture.title}
                        description={lecture.description}
                        speakers={lecture.speakers}
                      />
                    </>
                  ))}
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
                <UserSocials size={24} socials={event.host.socials} />
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
