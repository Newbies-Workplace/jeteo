import {Body, Controller, Get, Put, UseGuards} from '@nestjs/common';
import { User } from '@/auth/jwt/jwt.decorator';
import { TokenUser } from '@/auth/jwt/jwt.model';
import { JwtGuard } from '@/auth/jwt/jwt.guard';
import { UserResponse } from 'shared/model/user/response/user.response';
import {UserConverter} from '@/user/application/user.converter';
import {UserService} from '@/user/domain/user.service';
import { UpdateUserRequest } from 'shared/model/user/request/updateUser.request';

@Controller('rest/v1/users')
export class UserController {
  constructor(
      private readonly userConverter: UserConverter,
      private readonly userService: UserService
  ) {}

  @Get('@me')
  @UseGuards(JwtGuard)
  async getMe(@User() tokenUser: TokenUser): Promise<UserResponse> {
    const user = await this.userService.getUser(tokenUser.id);
    return this.userConverter.convert(user);
  }

  @Put('@me')
  @UseGuards(JwtGuard)
  async putMe(@User() tokenUser: TokenUser, @Body() updatedUser: UpdateUserRequest ): Promise<UserResponse> {
    const user = await this.userService.updateUser(tokenUser.id, updatedUser);
    return this.userConverter.convert(user);
  }
}
