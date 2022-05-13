import { SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MarketHistoryModule } from './feature/market-history/market-history.module';
import { PlayerModule } from './feature/player/player.module';
import { PlayersModule } from './feature/players/players.module';
import { DbModule } from './shared/db';

export const MODULE_DEF = {
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: !!process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ?? process.env.EKP_PLUGIN_ID,
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    MarketHistoryModule,
    PlayersModule,
    PlayerModule,
    DbModule,
    SdkModule,
  ],
};

@Module(MODULE_DEF)
export class WorkerModule {}
