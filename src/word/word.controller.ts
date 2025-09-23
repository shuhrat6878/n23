import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';

@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @Post()
  async create(@Body() dto: CreateWordDto) {
    return this.wordService.createWord(dto);
  }

  @Get('random')
  async randomWord() {
    return this.wordService.getRandomWord();
  }

  @Post('check/:userId')
  async check(
    @Param('userId') userId: string,
    @Body() body: { wordId: number; answer: string },
  ) {
    return this.wordService.checkAnswer(
      Number(userId),
      body.wordId,
      body.answer,
    );
  }
}
