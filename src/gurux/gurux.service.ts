import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuruxDto } from './dto/create-gurux.dto';
import { UpdateGuruxDto } from './dto/update-gurux.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gurux } from './entities/gurux.entity';
import { Repository } from 'typeorm';
import { Faculty } from 'src/faculty/entities/faculty.entity';
import { getSuccesRes } from 'src/utils/getSuccessRes';

@Injectable()
export class GuruxService {
  constructor(
    @InjectRepository(Gurux) private readonly gurux: Repository<Gurux>,
    @InjectRepository(Faculty) private readonly faculty: Repository<Faculty>
  ) { }
  async create(createGuruxDto: CreateGuruxDto) {
    const facultyId = await this.faculty.findOne({ where: { id: createGuruxDto.facultyId } });
    if (!facultyId) {
      throw new NotFoundException('Faculty not found');
    }

    const existsData = await this.gurux.findOne({ where: { name: createGuruxDto.name } });
    if (existsData) {
      throw new ConflictException("Name already exixts");
    }
    const data = this.gurux.create({ ...createGuruxDto, facultyId });
    console.log(data)
    await this.gurux.save(data)
    return getSuccesRes(data, 201);
  }

  async findAll() {
    const data = await this.gurux.find({
      relations: { facultyId: { unversityId: true } },
      select: {
        id: true,
        name: true,
        facultyId: {
          id: true,
          name: true,
          unversityId: {
            id: true,
            name: true
          }
        }
      },
    })
    return getSuccesRes(data);
  }

  async findOne(id: number) {
    const data = await this.gurux.findOne({
      where: { id }, relations: { facultyId: { unversityId: true } },
      select: {
        id: true,
        name: true,
        facultyId: {
          id: true,
          name: true,
          unversityId: {
            id: true,
            name: true
          }
        }
      },
    });
    if (!data) {
      throw new NotFoundException('guruh not found');
    }
    return getSuccesRes(data);
  }

  async update(id: number, updateGuruxDto: UpdateGuruxDto) {
    const data = await this.gurux.findOne({ where: { id }, relations: { facultyId: true } });
    if (!data) {
      throw new NotFoundException('Faculty notfount');
    }

    const data1 = await this.gurux.findOne({ where: { name: updateGuruxDto.name } });
    if (data1 && data1.id !== id) {
      throw new ConflictException('Name already exists');
    }

    let facultyId = data.facultyId;
    if (updateGuruxDto.facultyId) {
      const existsFaculty = await this.faculty.findOne({ where: { id: updateGuruxDto.facultyId } });
      if (!existsFaculty) {
        throw new NotFoundException('faculty not found')
      }
      facultyId = existsFaculty;
    }
    await this.gurux.update({ id }, { ...updateGuruxDto, facultyId })
    const updateData = await this.gurux.findOne({ where: { id }, relations: { facultyId: { unversityId: true } } });
    return getSuccesRes(updateData!);
  }

  async remove(id: number) {
    const deleted = await this.gurux.delete({ id });
    if (!deleted.affected) {
      throw new NotFoundException("data not fount")
    }
    return getSuccesRes({});
  }
}
