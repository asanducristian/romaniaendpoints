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
exports.CountyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const county_service_1 = require("./county.service");
const county_dto_1 = require("./dto/county.dto");
const common_dto_1 = require("./dto/common.dto");
let CountyController = class CountyController {
    countyService;
    constructor(countyService) {
        this.countyService = countyService;
    }
    async getCounties(search) {
        if (search) {
            return this.countyService.searchCountiesByName(search);
        }
        return this.countyService.getAllCounties();
    }
    async getCountiesCount() {
        const count = await this.countyService.getCountiesCount();
        return { count };
    }
    async getCountyByCode(code) {
        return this.countyService.getCountyByCode(code);
    }
};
exports.CountyController = CountyController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all counties or search by name' }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search counties by name (partial match)',
        example: 'alba'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of counties', type: [county_dto_1.CountyDto] }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "getCounties", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get total number of counties' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Counties count', type: common_dto_1.CountResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "getCountiesCount", null);
__decorate([
    (0, common_1.Get)(':code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get county by code' }),
    (0, swagger_1.ApiParam)({
        name: 'code',
        description: 'County code (2-3 letters)',
        example: 'AB'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'County details', type: county_dto_1.CountyDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'County not found' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "getCountyByCode", null);
exports.CountyController = CountyController = __decorate([
    (0, swagger_1.ApiTags)('counties'),
    (0, common_1.Controller)('counties'),
    __metadata("design:paramtypes", [county_service_1.CountyService])
], CountyController);
//# sourceMappingURL=county.controller.js.map