import { ApiService } from '@/shared/api';
import { PlayerPegaDto } from '@/shared/api/dto/player-pega.dto';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
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
    playerAddress: string,
  ): Promise<PegaDocument[]> {
    const coinRates = await this.coingeckoService.latestPricesOf(
      ['vigorus'],
      currency.id,
    );
    const visRate = coinRates.find((it) => it.coinId === 'vigorus')?.price;
    let pegas = await this.apiService.fetchUserOwnedPegas(playerAddress);

    pegas = pegas.slice(0, 10);

    const now = moment().unix();

    const documents = await Promise.all(
      pegas.map((pega) => this.mapDocument(pega, visRate, currency, now)),
    );

    return documents;
  }

  async mapDocument(
    pega: PlayerPegaDto,
    visRate: number,
    currency: CurrencyDto,
    now: number,
  ) {
    let pegaMarketValue = 0;
    let canRace = 0;
    let canBreed = 0;
    let earnedToDate = 0;
    const placeRate = (pega.win / pega.totalRaces) * 100;

    if (pega.canRaceAt < now) {
      canRace = 1;
    }
    if (pega.canBreedAt < now) {
      canBreed = 1;
    }
    const [earnedToDateResultSet, marketFloorResultSet] = await Promise.all([
      this.apiService.fetchPegaEarnings(pega.id),
      this.apiService.fetchMarketVaule(
        pega.breedType,
        pega.gender,
        0,
        7,
        canBreed,
        canRace,
      ),
    ]);
    if (marketFloorResultSet) {
      for (const key of Object.keys(marketFloorResultSet)) {
        const r = marketFloorResultSet[key];
        pegaMarketValue = r.price;
      }
    }
    if (earnedToDateResultSet) {
      for (const key of Object.keys(earnedToDateResultSet)) {
        const r = earnedToDateResultSet[key];
        earnedToDate = earnedToDate + r.ownerPegaRewards + r.renterPegaRewards;
      }
    }
    const updatedDocument: PegaDocument = {
      id: `${pega.id}`,
      updated: now,
      cost: pega.lastRenterPrice,
      earned: visRate * earnedToDate,
      fiatSymbol: currency.symbol,
      marketValue: pegaMarketValue,
      name: pega.name,
      pegaId: pega.id,
      placeRate,
      totalRaces: pega.totalRaces,
    };
    return updatedDocument;
  }
}
