import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class PlayerInfoDocument extends DocumentDto {
  constructor(properties: PlayerInfoDocument) {
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
