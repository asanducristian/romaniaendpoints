import { PostalCodeService } from './postal-code.service';
import { PostalCodeDto } from './dto/postal-code.dto';
export declare class PostalCodeController {
    private readonly postalCodeService;
    constructor(postalCodeService: PostalCodeService);
    getPostalCodeByCode(code: string): Promise<PostalCodeDto>;
}
