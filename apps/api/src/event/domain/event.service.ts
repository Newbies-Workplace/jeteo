import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { CreateEventRequest } from 'shared/model/event/request/createEvent.request';
import { Event } from '@prisma/client';
import { UpdateEventRequest } from 'shared/model/event/request/updateEvent.request';
import { nanoid } from '@/common/nanoid';
import { StorageService } from '@/storage/domain/storage.service';
import dayjs from 'dayjs';
import { EventInvalidDatesException } from '@/event/domain/exceptions/EventInvalidDatesException';

@Injectable()
export class EventService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async getPublicEvents(page: number, size: number): Promise<Event[]> {
    return this.prismaService.event.findMany({
      where: {
        visibility: 'PUBLIC',
      },
      orderBy: {
        from: 'desc',
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
        authorId: userId,
      },
      orderBy: {
        from: 'desc',
      },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async createEvent(
    userId: string,
    createEventDto: CreateEventRequest,
  ): Promise<Event> {
    this.assertDates(dayjs(createEventDto.from), dayjs(createEventDto.to));

    return this.prismaService.event.create({
      data: {
        id: nanoid(),
        title: createEventDto.title,
        subtitle: createEventDto.subtitle,
        description: createEventDto.description,
        from: new Date(createEventDto.from),
        to: new Date(createEventDto.to),
        city: createEventDto.address?.city,
        place: createEventDto.address?.place,
        latitude: createEventDto.address?.coordinates?.latitude,
        longitude: createEventDto.address?.coordinates?.longitude,
        tags: createEventDto.tags,
        primaryColor: '#4340BE',
        visibility: 'HIDDEN',
        authorId: userId,
      },
    });
  }

  async updateEvent(eventId: string, updateEventRequest: UpdateEventRequest) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });
    const from = updateEventRequest.from
      ? dayjs(updateEventRequest.from)
      : dayjs(event.from);
    const to = updateEventRequest.to
      ? dayjs(updateEventRequest.to)
      : dayjs(event.to);

    this.assertDates(from, to);
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
        tags: updateEventRequest.tags,
      },
      where: {
        id: eventId,
      },
    });
  }

  async updateEventCover(
    eventId: string,
    cover: Express.Multer.File,
  ): Promise<string> {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    let filename = event.coverImage;

    if (!event.coverImage) {
      filename = await this.storageService.createFile(
        cover.buffer,
        `/events/${eventId}`,
      );
    } else {
      filename = await this.storageService.replaceFile(
        cover.buffer,
        event.coverImage,
      );
    }

    const filePath = `/events/${eventId}/${filename}`;

    await this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: {
        coverImage: filePath,
      },
    });

    return filePath;
  }

  async deleteEventCover(eventId: string): Promise<void> {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event.coverImage) {
      return;
    }

    await this.storageService.deleteFile(event.coverImage);
    await this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: {
        coverImage: null,
      },
    });
  }

  async deleteEvent(eventId: string) {
    return this.prismaService.event.delete({
      where: {
        id: eventId,
      },
    });
  }

  private assertDates(from: dayjs.Dayjs, to: dayjs.Dayjs) {
    if (from.isAfter(to)) {
      throw new EventInvalidDatesException();
    }
  }
}
