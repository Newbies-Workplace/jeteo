import { BadRequestException } from '@nestjs/common';

export class LectureInvalidDatesException extends BadRequestException {
  constructor() {
    super('Lecture dates are invalid');
  }
}
