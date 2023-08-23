import { Module } from '@nestjs/common';
import { StorageService } from './domain/storage.service';
import { StorageController } from './application/storage.controller';
import {Global} from '@nestjs/common/decorators';

@Global()
@Module({
  providers: [StorageService],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule {}
