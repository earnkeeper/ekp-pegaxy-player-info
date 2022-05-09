import { MarketBuy, MarketBuyRepository } from '@/shared/db';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService, CoinPrice } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import _ from 'lodash';
import moment from 'moment';
import { MarketBuyDocument } from './ui/market-buys.document';

@Injectable()
export class MarketBuysService {
  constructor(
    private marketBuyRepository: MarketBuyRepository,
    private coingeckoService: CoingeckoService,
  ) {}

  async fetchMarketDocument(
    currency: CurrencyDto,
  ): Promise<MarketBuyDocument[]> {
    const results = await this.marketBuyRepository.findAll(100);

    const coinIds = _.chain(results)
      .map((it) => it.price_coin_id)
      .uniq()
      .value();

    const prices = await this.coingeckoService.latestPricesOf(
      coinIds,
      currency.id,
    );

    return this.mapToDocuments(results, currency, prices);
  }

  mapToDocuments(
    results: MarketBuy[],
    currency: CurrencyDto,
    prices: CoinPrice[],
  ): MarketBuyDocument[] {
    const now = moment().unix();

    const decimals = 6;

    return _.chain(results)
      .map((result) => {
        const rate = prices.find(
          (it) => it.coinId === result.price_coin_id,
        )?.price;

        const priceInToken = Number(
          ethers.utils.formatUnits(result.price, decimals),
        );

        const priceFiat = priceInToken * rate;

        const document: MarketBuyDocument = {
          buyer: result.buyer_address,
          fiatSymbol: currency.symbol,
          id: result.id,
          pegaId: result.pega_token_id,
          pegaName: '',
          priceFiat,
          timestamp: result.created.getTime() / 1000,
          updated: now,
        };

        return document;
      })
      .value();
  }
}
