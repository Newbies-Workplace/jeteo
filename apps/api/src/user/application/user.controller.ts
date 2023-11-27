import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JWTUser } from '@/auth/jwt/jwt.decorator';
import { TokenUser } from '@/auth/jwt/jwt.model';
import { JwtGuard } from '@/auth/jwt/jwt.guard';
import { UserDetailsResponse } from 'shared/model/user/response/user.response';
import { UserConverter } from '@/user/application/user.converter';
import { UserService } from '@/user/domain/user.service';
import { UpdateUserRequest } from 'shared/model/user/request/updateUser.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { StoragePathConverter } from '@/storage/application/converters/storagePath.converter';
import { InvalidPathException } from '@/storage/domain/exceptions/InvalidPathException';

@Controller('rest/v1/users')
export class UserController {
  constructor(
    private readonly userConverter: UserConverter,
    private readonly userService: UserService,
    private readonly storagePath: StoragePathConverter,
  ) {}

  @Get('@me')
  @UseGuards(JwtGuard)
  async getMe(@JWTUser() tokenUser: TokenUser): Promise<UserDetailsResponse> {
    const user = await this.userService.getUser(tokenUser.id);
    return this.userConverter.convertDetails(user);
  }

  @Put('@me')
  @UseGuards(JwtGuard)
  async putMe(
    @JWTUser() tokenUser: TokenUser,
    @Body() updatedUser: UpdateUserRequest,
  ): Promise<UserDetailsResponse> {
    const user = await this.userService.updateUser(tokenUser.id, updatedUser);
    return this.userConverter.convertDetails(user);
  }

  @Put('@me/avatar')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async putMeAvatar(
    @JWTUser() tokenUser: TokenUser,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    try {
      let avatarPath = await this.userService.updateUserAvatar(
        tokenUser.id,
        file,
      );
      return this.storagePath.convert(`${avatarPath}`);
    } catch (e) {
      console.error(e);

      if (e instanceof InvalidPathException) {
        throw new BadRequestException();
      }

      throw e;
    }
  }
}
