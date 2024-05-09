import { ApiProperty } from '@nestjs/swagger';

export class VideoCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  url: string;
}
