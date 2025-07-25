import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { LocalityDto, LocalitiesResponseDto } from './dto/locality.dto';

@Injectable()
export class LocalityService {
  constructor(private prisma: PrismaService) {}

  async getAllLocalities(): Promise<LocalityDto[]> {
    return this.prisma.locality.findMany({
      select: {
        nume: true,
        diacritice: true,
        judet: true,
        auto: true,
        zip: true,
        populatie: true,
        lat: true,
        lng: true,
        altitude: true,
      },
      orderBy: { nume: 'asc' },
    });
  }

  async searchLocalities(filters: {
    search?: string;
    countyCode?: string;
    limit?: number;
    offset?: number;
  }): Promise<LocalityDto[]> {
    const { search, countyCode, limit = 100, offset = 0 } = filters;

    const where: any = {};

    // Search by name (nume or diacritice)
    if (search && search.trim().length > 0) {
      where.OR = [
        {
          nume: {
            contains: search.trim(),
          },
        },
        {
          diacritice: {
            contains: search.trim(),
          },
        },
      ];
    }

    // Filter by county code
    if (countyCode && countyCode.trim().length > 0) {
      where.auto = countyCode.trim().toUpperCase();
    }

    return this.prisma.locality.findMany({
      where,
      select: {
        nume: true,
        diacritice: true,
        judet: true,
        auto: true,
        zip: true,
        populatie: true,
        lat: true,
        lng: true,
        altitude: true,
      },
      orderBy: { nume: 'asc' },
      take: limit,
      skip: offset,
    });
  }

  async getLocalitiesByCounty(countyCode: string): Promise<LocalityDto[]> {
    return this.prisma.locality.findMany({
      where: {
        auto: countyCode.toUpperCase(),
      },
      select: {
        nume: true,
        diacritice: true,
        judet: true,
        auto: true,
        zip: true,
        populatie: true,
        lat: true,
        lng: true,
        altitude: true,
      },
      orderBy: { nume: 'asc' },
    });
  }

  async getLocalitiesCount(filters?: {
    search?: string;
    countyCode?: string;
  }): Promise<number> {
    const { search, countyCode } = filters || {};

    const where: any = {};

    if (search && search.trim().length > 0) {
      where.OR = [
        {
          nume: {
            contains: search.trim(),
          },
        },
        {
          diacritice: {
            contains: search.trim(),
          },
        },
      ];
    }

    if (countyCode && countyCode.trim().length > 0) {
      where.auto = countyCode.trim().toUpperCase();
    }

    return this.prisma.locality.count({ where });
  }

  async getLocalityById(id: number): Promise<LocalityDto | null> {
    return this.prisma.locality.findUnique({
      where: { id },
      select: {
        nume: true,
        diacritice: true,
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

  async findByPostalCodeSimilarity(
    searchPostalCode: string,
  ): Promise<LocalityDto | null> {
    // Get all localities with postal codes that start with at least the first character
    const firstChar = searchPostalCode.charAt(0);
    if (!firstChar) {
      return null;
    }

    const localities = await this.prisma.locality.findMany({
      where: {
        zip: {
          startsWith: firstChar,
        },
      },
      select: {
        nume: true,
        diacritice: true,
        judet: true,
        auto: true,
        zip: true,
        populatie: true,
        lat: true,
        lng: true,
        altitude: true,
      },
    });

    if (localities.length === 0) {
      return null;
    }

    // Calculate similarity scores and find the best match
    let bestMatch: LocalityDto | null = null;
    let bestScore = 0;

    for (const locality of localities) {
      const score = this.calculateLeftToRightSimilarity(
        searchPostalCode,
        locality.zip,
      );
      if (score > bestScore) {
        bestScore = score;
        bestMatch = locality;
      }
    }

    return bestMatch;
  }

  private calculateLeftToRightSimilarity(
    search: string,
    target: string,
  ): number {
    let score = 0;
    const minLength = Math.min(search.length, target.length);

    for (let i = 0; i < minLength; i++) {
      if (search.charAt(i) === target.charAt(i)) {
        score++;
      } else {
        break; // Stop at first mismatch
      }
    }

    return score;
  }

  async findNearestLocality(
    latitude: number,
    longitude: number,
  ): Promise<LocalityDto | null> {
    // Get all localities with valid coordinates
    const localities = await this.prisma.locality.findMany({
      where: {
        AND: [
          { lat: { not: '' } },
          { lng: { not: '' } },
          { lat: { not: '0' } },
          { lng: { not: '0' } },
        ],
      },
      select: {
        nume: true,
        diacritice: true,
        judet: true,
        auto: true,
        zip: true,
        populatie: true,
        lat: true,
        lng: true,
        altitude: true,
      },
    });

    if (localities.length === 0) {
      return null;
    }

    let nearestLocality: LocalityDto | null = null;
    let minDistance = Infinity;

    for (const locality of localities) {
      const localityLat = parseFloat(locality.lat);
      const localityLng = parseFloat(locality.lng);

      // Skip localities with invalid coordinates
      if (isNaN(localityLat) || isNaN(localityLng)) {
        continue;
      }

      const distance = this.calculateHaversineDistance(
        latitude,
        longitude,
        localityLat,
        localityLng,
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestLocality = locality;
      }
    }

    return nearestLocality;
  }

  private calculateHaversineDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
