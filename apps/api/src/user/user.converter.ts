import { Injectable } from '@nestjs/common';
import { UserResponse } from 'shared/model/user/response/user.response';
import { User } from '@prisma/client';

@Injectable()
export class UserConverter {
  constructor() {}

  convert(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      description: user.description,
      socials:
        user.mail || user.github || user.twitter || user.linkedin
          ? {
              mail: user.mail,
              github: user.github,
              twitter: user.twitter,
              linkedIn: user.linkedin,
            }
          : undefined,
    };
  }
}
