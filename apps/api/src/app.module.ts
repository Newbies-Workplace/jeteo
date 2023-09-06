import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/config/prisma.module';
import { UserModule } from '@/user/user.module';
import { EventModule } from '@/event/event.module';
import {StorageModule} from '@/storage/storage.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    EventModule,
    StorageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
