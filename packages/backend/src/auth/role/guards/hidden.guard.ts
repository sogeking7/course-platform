import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HiddenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest<
      IncomingMessage & { user?: Record<string, unknown> }
    >(context);
    const token = this.getToken(request);

    if (token == null || token == undefined) {
      request.user = { hidden: true };
      return true;
    }

    const payload = this.jwtService.verify(token);
    const user = await this.prismaService.user.findFirst({
      where: { email: payload.email },
    });

    if (!user || user == null || user == undefined) {
      request.user = { hidden: true };
    } else {
      request.user = user;
      request.user.hidden = false;
    }
    return true;
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    const authorization = request.headers.authorization;
    if (!authorization || Array.isArray(authorization)) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = authorization.split(' ');
    return token;
  }
}
