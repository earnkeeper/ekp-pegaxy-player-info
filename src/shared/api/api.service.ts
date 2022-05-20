import { ApiBuilder } from '@/util/sdk/api-builder';
import { CacheService, EkConfigService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { PegaEarningsDto } from './dto/pega-earnings.dto';
import { PegaRaceHistoryResponseDto } from './dto/pega-race-history.dto';
import { PlayerAssetsDto } from './dto/player-assets.dto';
import { PlayerEarningsDto } from './dto/player-earnings.dto';
import { PlayerPegaDto } from './dto/player-pega.dto';

@Injectable()
export class ApiService {
  constructor(
    private configService: EkConfigService,
    private cacheService: CacheService,
  ) {}

  private apiBuilder() {
    return new ApiBuilder(this.configService, this.cacheService, {
      defaultLimit: {
        id: 'thetan-api',
        maxConcurrent: 5,
        minTime: 200,
      },
    });
  }

  async fetchUserAssets(userAddress: string): Promise<PlayerAssetsDto> {
    const url = `https://api-apollo.pegaxy.io/v1/assets/count/user/${userAddress}`;

    return await this.apiBuilder()
      .limit()
      .cache(300)
      .retry()
      .get(url, (response) => response.data);
  }

  async fetchPegaEarnings(pegaId: number): Promise<PegaEarningsDto> {
    const startDate = 1609502400;
    const endDate = moment().unix(); // 1652945433 (for testing)

    const url = `https://api-apollo.pegaxy.io/v1/pegas/${pegaId}/earnings?since=${startDate}&to=${endDate}`;

    return await this.apiBuilder()
      .limit()
      .cache(300)
      .retry()
      .get(url, (response) => response.data);
  }

  async fetchUserEarnings(userAddress: string): Promise<PlayerEarningsDto> {
    const url = `https://api-apollo.pegaxy.io/v1/earnings/total/user/${userAddress}`;

    return await this.apiBuilder()
      .limit()
      .cache(300)
      .retry()
      .get(url, (response) => response.data);
  }

  async fetchPegaRaceHistory(
    pegaId: number,
  ): Promise<PegaRaceHistoryResponseDto> {
    const url = `https://api-apollo.pegaxy.io/v1/game-api/race/history/pega/${pegaId}`;

    return await this.apiBuilder()
      .limit()
      .cache(300)
      .retry()
      .get(url, (response) => response.data);
  }

  async fetchMarketVaule(
    breedType: string,
    gender: string,
    minBreedCount: number,
    maxBreedCount: number,
    breedable: number,
    raceable: number,
  ) {
    const url = `https://api-apollo.pegaxy.io/v1/pegas/prices/floor?breedType=${breedType}&gender=${gender}&minBreedCount=${minBreedCount}&maxBreedCount=${maxBreedCount}&breedable=${breedable}&raceable=${raceable}`;
    const results = await this.apiBuilder()
      .limit()
      .cache(300)
      .retry()
      .get(url, (response) => response.data);
    return results;
  }

  async fetchUserEarningsInLast24h(
    userAddress: string,
  ): Promise<PlayerEarningsDto> {
    const currentTime = moment().unix();
    const last24Hours = currentTime - 86400;

    const url = `https://api-apollo.pegaxy.io/v1/earnings/historical/user/${userAddress}?since=${last24Hours}&to=${currentTime}`;

    return await this.apiBuilder()
      .limit()
      .cache(300)
      .retry()
      .get(url, (response) => response.data);
  }
  async fetchUserOwnedPegas(userAddress: string): Promise<PlayerPegaDto[]> {
    const url = `https://api-apollo.pegaxy.io/v1/pegas/owner/user/${userAddress}`;

    return await this.apiBuilder()
      .limit()
      .cache(300)
      .retry()
      .get(url, (response) => response.data);
  }
}
