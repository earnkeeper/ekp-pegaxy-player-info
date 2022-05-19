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
    const userOwnedPegas = await this.apiService.fetchUserOwnedPegas(
      playerAddress,
    );
    let date;
    let raceId = 0;
    let position = 0;
    let earned = 0;

    const promiseDocuments: Promise<RaceDocument>[] = userOwnedPegas.map(
      async (pega) => {
        const pegaRaceResultSet = await this.apiService.fetchPegaRaceHistory(
          pega.id,
        );
        if (pegaRaceResultSet) {
          for (const key of Object.keys(pegaRaceResultSet)) {
            const result = pegaRaceResultSet[key];
            if (Array.isArray(result)) {
              for (const key of Object.keys(result)) {
                const data = result[key];
                date = data.updatedAt.match(/.{1,10}/g) || [];
                raceId = data.raceId;
                position = data.position;
                earned = data.reward;
              }
            }
          }
        }

        const updatedDocument: RaceDocument = {
          raceDate: date[0],
          raceId,
          position,
          earned: earned * visRate,
          class: undefined,
          distance: date[1],
          fiatSymbol: currency.symbol,
          id: '',
        };
        return updatedDocument;
      },
    );
    const updatedDocuments: any = await Promise.all(promiseDocuments);
    console.log(updatedDocuments);
    return updatedDocuments;
  }
}
