import { Injectable } from '@nestjs/common';
import {
  LectureResponse,
  LectureDetailsResponse,
} from 'shared/model/lecture/response/lecture.response';
import { UserConverter } from '@/user/application/user.converter';
import { LectureDetails } from '@/lecture/domain/lecture.types';
import { generateSlug } from '@/common/slugs';
import { InviteConverter } from '@/invite/application/invite.converter';

@Injectable()
export class LectureConverter {
  constructor(
    private readonly userConverter: UserConverter,
    private readonly inviteConverter: InviteConverter,
  ) {}

  convert(lecture: LectureDetails): LectureResponse {
    const overallAverage =
      lecture.Rate.length === 0
        ? 0
        : lecture.Rate.reduce((acc, rate) => acc + rate.overallRate, 0) /
          lecture.Rate.length;
    const topicAverage =
      lecture.Rate.length === 0
        ? 0
        : lecture.Rate.reduce((acc, rate) => acc + rate.topicRate, 0) /
          lecture.Rate.length;

    const average = (overallAverage + topicAverage) / 2;

    return {
      id: lecture.id,
      slug: generateSlug(lecture.title, lecture.id),
      event: {
        id: lecture.Event.id,
        slug: generateSlug(lecture.Event.title, lecture.Event.id),
        title: lecture.Event.title,
        subtitle: lecture.Event.subtitle,
      },
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
      invites: lecture.Invites.map((invite) =>
        this.inviteConverter.convert(invite),
      ),
      speakers: lecture.Speakers.map((user) =>
        this.userConverter.convert(user),
      ),
    };
  }

  async convertDetails(
    lecture: LectureDetails,
  ): Promise<LectureDetailsResponse> {
    const invites = await Promise.all(
      lecture.Invites.map((invite) =>
        this.inviteConverter.convertDetails(invite),
      ),
    );

    return {
      ...this.convert(lecture),
      ratings: lecture.Rate.map((rate) => ({
        id: rate.id,
        opinion: rate.opinion,
        overallRate: rate.overallRate,
        topicRate: rate.topicRate,
        createdAt: rate.createdAt.toISOString(),
      })),
      invites: invites,
    };
  }
}
