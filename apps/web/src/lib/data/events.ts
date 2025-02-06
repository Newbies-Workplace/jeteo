import { prisma } from "@/lib/prisma";
import { EventResponse } from "shared/model/event/response/event.response";
import { convertEvent } from "@/lib/data/converters";

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
