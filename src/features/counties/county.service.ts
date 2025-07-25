import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { CountyDto } from './dto/county.dto';

@Injectable()
export class CountyService {
  constructor(private prisma: PrismaService) {}

  async getAllCounties(): Promise<CountyDto[]> {
    return this.prisma.county.findMany({
      select: { name: true, code: true, cod_judet: true },
      orderBy: { name: 'asc' },
    });
  }

  async getCountyByCode(code: string): Promise<CountyDto> {
    const county = await this.prisma.county.findUnique({
      where: { code: code.toUpperCase() },
      select: { name: true, code: true, cod_judet: true },
    });

    if (!county) {
      throw new NotFoundException(`County with code '${code}' not found`);
    }

    return county;
  }

  async searchCountiesByName(search: string): Promise<CountyDto[]> {
    if (!search || search.trim().length === 0) {
      return this.getAllCounties();
    }

    return this.prisma.county.findMany({
      where: {
        name: {
          contains: search.trim(),
        },
      },
      select: { name: true, code: true, cod_judet: true },
      orderBy: { name: 'asc' },
    });
  }

  async getCountiesCount(): Promise<number> {
    return this.prisma.county.count();
  }
}
