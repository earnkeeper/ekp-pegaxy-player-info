import { Module } from '@nestjs/common';
import { HistoryController } from './history.contoller';
import { HistoryService } from './history.service';

@Module({
  providers: [HistoryController, HistoryService],
})
export class HistoryModule {}
