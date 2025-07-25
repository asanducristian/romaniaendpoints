import {
  Controller,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { LocalityService } from './locality.service';
import { LocalityDto, LocalitiesResponseDto } from './dto/locality.dto';
import { CountResponseDto } from '../../shared/common.dto';

@ApiTags('localities')
@Controller('localities')
export class LocalityController {
  constructor(private readonly localityService: LocalityService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get localities with optional filters and pagination',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search localities by name (nume or diacritice)',
    example: 'buftea',
  })
  @ApiQuery({
    name: 'county',
    required: false,
    description: 'Filter by county code',
    example: 'IF',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of results per page',
    example: '100',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Number of results to skip',
    example: '0',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of localities',
    type: LocalitiesResponseDto,
  })
  async getLocalities(
    @Query('search') search?: string,
    @Query('county') countyCode?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<LocalitiesResponseDto> {
    const limitNum = limit ? parseInt(limit, 10) : 100;
    const offsetNum = offset ? parseInt(offset, 10) : 0;

    const filters = {
      search,
      countyCode,
      limit: limitNum,
      offset: offsetNum,
    };

    const [data, total] = await Promise.all([
      this.localityService.searchLocalities(filters),
      this.localityService.getLocalitiesCount({ search, countyCode }),
    ]);

    return {
      data,
      total,
      limit: limitNum,
      offset: offsetNum,
    };
  }

  @Get('postal/:code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Find locality by postal code similarity',
    description:
      'Returns the locality with the most similar postal code using left-to-right character matching',
  })
  @ApiParam({
    name: 'code',
    description: 'Postal code to search for',
    example: '021648',
  })
  @ApiResponse({
    status: 200,
    description: 'Best matching locality',
    type: LocalityDto,
  })
  @ApiResponse({ status: 404, description: 'No similar locality found' })
  async getByPostalCodeSimilarity(
    @Param('code') postalCode: string,
  ): Promise<LocalityDto> {
    const locality =
      await this.localityService.findByPostalCodeSimilarity(postalCode);
    if (!locality) {
      throw new NotFoundException(
        `No locality found similar to postal code '${postalCode}'`,
      );
    }
    return locality;
  }

  @Get('county/:code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all localities in a specific county' })
  @ApiParam({
    name: 'code',
    description: 'County code',
    example: 'IF',
  })
  @ApiResponse({
    status: 200,
    description: 'List of localities in the county',
    type: [LocalityDto],
  })
  async getLocalitiesByCounty(
    @Param('code') countyCode: string,
  ): Promise<LocalityDto[]> {
    return this.localityService.getLocalitiesByCounty(countyCode);
  }

  @Get('count')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get total number of localities with optional filters',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search filter',
    example: 'buc',
  })
  @ApiQuery({
    name: 'county',
    required: false,
    description: 'County filter',
    example: 'IF',
  })
  @ApiResponse({
    status: 200,
    description: 'Localities count',
    type: CountResponseDto,
  })
  async getLocalitiesCount(
    @Query('search') search?: string,
    @Query('county') countyCode?: string,
  ): Promise<CountResponseDto> {
    const count = await this.localityService.getLocalitiesCount({
      search,
      countyCode,
    });
    return { count };
  }

  @Get('nearest/coordinates')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find nearest locality by coordinates' })
  @ApiQuery({
    name: 'lat',
    required: true,
    description: 'Latitude coordinate',
    example: '44.4267674',
  })
  @ApiQuery({
    name: 'lng',
    required: true,
    description: 'Longitude coordinate',
    example: '26.1025384',
  })
  @ApiResponse({
    status: 200,
    description: 'Nearest locality',
    type: LocalityDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid coordinates' })
  @ApiResponse({ status: 404, description: 'No localities found' })
  async getNearestLocality(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ): Promise<LocalityDto> {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new NotFoundException('Invalid coordinates provided');
    }

    if (latitude < -90 || latitude > 90) {
      throw new NotFoundException('Latitude must be between -90 and 90');
    }

    if (longitude < -180 || longitude > 180) {
      throw new NotFoundException('Longitude must be between -180 and 180');
    }

    const nearestLocality = await this.localityService.findNearestLocality(
      latitude,
      longitude,
    );

    if (!nearestLocality) {
      throw new NotFoundException('No localities found');
    }

    return nearestLocality;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get locality by ID' })
  @ApiParam({
    name: 'id',
    description: 'Locality ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Locality details',
    type: LocalityDto,
  })
  @ApiResponse({ status: 404, description: 'Locality not found' })
  async getLocalityById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LocalityDto> {
    const locality = await this.localityService.getLocalityById(id);
    if (!locality) {
      throw new NotFoundException(`Locality with ID ${id} not found`);
    }
    return locality;
  }
}
