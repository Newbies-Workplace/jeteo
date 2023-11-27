import { Module } from '@nestjs/common';
import { LectureController } from '@/lecture/application/lecture.controller';
import { LectureService } from '@/lecture/domain/lecture.service';
import { LectureConverter } from '@/lecture/application/lecture.converter';
import { UserModule } from '@/user/user.module';
import { InviteModule } from '@/invite/invite.module';

@Module({
  imports: [UserModule, InviteModule],
  controllers: [LectureController],
  providers: [LectureService, LectureConverter],
  exports: [LectureService, LectureConverter],
})
export class LectureModule {}
