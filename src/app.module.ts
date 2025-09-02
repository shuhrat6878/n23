import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityModule } from './university/university.module';
import { FacultyModule } from './faculty/faculty.module';
import { GuruxModule } from './gurux/gurux.module';
import { Unversity } from './university/entities/university.entity';
import { Faculty } from './faculty/entities/faculty.entity';
import { Gurux } from './gurux/entities/gurux.entity';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      url:process.env.DB_URI,
      synchronize:true,
      autoLoadEntities:true,
      entities:[Unversity,Faculty,Gurux]
    }),
    UniversityModule,
    FacultyModule,
    GuruxModule,
    StudentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
