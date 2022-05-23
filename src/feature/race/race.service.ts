import { ApiService } from '@/shared/api';
import { PlayerPegaDto } from '@/shared/api/dto/player-pega.dto';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { CoingeckoService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import _, { result } from 'lodash';
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

    return _.flatMap(documents);
  }

  async mapDocumentsForPega(
    pega: PlayerPegaDto,
    visRate: number,
    currency: CurrencyDto,
    playerAddress: string,
  ) {
    const response = await this.apiService.fetchPegaRaceHistory(pega.id);
    let raceHistoryDtos = response.data;
    raceHistoryDtos = raceHistoryDtos.splice(0, 10);

    const pegaInfo = await this.apiService.fetchPegaGameDetail(pega.id);
    const pegaClass = pegaInfo.pega.class;

    const raceDocumentsPromises = raceHistoryDtos.map(async (dto) => {
      const racesResponse = await this.apiService.fetchRaceDetail(dto.raceId);
      const distance = racesResponse.race.length;
      const document: RaceDocument = {
        class: pegaClass,
        distance,
        earned: dto.reward,
        earnedFiat: dto.reward * visRate,
        fiatSymbol: currency.symbol,
        id: `${dto.raceId}`,
        playerAddress,
        position: dto.position,
        timestamp: moment(dto.updatedAt).unix(),
      };
      return document;
    });
    const raceDocuments = await Promise.all(raceDocumentsPromises);
    return raceDocuments;
  }
}
