import { Injectable } from '@nestjs/common';
import { CreateShaharDto } from './dto/create-shahar.dto';
import { UpdateShaharDto } from './dto/update-shahar.dto';

@Injectable()
export class ShaharService {
  create(createShaharDto: CreateShaharDto) {
    return 'This action adds a new shahar';
  }

  findAll() {
    return `This action returns all shahar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shahar`;
  }

  update(id: number, updateShaharDto: UpdateShaharDto) {
    return `This action updates a #${id} shahar`;
  }

  remove(id: number) {
    return `This action removes a #${id} shahar`;
  }
}
