import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateEventDto } from './models/event.dto';

@Injectable()
export class EventService {

    constructor(private prismaService: PrismaService) {}

    async getEventById(id: string) {
        return this.prismaService.event.findUnique({
            where: {
                id
            }
        });
    }

    async getPublicEvents() {
        return this.prismaService.event.findMany({
            where: {
                visibility: 'PUBLIC'
            }
        });
    }

    async createEvent(userId: string, createEventDto: CreateEventDto) {
        return await this.prismaService.event.create({
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
