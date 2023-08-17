import { Injectable } from '@nestjs/common';
import { CreateLectureRequest } from 'shared/model/lecture/request/createLecture.request';
import { PrismaService } from '@/config/prisma.service';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLecture(
    eventId: string,
    userId: string,
    createLectureRequest: CreateLectureRequest,
  ) {
    //todo create invites

    return this.prismaService.lecture.create({
      data: {
        eventId: eventId,
        userId: userId,
        title: createLectureRequest.title,
        description: createLectureRequest.description,
        from: new Date(createLectureRequest.from),
        to: new Date(createLectureRequest.to),
        Invites: {
          createMany: {
            data: createLectureRequest.invites.map((invite) => ({
              id: invite.id,
              name: invite.name,
              userId: userId,
              mail: invite.email,
            })),
          },
        },
      },
      include: {
        Invites: true,
      },
    });
  }
}
