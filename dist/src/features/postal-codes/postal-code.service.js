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
exports.PostalCodeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma.service");
const posta_romana_util_1 = require("../../shared/utils/posta-romana.util");
let PostalCodeService = class PostalCodeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPostalCodeByCode(code) {
        const postalCode = await this.prisma.postalCode.findUnique({
            where: { code: code },
        });
        let result;
        if (postalCode) {
            const locality = await this.findMatchingLocality(postalCode.locality, postalCode.county);
            result = {
                code: postalCode.code,
                county: postalCode.county,
                locality: postalCode.locality,
                streetAddress: postalCode.streetAddress,
                postalSubunit: postalCode.postalSubunit,
                lat: locality?.lat,
                lng: locality?.lng,
                auto: locality?.auto,
                localityDiacritice: locality?.diacritice,
                localityZip: locality?.zip,
                populatie: locality?.populatie,
                altitude: locality?.altitude,
            };
        }
        else {
            console.log(`Postal code '${code}' not found in database, fetching from posta-romana.ro`);
            const externalData = await posta_romana_util_1.PostaRomanaUtil.fetchPostalCode(code);
            if (externalData) {
                try {
                    const newPostalCode = await this.prisma.postalCode.create({
                        data: {
                            code: externalData.code,
                            county: externalData.county,
                            locality: externalData.locality,
                            streetAddress: externalData.streetAddress,
                            postalSubunit: externalData.postalSubunit,
                        },
                    });
                    console.log(`Successfully saved postal code '${code}' to database`);
                    const locality = await this.findMatchingLocality(newPostalCode.locality, newPostalCode.county);
                    result = {
                        code: newPostalCode.code,
                        county: newPostalCode.county,
                        locality: newPostalCode.locality,
                        streetAddress: newPostalCode.streetAddress,
                        postalSubunit: newPostalCode.postalSubunit,
                        lat: locality?.lat,
                        lng: locality?.lng,
                        auto: locality?.auto,
                        localityDiacritice: locality?.diacritice,
                        localityZip: locality?.zip,
                        populatie: locality?.populatie,
                        altitude: locality?.altitude,
                    };
                }
                catch (error) {
                    console.error(`Error saving postal code '${code}' to database:`, error.message);
                    const locality = await this.findMatchingLocality(externalData.locality, externalData.county);
                    result = {
                        code: externalData.code,
                        county: externalData.county,
                        locality: externalData.locality,
                        streetAddress: externalData.streetAddress,
                        postalSubunit: externalData.postalSubunit,
                        lat: locality?.lat,
                        lng: locality?.lng,
                        auto: locality?.auto,
                        localityDiacritice: locality?.diacritice,
                        localityZip: locality?.zip,
                        populatie: locality?.populatie,
                        altitude: locality?.altitude,
                    };
                }
            }
            else {
                throw new common_1.NotFoundException(`Postal code '${code}' not found in database or external service`);
            }
        }
        return result;
    }
    async findMatchingLocality(localityName, countyName) {
        let locality = await this.prisma.locality.findFirst({
            where: {
                AND: [
                    {
                        OR: [{ diacritice: localityName }, { nume: localityName }],
                    },
                    { judet: countyName },
                ],
            },
            select: {
                diacritice: true,
                nume: true,
                judet: true,
                auto: true,
                zip: true,
                populatie: true,
                lat: true,
                lng: true,
                altitude: true,
            },
        });
        if (!locality) {
            locality = await this.prisma.locality.findFirst({
                where: {
                    OR: [{ diacritice: localityName }, { nume: localityName }],
                },
                select: {
                    diacritice: true,
                    nume: true,
                    judet: true,
                    auto: true,
                    zip: true,
                    populatie: true,
                    lat: true,
                    lng: true,
                    altitude: true,
                },
            });
        }
        return locality;
    }
};
exports.PostalCodeService = PostalCodeService;
exports.PostalCodeService = PostalCodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostalCodeService);
//# sourceMappingURL=postal-code.service.js.map