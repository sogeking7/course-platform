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

    try {
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      req.user = user;

      return requiredRoles.includes(user.role);
    } catch (e) {
      throw new HttpException(
        'Нет доступа' + ' message: ' + e.message,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
