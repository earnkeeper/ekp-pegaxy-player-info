import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class PlayerDocument extends DocumentDto {
  constructor(properties: PlayerDocument) {
    super(properties);
  }

  readonly address: string;
  readonly earnedVisFiat: number;
  readonly earnedVis: number;
  readonly cost: number;
  readonly earnedLast24Hours: number;
  readonly marketValue: number;
  readonly fiatSymbol: string;
  readonly pegasOwned: number;
}
