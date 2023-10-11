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
  LectureDetailsResponse,
  LectureResponse,
} from 'shared/model/lecture/response/lecture.response';
import { GetLecturesQuery } from 'shared/model/lecture/request/getLectures.query';
import { LectureService } from '@/lecture/domain/lecture.service';
import { LectureConverter } from '@/lecture/application/lecture.converter';
import { PrismaService } from '@/config/prisma.service';
import { JWTUser } from '@/auth/jwt/jwt.decorator';
import { TokenUser } from '@/auth/jwt/jwt.model';
import { JwtGuard, OptionalJwtGuard } from '@/auth/jwt/jwt.guard';
import { UpdateLectureRequest } from 'shared/model/lecture/request/updateLecture.request';
import { LectureDetails } from '@/lecture/domain/lecture.types';
import {
  assertEventReadAccess,
  assertEventWriteAccess,
  assertLectureReadAccess,
} from '@/auth/auth.methods';

@Controller('/rest/v1/lectures')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private readonly prismaService: PrismaService,
    private readonly lectureConverter: LectureConverter,
  ) {}

  @Get('/')
  @UseGuards(OptionalJwtGuard)
  async getLectures(
    @Query() query: GetLecturesQuery,
    @JWTUser() user?: TokenUser,
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
        Event: true,
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

    assertEventReadAccess(user, event);

    return await Promise.all(
      lectures.map((lecture) => this.lectureConverter.convert(lecture)),
    );
  }

  @Get('/:id')
  @UseGuards(OptionalJwtGuard)
  async getLecture(
    @Param('id') id: string,
    @JWTUser() user?: TokenUser,
  ): Promise<LectureResponse> {
    const lecture = await this.getLectureDetailsById(id);

    assertLectureReadAccess(user, lecture, 'public');

    return this.lectureConverter.convert(lecture);
  }
  @Get('/:id/details')
  @UseGuards(JwtGuard)
  async getLectureDetails(
    @Param('id') id: string,
    @JWTUser() user: TokenUser,
  ): Promise<LectureDetailsResponse> {
    const lecture = await this.getLectureDetailsById(id);

    assertLectureReadAccess(user, lecture, 'detailed');

    return this.lectureConverter.convertDetails(lecture);
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async updateLecture(
    @Param('id') id: string,
    @Body() request: UpdateLectureRequest,
    @JWTUser() user: TokenUser,
  ): Promise<LectureDetailsResponse> {
    const lecture = await this.getLectureDetailsById(id);

    assertEventWriteAccess(user, lecture.Event);

    const updatedLecture = await this.lectureService.updateLecture(
      lecture,
      request,
    );

    return this.lectureConverter.convertDetails(updatedLecture);
  }

  private async getLectureDetailsById(id: string): Promise<LectureDetails> {
    const lecture: LectureDetails = await this.prismaService.lecture.findUnique(
      {
        where: {
          id: id,
        },
        include: {
          Invites: true,
          Speakers: true,
          Event: true,
        },
      },
    );
    if (!lecture) {
      throw new HttpException('Lecture not Found', HttpStatus.NOT_FOUND);
    }

    return lecture;
  }
}