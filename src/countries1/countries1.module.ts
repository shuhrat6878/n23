import { Module } from '@nestjs/common';
import { Countries1Service } from './countries1.service';
import { Countries1Controller } from './countries1.controller';

@Module({
  controllers: [Countries1Controller],
  providers: [Countries1Service],
})
export class Countries1Module {}
