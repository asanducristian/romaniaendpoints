import { PrismaService } from '../../shared/prisma.service';
import { CompanyDto } from './dto/company.dto';
export declare class CompanyService {
    private prisma;
    constructor(prisma: PrismaService);
    getCompanyByCui(cui: number, data: string): Promise<CompanyDto>;
    private fetchFromAnafApi;
    private saveCompanyToDb;
    private formatCompanyFromDb;
}
