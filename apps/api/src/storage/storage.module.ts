import { Module } from '@nestjs/common';
import { StorageService } from './domain/storage.service';
import { StorageController } from './application/storage.controller';
import {Global} from '@nestjs/common/decorators';
import {StoragePathConverter} from '@/storage/application/converters/storagePath.converter';

@Global()
@Module({
  providers: [StorageService, StoragePathConverter],
  controllers: [StorageController],
  exports: [StorageService, StoragePathConverter],
})
export class StorageModule {}
