import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.schema';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectRepository(Player)
    public playerRepository: Repository<Player>,
  ) {}

  async findLatest(): Promise<Player> {
    const results = await this.playerRepository.find({});

    if (!results?.length) {
      return undefined;
    }

    return results[0];
  }

  async save(models: Player[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.playerRepository.upsert(models, ['id']);
  }
}
