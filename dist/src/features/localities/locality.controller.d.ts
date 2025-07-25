import { LocalityService } from './locality.service';
import { LocalityDto, LocalitiesResponseDto } from './dto/locality.dto';
import { CountResponseDto } from '../../shared/common.dto';
export declare class LocalityController {
    private readonly localityService;
    constructor(localityService: LocalityService);
    getLocalities(search?: string, countyCode?: string, limit?: string, offset?: string): Promise<LocalitiesResponseDto>;
    getByPostalCodeSimilarity(postalCode: string): Promise<LocalityDto>;
    getLocalitiesByCounty(countyCode: string): Promise<LocalityDto[]>;
    getLocalitiesCount(search?: string, countyCode?: string): Promise<CountResponseDto>;
    getNearestLocality(lat: string, lng: string): Promise<LocalityDto>;
    getLocalityById(id: number): Promise<LocalityDto>;
}
