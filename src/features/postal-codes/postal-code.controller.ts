import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PostalCodeService } from './postal-code.service';
import { PostalCodeDto } from './dto/postal-code.dto';

@ApiTags('postal-codes')
@Controller('postal-codes')
export class PostalCodeController {
  constructor(private readonly postalCodeService: PostalCodeService) {}

  @Get(':code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get postal code details by postal code' })
  @ApiParam({
    name: 'code',
    description: 'Postal code (6 digits)',
    example: '010011',
  })
  @ApiResponse({
    status: 200,
    description: 'Postal code details',
    type: PostalCodeDto,
  })
  @ApiResponse({ status: 404, description: 'Postal code not found' })
  async getPostalCodeByCode(
    @Param('code') code: string,
  ): Promise<PostalCodeDto> {
    return this.postalCodeService.getPostalCodeByCode(code);
  }
}
