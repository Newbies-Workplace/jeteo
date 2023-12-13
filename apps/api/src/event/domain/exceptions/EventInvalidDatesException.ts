import { BadRequestException } from '@nestjs/common';

export class EventInvalidDatesException extends BadRequestException {
  constructor() {
    super('Event dates are invalid');
  }
}
