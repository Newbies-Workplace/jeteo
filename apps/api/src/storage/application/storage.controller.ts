import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {StorageService} from '@/storage/domain/storage.service';
import {Response} from 'express';

@Controller('storage')
export class StorageController {
    constructor(
       private readonly storageService: StorageService
    ) {}


    @Get('*')
    get(@Req() request: Request, @Res() res: Response) {
        const path = request.url.replace('/api/storage/', '');
        try {
            this.storageService.getFile(path)
                .pipe(res);
        } catch (e) {
            res.sendStatus(400);
        }
    }
}
