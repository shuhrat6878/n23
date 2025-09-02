import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';
import { Repository } from 'typeorm';
import { Unversity } from 'src/university/entities/university.entity';
import { getSuccesRes } from 'src/utils/getSuccessRes';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty) private readonly facultyRepo: Repository<Faculty>,
    @InjectRepository(Unversity) private readonly unversity: Repository<Unversity>
  ) { }
  async create(createFacultyDto: CreateFacultyDto) {
    const exists = await this.facultyRepo.findOne({ where: { name: createFacultyDto.name } });
    if (exists) {
      throw new ConflictException('Name already exists')
    }
    const unversityId = await this.unversity.findOne({ where: { id: createFacultyDto.unversityId } });
    if (!unversityId) {
      throw new NotFoundException('Universitet not found');
    }
    const data = this.facultyRepo.create({ ...createFacultyDto, unversityId });
    await this.facultyRepo.save(data);
    return getSuccesRes(data, 201);
  }

  async findAll() {
    const data = await this.facultyRepo.find({
      relations: { unversityId: true },
      select: {
        id: true,
        name: true,
        unversityId: {
          id: true,
          name: true,
          location: true
        }
      },
      order: { createAt: 'DESC' }
    })
    return getSuccesRes(data);
  }

  async findOne(id: number) {
    const data = await this.facultyRepo.findOne({
      where: { id }, relations: { unversityId: true },
      select: {
        id: true,
        name: true,
        unversityId: {
          id: true,
          name: true,
          location: true
        }
      },
    });
    if (!data) {
      throw new NotFoundException('Unversity not found');
    }
    return getSuccesRes(data);
  }

  async update(id: number, updateFacultyDto: UpdateFacultyDto) {
    const data = await this.facultyRepo.findOne({ where: { id }, relations: { unversityId: true } });
    if (!data) {
      throw new NotFoundException('Faculty notfount');
    }

    const data1 = await this.facultyRepo.findOne({ where: { name: updateFacultyDto.name } });
    if (data1 && data1.id !== id ) {
      throw new ConflictException('Name already exists');
    }

    let unversityId = data.unversityId;
    if (updateFacultyDto.unversityId) {
      const existsUnversitet = await this.unversity.findOne({ where: { id: updateFacultyDto.unversityId } })
      if (!existsUnversitet) {
        throw new NotFoundException('Unversitet not found')
      }
      unversityId = existsUnversitet;
    }
    await this.facultyRepo.update({ id }, { ...updateFacultyDto, unversityId })
    const updateData = await this.facultyRepo.findOne({ where: { id }, relations: { unversityId: true } });
    return getSuccesRes(updateData!);
  }

  async remove(id: number) {
    const deleted = await this.facultyRepo.delete({ id });
    if (!deleted.affected) {
      throw new NotFoundException('faculty not found');
    }
    return getSuccesRes({})
  }
}
