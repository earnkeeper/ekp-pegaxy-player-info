import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';

@Module({
  imports: [ApiModule, DbModule],
  providers: [RaceController, RaceService],
})
export class RaceModule {}
