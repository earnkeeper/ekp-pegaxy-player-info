import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class RaceDocument extends DocumentDto {
  constructor(properties: RaceDocument) {
    super(properties);
  }
  readonly raceDate: Date;
  readonly raceId: number;
  readonly position: number;
  readonly earned: number;
  readonly class: number;
  readonly distance: number;
  readonly fiatSymbol: string;
}
