import { IsNumber, Min } from 'class-validator';

export class CreateGuess {
  @IsNumber()
  @Min(1)
  gameId: number;

  @IsNumber()
  @Min(1)
  value: number;
}
