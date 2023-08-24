import {Controller, Get, Req, Res} from '@nestjs/common';
import {StorageService} from '@/storage/domain/storage.service';
import {Response} from 'express';

export const CONTROLLER_PREFIX = 'storage/v1/events';

@Controller(CONTROLLER_PREFIX)
export class StorageController {
    constructor(
       private readonly storageService: StorageService
    ) {}

    @Get('*')
    get(@Req() request: Request, @Res() res: Response) {
        const path = request.url.replace(`/api/${CONTROLLER_PREFIX}`, '');
        try {
            this.storageService.getFile(path)
                .pipe(res);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }
}
