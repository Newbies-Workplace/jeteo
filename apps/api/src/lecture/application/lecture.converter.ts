import { Injectable } from '@nestjs/common';
import {
  LectureResponse,
  LectureDetailsResponse,
} from 'shared/model/lecture/response/lecture.response';
import { UserConverter } from '@/user/application/user.converter';
import { LectureDetails } from '@/lecture/domain/lecture.types';

@Injectable()
export class LectureConverter {
  constructor(private readonly userConverter: UserConverter) {}

  convert(lecture: LectureDetails): LectureResponse {
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
      invites: lecture.Invites.map((invite) => ({
        id: invite.id,
        name: invite.name,
        createdAt: invite.createdAt.toISOString(),
      })),
      speakers: lecture.Speakers.map((user) =>
        this.userConverter.convert(user),
      ),
      _metadata: {
        canBeRated: false, //todo based on current time
      },
    };
  }

  convertDetails(lecture: LectureDetails): LectureDetailsResponse {
    return {
      ...this.convert(lecture),
      ratings: [],
      invites: lecture.Invites.map((invite) => ({
        id: invite.id,
        name: invite.name,
        mail: invite.mail,
      })),
    };
  }
}
