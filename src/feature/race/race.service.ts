import { ApiService } from '@/shared/api';
import { PlayerPegaDto } from '@/shared/api/dto/player-pega.dto';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import moment from 'moment';
import { RaceDocument } from './ui/race.document';

@Injectable()
export class RaceService {
  constructor(
    private apiService: ApiService,
    private coingeckoService: CoingeckoService,
  ) {}

  async fetchDocuments(
    currency: CurrencyDto,
    playerAddress: string,
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
        this.mapDocumentsForPega(pega, visRate, currency, playerAddress),
      ),
    );

    return _.flatMap(Promise.all(documents));
  }

  async mapDocumentsForPega(
    pega: PlayerPegaDto,
    visRate: number,
    currency: CurrencyDto,
    playerAddress: string,
  ) {
    const response = await this.apiService.fetchPegaRaceHistory(pega.id);
    const raceHistoryDtos = response.data;

    const pegaInfo = await this.apiService.fetchPegaGameDetail(pega.id);
    const pegaClass = pegaInfo.class;
    console.log(pegaClass);
    const raceDocuments = raceHistoryDtos.map(async (dto) => {
      const racesResponse = await this.apiService.fetchRaceDetail(dto.id);
      const distance = racesResponse.race.length;
      const document: RaceDocument = {
        class: pegaClass,
        distance,
        earned: dto.reward,
        earnedFiat: dto.reward * visRate,
        fiatSymbol: currency.symbol,
        id: `${dto.id}`,
        playerAddress,
        position: dto.position,
        timestamp: moment(dto.updatedAt).unix(),
      };
      return document;
    });
    return raceDocuments;
  }
}
