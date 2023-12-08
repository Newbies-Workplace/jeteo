import { ForbiddenException } from '@nestjs/common';

export class NotAllowedToReadLectureException extends ForbiddenException {
  constructor() {
    super('You are not allowed to read this lecture');
  }
}
