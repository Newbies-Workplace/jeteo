import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtStrategy } from '@/auth/jwt/jwt.strategy';
import { UserConverter } from '@/user/user.converter';

@Module({
  controllers: [UserController],
  providers: [JwtStrategy, UserConverter],
  exports: [UserConverter],
})
export class UserModule {}
