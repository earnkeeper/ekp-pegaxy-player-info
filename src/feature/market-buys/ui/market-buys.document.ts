import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class MarketBuyDocument extends DocumentDto {
  constructor(properties: MarketBuyDocument) {
    super(properties);
  }

  readonly buyer: string;
  readonly fiatSymbol: string;
  readonly pegaId: number;
  readonly pegaName: string;
  readonly priceFiat: number;
  readonly timestamp: number;
  readonly pegaAvatarId: string;
}
