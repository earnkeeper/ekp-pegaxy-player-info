import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { RaceModule } from '../race/race.module';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [ApiModule, DbModule, RaceModule],
  providers: [PlayersController, PlayersService],
})
export class PlayersModule {}
