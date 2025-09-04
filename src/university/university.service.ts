import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unversity } from './entities/university.entity';
import { Repository } from 'typeorm';
import { getSuccesRes } from 'src/utils/getSuccessRes';

@Injectable()
export class UniversityService {
  constructor(@InjectRepository(Unversity) private readonly universityRepo: Repository<Unversity>) { }
  
  async create(createUniversityDto: CreateUniversityDto) {
    const data = this.universityRepo.create(createUniversityDto);
    await this.universityRepo.save(data);
    return getSuccesRes(data, 201);
  }

  async findAll() {
    const data = await this.universityRepo.find(
      {
        relations: { faculty: true },
        select: {
          id: true,
          name: true,
          location: true,
          faculty: {
            id: true,
            name: true
          }
        }
      }
    )
    return getSuccesRes(data);
  }

  async findOne(id: number) {
    const data = await this.universityRepo.findOne({
      where: { id },
      relations: { faculty: true },
      select: {
        id: true,
        name: true,
        location: true,
        faculty: {
          id: true,
          name: true
        }
      }
    })
    if (!data) {
      throw new NotFoundException('Unversity not found');
    }
    return getSuccesRes(data);
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto) {
    await this.universityRepo.update({ id }, updateUniversityDto);
    const data = await this.universityRepo.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('Unversity not found');
    }
    return getSuccesRes(data)
  }

  async remove(id: number) {
    const deleted = await this.universityRepo.delete({ id });
    console.log(deleted)
    if (!deleted.affected) {
      throw new NotFoundException('Unversity not found');
    }
    return getSuccesRes({});
  }
}
