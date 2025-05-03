import { Event, Invite, Lecture, Rate, User } from "@prisma/client";
import { EventResponse } from "@/lib/models/event.response";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slugs";
import { UserDetailsResponse, UserResponse } from "@/lib/models/user.response";
import {
  InviteDetailsResponse,
  InviteResponse,
} from "@/lib/models/invite.response";
import {
  LectureDetailsResponse,
  LectureResponse,
} from "@/lib/models/lecture.response";

export type LectureDetails = Lecture & {
  Event: Event;
  Speakers: User[];
  Invites: Invite[];
  Rate: Rate[];
};

export const convertEvent = async (
  event: Event & { Author: User }
): Promise<EventResponse> => {
  const rate = await prisma.rate.aggregate({
    _avg: {
      topicRate: true,
      overallRate: true,
    },
    _count: {
      overallRate: true,
    },
    where: {
      Lecture: {
        eventId: event.id,
      },
    },
  });

  return {
    id: event.id,
    slug: generateSlug(event.title, event.id),
    title: event.title,
    subtitle: event.subtitle ?? undefined,
    description: event.description,
    from: event.from.toISOString(),
    to: event.to.toISOString(),
    address:
      event.city && event.place
        ? {
            city: event.city,
            place: event.place,
            ...(event.latitude &&
              event.longitude && {
                coordinates: {
                  latitude: event.latitude,
                  longitude: event.longitude,
                },
              }),
          }
        : undefined,
    ratingSummary: {
      average:
        rate._avg.overallRate && rate._avg.topicRate
          ? (rate._avg.overallRate + rate._avg.topicRate) / 2
          : 0,
      count: rate._count.overallRate,
    },
    host: convertUser(event.Author),
    createdAt: event.createdAt.toISOString(),
    tags: event.tags,
    primaryColor: event.primaryColor,
    coverImage: event.coverImage
      ? convertStoragePath(event.coverImage)
      : undefined,
    visibility: event.visibility,
    userId: event.authorId,
  };
};

export const convertUser = (user: User): UserResponse => {
  return {
    id: user.id,
    name: user.name,
    avatar: user.image ? convertStoragePath(user.image) : undefined,
    jobTitle: user.jobTitle ?? undefined,
    description: user.description ?? undefined,
    socials: {
      mail: user.mail ?? undefined,
      github: user.github ?? undefined,
      twitter: user.twitter ?? undefined,
      linkedin: user.linkedin ?? undefined,
    },
  };
};

export const convertUserDetails = (user: User): UserDetailsResponse => {
  return {
    ...convertUser(user),
    _permissions: {
      isAuthorized: user.isAuthorized,
    },
  };
};

export const convertStoragePath = (path: string): string => {
  if (path.startsWith("http")) {
    return path;
  }

  return `${process.env["NEXT_PUBLIC_FRONTEND_URL"]}/api/storage/v1${path}`;
};

export const convertInvite = async (
  invite: Invite
): Promise<InviteResponse> => {
  return {
    name: invite.name,
  };
};

export const convertInviteDetails = async (
  invite: Invite
): Promise<InviteDetailsResponse> => {
  const lecture = await prisma.lecture.findFirstOrThrow({
    where: { id: invite.lectureId },
    include: { Event: true, Author: true },
  });

  const event: Event = lecture.Event;

  return {
    id: invite.id,
    mail: invite.mail,
    name: invite.name,
    inviter: convertUser(lecture.Author),
    lecture: {
      id: lecture.id,
      slug: generateSlug(lecture.title, lecture.id),
      title: lecture.title,
      from: lecture.from.toISOString(),
      to: lecture.to.toISOString(),
    },
    event: {
      id: event.id,
      slug: generateSlug(event.title, event.id),
      title: event.title,
    },
  };
};

export const convertLecture = async (
  lecture: LectureDetails
): Promise<LectureResponse> => {
  const overallAverage =
    lecture.Rate.length === 0
      ? 0
      : lecture.Rate.reduce((acc, rate) => acc + rate.overallRate, 0) /
        lecture.Rate.length;
  const topicAverage =
    lecture.Rate.length === 0
      ? 0
      : lecture.Rate.reduce((acc, rate) => acc + rate.topicRate, 0) /
        lecture.Rate.length;
  const average = (overallAverage + topicAverage) / 2;

  return {
    id: lecture.id,
    slug: generateSlug(lecture.title, lecture.id),
    event: {
      id: lecture.Event.id,
      slug: generateSlug(lecture.Event.title, lecture.Event.id),
      title: lecture.Event.title,
      subtitle: lecture.Event.subtitle ?? undefined,
    },
    title: lecture.title,
    description: lecture.description ?? "",
    from: lecture.from.toISOString(),
    to: lecture.to.toISOString(),
    youtubeVideoId: lecture.youtubeVideoId ?? undefined,
    createdAt: lecture.createdAt.toISOString(),
    ratingSummary: {
      average: average,
      count: lecture.Rate.length,
      opinionCount: lecture.Rate.filter((rate) => rate.opinion).length,
      overallAverage: overallAverage,
      topicAverage: topicAverage,
    },
    invites: await Promise.all(
      lecture.Invites.map((invite) => convertInvite(invite))
    ),
    speakers: lecture.Speakers.map((user) => convertUser(user)),
  };
};

export const convertLectureDetails = async (
  lecture: LectureDetails
): Promise<LectureDetailsResponse> => {
  const invites = await Promise.all(
    lecture.Invites.map((invite) => convertInviteDetails(invite))
  );
  const overallRatesCounts = await prisma.rate.groupBy({
    by: ["overallRate"],
    _count: { overallRate: true },
    where: { lectureId: lecture.id },
  });
  const topicRatesCounts = await prisma.rate.groupBy({
    by: ["topicRate"],
    _count: { topicRate: true },
    where: { lectureId: lecture.id },
  });

  const formattedOverallRatesCounts = Array.from({ length: 5 }, (_, i) => {
    const overallRate = i + 1;
    const item = overallRatesCounts.find(
      (rate) => rate.overallRate === overallRate
    );
    return { [overallRate]: item ? item._count.overallRate : 0 };
  });

  const formattedTopicRatesCounts = Array.from({ length: 5 }, (_, i) => {
    const topicRate = i + 1;
    const item = topicRatesCounts.find((rate) => rate.topicRate === topicRate);
    return { [topicRate]: item ? item._count.topicRate : 0 };
  });

  return {
    ...(await convertLecture(lecture)),
    ratings: lecture.Rate.map((rate) => ({
      id: rate.id,
      opinion: rate.opinion ?? undefined,
      overallRate: rate.overallRate,
      topicRate: rate.topicRate,
      createdAt: rate.createdAt.toISOString(),
    })),
    invites: invites,
    overallRatesCounts: formattedOverallRatesCounts,
    topicRatesCounts: formattedTopicRatesCounts,
  };
};

export const youtubeVideoIdFromUrl = (
  url: string | undefined
): string | undefined => {
  if (!url) {
    return undefined;
  }

  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  );

  return match && match[2].length === 11 ? match[2] : undefined;
};
