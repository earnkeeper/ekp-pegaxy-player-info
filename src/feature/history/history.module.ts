import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { HistoryController } from './history.contoller';
import { HistoryService } from './history.service';

@Module({
  imports: [ApiModule, DbModule],

  providers: [HistoryController, HistoryService],
})
export class HistoryModule {}
