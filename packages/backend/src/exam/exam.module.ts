import { Module, forwardRef } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtUtils } from '../auth/jwt.utils';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ExamController],
  providers: [ExamService, PrismaService, JwtUtils],
  imports: [forwardRef(() => AuthModule)],
})
export class ExamModule {}
