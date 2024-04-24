// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from './jwt/jwt.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret', // TODO: ozgert potom
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
