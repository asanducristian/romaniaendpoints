import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import {
  CompanyDto,
  AnafApiResponseDto,
  AnafCompanyFoundDto,
} from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getCompanyByCui(cui: number, data: string): Promise<CompanyDto> {
    // First, check if the company exists in the database
    const existingCompany = await this.prisma.company.findUnique({
      where: { cui },
    });

    if (existingCompany) {
      return this.formatCompanyFromDb(existingCompany);
    }

    // If not found in DB, fetch from ANAF API
    const anafData = await this.fetchFromAnafApi(cui, data);

    if (anafData.found.length === 0) {
      throw new NotFoundException(`Company with CUI '${cui}' not found`);
    }

    // Save to database and return
    const companyData = anafData.found[0];
    const savedCompany = await this.saveCompanyToDb(cui, companyData);

    return this.formatCompanyFromDb(savedCompany);
  }

  private async fetchFromAnafApi(
    cui: number,
    data: string,
  ): Promise<AnafApiResponseDto> {
    try {
      const requestBody = [{ cui, data }];

      const response = await fetch(
        'https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        throw new HttpException(
          `ANAF API error: ${response.status} ${response.statusText}`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch company data from ANAF API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private async saveCompanyToDb(cui: number, companyData: AnafCompanyFoundDto) {
    const { date_generale, adresa_sediu_social, adresa_domiciliu_fiscal } =
      companyData;

    return await this.prisma.company.create({
      data: {
        cui,
        // Date generale
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

        // Adresa sediu social
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

        // Adresa domiciliu fiscal
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

  private formatCompanyFromDb(company: any): CompanyDto {
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
}
