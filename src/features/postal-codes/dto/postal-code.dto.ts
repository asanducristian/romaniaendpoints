import { ApiProperty } from '@nestjs/swagger';

export class PostalCodeDto {
  @ApiProperty({ description: 'Postal code', example: '010011' })
  code: string;

  @ApiProperty({ description: 'County name', example: 'București' })
  county: string;

  @ApiProperty({ description: 'Locality name', example: 'București' })
  locality: string;

  @ApiProperty({
    description: 'Street address',
    example: 'Strada Academiei nr. 7',
  })
  streetAddress: string;

  @ApiProperty({ description: 'Postal subunit', example: 'București 15' })
  postalSubunit: string;

  @ApiProperty({
    description: 'Latitude',
    example: '44.4267674',
    required: false,
  })
  lat?: string;

  @ApiProperty({
    description: 'Longitude',
    example: '26.1025384',
    required: false,
  })
  lng?: string;

  @ApiProperty({
    description: 'Auto code',
    example: 'B',
    required: false,
  })
  auto?: string;

  @ApiProperty({
    description: 'Locality name with diacritics',
    example: 'București',
    required: false,
  })
  localityDiacritice?: string;

  @ApiProperty({
    description: 'Postal code from locality data',
    example: '010011',
    required: false,
  })
  localityZip?: string;

  @ApiProperty({
    description: 'Population',
    example: 1716961,
    required: false,
  })
  populatie?: number;

  @ApiProperty({
    description: 'Altitude in meters',
    example: '85',
    required: false,
  })
  altitude?: string;
}
