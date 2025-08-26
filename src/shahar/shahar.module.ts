import { Module } from '@nestjs/common';
import { ShaharService } from './shahar.service';
import { ShaharController } from './shahar.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModules } from 'src/user/user.module';
import { Shahar } from './models/shahar.entity';

@Module({
  imports:[SequelizeModule.forFeature([Shahar]),UsersModules],
  controllers: [ShaharController],
  providers: [ShaharService],
})
export class ShaharModule {}
