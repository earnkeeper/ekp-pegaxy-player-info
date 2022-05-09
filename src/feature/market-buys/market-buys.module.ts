import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { MarketBuysController } from './market-buys.contoller';
import { MarketBuysService } from './market-buys.service';

@Module({
  imports: [ApiModule, DbModule],
  
  providers: [MarketBuysController, MarketBuysService],
})
export class MarketBuysModule {}
