import { Module } from '@nestjs/common';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { GoogleController } from './strategies/google.controller';
import { JwtService } from '@nestjs/jwt';
import { AnonymousStrategy } from '@/auth/strategies/anonymous.strategy';

@Module({
  controllers: [GoogleController],
  providers: [AuthService, GoogleStrategy, AnonymousStrategy, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
