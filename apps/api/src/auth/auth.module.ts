import { Module } from '@nestjs/common';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { GoogleController } from './strategies/google.controller';

@Module({
  imports: [],
  controllers: [GoogleController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
