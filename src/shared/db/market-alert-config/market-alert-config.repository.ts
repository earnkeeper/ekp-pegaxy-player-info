import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketAlertConfig } from './market-alert-config.schema';

@Injectable()
export class MarketAlertConfigRepository {
  constructor(
    @InjectRepository(MarketAlertConfig)
    public pegaRepository: Repository<MarketAlertConfig>,
  ) {}

  async findAll(): Promise<MarketAlertConfig[]> {
    return this.pegaRepository.find();
  }

  async save(models: MarketAlertConfig[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.pegaRepository.upsert(models, ['id']);
  }
}
