export declare class LocalityDto {
    nume: string;
    diacritice: string;
    judet: string;
    auto: string;
    zip: string;
    populatie: number;
    lat: string;
    lng: string;
    altitude: string;
}
export declare class LocalitiesResponseDto {
    data: LocalityDto[];
    total: number;
    limit: number;
    offset: number;
}
