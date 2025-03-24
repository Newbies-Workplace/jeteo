"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import {
  convertEvent,
  convertStoragePath,
  extractFormData,
} from "@/lib/data/converters";
import {
  assertEventWriteAccess,
  assertEventVisibilityAccess,
} from "../data/auth.methods";
import dayjs from "dayjs";
import { nanoid } from "@/lib/nanoid";
import { EventVisibility } from "@prisma/client";
import { EventResponse } from "shared/model/event/response/event.response";
import {
  createFile,
  deleteFile,
  replaceFile,
} from "@/app/api/storage/storage-service";

// Define Zod schema for CreateEventRequest
const createEventSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  from: z.string(),
  to: z.string(),
  address: z
    .object({
      city: z.string().optional(),
      place: z.string().optional(),
      coordinates: z
        .object({
          latitude: z.number().optional(),
          longitude: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
});

export const createEvent = async (data: FormData): Promise<EventResponse> => {
  // Validate data using Zod schema
  const validatedData = createEventSchema.parse(extractFormData(data));

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const event = await prisma.event.create({
    data: {
      id: nanoid(),
      title: validatedData.title,
      subtitle: validatedData.subtitle,
      description: validatedData.description,
      from: new Date(validatedData.from),
      to: new Date(validatedData.to),
      city: validatedData.address?.city,
      place: validatedData.address?.place,
      latitude: validatedData.address?.coordinates?.latitude,
      longitude: validatedData.address?.coordinates?.longitude,
      tags: validatedData.tags,
      primaryColor: "#4340BE",
      visibility: "HIDDEN",
      authorId: userId,
    },
    include: {
      Author: true,
    },
  });

  return convertEvent(event);
};

// Define Zod schema for UpdateEventRequest
const updateEventSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  address: z
    .object({
      city: z.string().optional(),
      place: z.string().optional(),
      coordinates: z
        .object({
          latitude: z.number().optional(),
          longitude: z.number().optional(),
        })
        .optional(),
    })
    .nullable()
    .optional(),
  tags: z.array(z.string()).optional(),
  primaryColor: z.string().optional(),
  visibility: z.nativeEnum(EventVisibility).optional(),
});

export const updateEvent = async (
  eventId: string,
  data: FormData
): Promise<EventResponse> => {
  // Validate data using Zod schema
  const validatedData = updateEventSchema.parse(extractFormData(data));

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  await assertEventWriteAccess(event);
  await assertEventVisibilityAccess(validatedData);

  const from = dayjs(validatedData.from ? validatedData.from : event.from);
  const to = dayjs(validatedData.to ? validatedData.to : event.to);

  if (from.isAfter(to)) {
    throw "EventInvalidDatesException";
  }

  const address = {
    city: validatedData.address?.city,
    place: validatedData.address?.place,
    latitude: validatedData.address?.coordinates?.latitude,
    longitude: validatedData.address?.coordinates?.longitude,
  };

  const updatedEvent = await prisma.event.update({
    data: {
      title: validatedData.title,
      subtitle: validatedData.subtitle,
      description: validatedData.description,
      from: validatedData.from && new Date(validatedData.from),
      to: validatedData.to && new Date(validatedData.to),
      ...address,
      primaryColor: validatedData.primaryColor,
      visibility: validatedData.visibility,
      tags: validatedData.tags,
    },
    where: {
      id: eventId,
    },
    include: {
      Author: true,
    },
  });

  return convertEvent(updatedEvent);
};

export const updateEventCover = async (
  eventId: string,
  form: FormData
): Promise<{ coverImage: string }> => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  await assertEventWriteAccess(event);

  const coverImage = form.get("coverImage") as File;

  let filename: string;

  if (!event.coverImage) {
    filename = await createFile(coverImage, `/events/${eventId}`);
  } else {
    filename = await replaceFile(coverImage, event.coverImage);
  }

  const filePath = `/events/${eventId}/${filename}`;

  await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      coverImage: filePath,
    },
  });

  return { coverImage: convertStoragePath(filePath) };
};

export const deleteEventCover = async (eventId: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  await assertEventWriteAccess(event);

  if (!event.coverImage) {
    return;
  }

  await deleteFile(event.coverImage);
  await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      coverImage: null,
    },
  });
};

export const deleteEvent = async (eventId: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  await assertEventWriteAccess(event);

  await prisma.event.delete({
    where: {
      id: eventId,
    },
  });
};
