import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketBuy, MarketBuyRepository } from './market';
import { MarketAlertConfig } from './market-alert-config';
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
    MarketAlertConfig,
  ],
  exports: [
    PlayerRepository,
    PegaRepository,
    MarketBuyRepository,
    MarketAlertConfig,
  ],
})
export class DbModule {}
