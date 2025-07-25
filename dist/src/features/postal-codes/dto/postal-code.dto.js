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
exports.PostalCodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PostalCodeDto {
    code;
    county;
    locality;
    streetAddress;
    postalSubunit;
    lat;
    lng;
    auto;
    localityDiacritice;
    localityZip;
    populatie;
    altitude;
}
exports.PostalCodeDto = PostalCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code', example: '010011' }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County name', example: 'București' }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "county", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locality name', example: 'București' }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "locality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Street address',
        example: 'Strada Academiei nr. 7',
    }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "streetAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal subunit', example: 'București 15' }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "postalSubunit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitude',
        example: '44.4267674',
        required: false,
    }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitude',
        example: '26.1025384',
        required: false,
    }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Auto code',
        example: 'B',
        required: false,
    }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "auto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Locality name with diacritics',
        example: 'București',
        required: false,
    }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "localityDiacritice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Postal code from locality data',
        example: '010011',
        required: false,
    }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "localityZip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Population',
        example: 1716961,
        required: false,
    }),
    __metadata("design:type", Number)
], PostalCodeDto.prototype, "populatie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Altitude in meters',
        example: '85',
        required: false,
    }),
    __metadata("design:type", String)
], PostalCodeDto.prototype, "altitude", void 0);
//# sourceMappingURL=postal-code.dto.js.map