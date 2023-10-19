import { Event, User } from '@prisma/client';
import { EventResponse } from 'shared/model/event/response/event.response';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { UserConverter } from '@/user/application/user.converter';
import { generateSlug } from '@/common/slugs';

@Injectable()
export class EventConverter {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userConverter: UserConverter,
  ) {}

  async convert(event: Event): Promise<EventResponse> {
    const author: User = await this.prismaService.user.findFirst({
      where: { id: event.userId },
    });
    const rate = await this.prismaService.rate.aggregate({
      _avg: {
        topicRate: true,
        overallRate: true,
      },
      _count: {
        overallRate: true,
      },
      where: {
        lecture: {
          eventId: event.id,
        },
      },
    });

    return {
      id: event.id,
      slug: generateSlug(event.title, event.id),
      title: event.title,
      subtitle: event.subtitle,
      description: event.description,
      from: event.from.toISOString(),
      to: event.to.toISOString(),
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
      ratingSummary: {
        average: (rate._avg.overallRate + rate._avg.topicRate) / 2,
        count: rate._count.overallRate,
      },
      host: this.userConverter.convert(author),
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
