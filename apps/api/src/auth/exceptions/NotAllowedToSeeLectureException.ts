import { ForbiddenException } from '@nestjs/common';

export class NotAllowedToSeeLectureException extends ForbiddenException {
  constructor() {
    super('You are not allowed to see this lecture');
  }
}
