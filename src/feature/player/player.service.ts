import { Injectable } from '@nestjs/common';
import { PlayerDocument } from './ui/player.document';

@Injectable()
export class PlayerService {
  async getPlayerDocuments(): Promise<PlayerDocument[]> {
    return [];
  }
}
