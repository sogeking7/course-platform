import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [AuthModule, UserModule, ImageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
