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
exports.LocalityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let LocalityService = class LocalityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllLocalities() {
        return this.prisma.locality.findMany({
            select: {
                nume: true,
                diacritice: true,
                judet: true,
                auto: true,
                zip: true,
                populatie: true,
                lat: true,
                lng: true,
                altitude: true,
            },
            orderBy: { nume: 'asc' },
        });
    }
    async searchLocalities(filters) {
        const { search, countyCode, limit = 100, offset = 0 } = filters;
        const where = {};
        if (search && search.trim().length > 0) {
            where.OR = [
                {
                    nume: {
                        contains: search.trim(),
                    },
                },
                {
                    diacritice: {
                        contains: search.trim(),
                    },
                },
            ];
        }
        if (countyCode && countyCode.trim().length > 0) {
            where.auto = countyCode.trim().toUpperCase();
        }
        return this.prisma.locality.findMany({
            where,
            select: {
                nume: true,
                diacritice: true,
                judet: true,
                auto: true,
                zip: true,
                populatie: true,
                lat: true,
                lng: true,
                altitude: true,
            },
            orderBy: { nume: 'asc' },
            take: limit,
            skip: offset,
        });
    }
    async getLocalitiesByCounty(countyCode) {
        return this.prisma.locality.findMany({
            where: {
                auto: countyCode.toUpperCase(),
            },
            select: {
                nume: true,
                diacritice: true,
                judet: true,
                auto: true,
                zip: true,
                populatie: true,
                lat: true,
                lng: true,
                altitude: true,
            },
            orderBy: { nume: 'asc' },
        });
    }
    async getLocalitiesCount(filters) {
        const { search, countyCode } = filters || {};
        const where = {};
        if (search && search.trim().length > 0) {
            where.OR = [
                {
                    nume: {
                        contains: search.trim(),
                    },
                },
                {
                    diacritice: {
                        contains: search.trim(),
                    },
                },
            ];
        }
        if (countyCode && countyCode.trim().length > 0) {
            where.auto = countyCode.trim().toUpperCase();
        }
        return this.prisma.locality.count({ where });
    }
    async getLocalityById(id) {
        return this.prisma.locality.findUnique({
            where: { id },
            select: {
                nume: true,
                diacritice: true,
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
    async findByPostalCodeSimilarity(searchPostalCode) {
        const firstChar = searchPostalCode.charAt(0);
        if (!firstChar) {
            return null;
        }
        const localities = await this.prisma.locality.findMany({
            where: {
                zip: {
                    startsWith: firstChar,
                },
            },
            select: {
                nume: true,
                diacritice: true,
                judet: true,
                auto: true,
                zip: true,
                populatie: true,
                lat: true,
                lng: true,
                altitude: true,
            },
        });
        if (localities.length === 0) {
            return null;
        }
        let bestMatch = null;
        let bestScore = 0;
        for (const locality of localities) {
            const score = this.calculateLeftToRightSimilarity(searchPostalCode, locality.zip);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = locality;
            }
        }
        return bestMatch;
    }
    calculateLeftToRightSimilarity(search, target) {
        let score = 0;
        const minLength = Math.min(search.length, target.length);
        for (let i = 0; i < minLength; i++) {
            if (search.charAt(i) === target.charAt(i)) {
                score++;
            }
            else {
                break;
            }
        }
        return score;
    }
    async findNearestLocality(latitude, longitude) {
        const localities = await this.prisma.locality.findMany({
            where: {
                AND: [
                    { lat: { not: '' } },
                    { lng: { not: '' } },
                    { lat: { not: '0' } },
                    { lng: { not: '0' } },
                ],
            },
            select: {
                nume: true,
                diacritice: true,
                judet: true,
                auto: true,
                zip: true,
                populatie: true,
                lat: true,
                lng: true,
                altitude: true,
            },
        });
        if (localities.length === 0) {
            return null;
        }
        let nearestLocality = null;
        let minDistance = Infinity;
        for (const locality of localities) {
            const localityLat = parseFloat(locality.lat);
            const localityLng = parseFloat(locality.lng);
            if (isNaN(localityLat) || isNaN(localityLng)) {
                continue;
            }
            const distance = this.calculateHaversineDistance(latitude, longitude, localityLat, localityLng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestLocality = locality;
            }
        }
        return nearestLocality;
    }
    calculateHaversineDistance(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = this.toRadians(lat2 - lat1);
        const dLng = this.toRadians(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) *
                Math.cos(this.toRadians(lat2)) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
};
exports.LocalityService = LocalityService;
exports.LocalityService = LocalityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocalityService);
//# sourceMappingURL=locality.service.js.map