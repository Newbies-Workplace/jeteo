import { Module } from '@nestjs/common';
import { JwtStrategy } from '@/auth/jwt/jwt.strategy';
import {UserController} from '@/user/application/user.controller';
import {UserConverter} from '@/user/application/user.converter';
import {UserService} from '@/user/domain/user.service';

@Module({
  controllers: [UserController],
  providers: [JwtStrategy, UserConverter, UserService],
  exports: [UserConverter],
})
export class UserModule {}
