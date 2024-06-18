import { Module, forwardRef } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { JwtUtils } from 'src/auth/jwt.utils';

@Module({
  controllers: [SectionController],
  providers: [SectionService, PrismaService, JwtUtils],
  imports: [forwardRef(() => AuthModule)],
})
export class SectionModule {}
