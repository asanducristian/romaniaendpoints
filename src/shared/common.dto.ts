import { ApiProperty } from '@nestjs/swagger';

export class CountResponseDto {
  @ApiProperty({ description: 'Total count', example: 42 })
  count: number;
}
