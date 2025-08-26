import { Module } from '@nestjs/common';
import { ShaharService } from './shahar.service';
import { ShaharController } from './shahar.controller';

@Module({
  controllers: [ShaharController],
  providers: [ShaharService],
})
export class ShaharModule {}
