import { MarketBuy, MarketBuyRepository } from '@/shared/db';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import moment from 'moment';
import { MarketBuyDocument } from './ui/market-buys.document';

@Injectable()
export class MarketBuysService {
  constructor(private marketBuyRepository: MarketBuyRepository) {}

  async fetchMarketDocument(
    currency: CurrencyDto,
  ): Promise<MarketBuyDocument[]> {
    const results = await this.marketBuyRepository.findAll(100);

    return this.mapToDocuments(results, currency);
  }

  mapToDocuments(
    results: MarketBuy[],
    currency: CurrencyDto,
  ): MarketBuyDocument[] {
    const now = moment().unix();

    return _.chain(results)
      .map((result) => {
        const document: MarketBuyDocument = {
          buyer: result.buyer_address,
          fiatSymbol: currency.symbol,
          id: result.id,
          pegaId: result.pega_token_id,
          pegaName: '',
          priceFiat: result.price,
          timestamp: result.created.getTime() / 1000,
          updated: now,
        };

        return document;
      })
      .value();
  }
}
