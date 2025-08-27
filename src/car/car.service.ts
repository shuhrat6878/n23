import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './models/car.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { IResponse } from 'src/interfaces/succes-response';
import { getSuccessRes } from 'src/utils/getSuccesResponse';
import { User } from 'src/user/models/user.model';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car) private readonly carModel: typeof Car,
    private readonly userService: UserService
  ) { }

  async create(createCarDto: CreateCarDto):Promise<IResponse> {
      await this.userService.findOne(createCarDto.user_id)
      const car = await this.carModel.create(createCarDto)
      return getSuccessRes(car,201)
    }

  async findAll():Promise<IResponse> {
      const car = await this.carModel.findAll({include:{model:User}})
      return getSuccessRes(car)
    }

  async findOne(id: number):Promise<IResponse> {
      const car = await this.carModel.findByPk(id,{include:{model: User}})
      if(!car){
        throw new NotFoundException("car not faund")
      }
      return getSuccessRes(car)
    }

  async update(id: number, updateCarDto: UpdateCarDto):Promise<IResponse> {
    if(updateCarDto.user_id){
      await this.userService.findOne(updateCarDto.user_id);
    }
    const car = await this.carModel.update(updateCarDto,{where:{id},returning:true})
    return getSuccessRes(car)
  }

  async remove(id: number):Promise<IResponse> {
    const car = await this.carModel.destroy({where:{id}});
    if(!car){
      throw new NotFoundException("user not faund")
    }
    return getSuccessRes({})
  }
}
