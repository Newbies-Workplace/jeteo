"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { UpdateLectureRequest } from "shared/model/lecture/request/updateLecture.request";
import { convertLectureDetails, LectureDetails } from "@/lib/data/converters";
import { assertEventWriteAccess, assertLectureReadAccess, assertLectureWriteAccess } from "../data/auth.methods";
import { LectureDetailsResponse } from "shared/model/lecture/response/lecture.response";
import { RateLectureRequest } from "shared/model/lecture/request/rateLecture.request";
import { nanoid } from "../nanoid";
import { CreateLectureRequest } from "shared/model/lecture/request/createLecture.request";
import dayjs from "dayjs";

// Define Zod schema for UpdateLectureRequest
const updateLectureSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  tags: z.array(z.string()).optional(),
});

const createLectureSchema = z.object({
  title: z.string(),
  description: z.string(),
  from: z.string(),
  to: z.string(),
  youtubeVideoId: z.string().optional(),
  invites: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      mail: z.string().email(),
    })
  ).optional(),
});

export const createLecture = async (
  eventId: string,
  data: CreateLectureRequest
): Promise<LectureDetailsResponse> => {
  // Validate data using Zod schema
  const validatedData = createLectureSchema.parse(data);

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const from = dayjs(validatedData.from);
  const to = dayjs(validatedData.to);

  if (from.isAfter(to)) {
    throw 'LectureInvalidDatesException';
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
          data: validatedData.invites?.map((invite) => ({
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
  data: Partial<UpdateLectureRequest>
): Promise<LectureDetailsResponse> => {
  // Validate data using Zod schema
  const validatedData = updateLectureSchema.parse(data);

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const lecture = await getLectureDetailsById(lectureId);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  assertLectureWriteAccess(lecture);

  const updatedLecture = await prisma.lecture.update({
    data: validatedData,
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

  assertEventWriteAccess(lecture.Event);

  await prisma.lecture.delete({
    where: { id },
  });
};

export const rateLecture = async (
  id: string,
  request: RateLectureRequest
): Promise<LectureDetailsResponse> => {
  const lecture = await getLectureDetailsById(id);

  if (!lecture) {
    throw new Error("Lecture not found");
  }

  assertLectureReadAccess(lecture, "public");

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
  const lecture: LectureDetails = await prisma.lecture.findUniqueOrThrow({
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

  return lecture;
};
