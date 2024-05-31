import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LectureController],
  providers: [LectureService, PrismaService],
})
export class LectureModule {}
