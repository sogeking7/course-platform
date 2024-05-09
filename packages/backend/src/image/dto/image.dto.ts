import { ApiProperty } from '@nestjs/swagger';

export class ImageCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}
