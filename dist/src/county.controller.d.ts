import { CountyService } from './county.service';
import { CountyDto } from './dto/county.dto';
import { CountResponseDto } from './dto/common.dto';
export declare class CountyController {
    private readonly countyService;
    constructor(countyService: CountyService);
    getCounties(search?: string): Promise<CountyDto[]>;
    getCountiesCount(): Promise<CountResponseDto>;
    getCountyByCode(code: string): Promise<CountyDto>;
}
