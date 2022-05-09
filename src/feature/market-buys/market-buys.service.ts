import { ApiService } from '@/shared/api';
import { MarketBuy } from '@/shared/db';
import { Injectable } from '@nestjs/common';
import { MarketBuysDocument } from './ui/market-buys.document';

@Injectable()
export class MarketBuysService {
  constructor(private apiService: ApiService) {}
  
  async fetchMarketDocument(): Promise<MarketBuysDocument[]> {

    let buys = this.apiService.fetchMarketData();
    console.log('Reading from the database' + JSON.stringify(buys));
    return
  }
}
