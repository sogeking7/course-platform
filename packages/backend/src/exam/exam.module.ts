import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtUtils } from '../auth/jwt.utils';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [ExamController],
  providers: [ExamService, PrismaService, JwtUtils],
  exports: [JwtUtils],
})
export class ExamModule {}
