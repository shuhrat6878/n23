import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaSrvice } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService:PrismaSrvice){} ;

  async create(createUserInput: CreateUserInput) {
    const user = await this.prismaService.user.create({
      data:createUserInput
    })
    return user
  }

  async findAll() {
    return  await this.prismaService.user.findMany({include:{post:true}})
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({where:{id},include:{post:true}},)
    if(user!){
      throw new NotFoundException("user not faund")
    }
    return user
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.findOne(id)
    return this.prismaService.user.update({where:{id},data:updateUserInput})
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prismaService.user.delete({where:{id}})
    return {}
  }
}
