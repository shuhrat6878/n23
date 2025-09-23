import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGuess } from './dto/create-guess.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createGameDto: CreateGameDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createGameDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const newGame = await this.prisma.game.create({
      data: {
        ...createGameDto,
        number: randomNumber,
      },
    });
    return 'success';
  }

  async createGuess(createGuess: CreateGuess) {
    const { gameId, value } = createGuess;
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });
    if (!game) {
      throw new NotFoundException('game not found');
    }
    const random = game.number;
    let res = '';
    if (value > random) res = 'katta';
    else if (value < random) res = 'kichik';
    else {
      res = "to'g'ri";
      game.finished = true;
    }
    const newGuess = await this.prisma.guess.create({
      data: {
        gameId,
        value,
        result: res,
      },
    });
    return newGuess.result;
  }

  async getHistory(gameId: number) {
    const gameGuess = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        guesses: true
      }
    });
    if (!gameGuess) {
      throw new NotFoundException('Game not found');
    }
    return gameGuess;
  }
}
