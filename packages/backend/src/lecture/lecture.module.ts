import { Module, forwardRef } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [LectureController],
  providers: [LectureService, PrismaService],
  imports: [forwardRef(() => AuthModule)],
})
export class LectureModule {}
