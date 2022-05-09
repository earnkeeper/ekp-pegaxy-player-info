import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketBuy } from './market-buy.schema';

@Injectable()
export class MarketBuyRepository {
  constructor(
    @InjectRepository(MarketBuy)
    public marketRepository: Repository<MarketBuy>,
  ) {}

  async findLatest(): Promise<MarketBuy> {
    const results = await this.marketRepository.find({});

    if (!results?.length) {
      return undefined;
    }

    return results[0];
  }

  async save(models: MarketBuy[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.marketRepository.upsert(models, ['id']);
  }
}
