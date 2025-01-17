import { Module, forwardRef } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtUtils } from '../auth/jwt.utils';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService, JwtUtils],
  imports: [forwardRef(() => AuthModule)],
})
export class CourseModule {}
