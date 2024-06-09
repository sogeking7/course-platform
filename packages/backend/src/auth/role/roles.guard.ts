import { HttpStatus } from '@nestjs/common/enums';
import { ROLES_KEY } from './roles.decorator';
import {
  UnauthorizedException,
  HttpException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    // console.log('Request Headers:', req.headers);

    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'Authorization header is missing',
      });
    }

    try {
      // console.log('Authorization Header:', authHeader);
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Invalid authorization header format',
        });
      }

      // console.log('JWT Secret:', process.env.JWT_SECRET);

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'secret',
      });

      req.user = user;
      // console.log('User:', user);

      const hasRole = requiredRoles.includes(user.role);
      if (!hasRole) {
        throw new HttpException(
          'Forbidden: Insufficient role',
          HttpStatus.FORBIDDEN,
        );
      }

      return hasRole;
    } catch (e) {
      console.error('Authorization error:', e.message);
      throw new HttpException(
        'Access denied: ' + e.message,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
