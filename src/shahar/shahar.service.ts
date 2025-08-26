import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShaharDto } from './dto/create-shahar.dto';
import { UpdateShaharDto } from './dto/update-shahar.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { IResponse } from 'src/interfaces/succes-response';
import { getSuccessRes } from 'src/utils/getSuccesResponse';
import { Shahar } from './models/shahar.entity';
import { NotFoundError } from 'rxjs';
import { User } from 'src/user/models/user.model';

@Injectable()
export class ShaharService {
    constructor(
      @InjectModel(Shahar) private readonly shaharModel: typeof Shahar ,
      private readonly userService: UserService
    ){}

  async create(createShaharDto: CreateShaharDto):Promise<IResponse> {
    await this.userService.findOne(createShaharDto.user_id)
    const shahar = await this.shaharModel.create(createShaharDto)
    return getSuccessRes(shahar,201)
  }

  async findAll():Promise<IResponse> {
    const shahar = await this.shaharModel.findAll({include:{model:User}})
    return getSuccessRes(shahar)
  }

  async findOne(id: number):Promise<IResponse> {
    const shahar = await this.shaharModel.findByPk(id,{include:{model: User}})
    if(!shahar){
      throw new NotFoundException("shahsr not faund")
    }
    return getSuccessRes(shahar)
  }

  async update(id: number, updateShaharDto: UpdateShaharDto):Promise<IResponse> {
    if(updateShaharDto.user_id){
      await this.userService.findOne(updateShaharDto.user_id);
    }
    const shahar = await this.shaharModel.update(updateShaharDto,{where:{id},returning:true})
    return getSuccessRes(shahar)
  }

  async remove(id: number):Promise<IResponse> {
    const shahar = await this.shaharModel.destroy({where:{id}});
    if(!shahar){
      throw new NotFoundException("user not faund")
    }
    return getSuccessRes({})
  }
}
