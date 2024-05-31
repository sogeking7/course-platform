import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ExamModule } from './exam/exam.module';
import { SectionModule } from './section/section.module';
import { LectureModule } from './lecture/lecture.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CourseModule,
    ExamModule,
    SectionModule,
    LectureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
