import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user';
import { RegisterDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = this.users.find((u) => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async register(userDto: RegisterDto): Promise<User> {
    const { username, password, email } = userDto;

    const existingUsername = this.users.find(
      (user) => user.username === username,
    );
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    const existingEmail = this.users.find((user) => user.email === email);
    if (existingEmail) {
      throw new ConflictException('Email is already registered');
    }

    const newUser = {
      id: this.users.length + 1,
      username,
      password: bcrypt.hashSync(password, 10),
      email,
    };
    this.users.push(newUser);

    return newUser;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
