import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class RaceDocument extends DocumentDto {
  constructor(properties: RaceDocument) {
    super(properties);
  }
  readonly class: number;
  readonly distance: number;
  readonly earned: number;
  readonly earnedFiat: number;
  readonly fiatSymbol: string;
  readonly playerAddress: string;
  readonly position: number;
  readonly timestamp: number;
}
