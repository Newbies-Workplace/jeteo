import {Injectable} from '@nestjs/common';
import {CONTROLLER_PREFIX} from '@/storage/application/storage.controller';

@Injectable()
export class StoragePathConverter {
    // Convert file path to url path
    convert(filePath: string): string {
        return `${process.env['NEXT_PUBLIC_BACKEND_URL']}/${CONTROLLER_PREFIX}${filePath}`;
    }
}