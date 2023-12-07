import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import fs from 'fs';
import * as process from 'process';
import { parse } from 'path';
import { InvalidPathException } from './exceptions/InvalidPathException';

@Injectable()
export class StorageService {
  private readonly storagePath =
    process.env['STORAGE_PATH'] ?? '/jeteo-api-storage';

  constructor() {
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath);
    }
  }

  getFile(folderPath: string): fs.ReadStream {
    if (!this.isValidPath(folderPath)) {
      throw new InvalidPathException(folderPath);
    }

    return fs.createReadStream(this.formatPath(folderPath));
  }

  async createFile(file: Buffer, folderPath: string): Promise<string> {
    if (!this.isValidPath(folderPath)) {
      console.error(`invalid folder path ${folderPath}`);

      throw new InvalidPathException(folderPath);
    }

    const filename = randomUUID();

    this.createPathIfMissing(folderPath);
    await fs.promises.writeFile(this.formatPath(folderPath, filename), file);
    return filename;
  }

  async deleteFile(filePath: string): Promise<void> {
    if (!this.isValidPath(filePath)) {
      throw new InvalidPathException(filePath);
    }
    await fs.promises.unlink(this.formatPath(filePath)).catch(() => {
      console.error(`file ${filePath} not found`);
    });
  }

  async replaceFile(file: Buffer, filePath: string): Promise<string> {
    await this.deleteFile(filePath);
    return this.createFile(file, parse(filePath).dir);
  }

  formatPath(folderPath: string, filename?: string): string {
    return `${this.storagePath}${folderPath}${filename ? `/${filename}` : ''}`;
  }

  createPathIfMissing(folderPath: string): void {
    if (!this.isValidFolderPath(folderPath))
      throw new InvalidPathException(folderPath);
    folderPath = this.storagePath + folderPath;

    if (!fs.existsSync(folderPath))
      fs.mkdirSync(folderPath, {
        recursive: true,
      });
  }

  isValidPath(folderPath: string, filename?: string): boolean {
    if (!filename) {
      const parsedPath = parse(folderPath);
      folderPath = parsedPath.dir;
      filename = parsedPath.base;
    }

    return this.isValidFolderPath(folderPath) && this.isValidFileName(filename);
  }

  isValidFileName(filename: string): boolean {
    const pathRegex = /^[a-zA-Z\-0-9]+$/g;
    return pathRegex.test(filename);
  }

  isValidFolderPath(folderPath: string): boolean {
    const pathRegex = /^(\/[a-zA-Z\-0-9]+)+$/g;
    return pathRegex.test(folderPath);
  }
}
