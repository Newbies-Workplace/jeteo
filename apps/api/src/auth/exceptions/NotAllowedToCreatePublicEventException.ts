import { ForbiddenException } from '@nestjs/common';

export class NotAllowedToCreatePublicEventException extends ForbiddenException {
  constructor() {
    super('You are not allowed to create public event.');
  }
}
