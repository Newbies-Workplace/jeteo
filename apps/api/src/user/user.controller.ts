import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { User } from '@/auth/jwt/jwt.decorator';
import { TokenUser } from '@/auth/jwt/jwt.model';
import { JwtGuard } from '@/auth/jwt/jwt.guard';
import { UserResponse } from 'shared/model/user/response/user.response';

@Controller('rest/v1/users')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('@me')
  @UseGuards(JwtGuard)
  async getMe(@User() user: TokenUser): Promise<UserResponse> {
    //todo fetch all data from prisma
    return {
      id: user.id,
      nick: user.nick,
      socials: {},
    };
  }
}
