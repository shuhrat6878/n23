import { Module } from '@nestjs/common';
import { Countries1Module } from './countries1/countries1.module';

@Module({
  imports: [Countries1Module]
})
export class AppModule {}
