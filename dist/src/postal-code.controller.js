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
exports.PostalCodeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const postal_code_service_1 = require("./postal-code.service");
const postal_code_dto_1 = require("./dto/postal-code.dto");
let PostalCodeController = class PostalCodeController {
    postalCodeService;
    constructor(postalCodeService) {
        this.postalCodeService = postalCodeService;
    }
    async getPostalCodeByCode(code) {
        return this.postalCodeService.getPostalCodeByCode(code);
    }
};
exports.PostalCodeController = PostalCodeController;
__decorate([
    (0, common_1.Get)(':code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get postal code details by postal code' }),
    (0, swagger_1.ApiParam)({
        name: 'code',
        description: 'Postal code (6 digits)',
        example: '010011',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Postal code details',
        type: postal_code_dto_1.PostalCodeDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Postal code not found' }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostalCodeController.prototype, "getPostalCodeByCode", null);
exports.PostalCodeController = PostalCodeController = __decorate([
    (0, swagger_1.ApiTags)('postal-codes'),
    (0, common_1.Controller)('postal-codes'),
    __metadata("design:paramtypes", [postal_code_service_1.PostalCodeService])
], PostalCodeController);
//# sourceMappingURL=postal-code.controller.js.map