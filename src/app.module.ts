import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      url:String(process.env.DB_URI),
      synchronize:true,
      autoLoadEntities:true,
      entities:[]
    }),
    UniversityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
