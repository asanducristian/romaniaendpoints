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
exports.LocalityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const locality_service_1 = require("./locality.service");
const locality_dto_1 = require("./dto/locality.dto");
const common_dto_1 = require("../../shared/common.dto");
let LocalityController = class LocalityController {
    localityService;
    constructor(localityService) {
        this.localityService = localityService;
    }
    async getLocalities(search, countyCode, limit, offset) {
        const limitNum = limit ? parseInt(limit, 10) : 100;
        const offsetNum = offset ? parseInt(offset, 10) : 0;
        const filters = {
            search,
            countyCode,
            limit: limitNum,
            offset: offsetNum,
        };
        const [data, total] = await Promise.all([
            this.localityService.searchLocalities(filters),
            this.localityService.getLocalitiesCount({ search, countyCode }),
        ]);
        return {
            data,
            total,
            limit: limitNum,
            offset: offsetNum,
        };
    }
    async getByPostalCodeSimilarity(postalCode) {
        const locality = await this.localityService.findByPostalCodeSimilarity(postalCode);
        if (!locality) {
            throw new common_1.NotFoundException(`No locality found similar to postal code '${postalCode}'`);
        }
        return locality;
    }
    async getLocalitiesByCounty(countyCode) {
        return this.localityService.getLocalitiesByCounty(countyCode);
    }
    async getLocalitiesCount(search, countyCode) {
        const count = await this.localityService.getLocalitiesCount({
            search,
            countyCode,
        });
        return { count };
    }
    async getNearestLocality(lat, lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        if (isNaN(latitude) || isNaN(longitude)) {
            throw new common_1.NotFoundException('Invalid coordinates provided');
        }
        if (latitude < -90 || latitude > 90) {
            throw new common_1.NotFoundException('Latitude must be between -90 and 90');
        }
        if (longitude < -180 || longitude > 180) {
            throw new common_1.NotFoundException('Longitude must be between -180 and 180');
        }
        const nearestLocality = await this.localityService.findNearestLocality(latitude, longitude);
        if (!nearestLocality) {
            throw new common_1.NotFoundException('No localities found');
        }
        return nearestLocality;
    }
    async getLocalityById(id) {
        const locality = await this.localityService.getLocalityById(id);
        if (!locality) {
            throw new common_1.NotFoundException(`Locality with ID ${id} not found`);
        }
        return locality;
    }
};
exports.LocalityController = LocalityController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get localities with optional filters and pagination',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search localities by name (nume or diacritice)',
        example: 'buftea',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'county',
        required: false,
        description: 'Filter by county code',
        example: 'IF',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: 'Number of results per page',
        example: '100',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        required: false,
        description: 'Number of results to skip',
        example: '0',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated list of localities',
        type: locality_dto_1.LocalitiesResponseDto,
    }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('county')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], LocalityController.prototype, "getLocalities", null);
__decorate([
    (0, common_1.Get)('postal/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Find locality by postal code similarity',
        description: 'Returns the locality with the most similar postal code using left-to-right character matching',
    }),
    (0, swagger_1.ApiParam)({
        name: 'code',
        description: 'Postal code to search for',
        example: '021648',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Best matching locality',
        type: locality_dto_1.LocalityDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No similar locality found' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalityController.prototype, "getByPostalCodeSimilarity", null);
__decorate([
    (0, common_1.Get)('county/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all localities in a specific county' }),
    (0, swagger_1.ApiParam)({
        name: 'code',
        description: 'County code',
        example: 'IF',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of localities in the county',
        type: [locality_dto_1.LocalityDto],
    }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocalityController.prototype, "getLocalitiesByCounty", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get total number of localities with optional filters',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Search filter',
        example: 'buc',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'county',
        required: false,
        description: 'County filter',
        example: 'IF',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Localities count',
        type: common_dto_1.CountResponseDto,
    }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('county')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LocalityController.prototype, "getLocalitiesCount", null);
__decorate([
    (0, common_1.Get)('nearest/coordinates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find nearest locality by coordinates' }),
    (0, swagger_1.ApiQuery)({
        name: 'lat',
        required: true,
        description: 'Latitude coordinate',
        example: '44.4267674',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'lng',
        required: true,
        description: 'Longitude coordinate',
        example: '26.1025384',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nearest locality',
        type: locality_dto_1.LocalityDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid coordinates' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No localities found' }),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LocalityController.prototype, "getNearestLocality", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get locality by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Locality ID',
        example: '1',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Locality details',
        type: locality_dto_1.LocalityDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Locality not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocalityController.prototype, "getLocalityById", null);
exports.LocalityController = LocalityController = __decorate([
    (0, swagger_1.ApiTags)('localities'),
    (0, common_1.Controller)('localities'),
    __metadata("design:paramtypes", [locality_service_1.LocalityService])
], LocalityController);
//# sourceMappingURL=locality.controller.js.map