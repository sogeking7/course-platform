import { Module, forwardRef } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { JwtUtils } from '../auth/jwt.utils';

@Module({
  controllers: [LectureController],
  providers: [LectureService, PrismaService, JwtUtils],
  imports: [forwardRef(() => AuthModule)],
})
export class LectureModule {}
