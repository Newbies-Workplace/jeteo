import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateEventRequest } from '../application/requests/createEvent.request';
import { Event } from '@prisma/client';


@Injectable()
export class EventService {

    constructor(private prismaService: PrismaService) {}

    async getEventById(id: string): Promise<Event> {
        return this.prismaService.event.findUnique({
            where: {
                id
            }
        });
    }

    async getPublicEvents(page: number, size: number): Promise<Event[]> {
        return this.prismaService.event.findMany({
            where: {
                visibility: 'PUBLIC'
            },
            orderBy: {
                createdAt: "asc"
            },
            skip: (page - 1) * size,
            take: size,
        });
    }

    async getUserEventsById(userId: string, page: number, size: number): Promise<Event[]> {
        return this.prismaService.event.findMany({
            where: {
                visibility: 'PUBLIC',
                userId
            },
            orderBy: {
                createdAt: "asc"
            },
            skip: (page - 1) * size,
            take: size,
        });
    }

    async createEvent(userId: string, createEventDto: CreateEventRequest): Promise<Event> {
        return this.prismaService.event.create({
            data: {
                title: createEventDto.title,
                subtitle: createEventDto.subtitle,
                description: createEventDto.description,
                from: new Date(createEventDto.from),
                to: new Date(createEventDto.to),
                city: createEventDto.address.city,
                place: createEventDto.address.place,
                latitude: createEventDto.address.coordinates?.latitude,
                longitude: createEventDto.address.coordinates?.longitude,
                primaryColor: "#4340BE",
                userId
            }
        });
    }
}
