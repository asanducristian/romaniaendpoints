import { ApiProperty } from '@nestjs/swagger';

export class CountyDto {
  @ApiProperty({ description: 'County name', example: 'Alba' })
  name: string;

  @ApiProperty({ description: 'County code', example: 'AB' })
  code: string;

  @ApiProperty({ description: 'County numeric code', example: '01' })
  cod_judet: string;
}
