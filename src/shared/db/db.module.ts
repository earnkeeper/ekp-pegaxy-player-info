import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketBuy, MarketBuyRepository } from './market';
import {
  MarketAlertConfig,
  MarketAlertConfigRepository,
} from './market-alert-config';
import { PegaRepository } from './pega/pega.repository';
import { Pega } from './pega/pega.schema';
import { Player, PlayerRepository } from './player';
@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Pega, MarketBuy, MarketAlertConfig]),
  ],
  providers: [
    PlayerRepository,
    PegaRepository,
    MarketBuyRepository,
    MarketAlertConfigRepository,
  ],
  exports: [
    PlayerRepository,
    PegaRepository,
    MarketBuyRepository,
    MarketAlertConfigRepository,
  ],
})
export class DbModule {}
