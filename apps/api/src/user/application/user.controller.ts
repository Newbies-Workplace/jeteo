import {
  BadRequestException,
  Body,
  Controller,
  Get, InternalServerErrorException,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { User } from '@/auth/jwt/jwt.decorator';
import { TokenUser } from '@/auth/jwt/jwt.model';
import { JwtGuard } from '@/auth/jwt/jwt.guard';
import { UserResponse } from 'shared/model/user/response/user.response';
import {UserConverter} from '@/user/application/user.converter';
import {UserService} from '@/user/domain/user.service';
import { UpdateUserRequest } from 'shared/model/user/request/updateUser.request';
import {FileInterceptor} from '@nestjs/platform-express';
import {StoragePathConverter} from '@/storage/application/converters/storagePath.converter';
import {InvalidPathException} from '@/storage/domain/exceptions/InvalidPathExceptions';

@Controller('rest/v1/users')
export class UserController {
  constructor(
      private readonly userConverter: UserConverter,
      private readonly userService: UserService,
      private readonly storagePath: StoragePathConverter
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

  @Put('@me/avatar')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async putMeAvatar(@User() tokenUser: TokenUser, @UploadedFile() file: Express.Multer.File ): Promise<string> {
    let avatarPath: string;
    try {
      avatarPath = await this.userService.updateUserAvatar(tokenUser.id, file);
    } catch (e) {
      if (e instanceof InvalidPathException) {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException();
      }
    }

    return this.storagePath.convert(`${avatarPath}`);
  }
}
