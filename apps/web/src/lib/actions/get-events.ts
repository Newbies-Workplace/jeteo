import { prisma } from "@/lib/prisma";
import { EventResponse } from "shared/model/event/response/event.response";
import { convertEvent } from "@/lib/actions/converters";
import { Event, EventVisibility } from "@prisma/client";
import { getIdFromSlug } from "@/lib/slugs";
import { auth } from "@/lib/auth";

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
    //todo throw user not found
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

export const assertEventReadAccess = async (event: Event) => {
  const session = await auth();
  const user = session?.user;

  if (event.visibility !== EventVisibility.PRIVATE) {
    return;
  }

  if (user && event.authorId === user.id) {
    return;
  }

  // todo handle in a better way
  throw "NotAllowedToReadEventException";
};
