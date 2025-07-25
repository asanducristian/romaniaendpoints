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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma.service");
let CompanyService = class CompanyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCompanyByCui(cui, data) {
        const existingCompany = await this.prisma.company.findUnique({
            where: { cui },
        });
        if (existingCompany) {
            return this.formatCompanyFromDb(existingCompany);
        }
        const anafData = await this.fetchFromAnafApi(cui, data);
        if (anafData.found.length === 0) {
            throw new common_1.NotFoundException(`Company with CUI '${cui}' not found`);
        }
        const companyData = anafData.found[0];
        const savedCompany = await this.saveCompanyToDb(cui, companyData);
        return this.formatCompanyFromDb(savedCompany);
    }
    async fetchFromAnafApi(cui, data) {
        try {
            const requestBody = [{ cui, data }];
            const response = await fetch('https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new common_1.HttpException(`ANAF API error: ${response.status} ${response.statusText}`, common_1.HttpStatus.BAD_GATEWAY);
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to fetch company data from ANAF API', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async saveCompanyToDb(cui, companyData) {
        const { date_generale, adresa_sediu_social, adresa_domiciliu_fiscal } = companyData;
        return await this.prisma.company.create({
            data: {
                cui,
                data: date_generale.data,
                denumire: date_generale.denumire,
                adresa: date_generale.adresa,
                telefon: date_generale.telefon,
                fax: date_generale.fax,
                codPostal: date_generale.codPostal,
                act: date_generale.act,
                stare_inregistrare: date_generale.stare_inregistrare,
                data_inreg_Reg_RO_e_Factura: date_generale.data_inreg_Reg_RO_e_Factura,
                organFiscalCompetent: date_generale.organFiscalCompetent,
                forma_de_proprietate: date_generale.forma_de_proprietate,
                forma_organizare: date_generale.forma_organizare,
                forma_juridica: date_generale.forma_juridica,
                nrRegCom: date_generale.nrRegCom,
                cod_CAEN: date_generale.cod_CAEN,
                iban: date_generale.iban,
                statusRO_e_Factura: date_generale.statusRO_e_Factura,
                data_inregistrare: date_generale.data_inregistrare,
                s_tara: adresa_sediu_social.stara,
                s_denumire_Localitate: adresa_sediu_social.sdenumire_Localitate,
                s_denumire_Strada: adresa_sediu_social.sdenumire_Strada,
                s_numar_Strada: adresa_sediu_social.snumar_Strada,
                s_cod_Localitate: adresa_sediu_social.scod_Localitate,
                s_denumire_Judet: adresa_sediu_social.sdenumire_Judet,
                s_cod_Judet: adresa_sediu_social.scod_Judet,
                s_cod_JudetAuto: adresa_sediu_social.scod_JudetAuto,
                s_detalii_Adresa: adresa_sediu_social.sdetalii_Adresa,
                s_cod_Postal: adresa_sediu_social.scod_Postal,
                d_tara: adresa_domiciliu_fiscal.dtara,
                d_denumire_Localitate: adresa_domiciliu_fiscal.ddenumire_Localitate,
                d_numar_Strada: adresa_domiciliu_fiscal.dnumar_Strada,
                d_denumire_Strada: adresa_domiciliu_fiscal.ddenumire_Strada,
                d_cod_Localitate: adresa_domiciliu_fiscal.dcod_Localitate,
                d_denumire_Judet: adresa_domiciliu_fiscal.ddenumire_Judet,
                d_cod_Judet: adresa_domiciliu_fiscal.dcod_Judet,
                d_cod_JudetAuto: adresa_domiciliu_fiscal.dcod_JudetAuto,
                d_detalii_Adresa: adresa_domiciliu_fiscal.ddetalii_Adresa,
                d_cod_Postal: adresa_domiciliu_fiscal.dcod_Postal,
            },
        });
    }
    formatCompanyFromDb(company) {
        return {
            id: company.id,
            cui: company.cui,
            date_generale: {
                data: company.data,
                cui: company.cui,
                denumire: company.denumire,
                adresa: company.adresa,
                telefon: company.telefon,
                fax: company.fax,
                codPostal: company.codPostal,
                act: company.act,
                stare_inregistrare: company.stare_inregistrare,
                data_inreg_Reg_RO_e_Factura: company.data_inreg_Reg_RO_e_Factura,
                organFiscalCompetent: company.organFiscalCompetent,
                forma_de_proprietate: company.forma_de_proprietate,
                forma_organizare: company.forma_organizare,
                forma_juridica: company.forma_juridica,
                nrRegCom: company.nrRegCom,
                cod_CAEN: company.cod_CAEN,
                iban: company.iban,
                statusRO_e_Factura: company.statusRO_e_Factura,
                data_inregistrare: company.data_inregistrare,
            },
            adresa_sediu_social: {
                stara: company.s_tara,
                sdenumire_Localitate: company.s_denumire_Localitate,
                sdenumire_Strada: company.s_denumire_Strada,
                snumar_Strada: company.s_numar_Strada,
                scod_Localitate: company.s_cod_Localitate,
                sdenumire_Judet: company.s_denumire_Judet,
                scod_Judet: company.s_cod_Judet,
                scod_JudetAuto: company.s_cod_JudetAuto,
                sdetalii_Adresa: company.s_detalii_Adresa,
                scod_Postal: company.s_cod_Postal,
            },
            adresa_domiciliu_fiscal: {
                dtara: company.d_tara,
                ddenumire_Localitate: company.d_denumire_Localitate,
                dnumar_Strada: company.d_numar_Strada,
                ddenumire_Strada: company.d_denumire_Strada,
                dcod_Localitate: company.d_cod_Localitate,
                ddenumire_Judet: company.d_denumire_Judet,
                dcod_Judet: company.d_cod_Judet,
                dcod_JudetAuto: company.d_cod_JudetAuto,
                ddetalii_Adresa: company.d_detalii_Adresa,
                dcod_Postal: company.d_cod_Postal,
            },
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
        };
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompanyService);
//# sourceMappingURL=company.service.js.map