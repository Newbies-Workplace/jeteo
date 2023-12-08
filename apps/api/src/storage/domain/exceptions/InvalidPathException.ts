import { BadRequestException } from '@nestjs/common';

export class InvalidPathException extends BadRequestException {
  constructor(path: string, filename?: string) {
    super(
      filename
        ? `Invalid folder path: (${path}/${filename})`
        : `Invalid folder path: (${path})`,
    );
  }
}
