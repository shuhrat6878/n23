import { Module } from '@nestjs/common';
import { UsersModules } from './user/user.module';
import { ShaharModule } from './shahar/shahar.module';

@Module({
  imports: [UsersModules, ShaharModule],
})
export class AppModule {}
