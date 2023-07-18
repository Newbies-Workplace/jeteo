import { Module } from '@nestjs/common';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { GoogleController } from './strategies/google.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [GoogleController],
  providers: [AuthService, GoogleStrategy, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
