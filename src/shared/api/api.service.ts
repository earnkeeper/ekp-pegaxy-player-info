import { AbstractApiService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import { MarketBuyRepository } from '../db/market/market-buy.repository';

@Injectable()
export class ApiService extends AbstractApiService {
  private readonly proxy: { host: string; port: number };
  private;

  constructor(private marketBuyRepository: MarketBuyRepository) {
    super({
      name: 'PegaxyApiService',
    });
  }
}
