import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../domain/event.service';
import { CreateEventRequest } from 'shared/model/event/request/createEvent.request';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/auth/jwt/jwt.decorator';
import { TokenUser } from 'src/auth/jwt/jwt.model';
import { GetEventsQuery } from 'shared/model/event/request/getEvents.query';
import { EventResponse } from 'shared/model/event/response/event.response';
import { EventConverter } from './event.converter';
import { UpdateEventRequest } from 'shared/model/event/request/updateEvent.request';
import { Event } from '@prisma/client';
import { StudioLectureResponse } from 'shared/model/lecture/response/lecture.response';
import { CreateLectureRequest } from 'shared/model/lecture/request/createLecture.request';
import { LectureService } from '@/lecture/domain/lecture.service';
import { LectureConverter } from '@/lecture/application/lecture.converter';
import { PrismaService } from '@/config/prisma.service';

@Controller('/rest/v1/events')
export class EventController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventService: EventService,
    private readonly eventConverter: EventConverter,
    private readonly lectureService: LectureService,
    private readonly lectureConverter: LectureConverter,
  ) {}

  @Post('/')
  @UseGuards(JwtGuard)
  async createEvent(
    @User() user: TokenUser,
    @Body() createEventRequest: CreateEventRequest,
  ): Promise<EventResponse> {
    const event = await this.eventService.createEvent(
      user.id,
      createEventRequest,
    );

    return await this.eventConverter.convert(event);
  }

  @Get('')
  async getPublicEvents(
    @Query() paginationQuery: GetEventsQuery,
  ): Promise<EventResponse[]> {
    const events = await this.eventService.getPublicEvents(
      paginationQuery.page,
      paginationQuery.size,
    );

    return await Promise.all(
      events.map((event) => this.eventConverter.convert(event)),
    );
  }

  @Get('/@me')
  @UseGuards(JwtGuard)
  async getMe(
    @User() user: TokenUser,
    @Query() pagination: GetEventsQuery,
  ): Promise<EventResponse[]> {
    const events = await this.eventService.getUserEventsById(
      user.id,
      pagination.page,
      pagination.size,
    );

    return await Promise.all(
      events.map((event) => this.eventConverter.convert(event)),
    );
  }

  @Post('/:id/lectures')
  @UseGuards(JwtGuard)
  async createLecture(
    @Param('id') eventId: string,
    @User() user: TokenUser,
    @Body() createLectureRequest: CreateLectureRequest,
  ): Promise<StudioLectureResponse> {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    this.assertEventOwner(event, user);

    const lecture = await this.lectureService.createLecture(
      eventId,
      user.id,
      createLectureRequest,
    );

    return this.lectureConverter.convertStudio(lecture, [], lecture.Invites);
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async patchEvent(
    @Param('id') eventId: string,
    @Body() updateEventRequest: UpdateEventRequest,
    @User() user: TokenUser,
  ): Promise<EventResponse> {
    const event: Event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    this.assertEventOwner(event, user);

    const updatedEvent = await this.eventService.updateEvent(
      eventId,
      updateEventRequest,
    );

    return await this.eventConverter.convert(updatedEvent);
  }

  @Get('/:id')
  async getEvent(@Param('id') eventId: string): Promise<EventResponse> {
    //todo validate if user has access to event (if event is private)
    const event = await this.eventService.getEventById(eventId);
    if (!event) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return await this.eventConverter.convert(event);
  }

  private assertEventOwner(event: Event, user: TokenUser) {
    if (event.userId !== user.id) {
      throw new HttpException(
        'User is not an event owner',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
