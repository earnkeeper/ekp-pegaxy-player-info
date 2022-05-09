import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class MarketBuysDocument extends DocumentDto {
  constructor(properties: MarketBuysDocument) {
    super(properties);
  }

  readonly id: string;
  readonly created: Date;
  readonly updated_at: Date;
  readonly buyer_address: string;
  readonly price: string;
  readonly price_coin_id: string;
  readonly pega_token_id: string;
}
