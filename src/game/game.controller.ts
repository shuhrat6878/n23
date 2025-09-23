import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CreateGuess } from './dto/create-guess.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/start')
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Post('/guess')
  createGuess(@Body() createGuessDto: CreateGuess) {
    return this.gameService.createGuess(createGuessDto);
  }

  @Post('/history')
  history(@Body() body: { gameId: number }) {
    return this.gameService.getHistory(body.gameId);
  }
}
