import { Injectable } from '@nestjs/common';
import { CreateLectureRequest } from 'shared/model/lecture/request/createLecture.request';
import { PrismaService } from '@/config/prisma.service';
import { Lecture } from '@prisma/client';
import { UpdateLectureRequest } from 'shared/.dist/model/lecture/request/updateLecture.request';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLecture(
    eventId: string,
    userId: string,
    createLectureRequest: CreateLectureRequest,
  ) {
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
              mail: invite.mail,
            })),
          },
        },
      },
      include: {
        Invites: true,
      },
    });
  }

  async updateLecture(
    lecture: Lecture,
    updateLectureRequest: UpdateLectureRequest,
  ) {
    return this.prismaService.lecture.update({
      where: {
        id: lecture.id,
      },
      data: {
        title: updateLectureRequest.title,
        description: updateLectureRequest.description,
        from: new Date(updateLectureRequest.from),
        to: new Date(updateLectureRequest.to),
        Invites: {
          deleteMany: {},
          createMany: {
            data: updateLectureRequest.invites.map((invite) => ({
              id: invite.id,
              name: invite.name,
              userId: lecture.userId,
              mail: invite.mail,
            })),
          },
        },
      },
      include: {
        Invites: true,
        Speakers: true,
      },
    });
  }
}
