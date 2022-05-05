import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { PlayerController } from './player.contoller';
import { PlayerService } from './player.service';

@Module({
  imports: [ApiModule, DbModule],

  providers: [PlayerController, PlayerService],
})
export class PlayerModule {}
