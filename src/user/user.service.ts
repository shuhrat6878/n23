import { Injectable } from "@nestjs/common";
import { IUser } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  private users: IUser[] = [];

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser: IUser = {
      id: Date.now().toString(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  
  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  
  async findOne(id: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.id === id);
  }

  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }


  async remove(id: string): Promise<IUser | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const deleted = this.users[index];
    this.users.splice(index, 1);
    return deleted;
  }
}
