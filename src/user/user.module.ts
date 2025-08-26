import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModule])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModules {}
