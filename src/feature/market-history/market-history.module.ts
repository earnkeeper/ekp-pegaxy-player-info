import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { MarketHistoryController } from './market-history.controller';
import { MarketHistoryService } from './market-history.service';

@Module({
  imports: [ApiModule, DbModule],
  providers: [MarketHistoryController, MarketHistoryService],
})
export class MarketHistoryModule {}
