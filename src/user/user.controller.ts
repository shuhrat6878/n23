import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IUser } from "./entity/user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<IUser | undefined> {
    return this.userService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<IUser | null> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<IUser | null> {
    return this.userService.remove(id);
  }
}
