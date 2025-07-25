import { ApiProperty } from '@nestjs/swagger';

export class CompanyRequestDto {
  @ApiProperty({ description: 'Company CUI', example: 15687833 })
  cui: number;

  @ApiProperty({
    description: 'Date for query (YYYY-MM-DD format)',
    example: '2025-07-24',
  })
  data: string;
}

export class DateGeneraleDto {
  @ApiProperty({ description: 'Query date', example: '2025-07-24' })
  data?: string;

  @ApiProperty({ description: 'Company CUI', example: 15687833 })
  cui?: number;

  @ApiProperty({
    description: 'Company name',
    example: 'ALMA Instal Pro S.R.L.',
  })
  denumire?: string;

  @ApiProperty({
    description: 'Company address',
    example: 'MUNICIPIUL BUCUREŞTI, SECTOR 2, STR. DIMITRIE MARINESCU, NR.32',
  })
  adresa?: string;

  @ApiProperty({ description: 'Phone number', example: '2421776' })
  telefon?: string;

  @ApiProperty({ description: 'Fax number', example: '' })
  fax?: string;

  @ApiProperty({ description: 'Postal code', example: '50594' })
  codPostal?: string;

  @ApiProperty({ description: 'Act', example: '' })
  act?: string;

  @ApiProperty({
    description: 'Registration status',
    example: 'INREGISTRAT din data 22.08.2003',
  })
  stare_inregistrare?: string;

  @ApiProperty({
    description: 'RO e-Invoice registration date',
    example: '2024-08-01',
  })
  data_inreg_Reg_RO_e_Factura?: string;

  @ApiProperty({
    description: 'Competent fiscal authority',
    example: 'Administraţia Sector 2 a Finanţelor Publice',
  })
  organFiscalCompetent?: string;

  @ApiProperty({
    description: 'Ownership form',
    example: 'PROPR.PRIVATA-CAPITAL PRIVAT AUTOHTON',
  })
  forma_de_proprietate?: string;

  @ApiProperty({
    description: 'Organization form',
    example: 'PERSOANA JURIDICA',
  })
  forma_organizare?: string;

  @ApiProperty({
    description: 'Legal form',
    example: 'SOCIETATE COMERCIALĂ CU RĂSPUNDERE LIMITATĂ',
  })
  forma_juridica?: string;

  @ApiProperty({
    description: 'Commercial registry number',
    example: 'J40/11432/2003',
  })
  nrRegCom?: string;

  @ApiProperty({ description: 'CAEN code', example: '7112' })
  cod_CAEN?: string;

  @ApiProperty({ description: 'IBAN', example: '' })
  iban?: string;

  @ApiProperty({ description: 'RO e-Invoice status', example: true })
  statusRO_e_Factura?: boolean;

  @ApiProperty({ description: 'Registration date', example: '2003-08-22' })
  data_inregistrare?: string;
}

export class AdresaSediuSocialDto {
  @ApiProperty({ description: 'Country', example: '' })
  stara?: string;

  @ApiProperty({
    description: 'Locality name',
    example: 'Sector 2 Mun. Bucureşti',
  })
  sdenumire_Localitate?: string;

  @ApiProperty({
    description: 'Street name',
    example: 'Str. Dimitrie Marinescu',
  })
  sdenumire_Strada?: string;

  @ApiProperty({ description: 'Street number', example: '32' })
  snumar_Strada?: string;

  @ApiProperty({ description: 'Locality code', example: '2' })
  scod_Localitate?: string;

  @ApiProperty({ description: 'County name', example: 'MUNICIPIUL BUCUREŞTI' })
  sdenumire_Judet?: string;

  @ApiProperty({ description: 'County code', example: '40' })
  scod_Judet?: string;

  @ApiProperty({ description: 'County auto code', example: 'B' })
  scod_JudetAuto?: string;

  @ApiProperty({ description: 'Address details', example: '' })
  sdetalii_Adresa?: string;

  @ApiProperty({ description: 'Postal code', example: '50594' })
  scod_Postal?: string;
}

export class AdresaDomiciliuFiscalDto {
  @ApiProperty({ description: 'Country', example: '' })
  dtara?: string;

  @ApiProperty({
    description: 'Locality name',
    example: 'Sector 2 Mun. Bucureşti',
  })
  ddenumire_Localitate?: string;

  @ApiProperty({ description: 'Street number', example: '32' })
  dnumar_Strada?: string;

  @ApiProperty({
    description: 'Street name',
    example: 'Str. Dimitrie Marinescu',
  })
  ddenumire_Strada?: string;

  @ApiProperty({ description: 'Locality code', example: '2' })
  dcod_Localitate?: string;

  @ApiProperty({ description: 'County name', example: 'MUNICIPIUL BUCUREŞTI' })
  ddenumire_Judet?: string;

  @ApiProperty({ description: 'County code', example: '40' })
  dcod_Judet?: string;

  @ApiProperty({ description: 'County auto code', example: 'B' })
  dcod_JudetAuto?: string;

  @ApiProperty({ description: 'Address details', example: '' })
  ddetalii_Adresa?: string;

  @ApiProperty({ description: 'Postal code', example: '50594' })
  dcod_Postal?: string;
}

export class CompanyDto {
  @ApiProperty({ description: 'Company ID' })
  id: number;

  @ApiProperty({ description: 'Company CUI', example: 15687833 })
  cui: number;

  @ApiProperty({ description: 'General company data', type: DateGeneraleDto })
  date_generale: DateGeneraleDto;

  @ApiProperty({
    description: 'Registered office address',
    type: AdresaSediuSocialDto,
  })
  adresa_sediu_social: AdresaSediuSocialDto;

  @ApiProperty({
    description: 'Fiscal domicile address',
    type: AdresaDomiciliuFiscalDto,
  })
  adresa_domiciliu_fiscal: AdresaDomiciliuFiscalDto;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}

export class AnafCompanyFoundDto {
  @ApiProperty({ description: 'General company data', type: DateGeneraleDto })
  date_generale: DateGeneraleDto;

  @ApiProperty({
    description: 'Registered office address',
    type: AdresaSediuSocialDto,
  })
  adresa_sediu_social: AdresaSediuSocialDto;

  @ApiProperty({
    description: 'Fiscal domicile address',
    type: AdresaDomiciliuFiscalDto,
  })
  adresa_domiciliu_fiscal: AdresaDomiciliuFiscalDto;
}

export class AnafApiResponseDto {
  @ApiProperty({ description: 'Found companies', type: [AnafCompanyFoundDto] })
  found: AnafCompanyFoundDto[];

  @ApiProperty({ description: 'Not found CUIs', type: [Number] })
  notFound: number[];
}
