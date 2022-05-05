import { SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { HistoryModule } from './feature/history/history.module';
import { InfoModule } from './feature/info/info.module';
import { PlayerModule } from './feature/player/player.module';

export const MODULE_DEF = {
  imports: [PlayerModule, HistoryModule, InfoModule, SdkModule],
};

@Module(MODULE_DEF)
export class WorkerModule {}
