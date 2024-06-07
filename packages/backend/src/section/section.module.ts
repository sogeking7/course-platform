import { Module, forwardRef } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SectionController],
  providers: [SectionService, PrismaService],
  imports: [forwardRef(() => AuthModule)],
})
export class SectionModule {}
