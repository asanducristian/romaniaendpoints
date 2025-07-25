import {
  Controller,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(':cui')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get company by CUI',
    description:
      'Returns company information by CUI. If not found in database, fetches from ANAF API and stores locally.',
  })
  @ApiParam({
    name: 'cui',
    description: 'Company CUI (Romanian tax identification number)',
    example: 15687833,
    type: 'number',
  })
  @ApiQuery({
    name: 'data',
    required: false,
    description:
      'Date for query in YYYY-MM-DD format. Defaults to current date if not provided.',
    example: '2025-07-24',
  })
  @ApiResponse({
    status: 200,
    description: 'Company details',
    type: CompanyDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiResponse({ status: 502, description: 'Error fetching from ANAF API' })
  async getCompanyByCui(
    @Param('cui', ParseIntPipe) cui: number,
    @Query('data') data?: string,
  ): Promise<CompanyDto> {
    // Use current date if not provided
    const queryDate = data || new Date().toISOString().split('T')[0];

    return this.companyService.getCompanyByCui(cui, queryDate);
  }
}
