import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WordModule } from './word/word.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, WordModule],
  providers: [PrismaService],
})
export class AppModule {}
