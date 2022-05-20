export type PegaRaceHistoryResponseDto = Readonly<{
  readonly status: string;
  readonly data: PegaRaceHistoryDto[];
}>;

export type PegaRaceHistoryDto = Readonly<{
  id: number;
  position: number;
  reward: number;
  raceId: number;
  updatedAt: string;
}>;
