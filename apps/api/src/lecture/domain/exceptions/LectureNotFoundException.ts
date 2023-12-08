import { NotFoundException } from '@nestjs/common';

export class LectureNotFoundException extends NotFoundException {
  constructor() {
    super('Lecture not found');
  }
}
