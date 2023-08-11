import { Event } from '@prisma/client';
import { EventResponse } from 'shared/model/event/response/event.response';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';

@Injectable()
export class EventConverter {
  constructor(private readonly prismaService: PrismaService) {}

  async convert(event: Event): Promise<EventResponse> {
    const author = await this.prismaService.user.findFirst({
      select: {
        name: true,
        avatar: true,
      },
      where: { id: event.userId },
    });

    return {
      id: event.id,
      slug: event.id, //todo create slug from title and id
      title: event.title,
      subtitle: event.subtitle,
      description: event.description,
      from: event.from.toISOString(),
      to: event.from.toISOString(),
      address: event.city &&
        event.place && {
          city: event.city,
          place: event.place,
          ...(event.latitude &&
            event.longitude && {
              coordinates: {
                latitude: event.latitude,
                longitude: event.longitude,
              },
            }),
        },
      host: {
        name: author.name,
        avatar: author.avatar,
      },
      createdAt: event.createdAt.toISOString(),
      links: event.links,
      tags: event.tags,
      primaryColor: event.primaryColor,
      coverImage: event.coverImage,
      visibility: event.visibility,
      userId: event.userId,
    };
  }
}
