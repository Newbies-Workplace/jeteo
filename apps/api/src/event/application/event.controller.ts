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
import { GetEventsQueryRequest } from 'shared/model/event/request/getEventsQuery.request';
import { EventResponse } from 'shared/model/event/response/event.response';
import { EventConverter } from './converters/event.converter';
import { UpdateEventRequest } from 'shared/model/event/request/updateEventRequest';
import { Event } from '@prisma/client';

@Controller('/rest/v1/events')
export class EventController {
  constructor(
    private eventService: EventService,
    private eventConverter: EventConverter,
  ) {}

  @Get('/@me')
  @UseGuards(JwtGuard)
  async getMe(
    @User() user: TokenUser,
    @Query() paginationQuery: GetEventsQueryRequest,
  ): Promise<EventResponse[]> {
    return (
      await this.eventService.getUserEventsById(
        user.id,
        paginationQuery.page,
        paginationQuery.size,
      )
    ).map(this.eventConverter.convert);
  }

  @Get('/:id')
  async getEvent(@Param('id') eventId: string): Promise<EventResponse> {
    const event = await this.eventService.getEventById(eventId);

    if (!event) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return this.eventConverter.convert(event);
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async patchEvent(
    @Param('id') eventId: string,
    @Body() updateEventRequest: UpdateEventRequest,
    @User() user: TokenUser,
  ): Promise<EventResponse> {
    const event: Event = await this.eventService.getEventById(eventId);

    if (!event) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    if (event.userId !== user.id) {
      throw new HttpException(
        'User is not an event owner',
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedEvent = await this.eventService.updateEvent(
      eventId,
      updateEventRequest,
    );

    return this.eventConverter.convert(updatedEvent);
  }

  @Get('')
  async getPublicEvents(
    @Query() paginationQuery: GetEventsQueryRequest,
  ): Promise<EventResponse[]> {
    return (
      await this.eventService.getPublicEvents(
        paginationQuery.page,
        paginationQuery.size,
      )
    ).map(this.eventConverter.convert);
  }

  @Post('/')
  @UseGuards(JwtGuard)
  async createEvent(
    @User() tokenUser: TokenUser,
    @Body() createEventRequest: CreateEventRequest,
  ): Promise<EventResponse> {
    const event = await this.eventService.createEvent(
      tokenUser.id,
      createEventRequest,
    );

    return this.eventConverter.convert(event);
  }
}
