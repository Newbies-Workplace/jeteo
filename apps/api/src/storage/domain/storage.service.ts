import {Injectable} from '@nestjs/common';
import { randomUUID } from 'crypto';
import fs from 'fs';
import {parse} from 'path';
import {
    InvalidFilenameException,
    InvalidFolderPathException,
    InvalidPathExceptions
} from './exceptions/InvalidPathExceptions';

@Injectable()
export class StorageService {
    private readonly storagePath = 'storage';

    constructor() {
        if (!fs.existsSync(this.storagePath))
            fs.mkdirSync(this.storagePath);
    }

    getFile(path: string): fs.ReadStream {
        console.log(path);
        console.log(this.isValidPath(path));

        if (!this.isValidPath(path)) throw new InvalidPathExceptions(path);
        return fs.createReadStream(`${this.storagePath}/${path}`);
    }

    async saveFile(file: Buffer, path: string, fileName?: string): Promise<string> {
        if (!this.isValidFolderPath(path)) throw new InvalidFolderPathException(path);


        if (fileName) {
            if (!this.isValidFileName(fileName)) throw new InvalidFilenameException(fileName);
        }
        else
            fileName = randomUUID();

        this.createPathIfMissing(path);
        await fs.promises.writeFile(`${this.storagePath}/${path}/${fileName}`, file);
        return fileName;
    }

    createPathIfMissing(path: string) {
        path = this.storagePath + '/' + path;

        if (!fs.existsSync(path))
            fs.mkdirSync(path, {
                recursive: true
            });
    }

    isValidPath(path: string, fileName?: string): boolean {
        console.log(path);

        if (fileName) {
            return this.isValidFolderPath(path) && this.isValidFileName(fileName)
        } else {
            const parsedPath = parse(path);
            console.log(parsedPath);
            return this.isValidFolderPath(parsedPath.dir) && this.isValidFileName(parsedPath.base);
        }
    }

    isValidFileName(fileName: string): boolean {
        const pathRegex = /^[a-z\-0-9]+$/g;
        return pathRegex.test(fileName);
    }

    isValidFolderPath(path: string): boolean {
        const pathRegex = /^(\/[a-z\-0-9]+)+$/g;
        return pathRegex.test(path);
    }
}
