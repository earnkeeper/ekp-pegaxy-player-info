import { Injectable } from '@nestjs/common';
import { HistoryDocument } from './ui/history.document';

@Injectable()
export class HistoryService {
  async getHistoryDocument(): Promise<HistoryDocument[]> {
    return [];
  }
}
