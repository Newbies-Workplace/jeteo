import { Text } from "@/components/atoms/text/Text";
import { notFound } from "next/navigation";
import { Tag } from "@/components/atoms/tag/Tag";
import { Navbar } from "@/components/molecules/navbar/Navbar";
import { EventDescription } from "@/app/events/[slug]/components/eventDescription/EventDescription";
import { formatFromToDates } from "@/lib/dates";
import { Map } from "@/components/molecules/map/Map";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import { UserSocials } from "@/components/molecules/userSocials/UserSocials";
import { EventLectures } from "@/app/events/[slug]/components/eventLectures/EventLectures";
import { Metadata } from "next";
import SocialPreview from "@/assets/social-preview.png";
import dayjs from "dayjs";
import { CalendarButton } from "@/components/atoms/calendarButton/CalendarButton";
import { getEvent } from "@/lib/actions/get-events";
import { getEventLectures } from "@/lib/actions/get-lectures";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const event = await getEvent(slug);
  if (!event) {
    notFound();
  }
  const lectures = await getEventLectures(slug);

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
    const speakers: string[] = [];
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
    authors: getSpeakersNames().map((name) => ({
      name: name,
    })),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      siteName: "Jeteo",
      images: [
        {
          url: SocialPreview.src,
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

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const event = await getEvent(slug);
  if (!event) {
    notFound();
  }
  const lectures = await getEventLectures(slug);

  const now = dayjs();
  const start = dayjs(event.from);
  const isFuture = now.isBefore(start);

  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <div className="relative flex self-stretch bg-primary min-h-[320px] rounded-b md:rounded-b-2xl">
        <div
          className="z-[2] absolute top-0 left-0 right-0 bottom-0 h-full w-full min-h-[320px] rounded-b-2xl opacity-35 bg-no-repeat bg-cover"
          style={{
            backgroundImage: event.coverImage
              ? `url('${event.coverImage}')`
              : undefined,
          }}
        />
        <div
          className="z-[1] absolute top-0 left-0 right-0 bottom-0 h-full w-full min-h-[320px] rounded-b-2xl"
          style={{
            background: `linear-gradient(to right, ${event.primaryColor}, var(--color-primary))`,
          }}
        />
        {isFuture && (
          <div className="z-[2] flex my-0 mx-auto w-full justify-center self-stretch">
            <div className="w-full max-w-screen-xl mx-4 mt-2 mb-4">
              <div className="flex flex-row-reverse">
                <CalendarButton
                  id={event.id}
                  name={event.title}
                  startTime={event.from}
                  endTime={event.to}
                  location={
                    event.address
                      ? `${event.address.city} ${event.address.place}`
                      : "online"
                  }
                  className="rounded-[8px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="z-[3] flex mx-auto w-full justify-center self-stretch">
        <div className="flex w-full max-w-screen-xl flex-col gap-4 flex-1 self-stretch m-4 -mt-12 px-2 md:px-0">
          <div className="relative">
            <div className="absolute bottom-0 flex flex-col items-start self-stretch gap-1 text-white">
              <div className="flex flex-wrap flex-row gap-2">
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
          <div className="flex flex-col md:flex-row md:items-start justify-center gap-4 self-stretch pb-16">
            <div className="flex flex-col items-start gap-4 flex-1">
              <div className="flex p-4 flex-col gap-4 self-stretch bg-surface rounded-2xl max-md:order-1">
                <Text variant={"headS"} bold>
                  Opis
                </Text>
                <EventDescription description={event.description} />
              </div>
              <div
                id="rate"
                className="flex flex-col items-center gap-4 self-stretch max-md:order-4"
              >
                <Text variant={"headS"} bold>
                  Agenda
                </Text>
                <EventLectures lectures={lectures} />
              </div>
            </div>
            <div className="flex md:max-w-[304px] flex-col items-start gap-4 flex-1">
              <div className="flex p-4 flex-col gap-4 self-stretch items-center bg-surface rounded-2xl max-md:order-5">
                <Avatar
                  size={86}
                  src={event.host.avatar}
                  className="md:-mt-12"
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
                  <Text variant={"bodyM"} className={"text-justify"}>
                    {event.host.description}
                  </Text>
                )}
                <UserSocials socials={event.host.socials} />
              </div>
              <div className="flex p-4 flex-col gap-4 self-stretch bg-surface rounded-2xl max-md:order-3">
                <Text variant={"headS"} bold>
                  Kiedy?
                </Text>
                <Text variant={"bodyM"}>
                  {formatFromToDates(event.from, event.to)}
                </Text>
              </div>
              {event.address && (
                <div className="flex p-4 flex-col gap-4 self-stretch bg-surface rounded-2xl max-md:order-2">
                  <Text variant={"headS"} bold>
                    Gdzie?
                  </Text>
                  <Text variant={"bodyM"}>
                    {event.address.city}, {event.address.place}
                  </Text>
                  {event.address.coordinates && (
                    <Map coordinates={event.address.coordinates} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
