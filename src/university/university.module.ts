import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unversity } from './entities/university.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Unversity])
  ],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
