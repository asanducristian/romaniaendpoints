import { PrismaService } from './prisma.service';
import { LocalityDto } from './dto/locality.dto';
export declare class LocalityService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllLocalities(): Promise<LocalityDto[]>;
    searchLocalities(filters: {
        search?: string;
        countyCode?: string;
        limit?: number;
        offset?: number;
    }): Promise<LocalityDto[]>;
    getLocalitiesByCounty(countyCode: string): Promise<LocalityDto[]>;
    getLocalitiesCount(filters?: {
        search?: string;
        countyCode?: string;
    }): Promise<number>;
    getLocalityById(id: number): Promise<LocalityDto | null>;
    findByPostalCodeSimilarity(searchPostalCode: string): Promise<LocalityDto | null>;
    private calculateLeftToRightSimilarity;
    findNearestLocality(latitude: number, longitude: number): Promise<LocalityDto | null>;
    private calculateHaversineDistance;
    private toRadians;
}
