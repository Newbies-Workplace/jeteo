import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma.service';
import { Invite } from '@prisma/client';
import { TokenUser } from '@/auth/jwt/jwt.model';

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService) {}

  async acceptInvite(invite: Invite, user: TokenUser) {
    await this.prismaService.lecture.update({
      where: {
        id: invite.lectureId,
      },
      data: {
        Speakers: {
          connect: {
            id: user.id,
          },
        },
        Invites: {
          delete: {
            id: invite.id,
          },
        },
      },
    });
  }

  async rejectInvite(invite: Invite) {
    await this.prismaService.invite.delete({
      where: {
        id: invite.id,
      },
    });
  }
}
