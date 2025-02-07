import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  LectureDetailsResponse,
  LectureResponse,
} from 'shared/model/lecture/response/lecture.response';
import {
  GetLecturesQuery,
  GetMyLecturesQuery,
} from 'shared/model/lecture/request/getLectures.query';
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
  assertLectureWriteAccess,
} from '@/auth/auth.methods';
import { RateLectureRequest } from 'shared/model/lecture/request/rateLecture.request';
import { EventNotFoundException } from '@/event/domain/exceptions/EventNotFoundException';
import { LectureNotFoundException } from '@/lecture/domain/exceptions/LectureNotFoundException';

@Controller('/rest/v1/lectures')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private readonly prismaService: PrismaService,
    private readonly lectureConverter: LectureConverter,
  ) {}

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async updateLecture(
    @Param('id') id: string,
    @Body() request: UpdateLectureRequest,
    @JWTUser() user: TokenUser,
  ): Promise<LectureDetailsResponse> {
    const lecture = await this.getLectureDetailsById(id);

    assertLectureWriteAccess(user, lecture);

    const updatedLecture = await this.lectureService.updateLecture(
      lecture,
      request,
    );

    return this.lectureConverter.convertDetails(updatedLecture);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async deleteLecture(
    @Param('id') id: string,
    @JWTUser() user: TokenUser,
  ): Promise<void> {
    const lecture = await this.getLectureDetailsById(id);

    assertEventWriteAccess(user, lecture.Event);

    await this.lectureService.deleteLecture(lecture.id);
  }

  @Post('/:id/rate')
  @UseGuards(OptionalJwtGuard)
  async rateLecture(
    @Param('id') id: string,
    @Body() request: RateLectureRequest,
    @JWTUser() user?: TokenUser,
  ): Promise<LectureDetailsResponse> {
    const lecture = await this.getLectureDetailsById(id);

    assertLectureReadAccess(user, lecture, 'public');

    const updatedLecture = await this.lectureService.rateLecture(
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
          Rate: true,
        },
      },
    );
    if (!lecture) {
      throw new LectureNotFoundException();
    }

    return lecture;
  }
}
