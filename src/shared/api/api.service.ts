import { ApiBuilder } from '@/util/sdk/api-builder';
import { CacheService, EkConfigService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import { result } from 'lodash';
import moment from 'moment';
import { resourceLimits } from 'worker_threads';

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
    const endDate= moment().unix();

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

  async fetchPegaRaceHistory(pegaId: number): Promise<PegaRaceHistoryDto[]> {
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
  async fetchUserOwnedPegas(userAddress: string): Promise<any> {
    const url = `https://api-apollo.pegaxy.io/v1/pegas/owner/user/${userAddress}`;

    return await this.apiBuilder()
      .limit()
      .cache(300)
      .retry()
      .get(url, (response) => response.data);
  }
}

export interface PlayerAssetsDto {
  readonly lockedVis: number;
  readonly pega: number;
}

export interface PlayerEarningsDto {
  readonly ownRacedVis: number;
  readonly renteeVisShare: number;
  readonly renterVisShare: number;
  readonly fixedRentalPgx: number;
  readonly sharedRenterVis: number;
  readonly fixedRenterVis: number;
  readonly totalPegaBuyUSDT: number;
  readonly totalPegaBuyCount: number;
  readonly totalPegaSellUSDT: number;
  readonly totalPegaSellCount: number;
}

export interface PlayerPegaDto {
  readonly id: number;
  readonly name: string;
  readonly ownerAddress: string;
  readonly renterAddress: null;
  readonly ownerPegaRewards: number;
  readonly renterPegaRewards: number;
  readonly lastRenterAddress: string;
  readonly lastRenterPrice: number;
  readonly lastRenterRentMode: string;
  readonly lastRenterRentDuration: number;
  readonly lastRenterRentAt: number;
  readonly lastRenterIsDirect: boolean;
  readonly energy: number;
  readonly lastReduceEnergy: number;
  readonly service: string;
  readonly gender: string;
  readonly bloodLine: string;
  readonly breedType: string;
  readonly breedCount: number;
  readonly fatherId: number;
  readonly motherId: number;
  readonly pegaTotalRaces: number;
  readonly canRaceAt: number;
  readonly canBreedAt: number;
  readonly totalRaces: number;
  readonly gold: number;
  readonly silver: number;
  readonly bronze: number;
  readonly win: number;
  readonly lose: number;
  readonly speed: number;
  readonly strength: number;
  readonly wind: number;
  readonly water: number;
  readonly fire: number;
  readonly lightning: number;
  readonly bornTime: number;
  readonly winRate: number;
  readonly lastBreedTime: number;
  readonly rentTimeEnd: number;
}

export interface PegaEarningsDto{
  readonly ownerPegaRewards: number;
  readonly renterPegaRewards: number;
  readonly epoch: number;
}
export interface PegaRaceHistoryDto{
  readonly id: number;
  readonly position: number;
  readonly reward: number;
  readonly raceId: number;
  readonly updatedAt: Date;
}
