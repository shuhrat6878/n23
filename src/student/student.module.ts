import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { Gurux } from 'src/gurux/entities/gurux.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Student,Gurux])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
