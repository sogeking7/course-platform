import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsBoolean, IsNumber } from 'class-validator';

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
