import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pega, PegaRepository } from './pega';
import { Market, MarketRepository } from './market';
import { Player, PlayerRepository } from './player';
;

@Module({
  imports: [TypeOrmModule.forFeature([Player, Pega, Market])],
  providers: [PlayerRepository, PegaRepository , MarketRepository ],
  exports: [PlayerRepository, PegaRepository , MarketRepository ],
})
export class DbModule {}
