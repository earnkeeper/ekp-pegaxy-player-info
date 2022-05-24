import { RaceService } from './../race/race.service';
import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { RaceModule } from '../race/race.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [ApiModule, DbModule, RaceModule],
  providers: [PlayerController, PlayerService, RaceService],
})
export class PlayerModule {}
