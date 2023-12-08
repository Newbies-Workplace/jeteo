import { ForbiddenException } from '@nestjs/common';

export class NotAllowedToSeeEventException extends ForbiddenException {
  constructor() {
    super('You are not allowed to see this event');
  }
}
