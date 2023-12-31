import { Injectable } from '@nestjs/common';
import {
  LectureResponse,
  LectureDetailsResponse,
} from 'shared/model/lecture/response/lecture.response';
import { UserConverter } from '@/user/application/user.converter';
import { LectureDetails } from '@/lecture/domain/lecture.types';
import { generateSlug } from '@/common/slugs';
import { InviteConverter } from '@/invite/application/invite.converter';
import { PrismaService } from '@/config/prisma.service';

@Injectable()
export class LectureConverter {
  constructor(
    private readonly prismaService: PrismaService,
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
      youtubeVideoId: lecture.youtubeVideoId,
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
    const overallRatesCounts = await this.prismaService.rate.groupBy({
      by: ['overallRate'],
      _count: {
        overallRate: true,
      },
      where: {
        lectureId: lecture.id,
      },
    });
    const topicRatesCounts = await this.prismaService.rate.groupBy({
      by: ['topicRate'],
      _count: {
        topicRate: true,
      },
      where: {
        lectureId: lecture.id,
      },
    });

    const formattedOverallRatesCounts = Array.from({ length: 5 }, (_, i) => {
      const overallRate = i + 1;
      const item = overallRatesCounts.find(
        (rate) => rate.overallRate === overallRate,
      );

      return {
        [overallRate]: item ? item._count.overallRate : 0,
      };
    });

    const formattedTopicRatesCounts = Array.from({ length: 5 }, (_, i) => {
      const topicRate = i + 1;
      const item = topicRatesCounts.find(
        (rate) => rate.topicRate === topicRate,
      );

      return {
        [topicRate]: item ? item._count.topicRate : 0,
      };
    });

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
      overallRatesCounts: formattedOverallRatesCounts,
      topicRatesCounts: formattedTopicRatesCounts,
    };
  }
}
