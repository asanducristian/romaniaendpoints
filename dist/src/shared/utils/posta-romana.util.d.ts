export interface PostaRomanaResponse {
    code: string;
    county: string;
    locality: string;
    streetAddress: string;
    postalSubunit: string;
}
export declare class PostaRomanaUtil {
    private static readonly API_URL;
    static fetchPostalCode(postalCode: string): Promise<PostaRomanaResponse | null>;
    private static parsePostalCodeResponse;
}
