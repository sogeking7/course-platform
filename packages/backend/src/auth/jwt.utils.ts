import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  userId: number;
}

@Injectable()
export class JwtUtils {
  constructor(private jwtService: JwtService) {}

  parseJwtToken(token: string): JwtPayload {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload as JwtPayload;
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      throw error;
    }
  }
}
