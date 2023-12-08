import { ForbiddenException } from '@nestjs/common';

export class NotAllowedToReadEventException extends ForbiddenException {
  constructor() {
    super('You are not allowed to read this event');
  }
}
