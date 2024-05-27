import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class LectureCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  videoUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  sectionId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  examId?: number;
}
