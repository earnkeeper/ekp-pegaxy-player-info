import { ApiModule } from '@/shared/api';
import { DbModule } from '@/shared/db';
import { Module } from '@nestjs/common';
import { RaceService } from './race.service';

@Module({
  imports: [ApiModule, DbModule],
  providers: [RaceService],
})
export class RaceModule {}
