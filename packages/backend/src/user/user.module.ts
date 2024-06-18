import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { JwtUtils } from '../auth/jwt.utils';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtUtils],
  imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}
