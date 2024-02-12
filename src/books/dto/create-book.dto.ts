import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  cover: string;
  @ApiProperty()
  price: number;
  @ApiProperty({ default: 'New Arrivals' })
  tags: string;
  @ApiProperty()
  author: string;
  userId: string;
}
