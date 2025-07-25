import { PrismaService } from '../../shared/prisma.service';
import { PostalCodeDto } from './dto/postal-code.dto';
export declare class PostalCodeService {
    private prisma;
    constructor(prisma: PrismaService);
    getPostalCodeByCode(code: string): Promise<PostalCodeDto>;
    private findMatchingLocality;
}
