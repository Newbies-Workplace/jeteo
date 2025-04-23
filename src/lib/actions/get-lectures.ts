import {
  LectureDetailsResponse,
  LectureResponse,
} from "@/lib/models/lecture.response";
import { getIdFromSlug } from "@/lib/slugs";
import { prisma } from "@/lib/prisma";
import { assertEventReadAccess } from "@/lib/actions/get-events";
import {
  convertLecture,
  convertLectureDetails,
  LectureDetails,
} from "@/lib/actions/converters";
import { auth } from "@/lib/auth";
import { EventVisibility } from "@prisma/client";

export const getEventLectures = async (
  eventSlug: string
): Promise<LectureResponse[]> => {
  const eventId = getIdFromSlug(eventSlug);
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  if (!event) {
    throw "EventNotFoundException";
  }

  const lectures = await prisma.lecture.findMany({
    include: {
      Event: true,
      Invites: true,
      Speakers: true,
      Rate: true,
    },
    where: {
      eventId: eventId,
    },
    orderBy: {
      from: "asc",
    },
  });

  await assertEventReadAccess(event);

  return await Promise.all(lectures.map((lecture) => convertLecture(lecture)));
};

export const getMyLectures = async (): Promise<LectureResponse[]> => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    throw "UserNotFoundException";
  }

  const lectures = await prisma.lecture.findMany({
    include: {
      Event: true,
      Invites: true,
      Speakers: true,
      Rate: true,
    },
    where: {
      Speakers: {
        some: {
          id: user.id,
        },
      },
    },
    orderBy: {
      from: "asc",
    },
  });

  return await Promise.all(lectures.map((lecture) => convertLecture(lecture)));
};

export const getLectureDetails = async (
  lectureSlug: string
): Promise<LectureDetailsResponse> => {
  const lectureId = getIdFromSlug(lectureSlug);
  const lecture = await prisma.lecture.findUnique({
    where: {
      id: lectureId,
    },
    include: {
      Event: true,
      Invites: true,
      Speakers: true,
      Rate: true,
    },
  });
  if (!lecture) {
    throw "LectureNotFoundException";
  }

  await assertLectureReadAccess(lecture, "detailed");

  return convertLectureDetails(lecture);
};

export const assertLectureReadAccess = async (
  lecture: LectureDetails,
  lectureType: "detailed" | "public"
) => {
  const session = await auth();
  const user = session?.user;

  const event = lecture.Event;

  if (
    event.visibility !== EventVisibility.PRIVATE &&
    lectureType === "public"
  ) {
    return;
  }

  if (
    user &&
    (lecture.Event.authorId === user.id ||
      lecture.Speakers.map((speaker) => speaker.id).includes(user.id!))
  ) {
    return;
  }

  throw "NotAllowedToReadLectureException";
};
