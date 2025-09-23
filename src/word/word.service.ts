import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  async createWord(dto: CreateWordDto) {
    return this.prisma.word.create({ data: dto });
  }

  async getRandomWord() {
    const words = await this.prisma.word.findMany();
    if (!words.length) {
      throw new NotFoundException('Sozlar mavjud emas');
    }

    const randomWord = words[Math.floor(Math.random() * words.length)];
    const scrambled = randomWord.text.split('').sort(() => Math.random() - 0.5).join('');

    return { id: randomWord.id, scrambled };
  }

  async checkAnswer(userId: number, wordId: number, answer: string) {
    const word = await this.prisma.word.findUnique({ where: { id: wordId } });
    if (!word) throw new NotFoundException('Soz topilmadi');

    const isCorrect = word.text.toLowerCase() === answer.toLowerCase();

    if (isCorrect) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { score: { increment: 1 } },
      });
    }

    return { correct: isCorrect, word: word.text };
  }
}
