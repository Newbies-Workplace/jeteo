import { Event } from '@prisma/client';
import { EventResponse } from 'shared/model/event/response/event.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventConverter {
  convert(event: Event): EventResponse {
    return {
      id: event.id,
      slug: event.id, //todo create slug from title and id
      title: event.title,
      subtitle: event.subtitle,
      description: event.description,
      from: event.from.toISOString(),
      to: event.from.toISOString(),
      address: {
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
