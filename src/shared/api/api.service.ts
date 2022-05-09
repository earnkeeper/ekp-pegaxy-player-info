import { AbstractApiService } from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import axios from 'axios-https-proxy-fix';
import { MarketBuyRepository } from '../db/market/market-buy.repository';


@Injectable()
export class ApiService extends AbstractApiService {
  private readonly proxy: { host: string; port: number };
  private ;

  constructor(private marketBuyRepository:  MarketBuyRepository) {
    super({
      name: 'PegaxyApiService',
    });
   
  }

  fetchMarketData(){
    let  marketData : any;
  
     marketData = this.marketBuyRepository.findAll();
     console.log('log data from api service'+ marketData);
     return marketData;
  }

}
