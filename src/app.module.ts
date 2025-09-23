import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, QuestionModule, PrismaModule],
})
export class AppModule {}
