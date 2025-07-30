import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { PostalCodeDto } from './dto/postal-code.dto';

@Injectable()
export class PostalCodeService {
  constructor(private prisma: PrismaService) {}

  async getPostalCodeByCode(code: string): Promise<PostalCodeDto> {
    // First, try to find the postal code in our database
    const postalCode = await this.prisma.postalCode.findUnique({
      where: { code: code },
    });

    let result: PostalCodeDto;

    if (postalCode) {
      // Postal code found in database, try to find matching locality data
      const locality = await this.findMatchingLocality(
        postalCode.locality,
        postalCode.county,
      );

      result = {
        code: postalCode.code,
        county: postalCode.county,
        locality: postalCode.locality,
        streetAddress: postalCode.streetAddress,
        postalSubunit: postalCode.postalSubunit,
        lat: locality?.lat,
        lng: locality?.lng,
        auto: locality?.auto,
        localityDiacritice: locality?.diacritice,
        localityZip: locality?.zip,
        populatie: locality?.populatie,
        altitude: locality?.altitude,
      };
    } else {
      throw new NotFoundException(`Postal code '${code}' not found in database`);
    }

    return result;
  }

  private async findMatchingLocality(localityName: string, countyName: string) {
    // Try to find locality by matching both locality name and county
    let locality = await this.prisma.locality.findFirst({
      where: {
        AND: [
          {
            OR: [{ diacritice: localityName }, { nume: localityName }],
          },
          { judet: countyName },
        ],
      },
      select: {
        diacritice: true,
        nume: true,
        judet: true,
        auto: true,
        zip: true,
        populatie: true,
        lat: true,
        lng: true,
        altitude: true,
      },
    });

    // If not found, try matching just by locality name (fallback)
    if (!locality) {
      locality = await this.prisma.locality.findFirst({
        where: {
          OR: [{ diacritice: localityName }, { nume: localityName }],
        },
        select: {
          diacritice: true,
          nume: true,
          judet: true,
          auto: true,
          zip: true,
          populatie: true,
          lat: true,
          lng: true,
          altitude: true,
        },
      });
    }

    return locality;
  }
}
