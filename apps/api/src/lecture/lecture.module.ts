import { Module } from '@nestjs/common';
import { LectureController } from '@/lecture/application/lecture.controller';
import { LectureService } from '@/lecture/domain/lecture.service';
import { LectureConverter } from '@/lecture/application/lecture.converter';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [LectureController],
  providers: [LectureService, LectureConverter],
  exports: [LectureService, LectureConverter],
})
export class LectureModule {}
