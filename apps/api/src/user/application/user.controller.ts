import {
  Body,
  Controller,
  Delete,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { StoragePathConverter } from '@/storage/application/converters/storagePath.converter';

@Controller('rest/v1/users')
export class UserController {
  constructor(
    private readonly userConverter: UserConverter,
    private readonly userService: UserService,
    private readonly storagePath: StoragePathConverter,
  ) {}

  @Put('@me/avatar')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async putMeAvatar(
    @JWTUser() tokenUser: TokenUser,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    let avatarPath = await this.userService.updateUserAvatar(
      tokenUser.id,
      file,
    );
    return this.storagePath.convert(`${avatarPath}`);
  }

  @Delete('@me/avatar')
  @UseGuards(JwtGuard)
  async deleteMeAvatar(@JWTUser() tokenUser: TokenUser): Promise<void> {
    await this.userService.deleteUserAvatar(tokenUser.id);
  }
}
