import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class MarketHistoryDocument extends DocumentDto {
  constructor(properties: MarketHistoryDocument) {
    super(properties);
  }

  readonly breedType: string;
  readonly buyer: string;
  readonly class: number;
  readonly bloodline: string;
  readonly fiatSymbol: string;
  readonly gender: string;
  readonly pegaAvatarId1: string;
  readonly pegaAvatarId2: string;
  readonly pegaId: number;
  readonly pegaName: string;
  readonly priceFiat: number;
  readonly timestamp: number;
}
