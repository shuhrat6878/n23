import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: { name: dto.name },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getLeaderboard() {
    return this.prisma.user.findMany({
      orderBy: { score: 'desc' },
      take: 10,
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
