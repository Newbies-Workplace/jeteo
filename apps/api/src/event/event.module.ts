import { Module } from '@nestjs/common';
import { EventController } from './application/event.controller';
import { EventService } from './domain/event.service';
import { EventConverter } from './application/converters/event.converter';

@Module({
  controllers: [EventController],
  providers: [EventService, EventConverter]
})
export class EventModule {}
