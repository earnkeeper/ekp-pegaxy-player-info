import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketBuy, MarketBuyRepository } from './market';
import { Pega, PegaRepository } from './pega';
import { Player, PlayerRepository } from './player';
@Module({
  imports: [TypeOrmModule.forFeature([Player, Pega, MarketBuy])],
  providers: [PlayerRepository, PegaRepository, MarketBuyRepository],
  exports: [PlayerRepository, PegaRepository, MarketBuyRepository],
})
export class DbModule {}
