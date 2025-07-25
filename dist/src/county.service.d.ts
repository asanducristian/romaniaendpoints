import { PrismaService } from './prisma.service';
import { CountyDto } from './dto/county.dto';
export declare class CountyService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCounties(): Promise<CountyDto[]>;
    getCountyByCode(code: string): Promise<CountyDto>;
    searchCountiesByName(search: string): Promise<CountyDto[]>;
    getCountiesCount(): Promise<number>;
}
