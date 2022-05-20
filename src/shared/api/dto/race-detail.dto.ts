export type RacesResponseDto = Readonly<{
    readonly status: string;
    readonly race: RaceDto;
}>;

export type RaceDto = Readonly<{
   readonly length: number;
}>;