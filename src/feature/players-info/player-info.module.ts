import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { PlayerInfoController } from './player-info.controller';
import { PlayerInfoService } from './player-info.service';


@Module({
  imports: [ApiModule, DbModule],
  providers: [PlayerInfoController, PlayerInfoService],
})
export class PlayerInfoModule {}
