import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])/)
  @ApiProperty()
  password: string;
}
