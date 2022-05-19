export type PegaRaceHistoryDto = Readonly<{
  readonly id: number;
  readonly position: number;
  readonly reward: number;
  readonly raceId: number;
  readonly updatedAt: Date;
}>;
