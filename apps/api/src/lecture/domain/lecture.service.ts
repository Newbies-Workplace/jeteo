import { Injectable } from '@nestjs/common';
import { CreateLectureRequest } from 'shared/model/lecture/request/createLecture.request';
import { PrismaService } from '@/config/prisma.service';
import { UpdateLectureRequest } from 'shared/model/lecture/request/updateLecture.request';
import { LectureDetails } from '@/lecture/domain/lecture.types';
import { nanoid } from '@/common/nanoid';
import { RateLectureRequest } from 'shared/model/lecture/request/rateLecture.request';
import dayjs from 'dayjs';
import { LectureInvalidDatesException } from '@/lecture/domain/exceptions/LectureInvalidDatesException';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLecture(
    eventId: string,
    userId: string,
    createLectureRequest: CreateLectureRequest,
  ) {
    this.assertDates(
      dayjs(createLectureRequest.from),
      dayjs(createLectureRequest.to),
    );

    return this.prismaService.lecture.create({
      data: {
        id: nanoid(),
        eventId: eventId,
        authorId: userId,
        title: createLectureRequest.title,
        description: createLectureRequest.description,
        from: new Date(createLectureRequest.from),
        to: new Date(createLectureRequest.to),
        youtubeVideoId: createLectureRequest.youtubeVideoId,
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
        Event: true,
        Invites: true,
        Speakers: true,
        Rate: true,
      },
    });
  }

  async updateLecture(
    lecture: LectureDetails,
    updateLectureRequest: UpdateLectureRequest,
  ): Promise<LectureDetails> {
    const from = dayjs(
      updateLectureRequest.from ? updateLectureRequest.from : lecture.from,
    );

    const to = dayjs(
      updateLectureRequest.to ? updateLectureRequest.to : lecture.to,
    );

    this.assertDates(from, to);

    // delete old speakers
    const speakersToDelete = lecture.Speakers.filter(
      (speaker) =>
        !updateLectureRequest.speakerIds.some(
          (newSpeakerId) => newSpeakerId === speaker.id,
        ),
    );

    // delete old invites
    const invitesToDelete = lecture.Invites.filter(
      (invite) =>
        !updateLectureRequest.invites.some(
          (newInvite) => newInvite.id === invite.id,
        ),
    );

    // create new invites
    const invitesToCreate = updateLectureRequest.invites
      .map((invite) => {
        return {
          id: invite.id,
          name: invite.name,
          userId: lecture.authorId,
          mail: invite.mail,
        };
      })
      .filter(
        (invite) =>
          !lecture.Invites.some(
            (existingInvite) => existingInvite.id === invite.id,
          ),
      );

    return this.prismaService.lecture.update({
      where: {
        id: lecture.id,
      },
      data: {
        title: updateLectureRequest.title,
        description: updateLectureRequest.description,
        from: new Date(updateLectureRequest.from),
        to: new Date(updateLectureRequest.to),
        youtubeVideoId: updateLectureRequest.youtubeVideoId,
        Speakers: {
          deleteMany: {
            id: {
              in: speakersToDelete.map((speaker) => speaker.id),
            },
          },
        },
        Invites: {
          deleteMany: {
            id: {
              in: invitesToDelete.map((invite) => invite.id),
            },
          },
          createMany: {
            data: invitesToCreate,
          },
        },
      },
      include: {
        Event: true,
        Invites: true,
        Speakers: true,
        Rate: true,
      },
    });
  }

  async rateLecture(
    lecture: LectureDetails,
    rateLectureRequest: RateLectureRequest,
  ): Promise<LectureDetails> {
    await this.prismaService.rate.create({
      data: {
        id: nanoid(),
        lectureId: lecture.id,
        overallRate: rateLectureRequest.overallRate,
        topicRate: rateLectureRequest.topicRate,
        opinion: rateLectureRequest.opinion,
      },
    });

    return this.prismaService.lecture.findUnique({
      where: {
        id: lecture.id,
      },
      include: {
        Event: true,
        Invites: true,
        Speakers: true,
        Rate: true,
      },
    });
  }

  async deleteLecture(lectureId: string) {
    await this.prismaService.lecture.delete({
      where: {
        id: lectureId,
      },
    });
  }

  private assertDates(from: dayjs.Dayjs, to: dayjs.Dayjs) {
    if (from.isAfter(to)) {
      throw new LectureInvalidDatesException();
    }
  }
}
