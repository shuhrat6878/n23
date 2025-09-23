import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class AnswerQuestionDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(1)
  questionId: number;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
