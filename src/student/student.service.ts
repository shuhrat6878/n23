import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Gurux } from 'src/gurux/entities/gurux.entity';
import { getSuccesRes } from 'src/utils/getSuccessRes';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(Gurux) private readonly guruhRepo: Repository<Gurux>
  ) { }
  async create(createStudentDto: CreateStudentDto) {
    const guruxId = await this.guruhRepo.findOne({ where: { id: createStudentDto.guruxId } });
    if (!guruxId) {
      throw new NotFoundException('Guruh not found');
    }
    const data = this.studentRepo.create({ ...createStudentDto, guruxId });
    await this.studentRepo.save(data)
    return getSuccesRes(data, 201)
  }

  async findAll() {
    const data = await this.studentRepo.find({ relations: { guruxId: { facultyId: { unversityId: true } } } });
    return getSuccesRes(data);
  }

  async findOne(id: number) {
    const data = await this.studentRepo.findOne({ where: { id }, relations: { guruxId: { facultyId: { unversityId: true } } } });
    if (!data) {
      throw new NotFoundException('guruh not found');
    }
    return getSuccesRes(data);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    let guruxId = student.guruxId;
    if (updateStudentDto.guruxId) {
      const existsGurux = await this.guruhRepo.findOne({ where: { id: updateStudentDto.guruxId } });
      if (!existsGurux) {
        throw new NotFoundException('Gurux not found');
      }
      guruxId = existsGurux;
    }

    await this.studentRepo.update({ id }, { ...updateStudentDto, guruxId });

    const updatedStudent = await this.studentRepo.findOne({
      where: { id },
      relations: { guruxId: { facultyId: { unversityId: true } } },
    });

    return getSuccesRes(updatedStudent!);
  }

  async remove(id: number) {
    const deleted = await this.studentRepo.delete({ id });
    if (!deleted.affected) {
      throw new NotFoundException('data not found')
    }
    return getSuccesRes({})
  }
}
