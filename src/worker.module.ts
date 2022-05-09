import { SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { HistoryModule } from './feature/history/history.module';
import { InfoModule } from './feature/info/info.module';
import { MarketBuysModule } from './feature/market-buys/market-buys.module';
import { PlayerModule } from './feature/player/player.module';
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
    PlayerModule,
    HistoryModule,
    MarketBuysModule,
    InfoModule,
    DbModule,
    SdkModule,
  ],
};

@Module(MODULE_DEF)
export class WorkerModule {}
