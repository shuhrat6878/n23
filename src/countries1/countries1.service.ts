import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountries1Dto } from './dto/create-countries1.dto';
import { UpdateCountries1Dto } from './dto/update-countries1.dto';
import { ICountries1 } from './entities/countries1.entity';
import { v4 } from 'uuid';

@Injectable()
export class Countries1Service {
  private country: ICountries1[] = []

  create(createCountries1Dto: CreateCountries1Dto) {
    const newCountr: ICountries1 = {
      id: v4(), ...createCountries1Dto
    };
    this.country.push(newCountr)
    return {
      statuscode: 201,
      message: "success",
      data: newCountr
    };
  }


  findAll() {
    return {
      statuscode: 200,
      message: "success",
      data: this.country
    };
  }

  findOne(id: string) {
    const one = this.country.find((box) => box.id === id)
    if (!one) {
      throw new NotFoundException("country not faund")
    }
    return {
      statuscode: 200,
      message: "success",
      data: one
    };
  }

  update(id: string, updateCountries1Dto: UpdateCountries1Dto) {
  const index = this.country.findIndex((user: ICountries1) => user.id === id);
  if (index === -1) {
    throw new NotFoundException('country not found');
  }

  this.country[index] = {
    ...this.country[index], 
    ...updateCountries1Dto,
  };

  return {
    statusCode: 200,
    message: 'success',
    data: this.country[index],
  };
}


  remove(id: string) {
    const index = this.country.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('country not found');
    }
    const deleted = this.country.splice(index, 1)[0];
    return {
      statusCode: 200,
      message: 'deleted successfully',
      data: deleted,
    };
  }
}
