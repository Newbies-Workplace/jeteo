import { Injectable } from '@nestjs/common';
import {
  UserDetailsResponse,
  UserResponse,
} from 'shared/model/user/response/user.response';
import { User } from '@prisma/client';
import { StoragePathConverter } from '@/storage/application/converters/storagePath.converter';

@Injectable()
export class UserConverter {
  constructor(private readonly storagePathConverter: StoragePathConverter) {}

  convert(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar
        ? this.storagePathConverter.convert(user.avatar)
        : null,
      jobTitle: user.jobTitle,
      description: user.description,
      socials: {
        mail: user.mail,
        github: user.github,
        twitter: user.twitter,
        linkedin: user.linkedin,
      },
    };
  }

  convertDetails(user: User): UserDetailsResponse {
    return {
      ...this.convert(user),
      _permissions: {
        isAuthorized: user.isAuthorized,
      },
    };
  }
}
