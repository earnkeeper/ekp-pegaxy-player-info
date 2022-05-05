import { Injectable } from '@nestjs/common';
import { InfoDocument } from './ui/info.document';

@Injectable()
export class InfoService {
  async getPlayerInfoDocument(): Promise<InfoDocument[]> {
    return [];
  }
}
