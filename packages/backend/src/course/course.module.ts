import { Module, forwardRef } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
})
export class CourseModule {}
