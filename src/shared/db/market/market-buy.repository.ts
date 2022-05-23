import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketBuy } from './market-buy.schema';
import { EntityManager } from 'typeorm';

@Injectable()
export class MarketBuyRepository {
  constructor(
    @InjectRepository(MarketBuy)
    public repo: Repository<MarketBuy>,
    private manager: EntityManager,
  ) {}

  async findAll(limit?: number): Promise<MarketBuy[]> {
    return await this.repo
      .createQueryBuilder('mb')
      .innerJoinAndSelect('mb.pega', 'p')
      .orderBy('mb.created', 'DESC')
      .take(limit)
      .getMany();
  }

  async fetchPegaCost(buyer) {
    const rawData = await this.manager.query(`SELECT DISTINCT
      id,created,price, price_coin_id
      FROM public.market_buys 
      WHERE buyer_address = '${buyer}' 
      GROUP BY id 
      ORDER BY id ASC, created DESC `);
    return rawData;
  }

  async save(models: MarketBuy[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.repo.upsert(models, ['id']);
  }
}
