import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth/jwt/jwt.guard';
import { LectureResponse } from 'shared/.dist/model/lecture/response/lecture.response';

@Controller('/rest/v1/lectures')
export class LectureController {
  constructor() {}

  @Get('/:id')
  @UseGuards(JwtGuard)
  async getLecture(): Promise<LectureResponse> {
    throw '';
  }
}
