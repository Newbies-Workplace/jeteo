import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserRequest } from 'shared/model/user/request/updateUser.request';
import { StorageService } from '@/storage/domain/storage.service';
import { UserNotFoundException } from '@/user/domain/exceptions/UserNotFoundException';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async getUser(userId: string): Promise<User> {
    const user = this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async updateUser(
    userId: string,
    updatedUser: UpdateUserRequest,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        name: updatedUser.name,
        avatar: updatedUser.avatar,
        jobTitle: updatedUser.jobTitle,
        description: updatedUser.description,
        mail: updatedUser.socials.mail,
        github: updatedUser.socials.github,
        twitter: updatedUser.socials.twitter,
        linkedin: updatedUser.socials.linkedIn,
      },
    });
  }

  async updateUserAvatar(
    userId: string,
    avatar: Express.Multer.File,
  ): Promise<string> {
    const user = await this.getUser(userId);

    let filename: string;

    if (!user.avatar) {
      filename = await this.storageService.createFile(
        avatar.buffer,
        `/users/${userId}`,
      );
    } else {
      filename = await this.storageService.replaceFile(
        avatar.buffer,
        user.avatar,
      );
    }

    const filePath = `/users/${userId}/${filename}`;

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: filePath,
      },
    });

    return filePath;
  }
}
