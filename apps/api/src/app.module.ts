import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AuthModule } from '@/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/config/prisma.module';
import { UserModule } from '@/user/user.module';
import { EventModule } from '@/event/event.module';
import { LectureModule } from '@/lecture/lecture.module';
import {StorageModule} from '@/storage/storage.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    LectureModule,
    EventModule,
    StorageModule
  ],
  controllers: [AppController],
})
export class AppModule {}
