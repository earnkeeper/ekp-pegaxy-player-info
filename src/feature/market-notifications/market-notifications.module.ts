import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { MarketNotificationsController } from './market-notifications.controller';
import { MarketNotificationsService } from './market-notifications.service';

@Module({
  imports: [ApiModule, DbModule],
  providers: [MarketNotificationsController, MarketNotificationsService],
})
export class MarketNotificationsModule {}
