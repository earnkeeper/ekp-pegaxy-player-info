import { MarketAlertConfigRepository } from '@/shared/db';
import { CurrencyDto } from '@earnkeeper/ekp-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketNotificationsService {
  constructor(private repo: MarketAlertConfigRepository) {}

  async getDocuments(connectedAddress: string, currency: CurrencyDto) {
    return [];
  }
}
