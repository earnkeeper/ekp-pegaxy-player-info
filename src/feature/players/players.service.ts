import { ApiService } from '@/shared/api';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _, { forEach } from 'lodash';
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
    let earned = 0;

    //const result2 = await this.apiService.fetchUserEarningsInLast24h(playersForm.address);
    //console.log(playersForm.address)

    return _.chain(playersForm)
      .map(async (record: any) => {
        const [playerAssets, playerEarnings, playerEarningsIn24, playerPegas] =
          await Promise.all([
            this.apiService.fetchUserAssets(record.address),
            this.apiService.fetchUserEarnings(record.address),
            this.apiService.fetchUserEarningsInLast24h(record.address),
            this.apiService.fetchUserOwnedPegas(record.address),
          ]);

        const earnedVis =
          playerEarnings.ownRacedVis +
          playerEarnings.renteeVisShare +
          playerEarnings.fixedRentalPgx;

        let earnedLast24Hours = 0;

        for (let key of Object.keys(playerEarningsIn24)) {
          let result = playerEarningsIn24[key];
          earnedLast24Hours =
            earnedLast24Hours +
            result.ownRacedVis +
            result.renteeVisShare +
            result.fixedRenterVis;
        }

        let marketValue = 0;
        let canRace = 0;
        let canBreed = 0;
        for (let key of Object.keys(playerPegas)) {
          let results = playerPegas[key];

          //check raceability
          if (results.canRaceAt < moment().unix()) {
            canRace = 1;
          }
          //check breedability
          if (results.canBreedAt < moment().unix()) {
            canBreed = 1;
          }

          const marketFloorResultSet = await this.apiService.fetchMarketVaule(
            results.breedType,
            results.gender,
            0,
            7,
            canBreed,
            canRace,
          );
          if (marketFloorResultSet.length > 0) {
            for (let key of Object.keys(marketFloorResultSet)) {
              let r = marketFloorResultSet[key];
              marketValue = marketValue + r.price;
            }
          }
        }
        console.log('Total Price ' + marketValue);
        const earnedVisFiat = earnedVis * visRate;
        earnedLast24Hours = earnedLast24Hours * visRate;
        marketValue = marketValue * visRate;

        return {
          id: record.address,
          updated: moment().unix(),
          address: record.address,
          earnedLast24Hours,
          pegasOwned: playerAssets.pega,
          earnedVis,
          marketValue,
          earnedVisFiat,
          fiatSymbol: currency.symbol,
        };
      })
      .thru((promises) => Promise.all(promises))
      .value();
  }
  async marketValue() {
    //console.log(results.price);
  }
}
