import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.userService.getLeaderboard();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }
}
