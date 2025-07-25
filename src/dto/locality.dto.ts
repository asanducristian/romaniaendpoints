import { ApiProperty } from '@nestjs/swagger';

export class LocalityDto {
  @ApiProperty({ description: 'Locality name', example: 'Buftea' })
  nume: string;

  @ApiProperty({
    description: 'Locality name with diacritics',
    example: 'Buftea',
  })
  diacritice: string;

  @ApiProperty({ description: 'County name', example: 'Ilfov' })
  judet: string;

  @ApiProperty({ description: 'County code', example: 'IF' })
  auto: string;

  @ApiProperty({ description: 'Postal code', example: '70000' })
  zip: string;

  @ApiProperty({ description: 'Population', example: 19202 })
  populatie: number;

  @ApiProperty({ description: 'Latitude coordinate', example: '44.5629744' })
  lat: string;

  @ApiProperty({ description: 'Longitude coordinate', example: '25.9388214' })
  lng: string;

  @ApiProperty({ description: 'Altitude in meters', example: '85' })
  altitude: string;
}

export class LocalitiesResponseDto {
  @ApiProperty({ type: [LocalityDto], description: 'Array of localities' })
  data: LocalityDto[];

  @ApiProperty({ description: 'Total number of results', example: 1523 })
  total: number;

  @ApiProperty({ description: 'Number of results per page', example: 100 })
  limit: number;

  @ApiProperty({ description: 'Number of skipped results', example: 0 })
  offset: number;
}
