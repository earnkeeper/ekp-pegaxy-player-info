import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketBuy } from './market-buy.schema';

@Injectable()
export class MarketBuyRepository {
  constructor(
    @InjectRepository(MarketBuy)
    public repo: Repository<MarketBuy>,
  ) {}

  async findAll(limit?: number): Promise<MarketBuy[]> {
    return await this.repo
      .createQueryBuilder('mb')
      .innerJoinAndSelect('mb.pega', 'p')
      .orderBy('mb.created', 'DESC')
      .take(limit)
      .getMany();
  }

  async save(models: MarketBuy[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.repo.upsert(models, ['id']);
  }
}
