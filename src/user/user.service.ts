import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { getSuccessRes } from 'src/utils/getSuccesResponse';
import { IResponse } from 'src/interfaces/succes-response';

@Injectable()
export class UserService {
  constructor (@InjectModel(User) private readonly userModel: typeof User ){}


  async create(createUserDto: CreateUserDto):Promise<IResponse> {
    const existsEmail = await this.userModel.findOne(
      {where:{ email: createUserDto.email}}
    );
    if(existsEmail){
      throw new ConflictException("email oleradiy exists")
    }
    const newUser = await this.userModel. create({...createUserDto})
    return getSuccessRes(newUser,201)
  }

  async findAll():Promise<IResponse> {
    const user = await this.userModel.findAll({include: {all:true}})
    return getSuccessRes(user)
  }

  async findOne(id: number):Promise<IResponse> {
   const users = await this.userModel.findByPk(id,{include:{all:true}});
   if(!users){
    throw new NotFoundException("user not faund")
   };
   return getSuccessRes(users)
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<IResponse> {
    if(updateUserDto.email){
      const existsEmail = await this.userModel.findAll({where:{email: updateUserDto.email}});
      if(existsEmail){
        throw new ConflictException("email oleradiy exists")
      }
    }
    const users = await this.userModel.update(updateUserDto,{where:{id},returning : true});
    if(users[0]===0){
      throw new NotFoundException("not faund users")
    }
    return getSuccessRes(users[1][0])
  }

  async remove(id: number):Promise <IResponse> {
    const users= await this.userModel.destroy({where:{id}});
    if(!users){
      throw new NotFoundException('user not faund')
    }
    return getSuccessRes({})
  }
}
