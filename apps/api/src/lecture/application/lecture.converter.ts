import { Injectable } from '@nestjs/common';
import {
  LectureResponse,
  LectureDetailsResponse,
} from 'shared/model/lecture/response/lecture.response';
import { UserConverter } from '@/user/application/user.converter';
import { LectureDetails } from '@/lecture/domain/lecture.types';
import { generateSlug } from '@/common/slugs';
import dayjs from 'dayjs';

@Injectable()
export class LectureConverter {
  constructor(private readonly userConverter: UserConverter) {}

  convert(lecture: LectureDetails): LectureResponse {
    const now = dayjs();
    const canBeRated =
      now.isAfter(dayjs(lecture.from)) &&
      now.isBefore(dayjs(lecture.to).add(3, 'd'));

    const overallAverage =
      lecture.Rate.reduce((acc, rate) => acc + rate.overallRate, 0) /
      lecture.Rate.length;
    const topicAverage =
      lecture.Rate.reduce((acc, rate) => acc + rate.topicRate, 0) /
      lecture.Rate.length;

    const average = overallAverage + topicAverage / 2;

    return {
      id: lecture.id,
      slug: generateSlug(lecture.title, lecture.id),
      eventId: lecture.eventId,
      title: lecture.title,
      description: lecture.description,
      from: lecture.from.toISOString(),
      to: lecture.to.toISOString(),
      createdAt: lecture.createdAt.toISOString(),
      ratingSummary: {
        average: average,
        count: lecture.Rate.length,
        opinionCount: lecture.Rate.filter((rate) => rate.opinion).length,
        overallAverage: overallAverage,
        topicAverage: topicAverage,
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
        canBeRated: canBeRated,
      },
    };
  }

  convertDetails(lecture: LectureDetails): LectureDetailsResponse {
    return {
      ...this.convert(lecture),
      ratings: lecture.Rate.map((rate) => ({
        id: rate.id,
        opinion: rate.opinion,
        overallRate: rate.overallRate,
        topicRate: rate.topicRate,
        createdAt: rate.createdAt.toISOString(),
      })),
      invites: lecture.Invites.map((invite) => ({
        id: invite.id,
        name: invite.name,
        mail: invite.mail,
      })),
    };
  }
}
