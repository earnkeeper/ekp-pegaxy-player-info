import { ApiService } from '@/shared/api';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import moment from 'moment';
import { PlayerDocument } from './ui/player.document';

@Injectable()
export class PlayersService {
  constructor(
    private apiService: ApiService,
    private coingeckoService: CoingeckoService,
  ) {}

  async fetchDocuments(
    currency: CurrencyDto,
    playersForm?: any,
  ): Promise<PlayerDocument[]> {
    const coinRates = await this.coingeckoService.latestPricesOf(
      ['vigorus'],
      currency.id,
    );
    const visRate = coinRates.find((it) => it.coinId === 'vigorus')?.price;

    return _.chain(playersForm)
      .map(async (record: any) => {
        const [playerAssets, playerEarnings] = await Promise.all([
          this.apiService.fetchUserAssets(record.address),
          this.apiService.fetchUserEarnings(record.address),
        ]);

        const earnedVis =
          playerEarnings.ownRacedVis +
          playerEarnings.renteeVisShare +
          playerEarnings.fixedRenterVis;

        const earnedVisFiat = earnedVis * visRate;

        return {
          id: record.address,
          updated: moment().unix(),
          address: record.address,
          pegasOwned: playerAssets.pega,
          earnedVis,
          earnedVisFiat,
          fiatSymbol: currency.symbol,
        };
      })
      .thru((promises) => Promise.all(promises))
      .value();
  }
}
