import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Market } from './market.schema';

@Injectable()
export class MarketRepository {
  constructor(
    @InjectRepository(Market)
    public marketRepository: Repository<Market>,
  ) {}

  async findLatest(): Promise<Market> {
    const results = await this.marketRepository.find({ });

    if (!results?.length) {
      return undefined;
    }

    return results[0];
  }

  async save(models: Market[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.marketRepository.upsert(models, ['id']);
  }
}
