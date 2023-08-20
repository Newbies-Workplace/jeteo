import { Injectable } from '@nestjs/common';
import { Invite, Lecture, User } from '@prisma/client';
import {
  LectureResponse,
  StudioLectureResponse,
} from 'shared/model/lecture/response/lecture.response';
import { UserConverter } from '@/user/application/user.converter';

@Injectable()
export class LectureConverter {
  constructor(private readonly userConverter: UserConverter) {}

  convert(
    lecture: Lecture,
    speakers: User[],
    invites: Invite[],
  ): LectureResponse {
    return {
      id: lecture.id,
      slug: lecture.id, //todo create slug from title and id
      eventId: lecture.eventId,
      title: lecture.title,
      description: lecture.description,
      from: lecture.from.toISOString(),
      to: lecture.to.toISOString(),
      createdAt: lecture.createdAt.toISOString(),
      ratingSummary: {
        average: 0,
        count: 0,
        opinionCount: 0,
        overallAverage: 0,
        topicAverage: 0,
      },
      invites: invites.map((invite) => ({
        id: invite.id,
        name: invite.name,
        createdAt: invite.createdAt.toISOString(),
      })),
      speakers: speakers.map((user) => this.userConverter.convert(user)),
      _metadata: {
        canBeRated: false, //todo based on current time
      },
    };
  }

  convertStudio(
    lecture: Lecture,
    speakers: User[],
    invites: Invite[],
  ): StudioLectureResponse {
    return {
      ...this.convert(lecture, speakers, []),
      ratings: [],
      invites: invites.map((invite) => ({
        id: invite.id,
        name: invite.name,
        mail: invite.mail,
      })),
    };
  }
}
