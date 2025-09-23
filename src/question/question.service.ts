import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnswerQuestionDto } from './dto/answer-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(dto: CreateQuestionDto) {
    return this.prisma.question.create({ data: dto });
  }

  async getRandomQuestion() {
    const count = await this.prisma.question.count();
    const randomIndex = Math.floor(Math.random() * count);
    const questions = await this.prisma.question.findMany({
      skip: randomIndex,
      select: {
        id: true,
        question: true,
      },
      take: 1,
    });
    return questions[0];
  }

  async checkAnswer(dto: AnswerQuestionDto) {
    const { userId, questionId, answer } = dto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) throw new NotFoundException('Question not found');

    if (question.answer.toLowerCase() === answer.toLowerCase()) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { score: user.score + 1 },
      });
      return { correct: true, message: 'Correct answer!' };
    }
    return { correct: false, message: 'Wrong answer!' };
  }

  async getLeaderboard() {
    return this.prisma.user.findMany({
      orderBy: { score: 'desc' },
      take: 10,
    });
  }
}
