import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { CreateEventRequest } from 'shared/model/event/request/createEvent.request';
import { Event } from '@prisma/client';
import { UpdateEventRequest } from 'shared/model/event/request/updateEventRequest';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  async getEventById(id: string): Promise<Event> {
    return this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }

  async getPublicEvents(page: number, size: number): Promise<Event[]> {
    return this.prismaService.event.findMany({
      where: {
        visibility: 'PUBLIC',
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async getUserEventsById(
    userId: string,
    page: number,
    size: number,
  ): Promise<Event[]> {
    return this.prismaService.event.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async createEvent(
    userId: string,
    createEventDto: CreateEventRequest,
  ): Promise<Event> {
    return this.prismaService.event.create({
      data: {
        title: createEventDto.title,
        subtitle: createEventDto.subtitle,
        description: createEventDto.description,
        from: new Date(createEventDto.from),
        to: new Date(createEventDto.to),
        city: createEventDto.address?.city,
        place: createEventDto.address?.place,
        latitude: createEventDto.address?.coordinates?.latitude,
        longitude: createEventDto.address?.coordinates?.longitude,
        primaryColor: '#4340BE',
        userId,
      },
    });
  }

  async updateEvent(eventId: string, updateEventRequest: UpdateEventRequest) {
    const address = {
      city:
        updateEventRequest.address === null
          ? null
          : updateEventRequest.address?.city,
      place:
        updateEventRequest.address === null
          ? null
          : updateEventRequest.address?.place,
      latitude:
        updateEventRequest.address === null
          ? null
          : updateEventRequest.address?.coordinates?.latitude,
      longitude:
        updateEventRequest.address === null
          ? null
          : updateEventRequest.address?.coordinates?.longitude,
    };

    return this.prismaService.event.update({
      data: {
        title: updateEventRequest.title,
        subtitle: updateEventRequest.subtitle,
        description: updateEventRequest.description,
        from: updateEventRequest.from && new Date(updateEventRequest.from),
        to: updateEventRequest.to && new Date(updateEventRequest.to),
        ...address,
        primaryColor: updateEventRequest.primaryColor,
        visibility: updateEventRequest.visibility,
      },
      where: {
        id: eventId,
      },
    });
  }
}
