import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  LectureResponse,
  LectureDetailsResponse,
} from 'shared/model/lecture/response/lecture.response';
import { GetLecturesQuery } from 'shared/model/lecture/request/getLectures.query';
import { LectureService } from '@/lecture/domain/lecture.service';
import { LectureConverter } from '@/lecture/application/lecture.converter';
import { PrismaService } from '@/config/prisma.service';
import { User } from '@/auth/jwt/jwt.decorator';
import { TokenUser } from '@/auth/jwt/jwt.model';
import { EventVisibility } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '@/auth/jwt/jwt.guard';
import { UpdateLectureRequest } from 'shared/model/lecture/request/updateLecture.request';

@Controller('/rest/v1/lectures')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private readonly prismaService: PrismaService,
    private readonly lectureConverter: LectureConverter,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  async getLectures(
    @User() user: TokenUser,
    @Query() query: GetLecturesQuery,
  ): Promise<LectureResponse[]> {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: query.eventId,
      },
    });
    if (!event) {
      throw new HttpException('Event not Found', HttpStatus.NOT_FOUND);
    }

    const lectures = await this.prismaService.lecture.findMany({
      include: {
        Invites: true,
        Speakers: true,
      },
      where: {
        eventId: query.eventId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      skip: (query.page - 1) * query.size,
      take: query.size,
    });

    if (
      event.visibility === EventVisibility.PRIVATE &&
      user &&
      event.userId !== user.id
    ) {
      throw new HttpException(
        'User is not allowed to see this lecture',
        HttpStatus.FORBIDDEN,
      );
    }

    return await Promise.all(
      lectures.map((lecture) =>
        this.lectureConverter.convert(
          lecture,
          lecture.Speakers,
          lecture.Invites,
        ),
      ),
    );
  }

  @Get('/:id')
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  async getLecture(
    @User() user: TokenUser,
    @Param('id') id: string,
  ): Promise<LectureResponse> {
    const lecture = await this.prismaService.lecture.findUnique({
      where: {
        id: id,
      },
      include: {
        Invites: true,
        Speakers: true,
        Event: true,
      },
    });
    if (!lecture) {
      throw new HttpException('Lecture not Found', HttpStatus.NOT_FOUND);
    }

    const event = lecture.Event;

    if (
      //todo check if speaker
      event.visibility === EventVisibility.PRIVATE &&
      user &&
      event.userId !== user.id
    ) {
      throw new HttpException(
        'User is not allowed to see this lecture',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.lectureConverter.convert(
      lecture,
      lecture.Speakers,
      lecture.Invites,
    );
  }
  @Get('/:id/details')
  @UseGuards(JwtGuard)
  async getLectureDetails(
    @User() user: TokenUser,
    @Param('id') id: string,
  ): Promise<LectureDetailsResponse> {
    const lecture = await this.prismaService.lecture.findUnique({
      where: {
        id: id,
      },
      include: {
        Invites: true,
        Speakers: true,
        Event: true,
      },
    });
    if (!lecture) {
      throw new HttpException('Lecture not Found', HttpStatus.NOT_FOUND);
    }

    const event = lecture.Event;

    if (
      //todo check if speaker
      user &&
      event.userId !== user.id
    ) {
      throw new HttpException(
        'User is not allowed to see this lecture',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.lectureConverter.convertDetails(
      lecture,
      lecture.Speakers,
      lecture.Invites,
    );
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async updateLecture(
    @User() user: TokenUser,
    @Param('id') id: string,
    @Body() request: UpdateLectureRequest,
  ): Promise<LectureDetailsResponse> {
    const lecture = await this.prismaService.lecture.findUnique({
      where: {
        id: id,
      },
      include: {
        Event: true,
      },
    });
    if (!lecture) {
      throw new HttpException('Lecture not Found', HttpStatus.NOT_FOUND);
    }

    //todo check if speaker has edit permissions

    const updatedLecture = await this.lectureService.updateLecture(
      lecture,
      request,
    );

    return this.lectureConverter.convertDetails(
      updatedLecture,
      updatedLecture.Speakers,
      updatedLecture.Invites,
    );
  }
}
