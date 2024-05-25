import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [AuthModule, UserModule, CourseModule, ExamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
