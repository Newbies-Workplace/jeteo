import {
  LectureDetailsResponse,
  LectureResponse,
} from "@/lib/models/lecture.response";
import { getIdFromSlug } from "@/lib/slugs";
import { prisma } from "@/lib/prisma";
import {
  convertLecture,
  convertLectureDetails,
} from "@/lib/actions/converters";
import { auth } from "@/lib/auth";
import {
  assertEventReadAccess,
  assertLectureReadAccess,
} from "@/lib/actions/auth.methods";

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
