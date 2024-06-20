import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class ExamCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  questions: string;

  @ApiProperty()
  lectureId?: number;
}

export class ExamUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  questions: string;

  @ApiProperty()
  @IsOptional()
  lectureId?: number;
}

export class QuestionCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  options: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  correctAnswer: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isMultipleChoice: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  points: number;
}

export class QuestionUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  options: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  correctAnswer: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isMultipleChoice: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  points: number;
}

export class ExamCheckDto {
  @ApiProperty()
  @IsArray()
  answers: ExamAnswerDto[];
}

export class ExamAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsArray()
  givenAnswers: number[];
}

export class UserEmail {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class InviteUsersDto {
  emails: UserEmail[];
}
