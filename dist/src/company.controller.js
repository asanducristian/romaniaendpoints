"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const company_service_1 = require("./company.service");
const company_dto_1 = require("./dto/company.dto");
let CompanyController = class CompanyController {
    companyService;
    constructor(companyService) {
        this.companyService = companyService;
    }
    async getCompanyByCui(cui, data) {
        const queryDate = data || new Date().toISOString().split('T')[0];
        return this.companyService.getCompanyByCui(cui, queryDate);
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Get)(':cui'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get company by CUI',
        description: 'Returns company information by CUI. If not found in database, fetches from ANAF API and stores locally.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'cui',
        description: 'Company CUI (Romanian tax identification number)',
        example: 15687833,
        type: 'number',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'data',
        required: false,
        description: 'Date for query in YYYY-MM-DD format. Defaults to current date if not provided.',
        example: '2025-07-24',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Company details',
        type: company_dto_1.CompanyDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Company not found' }),
    (0, swagger_1.ApiResponse)({ status: 502, description: 'Error fetching from ANAF API' }),
    __param(0, (0, common_1.Param)('cui', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyByCui", null);
exports.CompanyController = CompanyController = __decorate([
    (0, swagger_1.ApiTags)('companies'),
    (0, common_1.Controller)('companies'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map