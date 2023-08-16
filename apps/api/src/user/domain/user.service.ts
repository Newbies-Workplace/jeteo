import { Injectable } from '@nestjs/common';
import {PrismaService} from '@/config/prisma.service';
import {User} from '@prisma/client';
import { UpdateUserRequest } from 'shared/model/user/request/updateUser.request';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUser(userId: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
    }

    async updateUser(userId: string, updatedUser: UpdateUserRequest): Promise<User> {
        return this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                name: updatedUser.name,
                avatar: updatedUser.avatar,
                description: updatedUser.description,
                mail: updatedUser.socials.mail,
                github: updatedUser.socials.github,
                twitter: updatedUser.socials.twitter,
                linkedin: updatedUser.socials.linkedIn,
            },
        });
    }
}
