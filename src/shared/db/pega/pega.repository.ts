import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pega} from './pega.schema';

@Injectable()
export class PegaRepository {
  constructor(
    @InjectRepository(Pega)
    public pegaRepository: Repository<Pega>,
  ) {}

  async findLatest(): Promise<Pega> {
    const results = await this.pegaRepository.find({   });

    if (!results?.length) {
      return undefined;
    }

    return results[0];
  }

  async save(models: Pega[]): Promise<void> {
    if (!models?.length) {
      return;
    }

    await this.pegaRepository.upsert(models, ['id']);
  }
}
