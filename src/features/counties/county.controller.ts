import {
  Controller,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CountyService } from './county.service';
import { CountyDto } from './dto/county.dto';
import { CountResponseDto } from '../../shared/common.dto';

@ApiTags('counties')
@Controller('counties')
export class CountyController {
  constructor(private readonly countyService: CountyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all counties or search by name' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search counties by name (partial match)',
    example: 'alba',
  })
  @ApiResponse({
    status: 200,
    description: 'List of counties',
    type: [CountyDto],
  })
  async getCounties(@Query('search') search?: string): Promise<CountyDto[]> {
    if (search) {
      return this.countyService.searchCountiesByName(search);
    }
    return this.countyService.getAllCounties();
  }

  @Get('count')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get total number of counties' })
  @ApiResponse({
    status: 200,
    description: 'Counties count',
    type: CountResponseDto,
  })
  async getCountiesCount(): Promise<CountResponseDto> {
    const count = await this.countyService.getCountiesCount();
    return { count };
  }

  @Get(':code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get county by code' })
  @ApiParam({
    name: 'code',
    description: 'County code (2-3 letters)',
    example: 'AB',
  })
  @ApiResponse({ status: 200, description: 'County details', type: CountyDto })
  @ApiResponse({ status: 404, description: 'County not found' })
  async getCountyByCode(@Param('code') code: string): Promise<CountyDto> {
    return this.countyService.getCountyByCode(code);
  }
}
