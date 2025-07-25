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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalitiesResponseDto = exports.LocalityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LocalityDto {
    nume;
    diacritice;
    judet;
    auto;
    zip;
    populatie;
    lat;
    lng;
    altitude;
}
exports.LocalityDto = LocalityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locality name', example: 'Buftea' }),
    __metadata("design:type", String)
], LocalityDto.prototype, "nume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Locality name with diacritics',
        example: 'Buftea',
    }),
    __metadata("design:type", String)
], LocalityDto.prototype, "diacritice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County name', example: 'Ilfov' }),
    __metadata("design:type", String)
], LocalityDto.prototype, "judet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County code', example: 'IF' }),
    __metadata("design:type", String)
], LocalityDto.prototype, "auto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code', example: '70000' }),
    __metadata("design:type", String)
], LocalityDto.prototype, "zip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Population', example: 19202 }),
    __metadata("design:type", Number)
], LocalityDto.prototype, "populatie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude coordinate', example: '44.5629744' }),
    __metadata("design:type", String)
], LocalityDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude coordinate', example: '25.9388214' }),
    __metadata("design:type", String)
], LocalityDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Altitude in meters', example: '85' }),
    __metadata("design:type", String)
], LocalityDto.prototype, "altitude", void 0);
class LocalitiesResponseDto {
    data;
    total;
    limit;
    offset;
}
exports.LocalitiesResponseDto = LocalitiesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LocalityDto], description: 'Array of localities' }),
    __metadata("design:type", Array)
], LocalitiesResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of results', example: 1523 }),
    __metadata("design:type", Number)
], LocalitiesResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of results per page', example: 100 }),
    __metadata("design:type", Number)
], LocalitiesResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of skipped results', example: 0 }),
    __metadata("design:type", Number)
], LocalitiesResponseDto.prototype, "offset", void 0);
//# sourceMappingURL=locality.dto.js.map