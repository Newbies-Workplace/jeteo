import { Injectable } from '@nestjs/common';
import { UserResponse } from 'shared/model/user/response/user.response';
import { User } from '@prisma/client';
import {StoragePathConverter} from '@/storage/application/converters/storagePath.converter';

@Injectable()
export class UserConverter {
  constructor(
      private readonly storagePathConverter: StoragePathConverter
  ) {}

  convert(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar ? this.storagePathConverter.convert(user.avatar) : '',
      description: user.description,
      socials: {
        mail: user.mail,
        github: user.github,
        twitter: user.twitter,
        linkedIn: user.linkedin,
      }
    }
  }
}
