import { Injectable } from '@nestjs/common';
import { Invite, Event } from '@prisma/client';
import {
  InviteDetailsResponse,
  InviteResponse,
} from 'shared/model/invite/response/inviteResponse';
import { UserConverter } from '@/user/application/user.converter';
import { PrismaService } from '@/config/prisma.service';
import { generateSlug } from '@/common/slugs';

@Injectable()
export class InviteConverter {
  constructor(
    private readonly userConverter: UserConverter,
    private readonly prismaService: PrismaService,
  ) {}

  convert(invite: Invite): InviteResponse {
    return {
      name: invite.name,
    };
  }

  async convertDetails(invite: Invite): Promise<InviteDetailsResponse> {
    const lecture = await this.prismaService.lecture.findFirst({
      where: {
        id: invite.lectureId,
      },
      include: {
        Event: true,
        Author: true,
      },
    });
    const event: Event = lecture.Event;

    return {
      id: invite.id,
      mail: invite.mail,
      name: invite.name,
      inviter: this.userConverter.convert(lecture.Author),
      lecture: {
        id: lecture.id,
        slug: generateSlug(lecture.title, lecture.id),
        title: lecture.title,
        from: lecture.from.toISOString(),
        to: lecture.to.toISOString(),
      },
      event: {
        id: event.id,
        slug: generateSlug(event.title, event.id),
        title: event.title,
      },
    };
  }
}
