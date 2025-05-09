import { prisma } from "@/lib/prisma";
import { EventResponse } from "@/lib/models/event.response";
import { convertEvent } from "@/lib/actions/converters";
import { getIdFromSlug } from "@/lib/slugs";
import { auth } from "@/lib/auth";
import { assertEventReadAccess } from "./auth.methods";

export const getPublicEvents = async (
  page: number,
  size: number
): Promise<EventResponse[]> => {
  const events = await prisma.event.findMany({
    where: {
      visibility: "PUBLIC",
    },
    orderBy: {
      from: "desc",
    },
    skip: (page - 1) * size,
    take: size,
    include: {
      Author: true,
    },
  });

  return await Promise.all(events.map((event) => convertEvent(event)));
};

export const getMyEvents = async (
  page: number,
  size: number
): Promise<EventResponse[]> => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    throw "UserNotFoundException";
  }

  const events = await prisma.event.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      from: "desc",
    },
    skip: (page - 1) * size,
    take: size,
    include: {
      Author: true,
    },
  });

  return await Promise.all(events.map((event) => convertEvent(event)));
};

export const getEvent = async (slug: string): Promise<EventResponse | null> => {
  const event = await prisma.event.findUnique({
    where: {
      id: getIdFromSlug(slug),
    },
    include: {
      Author: true,
    },
  });

  if (!event) {
    return null;
  }

  await assertEventReadAccess(event);

  return convertEvent(event);
};
