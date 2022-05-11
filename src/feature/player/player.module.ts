import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [ApiModule, DbModule],
  providers: [PlayerController, PlayerService],
})
export class PlayerModule {}
