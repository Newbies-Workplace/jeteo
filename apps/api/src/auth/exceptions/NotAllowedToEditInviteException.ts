import { ForbiddenException } from '@nestjs/common';

export class NotAllowedToEditInviteException extends ForbiddenException {
  constructor() {
    super('You are not allowed to edit this invite');
  }
}
