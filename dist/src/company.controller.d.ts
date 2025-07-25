import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    getCompanyByCui(cui: number, data?: string): Promise<CompanyDto>;
}
