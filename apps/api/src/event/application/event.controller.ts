import {
  Body,
  Controller,
  Delete,
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
import { JwtGuard, OptionalJwtGuard } from 'src/auth/jwt/jwt.guard';
import { JWTUser } from 'src/auth/jwt/jwt.decorator';
import { TokenUser } from 'src/auth/jwt/jwt.model';
import { GetEventsQuery } from 'shared/model/event/request/getEvents.query';
import { EventResponse } from 'shared/model/event/response/event.response';
import { EventConverter } from './event.converter';
import { UpdateEventRequest } from 'shared/model/event/request/updateEvent.request';
import { Event } from '@prisma/client';
import { LectureDetailsResponse } from 'shared/model/lecture/response/lecture.response';
import { CreateLectureRequest } from 'shared/model/lecture/request/createLecture.request';
import { LectureService } from '@/lecture/domain/lecture.service';
import { LectureConverter } from '@/lecture/application/lecture.converter';
import { PrismaService } from '@/config/prisma.service';
import {
  assertEventReadAccess,
  assertEventWriteAccess,
} from '@/auth/auth.methods';

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
    @Body() createEventRequest: CreateEventRequest,
    @JWTUser() user: TokenUser,
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
    @Query() pagination: GetEventsQuery,
    @JWTUser() user: TokenUser,
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
    @Body() createLectureRequest: CreateLectureRequest,
    @JWTUser() user: TokenUser,
  ): Promise<LectureDetailsResponse> {
    const event = await this.getEventById(eventId);

    assertEventWriteAccess(user, event);

    const lecture = await this.lectureService.createLecture(
      eventId,
      user.id,
      createLectureRequest,
    );

    return this.lectureConverter.convertDetails(lecture);
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async patchEvent(
    @Param('id') eventId: string,
    @Body() updateEventRequest: UpdateEventRequest,
    @JWTUser() user: TokenUser,
  ): Promise<EventResponse> {
    const event = await this.getEventById(eventId);

    assertEventWriteAccess(user, event);

    const updatedEvent = await this.eventService.updateEvent(
      eventId,
      updateEventRequest,
    );

    return await this.eventConverter.convert(updatedEvent);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async deleteEvent(
    @Param('id') eventId: string,
    @JWTUser() user: TokenUser,
  ): Promise<void> {
    const event = await this.getEventById(eventId);

    assertEventWriteAccess(user, event);

    await this.eventService.deleteEvent(eventId);
  }

  @UseGuards(OptionalJwtGuard)
  @Get('/:id')
  async getEvent(
    @Param('id') eventId: string,
    @JWTUser() user: TokenUser | undefined,
  ): Promise<EventResponse> {
    const event = await this.getEventById(eventId);

    assertEventReadAccess(user, event);

    return await this.eventConverter.convert(event);
  }

  private async getEventById(id: string): Promise<Event> {
    const event = await this.prismaService.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return event;
  }
}
