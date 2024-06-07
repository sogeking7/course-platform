import { Module, forwardRef } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
  imports: [forwardRef(() => AuthModule)],
})
export class CourseModule {}
