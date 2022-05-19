import { ApiService, PlayerPegaDto } from '@/shared/api';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _, { result } from 'lodash';
import { RaceDocument } from './ui/race.document';

@Injectable()
export class RaceService {
  constructor(
    private apiService: ApiService,
    private coingeckoService: CoingeckoService,
  ) {}

  async fetchDocuments(
    currency: CurrencyDto,
    playerAddress,
  ): Promise<RaceDocument[]> {
    const coinRates = await this.coingeckoService.latestPricesOf(
      ['vigorus'],
      currency.id,
    );
    const visRate = coinRates.find((it) => it.coinId === 'vigorus')?.price;
    const documents = await this.apiService.fetchUserOwnedPegas(playerAddress);
    let date;
    let raceId= 0;
    let position= 0;
    let earned= 0;  

    const promiseDocuments: RaceDocument[] = documents.map(async (document) => {
      const pegaRaceResultSet  = await this.apiService.fetchPegaRaceHistory(document.id);
      if (pegaRaceResultSet) {
        for (let key of Object.keys(pegaRaceResultSet)) {
          let result = pegaRaceResultSet[key];
          if (Array.isArray(result)){
            for (let key of Object.keys(result)) {
              let data = result[key];
              date= data.updatedAt.match(/.{1,10}/g) || [];
              raceId= data.raceId;
              position= data.position;
              earned= data.reward;
            }
          }
        }
      }
    

      const updatedDocument: RaceDocument = {
        raceDate: date[0],
        raceId,
        position,
        earned: earned* visRate,
        class: document.reward,
        distance: date[1],
        fiatSymbol: currency.symbol,
        id: ''
      };
      return updatedDocument;
    });
    const updatedDocuments: any = await Promise.all(promiseDocuments);
    console.log(updatedDocuments);
    return updatedDocuments;
  }
}
