"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { convertEvent, convertStoragePath } from "@/lib/actions/converters";
import {
  assertEventWriteAccess,
  assertEventVisibilityAccess,
} from "@/lib/actions/auth.methods";
import dayjs from "dayjs";
import { nanoid } from "@/lib/nanoid";
import { EventResponse } from "shared/model/event/response/event.response";
import {
  createFile,
  deleteFile,
  replaceFile,
} from "@/app/api/storage/storage-service";
import {
  EventCreateSchema,
  eventCreateSchema,
  EventUpdateSchema,
  eventUpdateSchema,
} from "@/lib/actions/schemas";

export const createEvent = async (
  data: EventCreateSchema
): Promise<EventResponse> => {
  const validatedData = eventCreateSchema.parse(data);

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const address = {
    city: validatedData.address?.city,
    place: validatedData.address?.place,
    latitude: validatedData.address?.coordinates?.latitude,
    longitude: validatedData.address?.coordinates?.longitude,
  };

  const event = await prisma.event.create({
    data: {
      id: nanoid(),
      title: validatedData.title,
      subtitle: validatedData.subtitle,
      description: validatedData.description,
      from: new Date(validatedData.from),
      to: new Date(validatedData.to),
      ...address,
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

export const updateEvent = async (
  eventId: string,
  data: EventUpdateSchema
): Promise<EventResponse> => {
  const validatedData = eventUpdateSchema.parse(data);

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
    city: validatedData.address?.city ?? null,
    place: validatedData.address?.place ?? null,
    latitude: validatedData.address?.coordinates?.latitude ?? null,
    longitude: validatedData.address?.coordinates?.longitude ?? null,
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
