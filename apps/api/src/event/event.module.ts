import { Module } from '@nestjs/common';
import { EventController } from './application/event.controller';
import { EventService } from './domain/event.service';
import { EventConverter } from './application/event.converter';
import { UserModule } from '@/user/user.module';
import { LectureModule } from '@/lecture/lecture.module';

@Module({
  imports: [UserModule, LectureModule],
  controllers: [EventController],
  providers: [EventService, EventConverter],
})
export class EventModule {}
