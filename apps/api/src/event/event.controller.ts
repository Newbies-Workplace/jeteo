import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './models/event.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { User } from 'src/auth/jwt/jwt.decorator';
import { TokenUser } from 'src/auth/jwt/jwt.model';

@Controller('/rest/v1/events')
export class EventController {


    constructor(private eventService: EventService) {}

    @Get("/:id")
    async getEvent(@Param('id') eventId: string) {
        const event = await this.eventService.getEventById(eventId);

        if (!event) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        return event;
    }

    @Get('')
    async getPublicEvents() {
        return this.eventService.getPublicEvents();
    }

    @Post('/')
    @UseGuards(JwtGuard)
    async createEvent(@User() tokenUser: TokenUser, @Body() createEventDto: CreateEventDto) {
        return this.eventService.createEvent(tokenUser.id, createEventDto);
    }
}
