import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { EventService } from '../domain/event.service';
import { CreateEventRequest } from './requests/createEvent.request';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/auth/jwt/jwt.decorator';
import { Token, TokenUser } from 'src/auth/jwt/jwt.model';
import { GetEventsQueryRequest } from './requests/getEventsQuery.request';
import {Event} from '@prisma/client';
import { EventResponse } from './responses/event.response';
import { EventConverter } from './converters/event.converter';


@Controller('/rest/v1/events')
export class EventController {

    constructor(
        private eventService: EventService,
        private eventConverter: EventConverter
    ) {}

    @Get('/@me')
    @UseGuards(JwtGuard)
    async getMe(@User() user: TokenUser, @Query() paginationQuery: GetEventsQueryRequest): Promise<EventResponse[]> {
        return (await ( this.eventService.getUserEventsById(
            user.id,
            paginationQuery.page,
            paginationQuery.size
        ))).map(this.eventConverter.convert);
    }

    @Get("/:id")
    async getEvent(@Param('id') eventId: string): Promise<EventResponse> {
        const event = await this.eventService.getEventById(eventId);

        if (!event) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        return this.eventConverter.convert(event);
    }

    @Get('')
    async getPublicEvents(@Query() paginationQuery: GetEventsQueryRequest): Promise<EventResponse[]> {
        return (await ( this.eventService.getPublicEvents(
            paginationQuery.page,
            paginationQuery.size
        ))).map(this.eventConverter.convert);
    }

    @Post('/')
    @UseGuards(JwtGuard)
    async createEvent(@User() tokenUser: TokenUser, @Body() createEventDto: CreateEventRequest): Promise<EventResponse> {
        const event = await this.eventService.createEvent(tokenUser.id, createEventDto);

        return this.eventConverter.convert(event);
    }
}
