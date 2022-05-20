import { ApiService } from '@/shared/api';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
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
    let pegas = await this.apiService.fetchUserOwnedPegas(playerAddress);
    pegas = pegas.slice(0, 10);
    const documents = await Promise.all(
      pegas.map((pega) =>
        this.mapDocument(pega, visRate, currency, playerAddress),
      ),
    );
    return documents;
  }
  async mapDocument(pega, visRate, currency, playerAddress) {
    let date;
    let raceId = 0;
    let position = 0;
    let earned = 0;
    const pegaRaceResultSet = await this.apiService.fetchPegaRaceHistory(
      pega.id,
    );
    delete pegaRaceResultSet['status'];
    if (pegaRaceResultSet) {
      for (const key of Object.keys(pegaRaceResultSet)) {
        let result = pegaRaceResultSet[key];
        let arr = Object.entries(result);
        if (arr.length === 0) {
          console.log('Here');
        } else {
          for (const key of Object.keys(result)) {
            const data = result[key];
            let dt = data.updatedAt.substr(0, 10);
            let tm = data.updatedAt.substr(11, 5);
            date = dt + ' ' + tm;
            raceId = data.raceId;
            position = data.position;
            earned = data.reward;
          }
        }
      }
    }
    const updatedDocument: RaceDocument = {
      raceDate: date,
      raceId,
      position,
      earned: earned * visRate,
      class: undefined,
      distance: undefined,
      fiatSymbol: currency.symbol,
      id: '',
      playerAddress,
    };
    console.log(updatedDocument);
    return updatedDocument;
  }
}
