"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  convertLectureDetails,
  LectureDetails,
} from "@/lib/actions/converters";
import {
  assertEventWriteAccess,
  assertLectureReadAccess,
  assertLectureWriteAccess,
} from "@/lib/actions/auth.methods";
import { LectureDetailsResponse } from "@/lib/models/lecture.response";
import { nanoid } from "../nanoid";
import dayjs from "dayjs";
import {
  LectureCreateSchema,
  lectureCreateSchema,
  LectureRateSchema,
  LectureUpdateSchema,
  lectureUpdateSchema,
} from "@/lib/actions/schemas";

export const createLecture = async (
  eventId: string,
  data: LectureCreateSchema
): Promise<LectureDetailsResponse> => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validatedData = lectureCreateSchema.parse(data);

  const from = dayjs(validatedData.from);
  const to = dayjs(validatedData.to);
  if (from.isAfter(to)) {
    throw "LectureInvalidDatesException";
  }

  const lecture = await prisma.lecture.create({
    data: {
      id: nanoid(),
      eventId: eventId,
      authorId: userId,
      title: validatedData.title,
      description: validatedData.description,
      from: new Date(validatedData.from),
      to: new Date(validatedData.to),
      youtubeVideoId: validatedData.youtubeVideoId,
      Invites: {
        createMany: {
          data:
            validatedData.speakersAndInvites.invites?.map((invite) => ({
              id: invite.id,
              name: invite.name,
              userId: userId,
              mail: invite.mail,
            })) || [],
        },
      },
    },
    include: {
      Event: true,
      Invites: true,
      Speakers: true,
      Rate: true,
    },
  });

  return convertLectureDetails(lecture);
};

export const updateLecture = async (
  lectureId: string,
  data: LectureUpdateSchema
): Promise<LectureDetailsResponse> => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validatedData = lectureUpdateSchema.parse(data);
  const lecture = await getLectureDetailsById(lectureId);
  if (!lecture) {
    throw new Error("Lecture not found");
  }

  await assertLectureWriteAccess(lecture);

  // todo validate dates

  // delete old speakers
  const speakersToDelete = lecture.Speakers.filter(
    (speaker) =>
      !data.speakersAndInvites!.speakers.some(
        (newSpeakerId) => newSpeakerId === speaker.id
      )
  );

  // delete old invites
  const invitesToDelete = lecture.Invites.filter(
    (invite) =>
      !data.speakersAndInvites!.invites.some(
        (newInvite) => newInvite.id === invite.id
      )
  );

  // create new invites
  const invitesToCreate = data
    .speakersAndInvites!.invites.map((invite) => {
      return {
        id: invite.id,
        name: invite.name,
        userId: lecture.authorId,
        mail: invite.mail,
      };
    })
    .filter(
      (invite) =>
        !lecture.Invites.some(
          (existingInvite) => existingInvite.id === invite.id
        )
    );

  const updatedLecture = await prisma.lecture.update({
    data: {
      title: validatedData.title,
      description: validatedData.description,
      from: validatedData.from ? new Date(validatedData.from) : undefined,
      to: validatedData.to ? new Date(validatedData.to) : undefined,
      youtubeVideoId: validatedData.youtubeVideoId,
      Speakers: {
        deleteMany: {
          id: {
            in: speakersToDelete.map((speaker) => speaker.id),
          },
        },
      },
      Invites: {
        deleteMany: {
          id: {
            in: invitesToDelete.map((invite) => invite.id),
          },
        },
        createMany: {
          data: invitesToCreate,
        },
      },
    },
    where: {
      id: lectureId,
    },
    include: {
      Invites: true,
      Speakers: true,
      Event: true,
      Rate: true,
    },
  });

  return convertLectureDetails(updatedLecture);
};

export const deleteLecture = async (id: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const lecture = await getLectureDetailsById(id);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  await assertEventWriteAccess(lecture.Event);

  await prisma.lecture.delete({
    where: { id },
  });
};

export const rateLecture = async (
  id: string,
  request: LectureRateSchema
): Promise<LectureDetailsResponse> => {
  const lecture = await getLectureDetailsById(id);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  await assertLectureReadAccess(lecture, "public");

  await prisma.rate.create({
    data: {
      id: nanoid(),
      lectureId: lecture.id,
      overallRate: request.overallRate,
      topicRate: request.topicRate,
      opinion: request.opinion,
    },
  });

  const updatedLecture = await getLectureDetailsById(id);

  return convertLectureDetails(updatedLecture);
};

const getLectureDetailsById = async (id: string): Promise<LectureDetails> => {
  return prisma.lecture.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      Invites: true,
      Speakers: true,
      Event: true,
      Rate: true,
    },
  });
};
