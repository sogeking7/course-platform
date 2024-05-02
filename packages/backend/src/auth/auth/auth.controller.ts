import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../local-auth/local-auth.guard';
import { RegisterDto } from './dto/registration.dto';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'Login successful' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Username or email already taken' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
