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
exports.AnafApiResponseDto = exports.AnafCompanyFoundDto = exports.CompanyDto = exports.AdresaDomiciliuFiscalDto = exports.AdresaSediuSocialDto = exports.DateGeneraleDto = exports.CompanyRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CompanyRequestDto {
    cui;
    data;
}
exports.CompanyRequestDto = CompanyRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company CUI', example: 15687833 }),
    __metadata("design:type", Number)
], CompanyRequestDto.prototype, "cui", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date for query (YYYY-MM-DD format)',
        example: '2025-07-24',
    }),
    __metadata("design:type", String)
], CompanyRequestDto.prototype, "data", void 0);
class DateGeneraleDto {
    data;
    cui;
    denumire;
    adresa;
    telefon;
    fax;
    codPostal;
    act;
    stare_inregistrare;
    data_inreg_Reg_RO_e_Factura;
    organFiscalCompetent;
    forma_de_proprietate;
    forma_organizare;
    forma_juridica;
    nrRegCom;
    cod_CAEN;
    iban;
    statusRO_e_Factura;
    data_inregistrare;
}
exports.DateGeneraleDto = DateGeneraleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Query date', example: '2025-07-24' }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company CUI', example: 15687833 }),
    __metadata("design:type", Number)
], DateGeneraleDto.prototype, "cui", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Company name',
        example: 'ALMA Instal Pro S.R.L.',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "denumire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Company address',
        example: 'MUNICIPIUL BUCUREŞTI, SECTOR 2, STR. DIMITRIE MARINESCU, NR.32',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "adresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number', example: '2421776' }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "telefon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fax number', example: '' }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "fax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code', example: '50594' }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "codPostal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Act', example: '' }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "act", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Registration status',
        example: 'INREGISTRAT din data 22.08.2003',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "stare_inregistrare", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'RO e-Invoice registration date',
        example: '2024-08-01',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "data_inreg_Reg_RO_e_Factura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Competent fiscal authority',
        example: 'Administraţia Sector 2 a Finanţelor Publice',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "organFiscalCompetent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ownership form',
        example: 'PROPR.PRIVATA-CAPITAL PRIVAT AUTOHTON',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "forma_de_proprietate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Organization form',
        example: 'PERSOANA JURIDICA',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "forma_organizare", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Legal form',
        example: 'SOCIETATE COMERCIALĂ CU RĂSPUNDERE LIMITATĂ',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "forma_juridica", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Commercial registry number',
        example: 'J40/11432/2003',
    }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "nrRegCom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CAEN code', example: '7112' }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "cod_CAEN", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IBAN', example: '' }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "iban", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'RO e-Invoice status', example: true }),
    __metadata("design:type", Boolean)
], DateGeneraleDto.prototype, "statusRO_e_Factura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Registration date', example: '2003-08-22' }),
    __metadata("design:type", String)
], DateGeneraleDto.prototype, "data_inregistrare", void 0);
class AdresaSediuSocialDto {
    stara;
    sdenumire_Localitate;
    sdenumire_Strada;
    snumar_Strada;
    scod_Localitate;
    sdenumire_Judet;
    scod_Judet;
    scod_JudetAuto;
    sdetalii_Adresa;
    scod_Postal;
}
exports.AdresaSediuSocialDto = AdresaSediuSocialDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country', example: '' }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "stara", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Locality name',
        example: 'Sector 2 Mun. Bucureşti',
    }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "sdenumire_Localitate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Street name',
        example: 'Str. Dimitrie Marinescu',
    }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "sdenumire_Strada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Street number', example: '32' }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "snumar_Strada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locality code', example: '2' }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "scod_Localitate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County name', example: 'MUNICIPIUL BUCUREŞTI' }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "sdenumire_Judet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County code', example: '40' }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "scod_Judet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County auto code', example: 'B' }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "scod_JudetAuto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address details', example: '' }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "sdetalii_Adresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code', example: '50594' }),
    __metadata("design:type", String)
], AdresaSediuSocialDto.prototype, "scod_Postal", void 0);
class AdresaDomiciliuFiscalDto {
    dtara;
    ddenumire_Localitate;
    dnumar_Strada;
    ddenumire_Strada;
    dcod_Localitate;
    ddenumire_Judet;
    dcod_Judet;
    dcod_JudetAuto;
    ddetalii_Adresa;
    dcod_Postal;
}
exports.AdresaDomiciliuFiscalDto = AdresaDomiciliuFiscalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Country', example: '' }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "dtara", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Locality name',
        example: 'Sector 2 Mun. Bucureşti',
    }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "ddenumire_Localitate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Street number', example: '32' }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "dnumar_Strada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Street name',
        example: 'Str. Dimitrie Marinescu',
    }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "ddenumire_Strada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locality code', example: '2' }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "dcod_Localitate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County name', example: 'MUNICIPIUL BUCUREŞTI' }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "ddenumire_Judet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County code', example: '40' }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "dcod_Judet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'County auto code', example: 'B' }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "dcod_JudetAuto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address details', example: '' }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "ddetalii_Adresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Postal code', example: '50594' }),
    __metadata("design:type", String)
], AdresaDomiciliuFiscalDto.prototype, "dcod_Postal", void 0);
class CompanyDto {
    id;
    cui;
    date_generale;
    adresa_sediu_social;
    adresa_domiciliu_fiscal;
    createdAt;
    updatedAt;
}
exports.CompanyDto = CompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company ID' }),
    __metadata("design:type", Number)
], CompanyDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Company CUI', example: 15687833 }),
    __metadata("design:type", Number)
], CompanyDto.prototype, "cui", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'General company data', type: DateGeneraleDto }),
    __metadata("design:type", DateGeneraleDto)
], CompanyDto.prototype, "date_generale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Registered office address',
        type: AdresaSediuSocialDto,
    }),
    __metadata("design:type", AdresaSediuSocialDto)
], CompanyDto.prototype, "adresa_sediu_social", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fiscal domicile address',
        type: AdresaDomiciliuFiscalDto,
    }),
    __metadata("design:type", AdresaDomiciliuFiscalDto)
], CompanyDto.prototype, "adresa_domiciliu_fiscal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at timestamp' }),
    __metadata("design:type", Date)
], CompanyDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at timestamp' }),
    __metadata("design:type", Date)
], CompanyDto.prototype, "updatedAt", void 0);
class AnafCompanyFoundDto {
    date_generale;
    adresa_sediu_social;
    adresa_domiciliu_fiscal;
}
exports.AnafCompanyFoundDto = AnafCompanyFoundDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'General company data', type: DateGeneraleDto }),
    __metadata("design:type", DateGeneraleDto)
], AnafCompanyFoundDto.prototype, "date_generale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Registered office address',
        type: AdresaSediuSocialDto,
    }),
    __metadata("design:type", AdresaSediuSocialDto)
], AnafCompanyFoundDto.prototype, "adresa_sediu_social", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fiscal domicile address',
        type: AdresaDomiciliuFiscalDto,
    }),
    __metadata("design:type", AdresaDomiciliuFiscalDto)
], AnafCompanyFoundDto.prototype, "adresa_domiciliu_fiscal", void 0);
class AnafApiResponseDto {
    found;
    notFound;
}
exports.AnafApiResponseDto = AnafApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Found companies', type: [AnafCompanyFoundDto] }),
    __metadata("design:type", Array)
], AnafApiResponseDto.prototype, "found", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Not found CUIs', type: [Number] }),
    __metadata("design:type", Array)
], AnafApiResponseDto.prototype, "notFound", void 0);
//# sourceMappingURL=company.dto.js.map