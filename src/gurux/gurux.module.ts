import { Module } from '@nestjs/common';
import { GuruxService } from './gurux.service';
import { GuruxController } from './gurux.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gurux } from './entities/gurux.entity';
import { Faculty } from 'src/faculty/entities/faculty.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Gurux,Faculty])
  ],
  controllers: [GuruxController],
  providers: [GuruxService],
})
export class GuruxModule {}
