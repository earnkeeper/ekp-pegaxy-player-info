import { Module } from '@nestjs/common';
import { PlayerController } from './player.contoller';
import { PlayerService } from './player.service';

@Module({
  providers: [PlayerController, PlayerService],
})
export class PlayerModule {}
