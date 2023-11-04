import { Injectable } from '@nestjs/common';
import {
  LectureResponse,
  LectureDetailsResponse,
} from 'shared/model/lecture/response/lecture.response';
import { UserConverter } from '@/user/application/user.converter';
import { LectureDetails } from '@/lecture/domain/lecture.types';
import { generateSlug } from '@/common/slugs';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class LectureConverter {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userConverter: UserConverter,
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
      invites: lecture.Invites.map((invite) => ({
        id: invite.id,
        name: invite.name,
        createdAt: invite.createdAt.toISOString(),
      })),
      speakers: lecture.Speakers.map((user) =>
        this.userConverter.convert(user),
      ),
    };
  }

  async convertDetails(
    lecture: LectureDetails,
  ): Promise<LectureDetailsResponse> {
    //todo pobranie danych z bazy
    const overallRatesCounts = await this.prismaService.rate.groupBy({
      by: ['overallRate'],
      _count: {
        overallRate: true,
      },
      where: {
        lectureId: lecture.id, // tutaj podaj ID prelekcji
      },
    });

    const overallRatesCountsMap = new Map();
    overallRatesCounts.forEach((rateGroup) => {
      overallRatesCountsMap.set(rateGroup.overallRate, rateGroup._count);
    });
    console.log(overallRatesCountsMap);
    const topicRatesCounts = [
      { 1: 3 },
      { 2: 12 },
      { 3: 8 },
      { 4: 23 },
      { 5: 44 },
    ];
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
      overallRatesCounts: overallRatesCountsMap,
      topicRatesCounts: topicRatesCounts,
    };
  }
}
