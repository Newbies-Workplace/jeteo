import { ForbiddenException } from '@nestjs/common';

export class NotAllowedToEditEventException extends ForbiddenException {
  constructor() {
    super('You are not allowed to edit this event');
  }
}
