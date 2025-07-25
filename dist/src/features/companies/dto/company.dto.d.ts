export declare class CompanyRequestDto {
    cui: number;
    data: string;
}
export declare class DateGeneraleDto {
    data?: string;
    cui?: number;
    denumire?: string;
    adresa?: string;
    telefon?: string;
    fax?: string;
    codPostal?: string;
    act?: string;
    stare_inregistrare?: string;
    data_inreg_Reg_RO_e_Factura?: string;
    organFiscalCompetent?: string;
    forma_de_proprietate?: string;
    forma_organizare?: string;
    forma_juridica?: string;
    nrRegCom?: string;
    cod_CAEN?: string;
    iban?: string;
    statusRO_e_Factura?: boolean;
    data_inregistrare?: string;
}
export declare class AdresaSediuSocialDto {
    stara?: string;
    sdenumire_Localitate?: string;
    sdenumire_Strada?: string;
    snumar_Strada?: string;
    scod_Localitate?: string;
    sdenumire_Judet?: string;
    scod_Judet?: string;
    scod_JudetAuto?: string;
    sdetalii_Adresa?: string;
    scod_Postal?: string;
}
export declare class AdresaDomiciliuFiscalDto {
    dtara?: string;
    ddenumire_Localitate?: string;
    dnumar_Strada?: string;
    ddenumire_Strada?: string;
    dcod_Localitate?: string;
    ddenumire_Judet?: string;
    dcod_Judet?: string;
    dcod_JudetAuto?: string;
    ddetalii_Adresa?: string;
    dcod_Postal?: string;
}
export declare class CompanyDto {
    id: number;
    cui: number;
    date_generale: DateGeneraleDto;
    adresa_sediu_social: AdresaSediuSocialDto;
    adresa_domiciliu_fiscal: AdresaDomiciliuFiscalDto;
    createdAt: Date;
    updatedAt: Date;
}
export declare class AnafCompanyFoundDto {
    date_generale: DateGeneraleDto;
    adresa_sediu_social: AdresaSediuSocialDto;
    adresa_domiciliu_fiscal: AdresaDomiciliuFiscalDto;
}
export declare class AnafApiResponseDto {
    found: AnafCompanyFoundDto[];
    notFound: number[];
}
