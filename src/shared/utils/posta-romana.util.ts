import axios from 'axios';
import * as cheerio from 'cheerio';

export interface PostaRomanaResponse {
  code: string;
  county: string;
  locality: string;
  streetAddress: string;
  postalSubunit: string;
}

export class PostaRomanaUtil {
  private static readonly API_URL =
    'https://www.posta-romana.ro/cnpr-app/modules/cauta-cod-postal/ajax/cautare_cod.php';

  static async fetchPostalCode(
    postalCode: string,
  ): Promise<PostaRomanaResponse | null> {
    try {
      console.log(`Fetching postal code ${postalCode} from posta-romana.ro`);

      const payload = new URLSearchParams({
        k_cod_postal: postalCode,
        k_lang: 'ro',
      });

      const response = await axios.post(this.API_URL, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Referer: 'https://www.posta-romana.ro/',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        timeout: 10000,
      });

      if (response.data && response.data.found === 1) {
        return this.parsePostalCodeResponse(response.data.formular, postalCode);
      }

      console.log(`Postal code ${postalCode} not found in posta-romana.ro`);
      return null;
    } catch (error) {
      console.error(
        `Error fetching postal code ${postalCode} from posta-romana.ro:`,
        error.message,
      );
      return null;
    }
  }

  private static parsePostalCodeResponse(
    html: string,
    postalCode: string,
  ): PostaRomanaResponse | null {
    try {
      const $ = cheerio.load(html);

      // Extract data from the HTML structure
      const columns = $('.col-md-2, .col-md-3')
        .map((_, element) => {
          return $(element).find('p').text().trim();
        })
        .get();

      if (columns.length >= 4) {
        // Parse postal subunit from the link text
        const postalSubunitElement = $('.col-md-2.txtaC a');
        const postalSubunit =
          postalSubunitElement.length > 0
            ? postalSubunitElement.text().trim()
            : '';

        const result: PostaRomanaResponse = {
          code: postalCode,
          county: columns[1] || '',
          locality: columns[2] || '',
          streetAddress: columns[3] || '',
          postalSubunit: postalSubunit,
        };

        console.log(
          `Successfully parsed postal code data for ${postalCode}:`,
          result,
        );
        return result;
      }

      console.log(`Could not parse postal code data for ${postalCode}`);
      return null;
    } catch (error) {
      console.error(
        `Error parsing postal code response for ${postalCode}:`,
        error.message,
      );
      return null;
    }
  }
}
