import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class SectionCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  courseId: number;
}
