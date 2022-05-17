import { ApiService, PlayerPegaDto } from '@/shared/api';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { identity } from 'lodash';
import moment from 'moment';
import { PegaDocument } from './ui/pega.document';

@Injectable()
export class PlayerService {
  constructor(
    private apiService: ApiService,
    private coingeckoService: CoingeckoService,
  ) {}

  async fetchDocuments(
    currency: CurrencyDto,
    playerAddress,
  ): Promise<PegaDocument[]> {
    const coinRates = await this.coingeckoService.latestPricesOf(
      ['vigorus'],
      currency.id,
    );
    const visRate = coinRates.find((it) => it.coinId === 'vigorus')?.price;
    let earnedToDate = 0;
    const documents = await this.apiService.fetchUserOwnedPegas(playerAddress);

    const promiseDocuments: PegaDocument[] = documents.map(async (document) => {
      let pegaMarketValue = 0;
      let marketValue = 0;
      let canRace = 0;
      let canBreed = 0;
      let placeRate= ((document.win/document.totalRaces)*100);
      //check raceability
      if (document.canRaceAt < moment().unix()) {
        canRace = 1;
      }
      //check breedability
      if (document.canBreedAt < moment().unix()) {
        canBreed = 1;
      }
      const [earnedToDateResultSet, marketFloorResultSet] = await Promise.all([
        this.apiService.fetchPegaEarnings(document.id),
        this.apiService.fetchMarketVaule(
          document.breedType,
          document.gender,
          0,
          7,
          canBreed,
          canRace,
        ),
      ]);
      if (marketFloorResultSet) {
        for (let key of Object.keys(marketFloorResultSet)) {
          let r = marketFloorResultSet[key];
          pegaMarketValue = r.price;
        }
      }
      if (earnedToDateResultSet) {
        for (let key of Object.keys(earnedToDateResultSet)) {
          let r = earnedToDateResultSet[key];
          earnedToDate =
            earnedToDate + r.ownerPegaRewards + r.renterPegaRewards;
        }
      }

      const updatedDocument: PegaDocument = {
        name: document.name,
        cost: document.lastRenterPrice,
        marketValue: pegaMarketValue,
        placeRate,
        totalRaces: document.totalRaces,
        earned: visRate * earnedToDate,
        pegaId: document.id,
        fiatSymbol: currency.symbol,
        id:''
      };
      return updatedDocument;
    });
    const updatedDocuments: any = await Promise.all(promiseDocuments);

    return updatedDocuments;
  }
}
